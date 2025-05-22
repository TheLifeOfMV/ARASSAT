import { CartItem as BaseCartItem } from '.';
import { Product } from './product';
import { ProductVariant } from './product';

export interface CartItem extends BaseCartItem {
  variant?: ProductVariant;
  id: string;
  price: number;
  totalPrice: number;
  imageUrl: string;
}

export interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export interface CartSummaryProps {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  onCheckout: () => void;
  isLoading?: boolean;
}

export interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
  isLoading?: boolean;
} 