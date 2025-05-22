# Layout Components

This directory contains the core layout components for the ARASSAT e-commerce application.

## Components

### Layout

The main layout wrapper that includes the Navbar and Footer.

```tsx
import { Layout } from '@/components/layout';

export default function Page() {
  return (
    <Layout title="Page Title" description="Page description for SEO">
      <div>Your page content here</div>
    </Layout>
  );
}
```

#### Props

- `children`: React nodes to be rendered within the layout
- `title` (optional): Page title for SEO (will be appended with site name)
- `description` (optional): Page description for SEO

### Navbar

The top navigation bar with responsive design and mobile menu toggle.

```tsx
import { Navbar } from '@/components/layout';

// Can be used standalone if needed
<Navbar logo="Custom Logo" cartItemsCount={3} />
```

#### Props

- `logo` (optional): Custom logo text (defaults to site name)
- `cartItemsCount` (optional): Number of items in cart to display badge

### Footer

The site footer with company information, quick links, and legal links.

```tsx
import { Footer } from '@/components/layout';

// Can be used standalone if needed
<Footer companyName="Custom Name" year={2024} />
```

#### Props

- `companyName` (optional): Custom company name (defaults to site name)
- `year` (optional): Copyright year (defaults to current year)

### MobileMenu

The slide-out mobile navigation menu (used internally by Navbar).

```tsx
import { MobileMenu } from '@/components/layout';

// Can be used standalone if needed
<MobileMenu isOpen={isMenuOpen} onClose={handleCloseMenu} />
```

#### Props

- `isOpen`: Boolean to control menu visibility
- `onClose`: Function to call when menu should close

## Features

- Fully responsive design with mobile-first approach
- Accessible navigation with keyboard support
- Semantic HTML structure
- Consistent styling using Tailwind CSS
- Dark theme based on the premium equestrian style guide
- Smooth animations and transitions

## Usage

The recommended way to use these components is to import the `Layout` component in your page files and place your content inside it. The `Layout` component will automatically include the `Navbar` and `Footer`.

For custom layouts where you need more control, you can import the individual components. 