'use client';

import { useState } from 'react';
import ProductCard from './products/ProductCard';
import ProductGrid from './products/ProductGrid';
import ProductDetail from './products/ProductDetail';
import CartDrawer from './cart/CartDrawer';
import { Product, ProductVariant } from '@/types/product';
import { CartItem } from '@/types/cart';

// Sample data
const sampleProduct: Product = {
  id: '1',
  name: 'Aperos Premium',
  description: 'Aperos Premium para caballos y jinetes. Made with premium materials for maximum comfort and durability.',
  price: 54.99,
  imageUrl: 'https://images.unsplash.com/photo-1566751059906-44fd15fa5b31?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  category: 'Protección',
  stock: 15,
  rating: 4.8,
  reviews: 24,
  isNew: true,
  isFeatured: true,
  slug: 'premium-horse-boot s',
  features: [
    'Material Premium',
    'Padding Premium',
    'Cinturones ajustables',
    'Diseño respirable',
    'Resistente al agua'
  ],
  variants: [
    {
      id: '1-1',
      productId: '1',
      color: 'Black',
      colorCode: '#000000',
      size: 'S',
      price: 54.99,
      stock: 5,
    },
    {
      id: '1-2',
      productId: '1',
      color: 'Black',
      colorCode: '#000000',
      size: 'M',
      price: 54.99,
      stock: 3,
    },
    {
      id: '1-3',
      productId: '1',
      color: 'Black',
      colorCode: '#000000',
      size: 'L',
      price: 59.99,
      stock: 7,
    },
    {
      id: '1-4',
      productId: '1',
      color: 'Brown',
      colorCode: '#8B4513',
      size: 'S',
      price: 54.99,
      stock: 0,
    },
    {
      id: '1-5',
      productId: '1',
      color: 'Brown',
      colorCode: '#8B4513',
      size: 'M',
      price: 54.99,
      stock: 10,
    },
    {
      id: '1-6',
      productId: '1',
      color: 'Brown',
      colorCode: '#8B4513',
      size: 'L',
      price: 59.99,
      stock: 8,
    }
  ],
  images: [
    'https://images.unsplash.com/photo-1566751059906-44fd15fa5b31?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1508343919546-4a5792fee935?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  ]
};

const sampleProducts: Product[] = [
  sampleProduct,
  {
    ...sampleProduct,
    id: '2',
    name: 'Soporte para Fetlock',
    description: 'Sistema de soporte avanzado para fetlock de caballos.',
    price: 42.99,
    imageUrl: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    isNew: false,
    slug: 'soporte-para-fetlock',
    stock: 8
  },
  {
    ...sampleProduct,
    id: '3',
    name: 'Equipo de Aperos Profesionales',
    description: 'Equipo completo de aperos para profesionales.',
    price: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1508343919546-4a5792fee935?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    isNew: true,
    slug: 'equipo-de-aperos-profesionales',
    stock: 3
  },
  {
    ...sampleProduct,
    id: '4',
    name: 'Cascos de Jinete',
    description: 'Seguridad primero con nuestro casco de jinete premium.',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    isNew: false,
    slug: 'cascos-de-jinete',
    stock: 12
  }
];

export default function TestComponents() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Add to cart function
  const handleAddToCart = (product: Product, variant: ProductVariant | null, quantity: number = 1) => {
    const newItem: CartItem = {
      id: variant ? `${product.id}-${variant.id}` : product.id,
      productId: product.id,
      product,
      variant: variant || undefined,
      quantity,
      price: variant ? variant.price : product.price,
      totalPrice: (variant ? variant.price : product.price) * quantity,
      imageUrl: product.imageUrl
    };
    
    setCartItems((prevItems) => {
      // Check if item already exists
      const existingItemIndex = prevItems.findIndex(item => item.id === newItem.id);
      
      if (existingItemIndex !== -1) {
        // Update existing item
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingItemIndex];
        const newQuantity = existingItem.quantity + quantity;
        
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: newQuantity,
          totalPrice: (variant ? variant.price : product.price) * newQuantity
        };
        
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, newItem];
      }
    });
    
    setIsCartOpen(true);
  };
  
  // Update quantity function
  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity,
            totalPrice: item.price * quantity
          };
        }
        return item;
      });
    });
  };
  
  // Remove item function
  const handleRemoveItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  
  // Checkout function
  const handleCheckout = () => {
    alert(`Proceeding to checkout with ${cartItems.length} items!`);
    // In a real app, this would navigate to the checkout page
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-primary-black min-h-screen text-text-white">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-accent-orange mb-2">Component Test Page</h1>
        <p className="text-text-gray mb-4">This page showcases the implemented components for product and cart functionality.</p>
        
        <button 
          onClick={() => setIsCartOpen(true)}
          className="bg-accent-orange hover:bg-hover-orange text-text-white px-4 py-2 rounded-md flex items-center"
        >
          <svg 
            className="w-5 h-5 mr-2" 
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
          View Cart ({cartItems.length})
        </button>
      </header>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-text-light-gray mb-6">Product Card</h2>
        <div className="max-w-xs">
          <ProductCard 
            product={sampleProduct}
            onAddToCart={(product) => handleAddToCart(product, null, 1)}
          />
        </div>
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-text-light-gray mb-6">Product Grid</h2>
        <ProductGrid 
          products={sampleProducts}
          onAddToCart={(product) => handleAddToCart(product, null, 1)}
          currentPage={currentPage}
          totalPages={3}
          onPageChange={setCurrentPage}
        />
      </section>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-text-light-gray mb-6">Product Detail</h2>
        <ProductDetail 
          product={sampleProduct}
          onAddToCart={handleAddToCart}
        />
      </section>
      
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
} 