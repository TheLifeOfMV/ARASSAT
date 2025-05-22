import React, { useState, useEffect } from 'react';
import Hotspot from './Hotspot';
import CategoryTooltip from './CategoryTooltip';
import { HorseVisualizationProps, HotspotData, TooltipInfo } from '@/types/catalog';

const HorseVisualization: React.FC<HorseVisualizationProps> = ({
  horseImageUrl,
  hotspotsData,
  onHotspotActivated,
}) => {
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>('hs5'); // Start with leg protection active
  const [tooltip, setTooltip] = useState<TooltipInfo>({
    content: '', x: 0, y: 0, isVisible: false,
  });

  // Add reduced motion class if user prefers reduced motion
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('reduced-motion');
    }
    return () => {
      document.documentElement.classList.remove('reduced-motion');
    };
  }, []);

  const handleHotspotClick = (hotspotId: string, categoryId: string, categoryName: string) => {
    setActiveHotspotId(hotspotId);
    console.log(`Hotspot ${hotspotId} (${categoryName}) clicked. Activating category: ${categoryId}`);
    onHotspotActivated(categoryId, categoryName);
    
    // Play click sound effect if motion is not reduced
    if (!document.documentElement.classList.contains('reduced-motion')) {
      console.log('Soft "click-tack" sound cue triggered!');
    }
  };

  const handleHotspotMouseEnter = (event: React.MouseEvent<HTMLButtonElement>, categoryName: string) => {
    setTooltip({ 
      content: categoryName, 
      x: event.clientX, 
      y: event.clientY, 
      isVisible: true 
    });
  };

  const handleHotspotMouseLeave = () => {
    setTooltip(prev => ({ ...prev, isVisible: false }));
  };

  const handleHotspotFocus = (event: React.FocusEvent<HTMLButtonElement>, categoryName: string) => {
    const rect = event.currentTarget.getBoundingClientRect();
    // Position tooltip above the element, centered horizontally
    setTooltip({
      content: categoryName,
      x: rect.left + rect.width / 2,
      y: rect.top, // Tooltip CSS will adjust to be above this point
      isVisible: true,
    });
  };

  const handleHotspotBlur = () => {
    // Hide tooltip on blur
    setTooltip(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <img
        src={horseImageUrl}
        alt="Interactive horse illustration with hotspots for product categories"
        className="horse-image"
      />
      <div className="hotspot-markers">
        {hotspotsData.map((hotspot) => (
          <Hotspot
            key={hotspot.id}
            {...hotspot}
            isActive={activeHotspotId === hotspot.id}
            onClick={handleHotspotClick}
            onMouseEnter={handleHotspotMouseEnter}
            onMouseLeave={handleHotspotMouseLeave}
            onFocus={handleHotspotFocus}
            onBlur={handleHotspotBlur}
          />
        ))}
      </div>
      <CategoryTooltip
        content={tooltip.content}
        x={tooltip.x}
        y={tooltip.y}
        isVisible={tooltip.isVisible}
      />
    </div>
  );
};

export default HorseVisualization; 