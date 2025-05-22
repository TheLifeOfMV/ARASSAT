import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

// Environment variables for Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
  )
}

/**
 * MCP-compliant Supabase client for browser-side operations
 * 
 * This client is configured for:
 * - Public read access to categories, products, and variants
 * - Real-time subscriptions with context awareness
 * - Structured logging for MCP operations
 * - Automatic error handling with standardized error responses
 */
export const mcpSupabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  realtime: {
    log_level: 'debug', // Enable real-time logging for MCP context tracking
  },
  global: {
    // Add structured logging for all operations
    headers: {
      'X-MCP-Client': 'arassat-ecommerce-frontend',
      'X-MCP-Version': '1.0.0',
    },
  },
})

/**
 * MCP Context-Aware Error Handler
 * Provides standardized error responses following MCP specifications
 */
export class MCPError extends Error {
  constructor(
    public code: string,
    message: string,
    public context?: Record<string, unknown>,
    public originalError?: Error
  ) {
    super(message)
    this.name = 'MCPError'
  }

  toJSON() {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      context: this.context,
      timestamp: new Date().toISOString(),
    }
  }
}

/**
 * MCP-compliant logging utility
 * Provides structured logging for debugging and monitoring
 */
export const mcpLogger = {
  info: (operation: string, context?: Record<string, unknown>) => {
    console.info(`[MCP] ${operation}`, {
      timestamp: new Date().toISOString(),
      level: 'info',
      operation,
      context,
    })
  },
  
  error: (operation: string, error: Error | MCPError, context?: Record<string, unknown>) => {
    console.error(`[MCP] ${operation} failed`, {
      timestamp: new Date().toISOString(),
      level: 'error',
      operation,
      error: error instanceof MCPError ? error.toJSON() : error.message,
      context,
    })
  },
  
  debug: (operation: string, context?: Record<string, unknown>) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[MCP] ${operation}`, {
        timestamp: new Date().toISOString(),
        level: 'debug',
        operation,
        context,
      })
    }
  },
}

/**
 * MCP-compliant wrapper for database operations
 * Provides consistent error handling and logging
 */
export const mcpOperation = async <T>(
  operation: string,
  fn: () => Promise<T>,
  context?: Record<string, unknown>
): Promise<T> => {
  mcpLogger.debug(`Starting ${operation}`, context)
  
  try {
    const result = await fn()
    mcpLogger.info(`Completed ${operation}`, { ...context, success: true })
    return result
  } catch (error) {
    const mcpError = error instanceof MCPError 
      ? error 
      : new MCPError(
          'OPERATION_FAILED',
          `${operation} failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          context,
          error instanceof Error ? error : undefined
        )
    
    mcpLogger.error(operation, mcpError, context)
    throw mcpError
  }
}

/**
 * MCP Context Manager for maintaining operation context
 */
export class MCPContext {
  private static instance: MCPContext
  private context: Record<string, unknown> = {}

  static getInstance(): MCPContext {
    if (!MCPContext.instance) {
      MCPContext.instance = new MCPContext()
    }
    return MCPContext.instance
  }

  setContext(key: string, value: unknown): void {
    this.context[key] = value
    mcpLogger.debug('Context updated', { key, value })
  }

  getContext(): Record<string, unknown> {
    return { ...this.context }
  }

  clearContext(): void {
    this.context = {}
    mcpLogger.debug('Context cleared')
  }
}

// Export singleton instance
export const mcpContext = MCPContext.getInstance()

/**
 * Health check function for MCP client
 */
export const checkMCPClientHealth = async (): Promise<boolean> => {
  try {
    const { data, error } = await mcpSupabaseClient
      .from('categories')
      .select('id')
      .limit(1)
    
    if (error) {
      throw new MCPError(
        'HEALTH_CHECK_FAILED',
        'Supabase connection health check failed',
        { error: error.message }
      )
    }
    
    mcpLogger.info('MCP client health check passed')
    return true
  } catch (error) {
    mcpLogger.error('MCP client health check', error as Error)
    return false
  }
} 