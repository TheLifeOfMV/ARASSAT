import { Metadata } from 'next';
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/constants';
import { LayoutProps } from '@/types/layout';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children, title, description, customBackground = false }: LayoutProps) {
  // Metadata for the page
  const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const pageDescription = description || SITE_DESCRIPTION;

  return (
    <>
      <Navbar />
      <main className={`min-h-screen ${customBackground ? '' : 'bg-primary-black py-8'}`}>
        {customBackground ? (
          children
        ) : (
          <div className="container mx-auto px-4">
            {children}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
} 