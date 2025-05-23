import { Layout } from '@/components/layout';

export default function Home() {
  return (
    <Layout title="Home" description="Bienvenidos a ARASSAT - Tienda de aperos Premium">
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-text-white mb-6">
          Bienvenidos a <span className="text-accent-orange">ARASSAT</span>
        </h1>
        <p className="text-text-light-gray text-lg mb-8 max-w-2xl mx-auto">
          Aperos Premium para caballos y jinetes. Descubre nuestra colección de productos de alta calidad.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-accent-orange hover:bg-hover-orange text-text-white px-6 py-3 rounded-md transition-colors duration-300">
            Comprar Ahora
          </button>
          <button className="border border-text-white text-text-white hover:bg-text-white hover:text-primary-black px-6 py-3 rounded-md transition-colors duration-300">
            Más Información
          </button>
        </div>
      </div>
    </Layout>
  );
}
