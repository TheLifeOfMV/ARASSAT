'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CartDrawerProps } from '@/types/cart';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

const CartDrawer = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
  onCheckout,
  isLoading = false,
}: CartDrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  
  // Calculate cart totals
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const tax = subtotal * 0.07; // 7% tax
  const shipping = subtotal > 100 ? 0 : 12.99;
  const total = subtotal + tax + shipping;
  
  // Close drawer on escape key press
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);
  
  // Add overflow hidden to body when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  // Handle click outside drawer to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  if (typeof window === 'undefined') {
    return null; // Return null during SSR
  }
  
  return createPortal(
    <div 
      className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      {/* Overlay */}
      <div 
        className={`absolute inset-0 bg-primary-black/80 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Drawer Panel */}
      <div 
        ref={drawerRef}
        className={`w-full max-w-md bg-primary-black border-l border-border-color h-full shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-border-color flex items-center justify-between">
          <h2 
            id="cart-drawer-title" 
            className="text-xl font-semibold text-text-white flex items-center"
          >
            Your Cart
            {items.length > 0 && (
              <span className="inline-flex items-center justify-center ml-2 bg-accent-orange text-text-white text-xs font-semibold rounded-full h-5 min-w-5 px-1.5">
                {items.length}
              </span>
            )}
          </h2>
          
          <button
            onClick={onClose}
            className="text-text-gray hover:text-text-white transition-colors p-1"
            aria-label="Close cart"
          >
            <svg
              width="24"
              height="24"
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
        
        {/* Cart Content */}
        <div className="flex-grow overflow-auto p-4">
          {isLoading ? (
            <div className="space-y-4 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex py-4">
                  <div className="h-20 w-20 bg-charcoal-dark rounded"></div>
                  <div className="ml-4 flex-grow">
                    <div className="h-5 bg-charcoal-dark rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-charcoal-dark rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-charcoal-dark rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : items.length > 0 ? (
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemove}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <svg
                className="w-16 h-16 text-text-gray mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                ></path>
              </svg>
              <h3 className="text-lg font-medium text-text-white mb-2">Your cart is empty</h3>
              <p className="text-text-gray mb-6">Looks like you haven't added any products yet.</p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-accent-orange hover:bg-hover-orange text-text-white rounded-md transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
        
        {/* Cart Summary */}
        {(items.length > 0 || isLoading) && (
          <div className="p-4 border-t border-border-color">
            <CartSummary
              items={items}
              subtotal={subtotal}
              tax={tax}
              shipping={shipping}
              total={total}
              onCheckout={onCheckout}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default CartDrawer; 