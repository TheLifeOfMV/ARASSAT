import React from 'react';
import { CategoryTooltipProps } from '@/types/catalog';

const CategoryTooltip: React.FC<CategoryTooltipProps> = ({ 
  content, 
  x, 
  y, 
  isVisible 
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`category-tooltip ${isVisible ? 'visible' : ''}`}
      style={{
        top: y,
        left: x,
      }}
      role="tooltip"
      aria-hidden={!isVisible}
    >
      {content}
    </div>
  );
};

export default CategoryTooltip; 