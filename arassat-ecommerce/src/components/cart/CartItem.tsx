'use client';

import Image from 'next/image';
import { CartItemProps } from '@/types/cart';
import { Product } from '@/types/product';

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      return;
    }
    
    const availableStock = item.variant
      ? item.variant.stock
      : (item.product as Product & { stock: number }).stock;
      
    if (newQuantity > availableStock) {
      newQuantity = availableStock;
    }
    
    onUpdateQuantity(item.id, newQuantity);
  };

  return (
    <div className="flex py-4 border-b border-border-color">
      {/* Product Image */}
      <div className="relative h-20 w-20 bg-charcoal-dark rounded overflow-hidden flex-shrink-0">
        <Image
          src={item.imageUrl}
          alt={item.product.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>
      
      {/* Product Info */}
      <div className="ml-4 flex-grow">
        <div className="flex justify-between">
          <div>
            <h3 className="text-text-white font-medium">
              {item.product.name}
            </h3>
            
            {item.variant && (
              <p className="text-sm text-text-gray">
                {item.variant.color}, {item.variant.size}
              </p>
            )}
          </div>
          
          <button
            onClick={() => onRemove(item.id)}
            className="text-text-gray hover:text-error transition-colors"
            aria-label={`Remove ${item.product.name} from cart`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Price and Quantity */}
        <div className="flex justify-between items-center mt-2">
          <div className="text-accent-orange font-semibold">
            ${item.price.toFixed(2)}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="w-6 h-6 flex items-center justify-center rounded bg-card-bg hover:bg-charcoal-dark text-text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Decrease quantity"
            >
              <svg
                width="10"
                height="2"
                viewBox="0 0 10 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 1H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            
            <span className="text-text-white w-6 text-center">
              {item.quantity}
            </span>
            
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={item.quantity >= (item.variant ? item.variant.stock : (item.product as Product & { stock: number }).stock)}
              className="w-6 h-6 flex items-center justify-center rounded bg-card-bg hover:bg-charcoal-dark text-text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Increase quantity"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5 1V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M1 5H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Total Price */}
        <div className="mt-1 text-right text-sm text-text-gray">
          Total: <span className="text-text-light-gray">${item.totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartItem; 