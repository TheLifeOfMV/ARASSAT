"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';

interface HotspotData {
  id: string;
  top: string;
  left: string;
  label: string;
  categoryId: string;
}

const debugHotspots: HotspotData[] = [
  { id: 'hs1', top: '20%', left: '48%', label: 'Head', categoryId: 'cat_cabezadas' },
  { id: 'hs2', top: '38%', left: '35%', label: 'Saddle', categoryId: 'cat_monturas' },
  { id: 'hs3', top: '55%', left: '32%', label: 'Stirrups', categoryId: 'cat_estribos' },
  { id: 'hs4', top: '50%', left: '58%', label: 'Barrel', categoryId: 'cat_mantas' },
  { id: 'hs5', top: '75%', left: '30%', label: 'Legs', categoryId: 'cat_protectores' },
];

const mockData = {
  cat_cabezadas: { name: 'Bridle / Head', count: 6 },
  cat_monturas: { name: 'Saddle', count: 6 },
  cat_estribos: { name: 'Stirrups', count: 6 },
  cat_mantas: { name: 'Barrel', count: 6 },
  cat_protectores: { name: 'Leg Protection', count: 8 },
};

const TestHorse2Page: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<string | null>('hs5');
  const [drawerOpen, setDrawerOpen] = useState(true);

  const handleHotspotClick = (hotspotId: string, categoryId: string) => {
    setActiveHotspot(hotspotId);
    setDrawerOpen(true);
    console.log('Hotspot clicked:', hotspotId, categoryId);
  };

  const activeCategory = activeHotspot ? 
    debugHotspots.find(h => h.id === activeHotspot)?.categoryId : null;
  const categoryName = activeCategory ? mockData[activeCategory as keyof typeof mockData]?.name : 'Select Category';

  return (
    <div style={{ 
      background: '#000000', 
      minHeight: '100vh', 
      color: '#ffffff',
      fontFamily: 'Inter, sans-serif'
    }}>
      <Navbar />
      
      <main style={{
        display: 'flex',
        height: 'calc(100vh - 80px)',
        position: 'relative'
      }}>
        {/* Left Canvas */}
        <div style={{
          flex: '0 0 58%',
          backgroundColor: '#000000',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          maxWidth: '830px'
        }}>
          {/* Horse Image */}
          <img
            src="/horse.png"
            alt="Interactive horse illustration"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              objectFit: 'contain',
              filter: 'brightness(0.95)'
            }}
          />
          
          {/* Hotspots */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }}>
            {debugHotspots.map((hotspot) => (
              <button
                key={hotspot.id}
                onClick={() => handleHotspotClick(hotspot.id, hotspot.categoryId)}
                style={{
                  position: 'absolute',
                  top: hotspot.top,
                  left: hotspot.left,
                  width: '24px',
                  height: '24px',
                  backgroundColor: hotspot.id === activeHotspot ? 'rgba(255, 110, 26, 0.5)' : '#FF6E1A',
                  border: hotspot.id === activeHotspot ? '2px solid #FF6E1A' : 'none',
                  borderRadius: '50%',
                  cursor: 'crosshair',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: 'translate(-50%, -50%)',
                  transition: 'all 0.3s ease',
                  pointerEvents: 'all',
                  minWidth: '32px',
                  minHeight: '32px',
                  zIndex: 10,
                  animation: hotspot.id !== activeHotspot ? 'pulse 2s infinite' : 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.width = '28px';
                  e.currentTarget.style.height = '28px';
                  e.currentTarget.style.boxShadow = '0 0 0 4px rgba(255, 110, 26, 0.33)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.width = '24px';
                  e.currentTarget.style.height = '24px';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '4px',
                  height: '4px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '50%'
                }} />
              </button>
            ))}
          </div>
        </div>
        
        {/* Right Drawer */}
        <aside style={{
          flex: '0 0 42%',
          maxWidth: '610px',
          backgroundColor: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)',
          padding: '24px',
          overflowY: 'auto',
          zIndex: 999,
          transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)',
          opacity: drawerOpen ? 1 : 0,
          pointerEvents: drawerOpen ? 'all' : 'none',
          transition: 'transform 0.28s ease-out, opacity 0.28s ease-out'
        }}>
          <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            paddingBottom: '16px',
            borderBottom: '1px solid #1D1D1F'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: 500, color: '#FFFFFF' }}>
              {categoryName}
            </h2>
            <a href="#" style={{ 
              fontSize: '12px', 
              textTransform: 'uppercase', 
              color: '#B4B4B4',
              textDecoration: 'none'
            }}>
              Explore all ›
            </a>
          </header>
          
          {activeCategory && (
            <div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                marginBottom: '32px'
              }}>
                {Array.from({ length: mockData[activeCategory as keyof typeof mockData]?.count || 0 }, (_, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    backgroundColor: '#121212',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    padding: '8px',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 110, 26, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <img 
                      src={`https://via.placeholder.com/104x104/121212/E9DCC9?text=Product${i+1}`}
                      alt={`Product ${i+1}`}
                      style={{
                        width: '104px',
                        height: '104px',
                        objectFit: 'cover',
                        borderRadius: '12px',
                        marginBottom: '8px',
                        backgroundColor: '#121212',
                        border: '1px solid #E9DCC9'
                      }}
                    />
                    <span style={{
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#FFFFFF',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      width: '100%',
                      padding: '0 4px'
                    }}>
                      Product {i+1}
                    </span>
                  </div>
                ))}
              </div>
              
              <div style={{ marginTop: '32px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  height: '56px',
                  width: '100%',
                  gap: '2px',
                  marginBottom: '16px',
                  borderBottom: '1px solid #1D1D1F'
                }}>
                  {Array.from({ length: 24 }, (_, i) => (
                    <div 
                      key={i}
                      style={{
                        flexGrow: 1,
                        backgroundColor: i === 11 ? '#FF6E1A' : 'rgba(79, 79, 82, 0.7)',
                        minWidth: '2px',
                        height: `${Math.random() * 100}%`,
                        transition: 'height 0.4s ease-out',
                        transformOrigin: 'bottom'
                      }}
                    />
                  ))}
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  textAlign: 'center'
                }}>
                  <div style={{ flex: 1, padding: '0 4px', textAlign: 'left' }}>
                    <span style={{ fontSize: '12px', color: '#B4B4B4', marginBottom: '4px', display: 'block' }}>
                      Lowest price
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#FFFFFF' }}>
                      £12.99
                    </span>
                  </div>
                  <div style={{ flex: 1, padding: '0 4px', textAlign: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#B4B4B4', marginBottom: '4px', display: 'block' }}>
                      Average
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#FF6E1A' }}>
                      £54.28
                    </span>
                  </div>
                  <div style={{ flex: 1, padding: '0 4px', textAlign: 'right' }}>
                    <span style={{ fontSize: '12px', color: '#B4B4B4', marginBottom: '4px', display: 'block' }}>
                      Highest
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#FFFFFF' }}>
                      £269.99
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </aside>
      </main>
      
      <style jsx>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(255, 110, 26, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(255, 110, 26, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 110, 26, 0); }
        }
      `}</style>
    </div>
  );
};

export default TestHorse2Page; 