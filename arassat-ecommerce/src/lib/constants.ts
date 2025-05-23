import { NavLink } from '@/types/layout';

export const SITE_NAME = 'ARASSAT';
export const SITE_DESCRIPTION = 'Premium Equestrian E-commerce';

export const NAV_LINKS: NavLink[] = [
  { name: 'Inicio', href: '/' },
  { name: 'Productos', href: '/products' },
  { name: 'Categorías', href: '/categories' },
  { name: 'Quienes Somos', href: '/about' },
  { name: 'Contacto', href: '/contact' },
];

export const SOCIAL_LINKS: NavLink[] = [
  { name: 'Facebook', href: 'https://facebook.com' },
  { name: 'Instagram', href: 'https://instagram.com' },
  { name: 'Twitter', href: 'https://twitter.com' },
];

export const LEGAL_LINKS: NavLink[] = [
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Shipping Policy', href: '/shipping' },
]; 