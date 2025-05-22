import { Product as BaseProduct } from '.';

export interface Product extends BaseProduct {
  variants?: ProductVariant[];
  images?: string[];
  features?: string[];
  stock: number;
  rating?: number;
  reviews?: number;
  isNew?: boolean;
  isFeatured?: boolean;
  slug: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  color: string;
  colorCode?: string;
  size: string;
  price: number;
  stock: number;
  imageUrl?: string;
}

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  isLoading?: boolean;
}

export interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  onAddToCart?: (product: Product) => void;
  emptyMessage?: string;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, variant: ProductVariant | null, quantity: number) => void;
  isLoading?: boolean;
}

export interface VariantSelectorProps {
  product: Product;
  selectedVariant: ProductVariant | null;
  onVariantChange: (variant: ProductVariant | null) => void;
  error?: string;
} 