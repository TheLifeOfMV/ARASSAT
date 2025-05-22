'use client';

import { CartSummaryProps } from '@/types/cart';

const CartSummary = ({
  items,
  subtotal,
  tax,
  shipping,
  total,
  onCheckout,
  isLoading = false,
}: CartSummaryProps) => {
  if (isLoading) {
    return (
      <div className="bg-card-bg border border-border-color rounded-lg p-6 animate-pulse">
        <div className="h-6 bg-charcoal-dark rounded w-1/2 mb-6"></div>
        <div className="space-y-4">
          <div className="flex justify-between">
            <div className="h-4 bg-charcoal-dark rounded w-1/4"></div>
            <div className="h-4 bg-charcoal-dark rounded w-1/4"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-4 bg-charcoal-dark rounded w-1/4"></div>
            <div className="h-4 bg-charcoal-dark rounded w-1/4"></div>
          </div>
          <div className="flex justify-between">
            <div className="h-4 bg-charcoal-dark rounded w-1/4"></div>
            <div className="h-4 bg-charcoal-dark rounded w-1/4"></div>
          </div>
          <div className="border-t border-border-color my-4"></div>
          <div className="flex justify-between">
            <div className="h-5 bg-charcoal-dark rounded w-1/4"></div>
            <div className="h-5 bg-charcoal-dark rounded w-1/4"></div>
          </div>
        </div>
        <div className="h-12 bg-charcoal-dark rounded w-full mt-6"></div>
      </div>
    );
  }

  return (
    <div className="bg-card-bg border border-border-color rounded-lg p-6">
      <h2 className="text-xl font-semibold text-text-white mb-6">Order Summary</h2>
      
      {items.length === 0 ? (
        <div className="text-center py-4">
          <p className="text-text-gray">Your cart is empty</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-text-gray">Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})</span>
            <span className="text-text-white">${subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-text-gray">Tax</span>
            <span className="text-text-white">${tax.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-text-gray">Shipping</span>
            <span className="text-text-white">
              {shipping === 0 ? (
                <span className="text-success">Free</span>
              ) : (
                `$${shipping.toFixed(2)}`
              )}
            </span>
          </div>
          
          {shipping === 0 && subtotal < 100 && (
            <div className="text-sm text-text-gray flex items-center mt-1">
              <div className="w-full bg-border-color h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-accent-orange h-full" 
                  style={{ width: `${Math.min(100, (subtotal / 100) * 100)}%` }}
                ></div>
              </div>
              <span className="ml-2 whitespace-nowrap">
                ${(100 - subtotal).toFixed(2)} away from free shipping
              </span>
            </div>
          )}
          
          <div className="border-t border-border-color my-4"></div>
          
          <div className="flex justify-between font-semibold">
            <span className="text-text-light-gray">Total</span>
            <span className="text-accent-orange text-xl">${total.toFixed(2)}</span>
          </div>
        </div>
      )}
      
      <button
        onClick={onCheckout}
        disabled={items.length === 0}
        className={`w-full h-12 mt-6 rounded-md font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent-orange focus:ring-opacity-50 ${
          items.length === 0
            ? 'bg-charcoal-dark text-text-gray cursor-not-allowed'
            : 'bg-accent-orange hover:bg-hover-orange text-text-white'
        }`}
      >
        {items.length === 0 ? 'Cart is Empty' : 'Proceed to Checkout'}
      </button>
      
      {items.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center justify-center space-x-4">
            <div className="w-10 h-5">
              <svg viewBox="0 0 38 24" width="38" height="24" role="img" aria-labelledby="pi-visa">
                <title id="pi-visa">Visa</title>
                <path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path>
                <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path>
                <path d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z" fill="#142688"></path>
              </svg>
            </div>
            <div className="w-10 h-5">
              <svg viewBox="0 0 38 24" width="38" height="24" role="img" aria-labelledby="pi-master">
                <title id="pi-master">Mastercard</title>
                <path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path>
                <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path>
                <circle fill="#EB001B" cx="15" cy="12" r="7"></circle>
                <circle fill="#F79E1B" cx="23" cy="12" r="7"></circle>
                <path fill="#FF5F00" d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"></path>
              </svg>
            </div>
            <div className="w-10 h-5">
              <svg viewBox="0 0 38 24" width="38" height="24" role="img" aria-labelledby="pi-amex">
                <title id="pi-amex">American Express</title>
                <path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path>
                <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path>
                <path d="M20.4 12.1v-2.3h3.9v2.3h.9v-5.8h-.9v2.4h-3.9V6.3h-.9v5.8h.9zm7.7 0V9.4l2.1 2.7h1.1V6.3h-.8v2.3l-1.9-2.3h-1.2v5.8h.7zm-14.1 0v-5h2.6c.9 0 1.5.4 1.5 1.2 0 .6-.3.9-.9 1l1 2.8h-1l-.9-2.7h-1.3v2.7h-1zm1-3.5h1.1c.4 0 .7-.2.7-.6 0-.4-.3-.5-.7-.5h-1.1v1.1zm-7.1 3.5l3-5.8h-1.1l-1.8 3.8-1.8-3.8H4.1l2.9 5.8h1zm-5.2 0v-1h3.3v-1.1H2.6v-1.1h3.5V8H1.7v4.1h3.9v-1.1H2.7v-.9h4.1z" fill="#006FCF"></path>
              </svg>
            </div>
          </div>
          <p className="text-center text-sm text-text-gray mt-2">
            Secure payment processing
          </p>
        </div>
      )}
    </div>
  );
};

export default CartSummary; 