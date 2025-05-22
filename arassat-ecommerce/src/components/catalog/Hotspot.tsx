import React, { useState } from 'react';
import { HotspotProps, RippleState } from '@/types/catalog';

const Hotspot: React.FC<HotspotProps> = ({
  id, 
  top, 
  left, 
  ariaLabel, 
  categoryName, 
  categoryId,
  isActive, 
  onClick, 
  onMouseEnter, 
  onMouseLeave, 
  onFocus, 
  onBlur
}) => {
  const [ripples, setRipples] = useState<RippleState[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Create ripple effect
    const rect = event.currentTarget.getBoundingClientRect();
    const newRipple: RippleState = {
      id: Date.now(),
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    setRipples(prevRipples => [...prevRipples, newRipple]);
    
    // Call parent onClick handler
    onClick(id, categoryId, categoryName);
  };

  const handleAnimationEnd = (rippleId: number) => {
    setRipples(prevRipples => prevRipples.filter(r => r.id !== rippleId));
  };

  return (
    <button
      className={`hotspot-marker ${isActive ? 'active' : 'animated'}`}
      style={{ top, left }}
      aria-label={ariaLabel}
      onClick={handleClick}
      onMouseEnter={(e) => onMouseEnter(e, categoryName)}
      onMouseLeave={onMouseLeave}
      onFocus={(e) => onFocus(e, categoryName)}
      onBlur={onBlur}
      data-part={categoryName}
    >
      <span className="sr-only">{ariaLabel} products</span>
      {/* The inner white dot is handled by ::before pseudo-element in CSS */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="ripple"
          style={{ left: ripple.x, top: ripple.y }}
          onAnimationEnd={() => handleAnimationEnd(ripple.id)}
        />
      ))}
    </button>
  );
};

export default Hotspot; 