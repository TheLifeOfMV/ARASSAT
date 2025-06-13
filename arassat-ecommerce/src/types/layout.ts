import { ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  customBackground?: boolean;
}

export interface NavbarProps {
  logo?: string;
  cartItemsCount?: number;
}

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface FooterProps {
  companyName?: string;
  year?: number;
}

export interface NavLink {
  name: string;
  href: string;
} 