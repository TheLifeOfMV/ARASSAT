"use client";

import React, { useState, useEffect } from 'react';
import HorseVisualization from '@/components/catalog/HorseVisualization';
import Navbar from '@/components/layout/Navbar';
import { HotspotData, ProductThumbnail } from '@/types/catalog';

// Mock data for hotspots - exact positions from STYLE HTML
const mockHotspots: HotspotData[] = [
  { 
    id: 'hs1', 
    top: '20%', 
    left: '48%', 
    ariaLabel: 'Show products for bridle and head', 
    categoryName: 'Bridle / Head', 
    categoryId: 'cat_cabezadas' 
  },
  { 
    id: 'hs2', 
    top: '38%', 
    left: '35%', 
    ariaLabel: 'Show products for saddle', 
    categoryName: 'Saddle', 
    categoryId: 'cat_monturas' 
  },
  { 
    id: 'hs3', 
    top: '55%', 
    left: '32%', 
    ariaLabel: 'Show products for stirrups', 
    categoryName: 'Stirrups', 
    categoryId: 'cat_estribos' 
  },
  { 
    id: 'hs4', 
    top: '50%', 
    left: '58%', 
    ariaLabel: 'Show products for blankets and cooling sheets', 
    categoryName: 'Barrel', 
    categoryId: 'cat_mantas' 
  },
  { 
    id: 'hs5', 
    top: '75%', 
    left: '30%', 
    ariaLabel: 'Show products for leg protection', 
    categoryName: 'Leg / Fetlock', 
    categoryId: 'cat_protectores' 
  },
];

