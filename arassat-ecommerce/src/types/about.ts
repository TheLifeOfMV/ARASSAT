export interface AboutContent {
  title: string;
  subtitle: string;
  description: string;
  mission: string;
  vision: string;
  values: string[];
  imageUrl?: string;
  imageAlt: string;
  stats?: AboutStats[];
}

export interface AboutStats {
  value: string;
  label: string;
  description: string;
}

export interface AboutSectionProps {
  content: AboutContent;
  className?: string;
}

export interface AboutHeroProps {
  title: string;
  subtitle: string;
  description: string;
  imageUrl?: string;
  imageAlt: string;
  className?: string;
}

export interface AboutValuesProps {
  values: string[];
  className?: string;
}

export interface AboutStatsProps {
  stats: AboutStats[];
  className?: string;
}

export interface AboutPageMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
} 