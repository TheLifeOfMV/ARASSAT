# ARASSAT E-commerce Components

This directory contains the product and cart components for the ARASSAT e-commerce platform.

## Product Components

### ProductCard

A card component for displaying product information in a grid or list.

**Features:**
- Responsive design
- Loading skeleton state
- Image optimization with Next.js Image
- "New" badge for new products
- Rating display
- "Add to Cart" button

### ProductGrid

A responsive grid for displaying multiple product cards with pagination.

**Features:**
- Responsive grid layout (1-4 columns based on screen size)
- Pagination controls
- Loading skeleton state
- Empty state handling

### ProductDetail

A detailed product view with image gallery, variant selection, and add to cart functionality.

**Features:**
- Image gallery with thumbnails
- Variant selection (color, size)
- Quantity selector
- Stock level indicators
- Add to cart button

### VariantSelector

A component for selecting product variants (color, size).

**Features:**
- Color selection with visual swatches
- Size selection
- Availability indicators
- Validation for combinations

## Cart Components

### CartItem

A component for displaying a single item in the cart.

**Features:**
- Product image
- Product details (name, variant)
- Quantity controls
- Remove button
- Price calculation

### CartSummary

A component for displaying cart totals and checkout button.

**Features:**
- Subtotal calculation
- Tax calculation
- Shipping calculation with free shipping threshold
- Total calculation
- Checkout button
- Payment methods display

### CartDrawer

A sliding drawer for displaying the cart contents.

**Features:**
- Slide-in animation
- Overlay background
- Close on escape key
- Close on outside click
- Empty state handling
- Responsive design

## Usage

1. Import the components:
   ```tsx
   import { ProductCard, ProductGrid, ProductDetail } from '@/components/products';
   import { CartItem, CartSummary, CartDrawer } from '@/components/cart';
   ```

2. Use the components with the required props. See the TypeScript interfaces in the `src/types` directory for detailed prop requirements.

3. Test the components by visiting the `/test-components` page.

## Testing

Manual test scripts are available in `src/tests/components-test.ts`. These scripts describe the expected behavior and testing steps for each component.

To run the tests:
1. Visit `/test-components` in your browser
2. Follow the steps in the test scripts
3. Verify the expected results 