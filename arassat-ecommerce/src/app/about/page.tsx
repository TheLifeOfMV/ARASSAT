import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import { AboutSection } from '@/components/about';
import { AboutContent } from '@/types/about';

// SEO Metadata
export const metadata: Metadata = {
  title: 'Quiénes Somos | ARASSAT - Excelencia Ecuestre Premium',
  description: 'Descubre la historia, misión y valores de ARASSAT. Somos líderes en equipamiento ecuestre premium, dedicados a ofrecer productos de alta calidad para caballos y jinetes.',
  keywords: [
    'ARASSAT',
    'equipamiento ecuestre',
    'productos para caballos',
    'jinetes profesionales',
    'excelencia ecuestre',
    'historia empresa',
    'valores empresa',
    'misión visión'
  ],
  openGraph: {
    title: 'Quiénes Somos | ARASSAT',
    description: 'Conoce la historia y valores de ARASSAT, líderes en equipamiento ecuestre premium.',
    type: 'website',
    locale: 'es_ES',
    url: 'https://arassat.com/about',
    siteName: 'ARASSAT',
    images: [
      {
        url: '/images/about-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ARASSAT - Excelencia Ecuestre Premium'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quiénes Somos | ARASSAT',
    description: 'Conoce la historia y valores de ARASSAT, líderes en equipamiento ecuestre premium.',
    images: ['/images/about-og-image.jpg']
  },
  alternates: {
    canonical: 'https://arassat.com/about'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
};

// Contenido de la empresa
const aboutContent: AboutContent = {
  title: 'Quiénes Somos',
  subtitle: 'Excelencia en Accesorios Equinos',
  description: `En ARASSAT, somos más que una empresa de accesorios equinos. Somos una familia apasionada por los caballos y comprometida con la excelencia. Desde nuestros inicios, hemos trabajado incansablemente para ofrecer productos de la más alta calidad que protejan, cuiden y realcen el rendimiento tanto de caballos como de jinetes.

  Nuestra experiencia de más de 5 años en el mundo equino nos ha permitido desarrollar una comprensión profunda de las necesidades específicas de cada disciplina. Trabajamos directamente con los mejores fabricantes y proveedores para ofrecer accesorios innovadores que marquen la diferencia.`,
  
  mission: `Proporcionar equipamiento equino de la más alta calidad, desarrollado con tecnología avanzada y materiales premium, que garantice la seguridad, comodidad y rendimiento óptimo de caballos y jinetes en todas las disciplinas equinas.`,
  
  vision: `Ser la marca de referencia mundial en equipamiento ecuestre premium, reconocida por nuestra innovación constante, compromiso con la excelencia y dedicación al bienestar animal y la seguridad del jinete.`,
  
  values: [
    'Calidad sin compromisos en cada producto que desarrollamos',
    'Innovación constante mediante investigación y desarrollo',
    'Respeto y bienestar animal como prioridad absoluta',
    'Compromiso con la seguridad del jinete en todas las disciplinas',
    'Servicio al cliente excepcional y personalizado',
    'Responsabilidad ambiental en nuestros procesos de producción'
  ],
  
  imageUrl: '/images/about-arassat-team.svg',
  imageAlt: 'Equipo ARASSAT trabajando con caballos y productos ecuestres en nuestras instalaciones',
  
  stats: [
    {
      value: '5+',
      label: 'Años de Experiencia',
      description: 'Más de 5 años perfeccionando nuestro arte'
    },
    {
      value: '5,000+',
      label: 'Clientes Satisfechos',
      description: 'Jinetes y establos que confían en nosotros'
    },
    {
      value: '40+',
      label: 'Productos Premium',
      description: 'Amplio catálogo de equipamiento especializado'
    }
  ]
};

export default function AboutPage() {
  return (
    <Layout>
      {/* Schema.org structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'ARASSAT',
            description: 'Empresa líder en equipamiento ecuestre premium',
            foundingDate: '1985',
            url: 'https://arassat.com',
            logo: 'https://arassat.com/images/logo.png',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'ES'
            },
            sameAs: [
              'https://facebook.com/arassat',
              'https://instagram.com/arassat',
              'https://twitter.com/arassat'
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'customer service',
              availableLanguage: ['Spanish', 'English']
            }
          })
        }}
      />

      {/* Main Content */}
      <main className="min-h-screen bg-primary-black">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <AboutSection 
            content={aboutContent}
            className="animate-fade-in"
          />
          
          {/* Additional CTA Section */}
          <section className="bg-charcoal-dark rounded-xl p-8 md:p-12 text-center border border-border-color">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-orange mb-6">
              ¿Listo para experimentar la excelencia?
            </h2>
            <p className="text-lg text-text-light-gray mb-8 max-w-2xl mx-auto">
              Descubre nuestra amplia gama de productos premium diseñados para llevar tu experiencia ecuestre al siguiente nivel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="/products"
                className="bg-accent-orange hover:bg-hover-orange text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-accent-orange focus:ring-opacity-50"
                aria-label="Ver todos nuestros productos"
              >
                Ver Productos
              </a>
              <a 
                href="/contact"
                className="bg-transparent border-2 border-text-white text-white hover:bg-text-white hover:text-primary-black font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-text-white focus:ring-opacity-50"
                aria-label="Contáctanos para más información"
              >
                Contáctanos
              </a>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
} 