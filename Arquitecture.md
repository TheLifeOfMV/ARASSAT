yamlproject:
  name: "arassat-ecommerce"
  description: "Interactive e-commerce platform for Colombian artisanal horse equipment with visual catalog and traditional shopping experience."

principles:
  pragmatism:
    summary: "Next.js provides full-stack capabilities with zero-config, Supabase eliminates backend complexity while offering real-time features, and Tailwind CSS accelerates UI development with utility-first approach."
  separation_of_concerns:
    summary: "Business logic isolated in custom hooks and services, UI components remain pure and reusable, data layer abstracted through Supabase client with typed interfaces, and API routes handle server-side operations independently."

framework_choices:
  backend: "Supabase MCP Server (Model Context Protocol + PostgreSQL + Real-time + Auth + Storage)"
  frontend: "Next.js 14 with App Router + TypeScript + Tailwind CSS"
  rationale: |
    Next.js App Router enables file-based routing matching PRD structure, built-in API routes for backend logic separation.
    Supabase MCP Server provides Model Context Protocol implementation with typed database client, real-time subscriptions for inventory, and built-in CMS capabilities.
    MCP architecture ensures standardized communication patterns and context-aware operations between frontend and backend layers.
    TypeScript ensures contract enforcement between layers. Tailwind CSS accelerates responsive design development.
    This stack minimizes configuration while maintaining clear architectural boundaries with MCP protocol benefits.

architecture:
  backend:
    layers:
      logic: "MCP-compliant services (product operations, order processing, stock validation), Business rule engines, Shipping calculator with Colombian regional logic, Email notification services, CMS operations with context-aware data handling"
      interface: "Supabase MCP Server endpoints, Next.js API routes with MCP integration, Real-time subscriptions for inventory updates, RESTful endpoints with TypeScript DTOs following MCP specifications"
  frontend:
    layers:
      logic: "Custom hooks for data fetching, State management via Zustand, Form validation and submission, Interactive hotspot calculations, Shopping cart operations"
      interface: "React Server Components for SEO, Client components for interactivity, Tailwind-based design system, Responsive layouts, Interactive SVG overlays for horse visualization"
  communication:
    pattern: "Hybrid MCP Architecture: Server Components for static content, MCP-compliant API routes for mutations, Supabase MCP client for real-time features and context-aware operations"
    error_strategy: "React Error Boundaries, MCP-standardized error responses, Optimistic updates with rollback, Network retry logic with exponential backoff, Context-aware error recovery"

