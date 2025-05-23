'use client';

import { Layout } from '@/components/layout';
import ProductCard from '@/components/products/ProductCard';
import { Product } from '@/types/product';

// Sample products data - reduced to 3 products
const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Silla Chaparral Grabada',
    description: 'Silla artesanal con grabados únicos y diseño premium',
    price: 3150000.00,
    imageUrl: '/api/placeholder/300/300',
    category: 'Montura',
    stock: 5,
    rating: 4.9,
    reviews: 12,
    isNew: false,
    isFeatured: true,
    slug: 'silla-chaparral-grabada',
    features: ['Cuero premium', 'Grabados artesanales', 'Comfort superior'],
    variants: [],
    images: ['/api/placeholder/300/300']
  },
  {
    id: '2',
    name: 'Apero Grillo 3.0',
    description: 'Sistema de apero moderno con tecnología avanzada',
    price: 550000.00,
    imageUrl: '/api/placeholder/300/300',
    category: 'Aperos',
    stock: 8,
    rating: 4.7,
    reviews: 18,
    isNew: true,
    isFeatured: true,
    slug: 'apero-grillo-3',
    features: ['Tecnología 3.0', 'Materiales resistentes', 'Fácil instalación'],
    variants: [],
    images: ['/api/placeholder/300/300']
  },
  {
    id: '3',
    name: 'Apero Raucas',
    description: 'Apero tradicional con acabados modernos',
    price: 550000.00,
    imageUrl: '/api/placeholder/300/300',
    category: 'Aperos',
    stock: 12,
    rating: 4.8,
    reviews: 25,
    isNew: false,
    isFeatured: true,
    slug: 'apero-raucas',
    features: ['Diseño tradicional', 'Calidad garantizada', 'Durabilidad extrema'],
    variants: [],
    images: ['/api/placeholder/300/300']
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

  return (
    <Layout title="Home" description="Bienvenidos a ARASSAT - Tienda de aperos Premium">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-8 lg:py-12 px-4 lg:px-8">
        {/* Content - First on mobile, right on desktop */}
        <div className="w-full lg:flex-1 lg:pl-12 text-center lg:text-left order-1 lg:order-2">
          <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-text-white mb-4">
            Bienvenidos a <span className="text-accent-orange">ARASSAT</span>
          </h1>
          <p className="text-text-light-gray text-base md:text-base mb-6 max-w-xl mx-auto lg:mx-0">
          Los caballos son nuestra pasión. Los aperos, nuestra forma de honrarlos con elegancia, tradición y excelencia. Descubre nuestra colección de productos de alta calidad
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
            <button className="bg-accent-orange hover:bg-hover-orange text-text-white px-5 py-2.5 rounded-md transition-colors duration-300 text-sm">
              Comprar Ahora
            </button>
            <button className="border border-text-white text-text-white hover:bg-text-white hover:text-primary-black px-5 py-2.5 rounded-md transition-colors duration-300 text-sm">
              Más Información
            </button>
          </div>
          
          {/* Social Media Buttons */}
          <div className="flex justify-center lg:justify-start space-x-4">
            <p className="text-text-light-gray text-sm mr-2 self-center">Contactanos:</p>
            <button 
              onClick={handleInstagramClick}
              className="group text-white hover:text-pink-400 transition-all duration-300 transform hover:scale-125"
              aria-label="Seguir en Instagram"
            >
              <InstagramIcon size={24} className="group-hover:scale-110 transition-transform duration-200 drop-shadow-lg" />
            </button>
            <button 
              onClick={handleWhatsAppClick}
              className="group text-white hover:text-green-400 transition-all duration-300 transform hover:scale-125"
              aria-label="Contactar por WhatsApp"
            >
              <WhatsAppIcon size={24} className="group-hover:scale-110 transition-transform duration-200 drop-shadow-lg" />
            </button>
          </div>
        </div>
        
        {/* Horse image - Second on mobile, left on desktop */}
        <div className="w-full lg:flex-1 lg:max-w-lg mt-6 lg:mt-0 order-2 lg:order-1">
          <img 
            src="/Horse homepage.png" 
            alt="Caballo con aperos ARASSAT" 
            className="w-full max-w-md lg:max-w-full h-auto object-contain mx-auto"
          />
        </div>
      </div>
      
      {/* Spacer to push orange stripe lower */}
      <div className="flex-1 min-h-[40px] lg:min-h-[60px]"></div>
      
      {/* Orange stripe section with 3 products - reduced size */}
      <div className="w-full bg-[#D35424] py-6 px-4 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-xl lg:text-2xl font-bold text-text-white text-center mb-4">
            Productos Destacados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {featuredProducts.map((product) => (
              <div key={product.id} className="transform hover:scale-[0.92] transition-transform duration-300 scale-90">
                <ProductCard 
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
