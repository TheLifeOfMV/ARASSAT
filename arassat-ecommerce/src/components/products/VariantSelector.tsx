'use client';

import { useState, useEffect } from 'react';
import { VariantSelectorProps, ProductVariant } from '@/types/product';

const VariantSelector = ({
  product,
  selectedVariant,
  onVariantChange,
  error,
}: VariantSelectorProps) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(
    selectedVariant?.color || null
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(
    selectedVariant?.size || null
  );

  // Extract unique colors and sizes from variants
  const colors = product.variants
    ? [...new Set(product.variants.map((v) => v.color))]
    : [];
  
  const sizes = product.variants
    ? [...new Set(product.variants.map((v) => v.size))]
    : [];

  // Get available sizes for selected color
  const availableSizes = selectedColor
    ? product.variants
        ?.filter((v) => v.color === selectedColor && v.stock > 0)
        .map((v) => v.size) || []
    : [];

  // Get available colors for selected size
  const availableColors = selectedSize
    ? product.variants
        ?.filter((v) => v.size === selectedSize && v.stock > 0)
        .map((v) => v.color) || []
    : [];

  // Find variant based on selected color and size
  useEffect(() => {
    if (selectedColor && selectedSize && product.variants) {
      const variant = product.variants.find(
        (v) => v.color === selectedColor && v.size === selectedSize
      );
      onVariantChange(variant || null);
    } else if ((!selectedColor || !selectedSize) && selectedVariant) {
      // Reset if selections don't match anymore
      onVariantChange(null);
    }
  }, [selectedColor, selectedSize, product.variants, onVariantChange, selectedVariant]);

  // Handle color selection
  const handleColorChange = (color: string) => {
    if (selectedColor === color) {
      setSelectedColor(null);
      return;
    }
    
    setSelectedColor(color);
    
    // If selected size is no longer available with this color, reset it
    if (
      selectedSize &&
      !product.variants?.some(
        (v) => v.color === color && v.size === selectedSize && v.stock > 0
      )
    ) {
      setSelectedSize(null);
    }
  };

  // Handle size selection
  const handleSizeChange = (size: string) => {
    if (selectedSize === size) {
      setSelectedSize(null);
      return;
    }
    
    setSelectedSize(size);
    
    // If selected color is no longer available with this size, reset it
    if (
      selectedColor &&
      !product.variants?.some(
        (v) => v.size === size && v.color === selectedColor && v.stock > 0
      )
    ) {
      setSelectedColor(null);
    }
  };

  // Check if a color-size combination is available (in stock)
  const isVariantAvailable = (color: string, size: string): boolean => {
    return !!product.variants?.some(
      (v) => v.color === color && v.size === size && v.stock > 0
    );
  };

  // Get stock level for a specific variant
  const getVariantStock = (color: string, size: string): number => {
    return (
      product.variants?.find((v) => v.color === color && v.size === size)?.stock || 0
    );
  };

  if (!product.variants || product.variants.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Color selector */}
      <div>
        <h3 className="text-text-light-gray font-medium mb-3">Color</h3>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => {
            const isAvailable = selectedSize
              ? availableColors.includes(color)
              : product.variants?.some((v) => v.color === color && v.stock > 0);
            
            const isActive = selectedColor === color;
            
            return (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                disabled={!isAvailable}
                className={`w-10 h-10 rounded-full relative flex items-center justify-center border-2 transition-all duration-300 ${
                  isActive
                    ? 'border-accent-orange ring-2 ring-accent-orange ring-opacity-50'
                    : 'border-border-color'
                } ${
                  !isAvailable
                    ? 'opacity-30 cursor-not-allowed'
                    : 'cursor-pointer hover:border-accent-orange'
                }`}
                aria-label={`Select color: ${color}`}
                aria-pressed={isActive}
              >
                <span 
                  className="w-8 h-8 rounded-full block"
                  style={{ 
                    backgroundColor: product.variants?.find(v => v.color === color)?.colorCode || color,
                    backgroundImage: !product.variants?.find(v => v.color === color)?.colorCode ? 
                      'linear-gradient(45deg, #333 25%, transparent 25%, transparent 75%, #333 75%), linear-gradient(45deg, #333 25%, transparent 25%, transparent 75%, #333 75%)' : 
                      undefined,
                    backgroundSize: '16px 16px',
                    backgroundPosition: '0 0, 8px 8px',
                  }}
                ></span>
                {isActive && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-white stroke-2"
                    >
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {selectedColor && (
          <p className="mt-2 text-sm text-text-gray">
            Selected: {selectedColor}
          </p>
        )}
      </div>

      {/* Size selector */}
      <div>
        <h3 className="text-text-light-gray font-medium mb-3">Size</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => {
            const isAvailable = selectedColor
              ? availableSizes.includes(size)
              : product.variants?.some((v) => v.size === size && v.stock > 0);
            
            const isActive = selectedSize === size;
            
            const stockLevel = selectedColor
              ? product.variants?.find(
                  (v) => v.color === selectedColor && v.size === size
                )?.stock || 0
              : 0;
            
            return (
              <button
                key={size}
                onClick={() => handleSizeChange(size)}
                disabled={!isAvailable}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-accent-orange text-text-white'
                    : 'bg-card-bg text-text-white'
                } ${
                  !isAvailable
                    ? 'opacity-30 cursor-not-allowed'
                    : 'cursor-pointer hover:bg-charcoal-dark'
                }`}
                aria-label={`Select size: ${size}`}
                aria-pressed={isActive}
              >
                {size}
                {selectedColor && stockLevel > 0 && stockLevel <= 5 && (
                  <span className="ml-1 text-xs text-warning">
                    ({stockLevel})
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {selectedSize && (
          <p className="mt-2 text-sm text-text-gray">
            Selected: {selectedSize}
          </p>
        )}
      </div>

      {/* Availability indicator */}
      {selectedColor && selectedSize && (
        <div>
          {isVariantAvailable(selectedColor, selectedSize) ? (
            <p className="text-sm text-success flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              In Stock
              {getVariantStock(selectedColor, selectedSize) <= 5 && (
                <span className="ml-1 text-warning">
                  (Only {getVariantStock(selectedColor, selectedSize)} left)
                </span>
              )}
            </p>
          ) : (
            <p className="text-sm text-error flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
              Out of Stock
            </p>
          )}
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="text-sm text-error mt-2">{error}</p>
      )}
    </div>
  );
};

export default VariantSelector; 