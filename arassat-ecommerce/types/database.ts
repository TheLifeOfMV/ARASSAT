export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string | null
          id: string
          order_id: string
          quantity: number
          unit_price: number
          variant_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_id: string
          quantity: number
          unit_price: number
          variant_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          order_id?: string
          quantity?: number
          unit_price?: number
          variant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "mcp_order_summary_view"
            referencedColumns: ["order_id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "mcp_order_summary_view"
            referencedColumns: ["variant_id"]
          },
          {
            foreignKeyName: "order_items_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "mcp_product_details_view"
            referencedColumns: ["variant_id"]
          },
          {
            foreignKeyName: "order_items_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          customer_info: Json | null
          id: string
          shipping_address: Json
          status: string
          total: number
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          customer_info?: Json | null
          id?: string
          shipping_address: Json
          status?: string
          total: number
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          customer_info?: Json | null
          id?: string
          shipping_address?: Json
          status?: string
          total?: number
          user_id?: string | null
        }
        Relationships: []
      }
      product_variants: {
        Row: {
          color: string | null
          created_at: string | null
          id: string
          price: number
          product_id: string
          size: string | null
          sku: string | null
          stock: number
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          id?: string
          price: number
          product_id: string
          size?: string | null
          sku?: string | null
          stock: number
        }
        Update: {
          color?: string | null
          created_at?: string | null
          id?: string
          price?: number
          product_id?: string
          size?: string | null
          sku?: string | null
          stock?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "mcp_order_summary_view"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "mcp_product_details_view"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category_id: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          visible: boolean | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          visible?: boolean | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          visible?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "mcp_product_details_view"
            referencedColumns: ["category_id"]
          },
        ]
      }
    }
    Views: {
      mcp_order_summary_view: {
        Row: {
          category_name: string | null
          color: string | null
          customer_info: Json | null
          item_id: string | null
          order_created_at: string | null
          order_id: string | null
          product_id: string | null
          product_name: string | null
          quantity: number | null
          shipping_address: Json | null
          size: string | null
          sku: string | null
          status: string | null
          total: number | null
          unit_price: number | null
          user_id: string | null
          variant_id: string | null
        }
        Relationships: []
      }
      mcp_product_details_view: {
        Row: {
          category_description: string | null
          category_id: string | null
          category_name: string | null
          category_slug: string | null
          color: string | null
          price: number | null
          product_created_at: string | null
          product_description: string | null
          product_id: string | null
          product_name: string | null
          size: string | null
          sku: string | null
          stock: number | null
          variant_created_at: string | null
          variant_id: string | null
          visible: boolean | null
        }
        Relationships: []
      }
    }
    Functions: {
      mcp_get_available_products: {
        Args: Record<PropertyKey, never>
        Returns: {
          product_id: string
          product_name: string
          category_name: string
          variant_id: string
          color: string
          size: string
          price: number
          stock: number
          sku: string
        }[]
      }
      mcp_validate_stock: {
        Args: { variant_uuid: string; requested_quantity: number }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

// Additional MCP-specific types for the e-commerce platform
export type MCPProductDetails = Tables<'mcp_product_details_view'>
export type MCPOrderSummary = Tables<'mcp_order_summary_view'>
export type Category = Tables<'categories'>
export type Product = Tables<'products'>
export type ProductVariant = Tables<'product_variants'>
export type Order = Tables<'orders'>
export type OrderItem = Tables<'order_items'>

// Insert types for creating new records
export type CategoryInsert = TablesInsert<'categories'>
export type ProductInsert = TablesInsert<'products'>
export type ProductVariantInsert = TablesInsert<'product_variants'>
export type OrderInsert = TablesInsert<'orders'>
export type OrderItemInsert = TablesInsert<'order_items'>

// Update types for modifying existing records
export type CategoryUpdate = TablesUpdate<'categories'>
export type ProductUpdate = TablesUpdate<'products'>
export type ProductVariantUpdate = TablesUpdate<'product_variants'>
export type OrderUpdate = TablesUpdate<'orders'>
export type OrderItemUpdate = TablesUpdate<'order_items'>

// MCP Function return types
export type AvailableProduct = Database['public']['Functions']['mcp_get_available_products']['Returns'][0]

// Customer and shipping address interfaces
export interface CustomerInfo {
  name: string
  email: string
  phone?: string
  document_type?: 'CC' | 'CE' | 'NIT'
  document_number?: string
}

export interface ShippingAddress {
  street: string
  city: string
  department: string // Colombian state/department
  postal_code?: string
  country: string
  neighborhood?: string
  instructions?: string
}

// Order status enum for type safety
export type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled'

// Cart item interface for frontend state management
export interface CartItem {
  variant_id: string
  product_name: string
  color: string | null
  size: string | null
  price: number
  quantity: number
  sku: string | null
  stock: number
} 