'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProductDetailProps, ProductVariant } from '@/types/product';
import VariantSelector from './VariantSelector';

const ProductDetail = ({
  product,
  onAddToCart,
  isLoading = false,
}: ProductDetailProps) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [variantError, setVariantError] = useState<string>('');

  const allImages = [
    product.imageUrl,
    ...(product.images || []),
  ].filter(Boolean) as string[];

  // Handle variant change
  const handleVariantChange = (variant: ProductVariant | null) => {
    setSelectedVariant(variant);
    setVariantError('');
  };

  // Handle quantity change
  const handleQuantityChange = (newQuantity: number) => {
    const maxStock = selectedVariant 
      ? selectedVariant.stock 
      : product.stock;
    
    if (newQuantity < 1) {
      newQuantity = 1;
    } else if (newQuantity > maxStock) {
      newQuantity = maxStock;
    }
    
    setQuantity(newQuantity);
  };

  // Handle add to cart
  const handleAddToCart = () => {
    // Check if variants exist and one is selected
    if (product.variants && product.variants.length > 0 && !selectedVariant) {
      setVariantError('Please select color and size options');
      return;
    }
    
    onAddToCart(product, selectedVariant, quantity);
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
        <div className="aspect-square bg-charcoal-dark rounded-lg"></div>
        <div className="space-y-4">
          <div className="h-8 bg-charcoal-dark rounded w-3/4"></div>
          <div className="h-6 bg-charcoal-dark rounded w-1/4"></div>
          <div className="h-4 bg-charcoal-dark rounded w-full"></div>
          <div className="h-4 bg-charcoal-dark rounded w-full"></div>
          <div className="h-4 bg-charcoal-dark rounded w-2/3"></div>
          <div className="h-10 bg-charcoal-dark rounded w-full mt-8"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="relative aspect-square bg-charcoal-dark rounded-lg overflow-hidden">
          {allImages.length > 0 ? (
            <Image
              src={allImages[currentImageIndex]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex items-center justify-center h-full text-text-gray">
              No image available
            </div>
          )}
          
          {product.isNew && (
            <span className="absolute top-4 left-4 bg-accent-orange text-text-white text-sm font-medium px-2 py-1 rounded">
              New
            </span>
          )}
        </div>
        
        {/* Image thumbnails */}
        {allImages.length > 1 && (
          <div className="grid grid-cols-5 gap-2">
            {allImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative aspect-square bg-charcoal-dark rounded overflow-hidden border-2 transition-colors ${
                  currentImageIndex === index
                    ? 'border-accent-orange'
                    : 'border-transparent hover:border-accent-orange/50'
                }`}
                aria-label={`View image ${index + 1} of ${allImages.length}`}
              >
                <Image
                  src={image}
                  alt={`${product.name} - View ${index + 1}`}
                  fill
                  sizes="100px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Product Details */}
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-white">{product.name}</h1>
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <span className="text-accent-orange mr-1">★</span>
              <span className="text-text-light-gray">{product.rating || '4.5'}</span>
              <span className="text-text-gray mx-2">|</span>
              <span className="text-text-gray">{product.reviews || '12'} reviews</span>
            </div>
            
            <div className="text-text-gray text-sm">
              SKU: {selectedVariant?.id || product.id}
            </div>
          </div>
        </div>
        
        {/* Price */}
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-accent-orange">
            ${(selectedVariant?.price || product.price).toFixed(2)}
          </span>
          
          {selectedVariant && selectedVariant.price < product.price && (
            <span className="ml-2 text-text-gray line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
        
        {/* Description */}
        <div>
          <h2 className="text-lg font-semibold text-text-light-gray mb-2">Description</h2>
          <p className="text-text-gray">{product.description}</p>
        </div>
        
        {/* Variant Selection */}
        {product.variants && product.variants.length > 0 && (
          <VariantSelector
            product={product}
            selectedVariant={selectedVariant}
            onVariantChange={handleVariantChange}
            error={variantError}
          />
        )}
        
        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-text-light-gray mb-2">Features</h2>
            <ul className="list-disc list-inside space-y-1 text-text-gray">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Add to Cart */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          {/* Quantity selector */}
          <div className="flex h-12 border border-border-color rounded-md overflow-hidden">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              className="w-12 flex items-center justify-center text-text-white bg-card-bg hover:bg-charcoal-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Decrease quantity"
            >
              <svg
                width="16"
                height="2"
                viewBox="0 0 16 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 1H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            
            <input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              min="1"
              max={selectedVariant ? selectedVariant.stock : product.stock}
              className="w-16 text-center bg-card-bg text-text-white border-x border-border-color"
              aria-label="Quantity"
            />
            
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= (selectedVariant ? selectedVariant.stock : product.stock)}
              className="w-12 flex items-center justify-center text-text-white bg-card-bg hover:bg-charcoal-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Increase quantity"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 1V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M1 8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          
          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            className="flex-1 h-12 bg-accent-orange hover:bg-hover-orange text-text-white font-semibold rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent-orange focus:ring-opacity-50"
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
        </div>
        
        {/* Stock info */}
        <div className="text-sm">
          {((selectedVariant && selectedVariant.stock > 0) || (!selectedVariant && product.stock > 0)) ? (
            <span className="text-success flex items-center">
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
              {selectedVariant && selectedVariant.stock <= 5 && (
                <span className="ml-1 text-warning">
                  (Only {selectedVariant.stock} left)
                </span>
              )}
              {!selectedVariant && product.stock <= 5 && (
                <span className="ml-1 text-warning">
                  (Only {product.stock} left)
                </span>
              )}
            </span>
          ) : (
            <span className="text-error flex items-center">
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
            </span>
          )}
        </div>
        
        {/* Categories */}
        <div className="text-sm text-text-gray">
          Category: <span className="text-text-light-gray">{product.category}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 