batches:
  - name: "core_essential_interface"
    approx_loc: 400
    objectives: |
      • Implement basic layout structure and navigation components
      • Create product listing and detail page UI components
      • Build shopping cart interface components
      • Establish responsive design system with Tailwind
    instructions: |
      INTERFACE BATCH 1A - UI Foundation & Product Display
      
      1. PROJECT SETUP (50 LOC)
      - Initialize Next.js 14 project with TypeScript and Tailwind CSS
      - Configure eslint, prettier, and basic project structure
      - Set up /components, /lib, /types, /app directories
      - Install dependencies: @supabase/supabase-js, zustand, react-hook-form, lucide-react
      
      2. LAYOUT COMPONENTS (100 LOC)
      - Create /components/layout/Navbar.tsx with logo, navigation links, cart icon
      - Implement mobile hamburger menu with slide-out functionality
      - Build /components/layout/Footer.tsx with company information
      - Create /components/layout/Layout.tsx wrapper component
      
      3. PRODUCT DISPLAY COMPONENTS (150 LOC)
      - Build /components/products/ProductCard.tsx for grid display
      - Create /components/products/ProductGrid.tsx with responsive grid layout
      - Implement /components/products/ProductDetail.tsx for individual product pages
      - Add /components/products/VariantSelector.tsx for color/size selection
      
      4. CART INTERFACE COMPONENTS (100 LOC)
      - Create /components/cart/CartItem.tsx for individual cart entries
      - Build /components/cart/CartSummary.tsx for totals and actions
      - Implement /components/cart/CartDrawer.tsx slide-out cart interface
      - Add quantity selectors and remove item functionality
      
      TECHNICAL REQUIREMENTS:
      - All components must be pure React components with no business logic
      - Use TypeScript interfaces for all props
      - Implement responsive design with Tailwind breakpoints (sm, md, lg, xl)
      - Follow atomic design principles (atoms, molecules, organisms)
      - Add loading states and skeleton components for all data-dependent UI
      - Ensure accessibility with proper ARIA labels and keyboard navigation

  - name: "core_essential_logic"
    approx_loc: 450
    objectives: |
      • Implement product data fetching and state management
      • Build shopping cart logic and persistence
      • Create basic routing and navigation functionality
      • Establish Supabase database schema and connections
    instructions: |
      LOGIC BATCH 1B - Data Management & Business Logic
      
      1. DATABASE SCHEMA SETUP (100 LOC)
      - Create Supabase MCP Server project and configure environment variables
      - Set up MCP server configuration in /lib/mcp/server-config.ts
      - Define SQL schema in /supabase/migrations/001_initial_schema.sql:
        * categories table (id, name, slug, description, created_at)
        * products table (id, name, description, category_id, visible, created_at)
        * product_variants table (id, product_id, color, size, price, stock, sku)
        * orders table (id, total, status, customer_info, shipping_address, created_at)
        * order_items table (id, order_id, variant_id, quantity, unit_price)
      - Set up Row Level Security (RLS) policies for public read access
      - Configure MCP context handlers for database operations
      - Seed database with initial categories and sample products
      
      2. MCP CLIENT CONFIGURATION (50 LOC)
      - Create /lib/supabase/mcp-client.ts with MCP-compliant Supabase client
      - Set up /lib/supabase/mcp-server.ts for server-side MCP operations
      - Define TypeScript types in /types/mcp-database.ts based on MCP schema specifications
      - Configure real-time subscriptions with MCP context awareness for inventory updates
      - Implement MCP protocol handlers for standardized communication patterns
      
      3. DATA FETCHING HOOKS (150 LOC)
      - Create /lib/hooks/useProducts.ts for product listing with filtering
      - Implement /lib/hooks/useProduct.ts for individual product fetching
      - Build /lib/hooks/useCategories.ts for category navigation
      - Add /lib/hooks/useProductVariants.ts for variant management
      - Include error handling, loading states, and caching logic
      
      4. CART MANAGEMENT LOGIC (150 LOC)
      - Create /lib/stores/cartStore.ts using Zustand for cart state
      - Implement addItem, removeItem, updateQuantity, clearCart actions
      - Add cart persistence to localStorage with rehydration
      - Include stock validation before adding items
      - Calculate totals, taxes, and shipping estimates
      - Implement optimistic updates with error rollback
      
      TECHNICAL REQUIREMENTS:
      - All business logic must be separated from UI components and follow MCP standards
      - Use TypeScript strict mode for type safety with MCP-compliant interfaces
      - Implement proper error handling with MCP-standardized error responses
      - Add comprehensive JSDoc comments for all functions following MCP documentation standards
      - Follow MCP protocol patterns for server state management and context awareness
      - Ensure all database queries are optimized, indexed, and MCP-compliant
      - Add retry logic for failed API calls with exponential backoff and MCP error codes
      - Implement MCP context preservation across all data operations

  - name: "core_important_interface"
    approx_loc: 350
    objectives: |
      • Build interactive horse visualization with clickable hotspots
      • Create category-specific product listing pages
      • Implement checkout form interface components
      • Add homepage visual components
    instructions: |
      INTERFACE BATCH 2A - Interactive Visualization & Checkout UI
      
      1. INTERACTIVE HORSE VISUALIZATION (200 LOC)
      - Create /components/catalog/HorseVisualization.tsx with SVG horse illustration
      - Implement /components/catalog/Hotspot.tsx for clickable areas with hover effects
      - Build /components/catalog/CategoryTooltip.tsx for hotspot information display
      - Add smooth animations and transitions using CSS transitions
      - Ensure responsive scaling across different screen sizes
      - Include accessibility features for keyboard navigation
      
      2. CATEGORY PAGES INTERFACE (75 LOC)
      - Create /app/productos/[categoria]/page.tsx layout
      - Build /components/products/CategoryHeader.tsx with breadcrumbs
      - Implement /components/products/ProductFilters.tsx for price, color, size filtering
      - Add /components/products/SortOptions.tsx for price/name sorting
      - Include pagination component for large product lists
      
      3. CHECKOUT FORM COMPONENTS (75 LOC)
      - Build /components/checkout/CustomerInfoForm.tsx for contact details
      - Create /components/checkout/ShippingForm.tsx for delivery address
      - Implement /components/checkout/PaymentOptions.tsx for payment method selection
      - Add /components/checkout/OrderSummary.tsx for final review
      - Include form validation indicators and error display
      
      TECHNICAL REQUIREMENTS:
      - Interactive elements must have clear visual feedback
      - All forms must include proper validation UI states
      - SVG elements must be optimized and accessible
      - Animations should respect user's motion preferences
      - Forms must work without JavaScript for progressive enhancement
      - All interactive elements must support touch devices

  - name: "core_important_logic"
    approx_loc: 400
    objectives: |
      • Implement interactive hotspot positioning and navigation logic
      • Build checkout process with payment integration
      • Create order management and stock validation systems
      • Add shipping calculation and tax computation
    instructions: |
      LOGIC BATCH 2B - Advanced Business Logic & Integrations
      
      1. INTERACTIVE CATALOG LOGIC (150 LOC)
      - Create /lib/catalog/hotspotPositions.ts with coordinates for each category
      - Implement /lib/catalog/categoryMapping.ts for hotspot-to-category relationships
      - Build /lib/hooks/useHotspotNavigation.ts for click handling and routing
      - Add hover state management and tooltip positioning logic
      - Include analytics tracking for hotspot interactions
      
      2. CHECKOUT PROCESS LOGIC (150 LOC)
      - Create /lib/checkout/checkoutStore.ts for multi-step form state
      - Implement /lib/checkout/validation.ts for form field validation
      - Build /lib/checkout/orderCreation.ts for order processing
      - Add /lib/checkout/stockValidation.ts for real-time inventory checks
      - Include order confirmation and email notification logic
      
      3. PAYMENT & SHIPPING INTEGRATION (100 LOC)
      - Create /lib/payments/mcp-paymentProviders.ts for MCP-compliant payment methods
      - Implement /lib/shipping/mcp-calculator.ts for regional shipping costs with context awareness
      - Build /lib/shipping/colombianRegions.ts with shipping zones and rates
      - Add /lib/orders/mcp-tracking.ts for order status management with MCP protocol
      - Include MCP-standardized webhook handlers for payment confirmations
      - Implement context-aware payment processing with proper MCP error handling
      
      TECHNICAL REQUIREMENTS:
      - All payment handling must be PCI compliant with MCP security standards
      - Stock validation must be real-time with Supabase MCP subscriptions and context awareness
      - Shipping calculations must handle edge cases with MCP-compliant fallbacks
      - Order creation must be atomic with proper transaction handling via MCP protocols
      - All sensitive operations must include MCP-standardized logging and monitoring
      - Error recovery must preserve user progress in checkout flow with MCP context preservation
      - Implement MCP-compliant audit trails for all financial transactions

  - name: "non_core_important_interface"
    approx_loc: 250
    objectives: |
      • Build CMS interface for product management
      • Create admin dashboard for order management
      • Implement user-friendly product creation forms
      • Add inventory management interface components
    instructions: |
      INTERFACE BATCH 3A - Content Management System UI
      
      1. ADMIN AUTHENTICATION & LAYOUT (75 LOC)
      - Create /app/admin/layout.tsx with admin-specific navigation
      - Build /components/admin/AdminNavbar.tsx with logout functionality
      - Implement /components/admin/Sidebar.tsx for admin sections
      - Add /components/admin/ProtectedRoute.tsx for authentication checks
      
      2. PRODUCT MANAGEMENT INTERFACE (100 LOC)
      - Create /components/admin/ProductTable.tsx for product listing
      - Build /components/admin/ProductForm.tsx for create/edit operations
      - Implement /components/admin/VariantManager.tsx for managing product variants
      - Add /components/admin/ImageUploader.tsx for product photo management
      - Include bulk operations interface for multiple products
      
      3. ORDER MANAGEMENT INTERFACE (75 LOC)
      - Build /components/admin/OrderList.tsx for order overview
      - Create /components/admin/OrderDetail.tsx for individual order management
      - Implement /components/admin/StatusUpdater.tsx for order status changes
      - Add /components/admin/CustomerInfo.tsx for customer details display
      
      TECHNICAL REQUIREMENTS:
      - Admin interface must be completely separate from public interface
      - All forms must include comprehensive validation feedback
      - Tables must support sorting, filtering, and pagination
      - File uploads must show progress and handle errors gracefully
      - Interface must be optimized for desktop use primarily
      - Include confirmation dialogs for destructive operations

  - name: "non_core_important_logic"
    approx_loc: 300
    objectives: |
      • Implement admin authentication and authorization
      • Build CMS backend operations for product management
      • Create order management and status tracking systems
      • Add bulk operations and data import/export functionality
    instructions: |
      LOGIC BATCH 3B - Admin Operations & Data Management
      
      1. ADMIN AUTHENTICATION LOGIC (75 LOC)
      - Create /lib/auth/adminAuth.ts for admin-specific authentication
      - Implement /lib/auth/permissions.ts for role-based access control
      - Build /lib/middleware/adminProtection.ts for route protection
      - Add session management and automatic logout for inactive sessions
      
      2. CMS BACKEND OPERATIONS (150 LOC)
      - Create /lib/admin/mcp-productOperations.ts for MCP-compliant CRUD operations
      - Implement /lib/admin/mcp-variantManagement.ts for variant operations with context awareness
      - Build /lib/admin/mcp-categoryManagement.ts for category operations
      - Add /lib/admin/mcp-bulkOperations.ts for batch product updates via MCP protocols
      - Include MCP-standardized data validation and sanitization for all operations
      - Implement context-aware CMS operations with proper MCP error handling
      
      3. ORDER MANAGEMENT LOGIC (75 LOC)
      - Create /lib/admin/orderOperations.ts for order status updates
      - Implement /lib/admin/analytics.ts for sales reporting
      - Build /lib/admin/customerManagement.ts for customer data handling
      - Add export functionality for orders and product data
      
      TECHNICAL REQUIREMENTS:
      - All admin operations must be logged for audit trails with MCP-compliant logging standards
      - Bulk operations must handle large datasets efficiently via MCP batch processing
      - Data export must support multiple formats (CSV, JSON) with MCP metadata
      - All operations must include proper error handling and rollback via MCP protocols
      - Database operations must be optimized for performance with MCP context awareness
      - Include comprehensive input validation and sanitization following MCP security standards
      - Implement MCP-compliant authorization and permission checking for all admin operations

  - name: "non_core_optional_interface"
    approx_loc: 200
    objectives: |
      • Add advanced search and filtering capabilities
      • Implement wishlist and product comparison features
      • Create customer service chat interface
      • Build analytics dashboard for business insights
    instructions: |
      INTERFACE BATCH 4A - Enhanced User Experience Features
      
      1. ADVANCED SEARCH INTERFACE (75 LOC)
      - Create /components/search/SearchBar.tsx with autocomplete
      - Build /components/search/SearchResults.tsx for result display
      - Implement /components/search/SearchFilters.tsx for advanced filtering
      - Add /components/search/RecentSearches.tsx for search history
      
      2. WISHLIST & COMPARISON FEATURES (75 LOC)
      - Build /components/wishlist/WishlistButton.tsx for adding products
      - Create /components/wishlist/WishlistPage.tsx for saved items
      - Implement /components/comparison/ComparisonTable.tsx for product comparison
      - Add /components/comparison/ComparisonSelector.tsx for selection
      
      3. CUSTOMER SERVICE INTERFACE (50 LOC)
      - Create /components/support/ChatWidget.tsx for customer support
      - Build /components/support/FAQ.tsx for common questions
      - Implement /components/support/ContactForm.tsx for inquiries
      
      TECHNICAL REQUIREMENTS:
      - Search must provide instant feedback and be responsive
      - Wishlist must sync across devices for returning customers
      - Comparison table must handle different product types gracefully
      - Chat interface must support file attachments and emoji
      - All features must degrade gracefully without JavaScript

  - name: "non_core_optional_logic"
    approx_loc: 250
    objectives: |
      • Implement advanced search algorithms and indexing
      • Build recommendation engine for related products
      • Create analytics tracking and reporting systems
      • Add automated marketing and notification features
    instructions: |
      LOGIC BATCH 4B - Advanced Features & Business Intelligence
      
      1. SEARCH & RECOMMENDATION ENGINE (100 LOC)
      - Create /lib/search/searchEngine.ts with fuzzy matching
      - Implement /lib/search/indexing.ts for product search indexing
      - Build /lib/recommendations/productRecommendations.ts for related products
      - Add /lib/recommendations/customerBehavior.ts for personalized suggestions
      
      2. ANALYTICS & TRACKING (100 LOC)
      - Create /lib/analytics/eventTracking.ts for user behavior tracking
      - Implement /lib/analytics/salesAnalytics.ts for business metrics
      - Build /lib/analytics/performanceMetrics.ts for site performance
      - Add /lib/analytics/reportGeneration.ts for automated reports
      
      3. MARKETING AUTOMATION (50 LOC)
      - Create /lib/marketing/emailCampaigns.ts for automated emails
      - Implement /lib/marketing/abandonedCart.ts for cart recovery
      - Build /lib/marketing/customerSegmentation.ts for targeted marketing
      
      TECHNICAL REQUIREMENTS:
      - Search indexing must update in real-time with product changes
      - Analytics must respect user privacy and comply with GDPR
      - Recommendation algorithms must avoid cold start problems
      - Marketing automation must include unsubscribe mechanisms
      - All tracking must be configurable and opt-out capable
      - Performance metrics must not impact site speed

