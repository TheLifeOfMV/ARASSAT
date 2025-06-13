'use client';

import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout';
import ProductCard from '@/components/products/ProductCard';
import { Product } from '@/types/product';

// Expanded products data - 8 products for carousel (2 sets of 4)
const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Silla Chaparral Grabada',
    description: 'Silla artesanal con grabados únicos y diseño premium',
    price: 3150000.00,
    imageUrl: '/images/product-placeholder.svg',
    category: 'Montura',
    stock: 5,
    rating: 4.9,
    reviews: 12,
    isNew: false,
    isFeatured: true,
    slug: 'silla-chaparral-grabada',
    features: ['Cuero premium', 'Grabados artesanales', 'Comfort superior'],
    variants: [],
    images: ['/images/product-placeholder.svg']
  },
  {
    id: '2',
    name: 'Apero Grillo 3.0',
    description: 'Sistema de apero moderno con tecnología avanzada',
    price: 550000.00,
    imageUrl: '/images/product-placeholder.svg',
    category: 'Aperos',
    stock: 8,
    rating: 4.7,
    reviews: 18,
    isNew: true,
    isFeatured: true,
    slug: 'apero-grillo-3',
    features: ['Tecnología 3.0', 'Materiales resistentes', 'Fácil instalación'],
    variants: [],
    images: ['/images/product-placeholder.svg']
  },
  {
    id: '3',
    name: 'Apero Raucas',
    description: 'Apero tradicional con acabados modernos',
    price: 550000.00,
    imageUrl: '/images/product-placeholder.svg',
    category: 'Aperos',
    stock: 12,
    rating: 4.8,
    reviews: 25,
    isNew: false,
    isFeatured: true,
    slug: 'apero-raucas',
    features: ['Diseño tradicional', 'Calidad garantizada', 'Durabilidad extrema'],
    variants: [],
    images: ['/images/product-placeholder.svg']
  },
  {
    id: '4',
    name: 'Freno Vaquero Elite',
    description: 'Freno profesional para competencias de alto nivel',
    price: 850000.00,
    imageUrl: '/images/product-placeholder.svg',
    category: 'Frenos',
    stock: 6,
    rating: 4.6,
    reviews: 14,
    isNew: false,
    isFeatured: true,
    slug: 'freno-vaquero-elite',
    features: ['Acero inoxidable', 'Diseño ergonómico', 'Control preciso'],
    variants: [],
    images: ['/images/product-placeholder.svg']
  },
  {
    id: '5',
    name: 'Espuelas Artesanales',
    description: 'Espuelas hechas a mano con detalles únicos',
    price: 450000.00,
    imageUrl: '/images/product-placeholder.svg',
    category: 'Espuelas',
    stock: 10,
    rating: 4.8,
    reviews: 22,
    isNew: true,
    isFeatured: true,
    slug: 'espuelas-artesanales',
    features: ['Trabajo artesanal', 'Metales nobles', 'Diseño exclusivo'],
    variants: [],
    images: ['/images/product-placeholder.svg']
  },
  {
    id: '6',
    name: 'Cabezada Completa Premium',
    description: 'Sistema completo de cabezada con herrajes de lujo',
    price: 1200000.00,
    imageUrl: '/images/product-placeholder.svg',
    category: 'Cabezadas',
    stock: 4,
    rating: 4.9,
    reviews: 8,
    isNew: false,
    isFeatured: true,
    slug: 'cabezada-completa-premium',
    features: ['Cuero italiano', 'Herrajes dorados', 'Ajuste perfecto'],
    variants: [],
    images: ['/images/product-placeholder.svg']
  },
  {
    id: '7',
    name: 'Riendas Trenzadas Pro',
    description: 'Riendas profesionales trenzadas a mano',
    price: 320000.00,
    imageUrl: '/images/product-placeholder.svg',
    category: 'Riendas',
    stock: 15,
    rating: 4.7,
    reviews: 31,
    isNew: true,
    isFeatured: true,
    slug: 'riendas-trenzadas-pro',
    features: ['Trenzado manual', 'Cuero resistente', 'Grip superior'],
    variants: [],
    images: ['/images/product-placeholder.svg']
  },
  {
    id: '8',
    name: 'Estribos Plateados Deluxe',
    description: 'Estribos de lujo con acabado plateado y diseño ergonómico',
    price: 680000.00,
    imageUrl: '/images/product-placeholder.svg',
    category: 'Estribos',
    stock: 7,
    rating: 4.5,
    reviews: 16,
    isNew: false,
    isFeatured: true,
    slug: 'estribos-plateados-deluxe',
    features: ['Acabado plateado', 'Diseño ergonómico', 'Máxima seguridad'],
    variants: [],
    images: ['/images/product-placeholder.svg']
  }
];

