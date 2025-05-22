import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'
import { mcpLogger, MCPError } from './mcp-client'

// Server-side environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    'Missing Supabase server environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY'
  )
}

/**
 * MCP-compliant Supabase client for server-side operations
 * 
 * This client is configured for:
 * - Full admin access with service role key
 * - Bypasses RLS for administrative operations
 * - Server-side batch operations and data management
 * - MCP-compliant audit logging and monitoring
 */
export const mcpSupabaseServerClient = createClient<Database>(
  supabaseUrl,
  supabaseServiceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      headers: {
        'X-MCP-Client': 'arassat-ecommerce-server',
        'X-MCP-Version': '1.0.0',
      },
    },
  }
)

/**
 * MCP Server Operation Wrapper
 * Provides context-aware error handling and audit logging for server operations
 */
export const mcpServerOperation = async <T>(
  operation: string,
  fn: () => Promise<T>,
  context?: Record<string, unknown>
): Promise<T> => {
  const operationContext = {
    ...context,
    server: true,
    timestamp: new Date().toISOString(),
  }

  mcpLogger.debug(`Server: Starting ${operation}`, operationContext)
  
  try {
    const result = await fn()
    mcpLogger.info(`Server: Completed ${operation}`, { 
      ...operationContext, 
      success: true 
    })
    return result
  } catch (error) {
    const mcpError = error instanceof MCPError 
      ? error 
      : new MCPError(
          'SERVER_OPERATION_FAILED',
          `Server ${operation} failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          operationContext,
          error instanceof Error ? error : undefined
        )
    
    mcpLogger.error(`Server: ${operation}`, mcpError, operationContext)
    throw mcpError
  }
}

/**
 * MCP Product Operations Service
 * Server-side operations for product management with context awareness
 */
export class MCPProductService {
  /**
   * Get all available products with variants for public display
   */
  static async getAvailableProducts() {
    return mcpServerOperation('getAvailableProducts', async () => {
      const { data, error } = await mcpSupabaseServerClient
        .rpc('mcp_get_available_products')
      
      if (error) {
        throw new MCPError(
          'PRODUCTS_FETCH_FAILED',
          'Failed to fetch available products',
          { error: error.message }
        )
      }
      
      return data || []
    })
  }

  /**
   * Validate stock for multiple variants (cart validation)
   */
  static async validateCartStock(
    cartItems: Array<{ variant_id: string; quantity: number }>
  ) {
    return mcpServerOperation('validateCartStock', async () => {
      const validationResults = await Promise.all(
        cartItems.map(async ({ variant_id, quantity }) => {
          const { data, error } = await mcpSupabaseServerClient
            .rpc('mcp_validate_stock', {
              variant_uuid: variant_id,
              requested_quantity: quantity
            })
          
          if (error) {
            throw new MCPError(
              'STOCK_VALIDATION_FAILED',
              `Stock validation failed for variant ${variant_id}`,
              { variant_id, quantity, error: error.message }
            )
          }
          
          return {
            variant_id,
            quantity,
            available: data || false
          }
        })
      )
      
      return validationResults
    }, { cartItemsCount: cartItems.length })
  }

  /**
   * Get product details by ID with MCP context awareness
   */
  static async getProductById(productId: string) {
    return mcpServerOperation('getProductById', async () => {
      const { data, error } = await mcpSupabaseServerClient
        .from('mcp_product_details_view')
        .select('*')
        .eq('product_id', productId)
        .single()
      
      if (error) {
        throw new MCPError(
          'PRODUCT_NOT_FOUND',
          `Product with ID ${productId} not found`,
          { productId, error: error.message }
        )
      }
      
      return data
    }, { productId })
  }

  /**
   * Get products by category with MCP filtering
   */
  static async getProductsByCategory(categorySlug: string) {
    return mcpServerOperation('getProductsByCategory', async () => {
      const { data, error } = await mcpSupabaseServerClient
        .from('mcp_product_details_view')
        .select('*')
        .eq('category_slug', categorySlug)
        .order('product_name')
      
      if (error) {
        throw new MCPError(
          'CATEGORY_PRODUCTS_FETCH_FAILED',
          `Failed to fetch products for category ${categorySlug}`,
          { categorySlug, error: error.message }
        )
      }
      
      return data || []
    }, { categorySlug })
  }
}

/**
 * MCP Order Operations Service
 * Server-side operations for order management with audit trails
 */
export class MCPOrderService {
  /**
   * Create a new order with MCP audit logging
   */
  static async createOrder(orderData: {
    user_id?: string
    total: number
    customer_info: Record<string, unknown>
    shipping_address: Record<string, unknown>
    items: Array<{
      variant_id: string
      quantity: number
      unit_price: number
    }>
  }) {
    return mcpServerOperation('createOrder', async () => {
      // Start transaction for order creation
      const { data: order, error: orderError } = await mcpSupabaseServerClient
        .from('orders')
        .insert({
          user_id: orderData.user_id,
          total: orderData.total,
          status: 'pending',
          customer_info: orderData.customer_info,
          shipping_address: orderData.shipping_address,
        })
        .select()
        .single()
      
      if (orderError) {
        throw new MCPError(
          'ORDER_CREATION_FAILED',
          'Failed to create order',
          { orderData, error: orderError.message }
        )
      }
      
      // Create order items
      const orderItems = orderData.items.map(item => ({
        order_id: order.id,
        variant_id: item.variant_id,
        quantity: item.quantity,
        unit_price: item.unit_price,
      }))
      
      const { error: itemsError } = await mcpSupabaseServerClient
        .from('order_items')
        .insert(orderItems)
      
      if (itemsError) {
        // Rollback order creation if items fail
        await mcpSupabaseServerClient
          .from('orders')
          .delete()
          .eq('id', order.id)
        
        throw new MCPError(
          'ORDER_ITEMS_CREATION_FAILED',
          'Failed to create order items, order rolled back',
          { orderId: order.id, error: itemsError.message }
        )
      }
      
      return order
    }, { 
      itemCount: orderData.items.length,
      total: orderData.total,
      hasUserId: !!orderData.user_id 
    })
  }

  /**
   * Update order status with MCP audit trail
   */
  static async updateOrderStatus(orderId: string, newStatus: string) {
    return mcpServerOperation('updateOrderStatus', async () => {
      const { data, error } = await mcpSupabaseServerClient
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId)
        .select()
        .single()
      
      if (error) {
        throw new MCPError(
          'ORDER_STATUS_UPDATE_FAILED',
          `Failed to update order ${orderId} status to ${newStatus}`,
          { orderId, newStatus, error: error.message }
        )
      }
      
      return data
    }, { orderId, newStatus })
  }
}

/**
 * MCP Health Check for server operations
 */
export const checkMCPServerHealth = async (): Promise<boolean> => {
  try {
    const { data, error } = await mcpSupabaseServerClient
      .from('categories')
      .select('count')
      .limit(1)
    
    if (error) {
      throw new MCPError(
        'SERVER_HEALTH_CHECK_FAILED',
        'Server-side Supabase connection health check failed',
        { error: error.message }
      )
    }
    
    mcpLogger.info('MCP server client health check passed')
    return true
  } catch (error) {
    mcpLogger.error('MCP server client health check', error as Error)
    return false
  }
} 