'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ProductCardProps } from '@/types/product';

const ProductCard = ({ product, onAddToCart, isLoading = false }: ProductCardProps) => {
  if (isLoading) {
    return (
      <div className="bg-card-bg border border-border-color rounded-xl overflow-hidden transition-transform duration-300 ease-in-out animate-pulse">
        <div className="h-[200px] bg-charcoal-dark"></div>
        <div className="p-4">
          <div className="h-6 bg-charcoal-dark rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-charcoal-dark rounded w-1/2 mb-3"></div>
          <div className="h-6 bg-charcoal-dark rounded w-1/4 mb-3"></div>
          <div className="h-10 bg-charcoal-dark rounded w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card-bg border border-border-color rounded-xl overflow-hidden transition-transform duration-300 ease-in-out hover:transform hover:scale-105 hover:shadow-lg">
      <Link href={`/products/${product.slug}`} className="block relative">
        <div className="relative h-[200px] w-full bg-charcoal-dark overflow-hidden">
          {product.imageUrl ? (
            <Image 
              src={product.imageUrl} 
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 hover:scale-105"
              priority={product.isFeatured}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-text-gray">
              No image available
            </div>
          )}
          
          {product.isNew && (
            <span className="absolute top-2 left-2 bg-accent-orange text-text-white text-xs font-medium px-2 py-1 rounded">
              New
            </span>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <Link href={`/products/${product.slug}`} className="block">
              <h3 className="text-lg font-semibold text-text-white mb-1 hover:text-accent-orange transition-colors">
                {product.name}
              </h3>
            </Link>
            <p className="text-sm text-text-gray mb-2">{product.category}</p>
          </div>
          
          {product.rating && (
            <div className="flex items-center">
              <span className="text-accent-orange">★</span>
              <span className="text-sm text-text-light-gray ml-1">{product.rating}</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <span className="text-xl font-bold text-accent-orange">
            ${product.price.toFixed(2)}
          </span>
          
          <button
            onClick={() => onAddToCart && onAddToCart(product)}
            className="bg-accent-orange hover:bg-hover-orange text-text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
            aria-label={`Añadir ${product.name} al carrito`}
          >
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 