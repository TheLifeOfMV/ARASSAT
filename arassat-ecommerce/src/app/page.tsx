import { Layout } from '@/components/layout';

export default function Home() {
  return (
    <Layout title="Home" description="Welcome to ARASSAT - Premium Equestrian E-commerce">
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-text-white mb-6">
          Welcome to <span className="text-accent-orange">ARASSAT</span>
        </h1>
        <p className="text-text-light-gray text-lg mb-8 max-w-2xl mx-auto">
          Premium equestrian equipment for horses and riders. Discover our collection of high-quality products.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-accent-orange hover:bg-hover-orange text-text-white px-6 py-3 rounded-md transition-colors duration-300">
            Shop Now
          </button>
          <button className="border border-text-white text-text-white hover:bg-text-white hover:text-primary-black px-6 py-3 rounded-md transition-colors duration-300">
            Learn More
          </button>
        </div>
      </div>
    </Layout>
  );
}
