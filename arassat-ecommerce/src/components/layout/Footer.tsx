import Link from 'next/link';
import { LEGAL_LINKS, SITE_NAME, SOCIAL_LINKS } from '@/lib/constants';
import { FooterProps } from '@/types/layout';

export default function Footer({ companyName, year = new Date().getFullYear() }: FooterProps) {
  return (
    <footer className="bg-primary-black border-t border-border-color pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-accent-orange font-bold text-xl mb-4">
              {companyName || SITE_NAME}
            </h3>
            <p className="text-text-gray mb-4">
              Premium equestrian equipment for horses and riders. Quality products for all your needs.
            </p>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-white hover:text-accent-orange transition-colors duration-300"
                  aria-label={link.name}
                >
                  <span className="sr-only">{link.name}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                    />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-text-light-gray font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-text-gray hover:text-accent-orange transition-colors duration-300">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-text-gray hover:text-accent-orange transition-colors duration-300">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-text-gray hover:text-accent-orange transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-gray hover:text-accent-orange transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-text-light-gray font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-text-gray hover:text-accent-orange transition-colors duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border-color mt-8 pt-6 text-center text-text-gray text-sm">
          <p>© {year} {companyName || SITE_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 