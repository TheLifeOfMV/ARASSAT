'use client';

import { ProductGridProps } from '@/types/product';
import ProductCard from './ProductCard';

const ProductGrid = ({
  products,
  isLoading = false,
  onAddToCart,
  emptyMessage = 'No products found',
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}: ProductGridProps) => {
  // Generate skeleton cards for loading state
  const skeletons = Array.from({ length: 6 }, (_, index) => (
    <ProductCard
      key={`skeleton-${index}`}
      product={{ id: `loading-${index}`, name: '', description: '', price: 0, imageUrl: '', category: '', stock: 0, slug: '' }}
      isLoading={true}
    />
  ));

  // Render pagination controls if there are multiple pages
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center items-center mt-8 space-x-2">
        <button
          onClick={() => onPageChange && onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`px-4 py-2 rounded-md border border-border-color transition-colors duration-300 ${
            currentPage <= 1
              ? 'bg-charcoal-dark text-text-gray cursor-not-allowed'
              : 'bg-card-bg text-text-white hover:border-accent-orange'
          }`}
          aria-label="Previous page"
        >
          &larr;
        </button>
        
        <div className="flex space-x-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={`page-${page}`}
              onClick={() => onPageChange && onPageChange(page)}
              className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors duration-300 ${
                currentPage === page
                  ? 'bg-accent-orange text-text-white'
                  : 'bg-card-bg text-text-white hover:bg-charcoal-dark'
              }`}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          ))}
        </div>
        
        <button
          onClick={() => onPageChange && onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={`px-4 py-2 rounded-md border border-border-color transition-colors duration-300 ${
            currentPage >= totalPages
              ? 'bg-charcoal-dark text-text-gray cursor-not-allowed'
              : 'bg-card-bg text-text-white hover:border-accent-orange'
          }`}
          aria-label="Next page"
        >
          &rarr;
        </button>
      </div>
    );
  };

  return (
    <div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading
          ? skeletons
          : products.length > 0
          ? products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))
          : null}
      </div>

      {/* Empty state message */}
      {!isLoading && products.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
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
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <p className="text-lg text-text-light-gray">{emptyMessage}</p>
        </div>
      )}

      {/* Pagination */}
      {!isLoading && products.length > 0 && renderPagination()}
    </div>
  );
};

export default ProductGrid; 