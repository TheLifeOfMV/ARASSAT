"use client";

import React from 'react';
import HorseVisualization from '@/components/catalog/HorseVisualization';
import { HotspotData } from '@/types/catalog';

const testHotspots: HotspotData[] = [
  { 
    id: 'test1', 
    top: '30%', 
    left: '50%', 
    ariaLabel: 'Test Hotspot', 
    categoryName: 'Test Category', 
    categoryId: 'test_cat' 
  },
];

const TestHorsePage: React.FC = () => {
  const handleActivation = (categoryId: string, categoryName: string) => {
    alert(`Hotspot activated! Category: ${categoryName} (ID: ${categoryId})`);
  };

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'var(--canvas-black)' 
    }}>
      <div style={{ width: '800px', height: '600px', position: 'relative' }}>
        <HorseVisualization
          horseImageUrl="/horse.png"
          hotspotsData={testHotspots}
          onHotspotActivated={handleActivation}
        />
      </div>
    </div>
  );
};

export default TestHorsePage; 