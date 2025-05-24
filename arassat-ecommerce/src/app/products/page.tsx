"use client";

import React, { useState, useEffect } from 'react';
import HorseVisualization from '@/components/catalog/HorseVisualization';
import Navbar from '@/components/layout/Navbar';
import { HotspotData, ProductThumbnail } from '@/types/catalog';

// Mock data for hotspots - positioned based on horse anatomy
const mockHotspots: HotspotData[] = [
  { 
    id: 'hs1', 
    top: '9%', 
    left: '85%', 
    ariaLabel: 'Mostrar productos para cabezadas y riendas', 
    categoryName: 'Cabezadas / Riendas', 
    categoryId: 'cat_cabezadas' 
  },
  { 
    id: 'hs2', 
    top: '35%', 
    left: '45%', 
    ariaLabel: 'Mostrar productos para monturas', 
    categoryName: 'Monturas', 
    categoryId: 'cat_monturas' 
  },
  { 
    id: 'hs3', 
    top: '65%', 
    left: '42%', 
    ariaLabel: 'Mostrar productos para estribos', 
    categoryName: 'Estribos', 
    categoryId: 'cat_estribos' 
  },
  { 
    id: 'hs4', 
    top: '55%', 
    left: '55%', 
    ariaLabel: 'Mostrar productos para mantas y sudaderos', 
    categoryName: 'Mantas / Sudaderos', 
    categoryId: 'cat_mantas' 
  },
  { 
    id: 'hs5', 
    top: '85%', 
    left: '35%', 
    ariaLabel: 'Mostrar productos para protección de patas', 
    categoryName: 'Protectores / Patas', 
    categoryId: 'cat_protectores' 
  },
];

// Mock product data for different categories
const mockProductCategories: Record<string, { 
  products: ProductThumbnail[]
}> = {
  cat_cabezadas: {
    products: [
      { id: 'p1', imageUrl: 'https://via.placeholder.com/120x120/121212/E9DCC9?text=Cabezadas', alt: 'Cabezadas de cuero premium', label: 'Cabezadas' },
      { id: 'p2', imageUrl: 'https://via.placeholder.com/120x120/121212/E9DCC9?text=Cabestros', alt: 'Cabestros de cuero', label: 'Cabestros' },
      { id: 'p3', imageUrl: 'https://via.placeholder.com/120x120/121212/E9DCC9?text=Riendas', alt: 'Riendas de competición', label: 'Riendas' },
      { id: 'p4', imageUrl: 'https://via.placeholder.com/120x120/121212/E9DCC9?text=Muserolas', alt: 'Muserolas de entrenamiento', label: 'Muserolas' },
      { id: 'p5', imageUrl: 'https://via.placeholder.com/120x120/121212/E9DCC9?text=Bocados', alt: 'Bocados profesionales', label: 'Bocados' },
      { id: 'p6', imageUrl: 'https://via.placeholder.com/120x120/121212/E9DCC9?text=Frontales', alt: 'Frontales decorativos', label: 'Frontales' },
    ]
  },
  cat_monturas: {
    products: [
      { id: 'p7', imageUrl: 'https://via.placeholder.com/120x120/121212/E9DCC9?text=Inglesas', alt: 'Monturas inglesas', label: 'Monturas Inglesas' },
      { id: 'p8', imageUrl: 'https://via.placeholder.com/120x120/121212/E9DCC9?text=Vaqueras', alt: 'Monturas vaqueras', label: 'Monturas Vaqueras' },
      { id: 'p9', imageUrl: 'https://via.placeholder.com/120x120/121212/E9DCC9?text=Doma', alt: 'Monturas de doma', label: 'Monturas de Doma' },
      { id: 'p10', imageUrl: 'https://via.placeholder.com/120x120/121212/E9DCC9?text=Sudaderos', alt: 'Sudaderos y almohadillas', label: 'Sudaderos' },
      { id: 'p11', imageUrl: 'https://via.placeholder.com/120x120/121212/E9DCC9?text=Cinchas', alt: 'Cinchas de montura', label: 'Cinchas', badge: 'NUEVO' },
      { id: 'p12', imageUrl: 'https://via.placeholder.com/120x120/121212/E9DCC9?text=Accesorios', alt: 'Accesorios de montura', label: 'Accesorios' },
    ]
  },
  cat_protectores: {
    products: [
      { id: 'p13', imageUrl: 'https://via.placeholder.com/120x120/121212/E9DCC9?text=Botas', alt: 'Botas protectoras negras con forro beige', label: 'Botas Protectoras' },
      { id: 'p14', imageUrl: 'https://via.placeholder.com/120x120/121212/E9DCC9?text=Campanas', alt: 'Campanas protectoras para cascos', label: 'Campanas' },
      { id: 'p15', imageUrl: 'https://via.placeholder.com/120x120/121212/E9DCC9?text=Vendas', alt: 'Vendas protectoras para patas', label: 'Vendas' },
      { id: 'p16', imageUrl: 'https://via.placeholder.com/120x120/121212/E9DCC9?text=Vendajes', alt: 'Set de vendajes profesionales', label: 'Vendajes' },
      { id: 'p17', imageUrl: 'https://via.placeholder.com/120x120/121212/E9DCC9?text=Cascos', alt: 'Protectores de cascos', label: 'Protectores Cascos' },
      { id: 'p18', imageUrl: 'https://via.placeholder.com/120x120/121212/E9DCC9?text=Menudillos', alt: 'Protectores de menudillos', label: 'Prot. Menudillos' },
      { id: 'p19', imageUrl: 'https://via.placeholder.com/120x120/121212/E9DCC9?text=Tendones', alt: 'Protectores de tendones marrones', label: 'Prot. Tendones' },
      { id: 'p20', imageUrl: 'https://via.placeholder.com/120x120/121212/E9DCC9?text=Sets%20Premium', alt: 'Sets premium de protección completa', label: 'Sets Premium' },
    ]
  },
  cat_estribos: {
    products: [
      { id: 'p21', imageUrl: 'https://via.placeholder.com/120x120/121212/E9DCC9?text=Seguridad', alt: 'Estribos de seguridad', label: 'Estribos Seguridad' },
      { id: 'p22', imageUrl: 'https://via.placeholder.com/120x120/121212/E9DCC9?text=Ingleses', alt: 'Estribos ingleses', label: 'Estribos Ingleses' },
      { id: 'p23', imageUrl: 'https://via.placeholder.com/120x120/121212/E9DCC9?text=Vaqueros', alt: 'Estribos vaqueros', label: 'Estribos Vaqueros' },
      { id: 'p24', imageUrl: 'https://via.placeholder.com/120x120/121212/E9DCC9?text=Carreras', alt: 'Estribos de carreras', label: 'Estribos Carreras' },
      { id: 'p25', imageUrl: 'https://via.placeholder.com/120x120/121212/E9DCC9?text=Cueros', alt: 'Cueros de estribos', label: 'Cueros Estribos' },
      { id: 'p26', imageUrl: 'https://via.placeholder.com/120x120/121212/E9DCC9?text=Pisaderas', alt: 'Pisaderas antideslizantes', label: 'Pisaderas' },
    ]
  },
  cat_mantas: {
    products: [
      { id: 'p27', imageUrl: 'https://via.placeholder.com/120x120/121212/E9DCC9?text=Invierno', alt: 'Mantas de invierno', label: 'Mantas Invierno' },
      { id: 'p28', imageUrl: 'https://via.placeholder.com/120x120/121212/E9DCC9?text=Refrescantes', alt: 'Mantas refrescantes', label: 'Mantas Refrescantes' },
      { id: 'p29', imageUrl: 'https://via.placeholder.com/120x120/121212/E9DCC9?text=Antimoscas', alt: 'Mantas antimoscas', label: 'Mantas Antimoscas' },
      { id: 'p30', imageUrl: 'https://via.placeholder.com/120x120/121212/E9DCC9?text=Ejercicio', alt: 'Mantas de ejercicio', label: 'Mantas Ejercicio' },
      { id: 'p31', imageUrl: 'https://via.placeholder.com/120x120/121212/E9DCC9?text=Lluvia', alt: 'Mantas de lluvia', label: 'Mantas Lluvia' },
      { id: 'p32', imageUrl: 'https://via.placeholder.com/120x120/121212/E9DCC9?text=Competición', alt: 'Mantas de competición', label: 'Mantas Competición' },
    ]
  }
};

const ProductsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>('cat_protectores');
  const [drawerOpen, setDrawerOpen] = useState(true);

  const handleHotspotActivated = (categoryId: string, categoryName: string) => {
    setSelectedCategory(categoryId);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedCategory(null);
  };

  const currentCategory = selectedCategory ? mockProductCategories[selectedCategory] : null;
  const currentCategoryName = selectedCategory ? 
    mockHotspots.find(h => h.categoryId === selectedCategory)?.categoryName || 'Productos' : 
    'Selecciona una Categoría';

  // Add client-side interactivity matching the STYLE HTML
  useEffect(() => {
    // Apply prefers-reduced-motion class
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('reduced-motion');
    }
    
    return () => {
      document.documentElement.classList.remove('reduced-motion');
    };
  }, [selectedCategory]);

  return (
    <>
      <Navbar />
      <main className="main-content">
        <div className="left-canvas">
          <HorseVisualization
            horseImageUrl="/Horse Product.png"
            hotspotsData={mockHotspots}
            onHotspotActivated={handleHotspotActivated}
          />
        </div>

      <aside className={`right-drawer ${drawerOpen ? 'open' : ''}`}>
        <header className="drawer-header">
          <h2 id="drawerTitle">{currentCategoryName}</h2>
          <a href="#" className="explore-all-link">Ver todos ›</a>
        </header>

        {currentCategory ? (
          <div className="product-category-grid">
            {currentCategory.products.map((product) => (
              <div key={product.id} className="product-thumbnail">
                {product.badge && (
                  <span className="badge">{product.badge}</span>
                )}
                <img 
                  src={product.imageUrl} 
                  alt={product.alt}
                  loading="lazy"
                />
                <span className="product-label">{product.label}</span>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '50%',
            textAlign: 'center',
            color: 'var(--text-secondary)'
          }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Catálogo Interactivo de Equitación
            </h3>
            <p style={{ marginBottom: '1rem' }}>
              Haz clic en cualquier punto naranja del caballo para explorar las categorías de productos relacionadas.
            </p>
            <p style={{ fontSize: '0.875rem' }}>
              Cada punto representa una área diferente del equipo ecuestre.
            </p>
          </div>
        )}
      </aside>
    </main>
    </>
  );
};

export default ProductsPage; 