implementation_guidance:
  planning: |
    • Start each batch by reviewing the previous batch's API contracts and ensuring compatibility
    • Create comprehensive TypeScript interfaces before implementation to define contracts between layers
    • Set up proper development environment with hot reloading, TypeScript checking, and linting
    • Plan database migrations carefully and test rollback procedures
    • Create example API requests/responses and component usage examples before coding
    • Define error handling patterns and user feedback mechanisms upfront
    • Establish testing strategy with unit tests for logic and integration tests for workflows
    
  coding: |
    • Follow strict separation of concerns: UI components should never contain business logic
    • Use custom hooks for all data fetching and state management logic
    • Implement comprehensive error boundaries and fallback UI states
    • Add loading states and skeleton screens for all async operations
    • Use TypeScript strict mode and resolve all type errors before proceeding
    • Implement proper form validation with both client and server-side checks
    • Add comprehensive logging for debugging and monitoring production issues
    • Follow React best practices: avoid prop drilling, use proper key props, optimize re-renders
    • Ensure all API endpoints return consistent response formats with proper HTTP status codes
    • Add proper database indexes for all queries and monitor performance
    
  debugging: |
    • Use React Developer Tools and browser DevTools for frontend debugging
    • Implement structured logging with different log levels (error, warn, info, debug)
    • Create debugging utilities for inspecting state and props in development
    • Use Supabase dashboard for monitoring database performance and queries
    • Implement health check endpoints for monitoring API availability
    • Add error tracking service integration for production error monitoring
    • Create debugging pages for testing individual components in isolation
    • Use proper TypeScript error messages and avoid 'any' types
    • Implement comprehensive error messages that help users recover from errors
    • Add database query logging in development to optimize performance