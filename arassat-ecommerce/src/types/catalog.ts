// Interactive Horse Catalog Types

export interface HotspotData {
  id: string;
  top: string; // e.g., '20%'
  left: string; // e.g., '48%'
  ariaLabel: string; // For accessibility
  categoryName: string; // e.g., "Bridle / Head" or "Cabezadas"
  categoryId: string; // To link to actual category data later
}

export interface TooltipInfo {
  content: string;
  x: number;
  y: number;
  isVisible: boolean;
}

export interface CategoryTooltipProps {
  content: string;
  x: number; // screen X coordinate for positioning
  y: number; // screen Y coordinate for positioning
  isVisible: boolean;
}

export interface HotspotProps extends HotspotData {
  isActive: boolean;
  onClick: (hotspotId: string, categoryId: string, categoryName: string) => void;
  onMouseEnter: (event: React.MouseEvent<HTMLButtonElement>, categoryName: string) => void;
  onMouseLeave: () => void;
  onFocus: (event: React.FocusEvent<HTMLButtonElement>, categoryName: string) => void;
  onBlur: () => void;
}

export interface HorseVisualizationProps {
  horseImageUrl: string;
  hotspotsData: HotspotData[];
  onHotspotActivated: (categoryId: string, categoryName: string) => void; // To notify parent to open drawer
}

export interface RippleState {
  id: number;
  x: number;
  y: number;
}

export interface ProductThumbnail {
  id: string;
  imageUrl: string;
  alt: string;
  label: string;
  badge?: string;
}

export interface PriceDistribution {
  lowest: number;
  average: number;
  highest: number;
  bars: number[]; // Array of bar heights as percentages
} 