// Custom SVG Icons
const InstagramIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const WhatsAppIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.484 3.488"/>
  </svg>
);

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      const newIsMobile = window.innerWidth < 768;
      setIsMobile(newIsMobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const productsPerSlide = isMobile ? 1 : 4;
  const totalSlides = Math.ceil(featuredProducts.length / productsPerSlide);

  // Reset currentSlide if it's out of bounds when switching modes
  useEffect(() => {
    if (currentSlide >= totalSlides) {
      setCurrentSlide(0);
    }
  }, [totalSlides, currentSlide]);

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  const getCurrentProducts = () => {
    const startIndex = currentSlide * productsPerSlide;
    return featuredProducts.slice(startIndex, startIndex + productsPerSlide);
  };

  const handleAddToCart = (product: Product) => {
    // Placeholder function - implement cart logic
    console.log('Added to cart:', product.name);
  };

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/aperosarassat/', '_blank');
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/573205842664', '_blank');
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <Layout title="Home" description="Bienvenidos a ARASSAT - Tienda de aperos Premium" customBackground={true}>
      {/* Hero Section with Background Image */}
      <div 
        className="relative w-full bg-no-repeat bg-center flex flex-col justify-center"
        style={{
          backgroundImage: `url('/Arassat homepage.png')`,
          backgroundSize: 'cover',
          height: '100vh',
          minHeight: '600px',
        }}
      >
        {/* Opacity Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        {/* Content Container */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between py-8 lg:py-12 px-4 lg:px-8">
          {/* Text Content */}
          <div className="w-full lg:flex-1 lg:pl-12 text-center lg:text-left order-1 lg:order-2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Bienvenidos a <span className="text-accent-orange">ARASSAT</span>
            </h1>
            <p className="text-white text-base md:text-lg mb-6 max-w-xl mx-auto lg:mx-0 drop-shadow-md">
              Los caballos son nuestra pasión. Los aperos, nuestra forma de honrarlos con elegancia, tradición y excelencia. Descubre nuestra colección de productos de alta calidad
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
              <button className="bg-accent-orange hover:bg-hover-orange text-white px-6 py-3 rounded-md transition-colors duration-300 text-base font-semibold shadow-lg">
                Comprar Ahora
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-black px-6 py-3 rounded-md transition-colors duration-300 text-base font-semibold backdrop-blur-sm bg-white/10">
                Más Información
              </button>
            </div>
            
            {/* Social Media Buttons */}
            <div className="flex justify-center lg:justify-start space-x-4">
              <p className="text-white text-sm mr-2 self-center drop-shadow-md">Contactanos:</p>
              <button 
                onClick={handleInstagramClick}
                className="group text-white hover:text-pink-400 transition-all duration-300 transform hover:scale-125"
                aria-label="Seguir en Instagram"
              >
                <InstagramIcon size={28} className="group-hover:scale-110 transition-transform duration-200 drop-shadow-lg" />
              </button>
              <button 
                onClick={handleWhatsAppClick}
                className="group text-white hover:text-green-400 transition-all duration-300 transform hover:scale-125"
                aria-label="Contactar por WhatsApp"
              >
                <WhatsAppIcon size={28} className="group-hover:scale-110 transition-transform duration-200 drop-shadow-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Orange stripe section with carousel */}
      <div className="w-full bg-[#D35424] py-6 px-4 lg:px-8">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl lg:text-2xl font-bold text-text-white text-center flex-1">
              Productos Destacados
            </h2>
            
            {/* Carousel controls */}
            <div className="flex space-x-2">
              <button
                onClick={prevSlide}
                className="bg-text-white/20 hover:bg-text-white/30 text-text-white p-2 rounded-full transition-colors duration-300 touch-manipulation"
                aria-label="Anterior"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="bg-text-white/20 hover:bg-text-white/30 text-text-white p-2 rounded-full transition-colors duration-300 touch-manipulation"
                aria-label="Siguiente"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Carousel container */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className={`grid gap-4 mx-auto ${
                    isMobile 
                      ? 'grid-cols-1 max-w-sm px-4' 
                      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl'
                  }`}>
                    {featuredProducts
                      .slice(slideIndex * productsPerSlide, (slideIndex + 1) * productsPerSlide)
                      .map((product) => (
                        <div key={product.id} className={`transform hover:scale-[0.92] transition-transform duration-300 ${
                          isMobile ? 'scale-100' : 'scale-90'
                        }`}>
                          <ProductCard 
                            product={product}
                            onAddToCart={handleAddToCart}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Slide indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-300 touch-manipulation ${
                  currentSlide === index ? 'bg-text-white' : 'bg-text-white/40'
                }`}
                aria-label={`Ir a diapositiva ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
