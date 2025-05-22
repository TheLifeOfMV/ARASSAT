"use client";

import React, { useState } from 'react';

interface HotspotData {
  id: string;
  top: string;
  left: string;
  label: string;
}

const debugHotspots: HotspotData[] = [
  { id: 'hs1', top: '20%', left: '48%', label: 'Head' },
  { id: 'hs2', top: '38%', left: '35%', label: 'Saddle' },
  { id: 'hs3', top: '55%', left: '32%', label: 'Stirrups' },
  { id: 'hs4', top: '50%', left: '58%', label: 'Barrel' },
  { id: 'hs5', top: '75%', left: '30%', label: 'Legs' },
];

const DebugHorsePage: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<string | null>('hs5');

  const handleHotspotClick = (hotspotId: string) => {
    setActiveHotspot(hotspotId);
    console.log('Hotspot clicked:', hotspotId);
  };

  return (
    <div style={{ 
      background: '#000000', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <div style={{ 
        width: '800px', 
        height: '600px', 
        position: 'relative',
        background: '#000000',
        border: '2px solid #FF6E1A'
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
              onClick={() => handleHotspotClick(hotspot.id)}
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
                zIndex: 10
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
        
        {/* Debug Info */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          color: '#FFFFFF',
          fontSize: '14px',
          background: 'rgba(0,0,0,0.8)',
          padding: '10px',
          borderRadius: '4px'
        }}>
          Active Hotspot: {activeHotspot || 'None'}<br/>
          Total Hotspots: {debugHotspots.length}<br/>
          Horse Image: {'/horse.png'}
        </div>
      </div>
    </div>
  );
};

export default DebugHorsePage; 