// Mock product data for different categories
const mockProductCategories: Record<string, { 
  products: ProductThumbnail[], 
  prices: { lowest: number, average: number, highest: number } 
}> = {
  cat_cabezadas: {
    products: [
      { id: 'p1', imageUrl: 'https://via.placeholder.com/104x104/121212/E9DCC9?text=Bridles', alt: 'Premium horse bridles', label: 'Bridles' },
      { id: 'p2', imageUrl: 'https://via.placeholder.com/104x104/121212/E9DCC9?text=Halters', alt: 'Leather halters', label: 'Halters' },
      { id: 'p3', imageUrl: 'https://via.placeholder.com/104x104/121212/E9DCC9?text=Headstalls', alt: 'Show headstalls', label: 'Headstalls' },
      { id: 'p4', imageUrl: 'https://via.placeholder.com/104x104/121212/E9DCC9?text=Nosebands', alt: 'Training nosebands', label: 'Nosebands' },
      { id: 'p5', imageUrl: 'https://via.placeholder.com/104x104/121212/E9DCC9?text=Bits', alt: 'Professional bits', label: 'Bits' },
      { id: 'p6', imageUrl: 'https://via.placeholder.com/104x104/121212/E9DCC9?text=Reins', alt: 'Leather reins', label: 'Reins' },
    ],
    prices: { lowest: 29.99, average: 89.50, highest: 299.99 }
  },
  cat_monturas: {
    products: [
      { id: 'p7', imageUrl: 'https://via.placeholder.com/104x104/121212/E9DCC9?text=English', alt: 'English saddles', label: 'English Saddles' },
      { id: 'p8', imageUrl: 'https://via.placeholder.com/104x104/121212/E9DCC9?text=Western', alt: 'Western saddles', label: 'Western Saddles' },
      { id: 'p9', imageUrl: 'https://via.placeholder.com/104x104/121212/E9DCC9?text=Dressage', alt: 'Dressage saddles', label: 'Dressage Saddles' },
      { id: 'p10', imageUrl: 'https://via.placeholder.com/104x104/121212/E9DCC9?text=Pads', alt: 'Saddle pads', label: 'Saddle Pads' },
      { id: 'p11', imageUrl: 'https://via.placeholder.com/104x104/121212/E9DCC9?text=Girths', alt: 'Saddle girths', label: 'Girths', badge: 'NEW' },
      { id: 'p12', imageUrl: 'https://via.placeholder.com/104x104/121212/E9DCC9?text=Stirrups', alt: 'Premium stirrups', label: 'Stirrups' },
    ],
    prices: { lowest: 149.99, average: 450.00, highest: 1299.99 }
  },
  cat_protectores: {
    products: [
      { id: 'p13', imageUrl: 'https://via.placeholder.com/104x104/121212/E9DCC9?text=Horse%20Boots', alt: 'Black horse boots with beige lining', label: 'Horse Boots' },
      { id: 'p14', imageUrl: 'https://via.placeholder.com/104x104/121212/E9DCC9?text=Over%20Reach', alt: 'Beige over reach boots for horse hooves', label: 'Over Reach' },
      { id: 'p15', imageUrl: 'https://via.placeholder.com/104x104/121212/E9DCC9?text=Leg%20Wraps', alt: 'Black leg wraps for horses', label: 'Leg Wraps' },
      { id: 'p16', imageUrl: 'https://via.placeholder.com/104x104/121212/E9DCC9?text=Bandages', alt: 'Compact stack of horse bandages', label: 'Bandages' },
      { id: 'p17', imageUrl: 'https://via.placeholder.com/104x104/121212/E9DCC9?text=Hoof%20Boots', alt: 'Black hoof boots with a size label', label: 'Hoof Boots' },
      { id: 'p18', imageUrl: 'https://via.placeholder.com/104x104/121212/E9DCC9?text=Fetlock%20Boots', alt: 'Small black fetlock boots', label: 'Fetlock Boots' },
      { id: 'p19', imageUrl: 'https://via.placeholder.com/104x104/121212/E9DCC9?text=Hook%20%26%20Knee', alt: 'Brown hook and knee boots for horses', label: 'Hook & Knee' },
      { id: 'p20', imageUrl: 'https://via.placeholder.com/104x104/121212/E9DCC9?text=High-end%20Sets', alt: 'Premium high-end horse protection sets', label: 'Premium Sets' },
    ],
    prices: { lowest: 12.99, average: 54.28, highest: 269.99 }
  },
  cat_estribos: {
    products: [
      { id: 'p21', imageUrl: 'https://via.placeholder.com/104x104/121212/E9DCC9?text=Safety', alt: 'Safety stirrups', label: 'Safety Stirrups' },
      { id: 'p22', imageUrl: 'https://via.placeholder.com/104x104/121212/E9DCC9?text=English', alt: 'English stirrups', label: 'English Stirrups' },
      { id: 'p23', imageUrl: 'https://via.placeholder.com/104x104/121212/E9DCC9?text=Western', alt: 'Western stirrups', label: 'Western Stirrups' },
      { id: 'p24', imageUrl: 'https://via.placeholder.com/104x104/121212/E9DCC9?text=Racing', alt: 'Racing stirrups', label: 'Racing Stirrups' },
      { id: 'p25', imageUrl: 'https://via.placeholder.com/104x104/121212/E9DCC9?text=Leathers', alt: 'Stirrup leathers', label: 'Stirrup Leathers' },
      { id: 'p26', imageUrl: 'https://via.placeholder.com/104x104/121212/E9DCC9?text=Treads', alt: 'Stirrup treads', label: 'Stirrup Treads' },
    ],
    prices: { lowest: 45.99, average: 125.75, highest: 399.99 }
  },
  cat_mantas: {
    products: [
      { id: 'p27', imageUrl: 'https://via.placeholder.com/104x104/121212/E9DCC9?text=Winter', alt: 'Winter blankets', label: 'Winter Blankets' },
      { id: 'p28', imageUrl: 'https://via.placeholder.com/104x104/121212/E9DCC9?text=Coolers', alt: 'Cooling sheets', label: 'Cooling Sheets' },
      { id: 'p29', imageUrl: 'https://via.placeholder.com/104x104/121212/E9DCC9?text=Fly%20Sheets', alt: 'Fly protection sheets', label: 'Fly Sheets' },
      { id: 'p30', imageUrl: 'https://via.placeholder.com/104x104/121212/E9DCC9?text=Exercise', alt: 'Exercise sheets', label: 'Exercise Sheets' },
      { id: 'p31', imageUrl: 'https://via.placeholder.com/104x104/121212/E9DCC9?text=Rain', alt: 'Rain sheets', label: 'Rain Sheets' },
      { id: 'p32', imageUrl: 'https://via.placeholder.com/104x104/121212/E9DCC9?text=Show', alt: 'Show blankets', label: 'Show Blankets' },
    ],
    prices: { lowest: 79.99, average: 189.50, highest: 449.99 }
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
    mockHotspots.find(h => h.categoryId === selectedCategory)?.categoryName || 'Products' : 
    'Select a Category';

  // Generate mock histogram bars
  const generateHistogramBars = () => {
    const bars = [];
    for (let i = 0; i < 24; i++) {
      const height = Math.random() * 100;
      bars.push(height);
    }
    return bars;
  };

  const histogramBars = generateHistogramBars();

  // Add client-side interactivity matching the STYLE HTML
  useEffect(() => {
    // Apply prefers-reduced-motion class
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('reduced-motion');
    }

    // Animate histogram bars when component mounts
    const animateHistogramBars = () => {
      const histogramBarsElements = document.querySelectorAll('.histogram-chart .bar');
      histogramBarsElements.forEach((bar, index) => {
        const element = bar as HTMLElement;
        const originalHeight = element.style.getPropertyValue('--bar-height') || element.style.height;
        element.style.height = '0';
        setTimeout(() => {
          element.style.height = originalHeight;
        }, 100 + index * 30);
      });
    };

    // Delay animation slightly to ensure elements are rendered
    const timer = setTimeout(animateHistogramBars, 100);
    
    return () => {
      clearTimeout(timer);
      document.documentElement.classList.remove('reduced-motion');
    };
  }, [selectedCategory]); // Re-animate when category changes

  return (
    <>
      <Navbar />
      <main className="main-content">
        <div className="left-canvas">
          <HorseVisualization
            horseImageUrl="/horse.png"
            hotspotsData={mockHotspots}
            onHotspotActivated={handleHotspotActivated}
          />
        </div>

      <aside className={`right-drawer ${drawerOpen ? 'open' : ''}`}>
        <header className="drawer-header">
          <h2 id="drawerTitle">{currentCategoryName}</h2>
          <a href="#" className="explore-all-link">Explore all ›</a>
        </header>

        {currentCategory ? (
          <>
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

            <div className="price-distribution">
              <div className="histogram-chart">
                {histogramBars.map((height, index) => (
                  <div 
                    key={index}
                    className={`bar ${index === 11 ? 'active' : ''}`}
                    style={{ 
                      '--bar-height': `${height}%`,
                      height: `${height}%`
                    } as React.CSSProperties}
                  />
                ))}
              </div>
              <div className="price-labels">
                <div className="price-item">
                  <span className="price-type">Lowest price</span>
                  <span className="price-value">£{currentCategory.prices.lowest}</span>
                </div>
                <div className="price-item">
                  <span className="price-type">Average</span>
                  <span className="price-value">£{currentCategory.prices.average}</span>
                </div>
                <div className="price-item">
                  <span className="price-type">Highest</span>
                  <span className="price-value">£{currentCategory.prices.highest}</span>
                </div>
              </div>
            </div>
          </>
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
              Interactive Horse Catalog
            </h3>
            <p style={{ marginBottom: '1rem' }}>
              Click on any orange hotspot on the horse to explore related product categories.
            </p>
            <p style={{ fontSize: '0.875rem' }}>
              Each hotspot represents a different area of equestrian equipment.
            </p>
          </div>
        )}
      </aside>
    </main>
    </>
  );
};

export default ProductsPage; 