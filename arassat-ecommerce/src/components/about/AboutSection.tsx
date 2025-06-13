'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AboutSectionProps } from '@/types/about';

export default function AboutSection({ 
  content, 
  className = ''
}: AboutSectionProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    console.warn('About page - Image failed to load:', content.imageUrl);
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log('About page - Image loaded successfully:', content.imageUrl);
    setImageLoaded(true);
  };

  return (
    <section className={`bg-charcoal-dark border-l-4 border-accent-orange rounded-xl p-8 md:p-12 mb-16 ${className}`}>
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent-orange mb-6 tracking-wide uppercase">
          {content.title}
        </h1>
        <h2 className="text-xl md:text-2xl text-text-light-gray mb-8 border-b-2 border-accent-orange pb-4 inline-block">
          {content.subtitle}
        </h2>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        {/* Text Content */}
        <div className="space-y-8">
          <div>
            <p className="text-lg md:text-xl leading-relaxed text-text-white mb-8 text-justify">
              {content.description}
            </p>
          </div>

          {/* Mission */}
          <div className="bg-card-bg rounded-lg p-6 border border-border-color">
            <h3 className="text-2xl font-semibold text-accent-orange mb-4 border-b border-accent-orange pb-2">
              Nuestra Misión
            </h3>
            <p className="text-text-light-gray leading-relaxed text-justify">
              {content.mission}
            </p>
          </div>

          {/* Vision */}
          <div className="bg-card-bg rounded-lg p-6 border border-border-color">
            <h3 className="text-2xl font-semibold text-accent-orange mb-4 border-b border-accent-orange pb-2">
              Nuestra Visión
            </h3>
            <p className="text-text-light-gray leading-relaxed text-justify">
              {content.vision}
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative">
          <div className="bg-gradient-to-br from-charcoal-dark to-border-color rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
            {content.imageUrl && !imageError ? (
              <div className="relative aspect-[4/3] group">
                <Image
                  src={content.imageUrl}
                  alt={content.imageAlt}
                  fill
                  className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Loading Placeholder */}
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-charcoal-dark">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent-orange border-t-transparent"></div>
                  </div>
                )}

                {/* Overlay with hotspot */}
                <div className="absolute top-4 right-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-5 h-5 bg-accent-orange rounded-full border-2 border-text-white animate-pulse cursor-pointer shadow-lg"></div>
                </div>
              </div>
            ) : (
              /* Fallback Placeholder */
              <div className="aspect-[4/3] flex flex-col items-center justify-center bg-gradient-to-br from-charcoal-dark to-border-color p-8 text-center">
                <div className="text-6xl mb-4">🐎</div>
                <h4 className="text-xl font-semibold text-accent-orange mb-2">ARASSAT</h4>
                <p className="text-text-gray text-sm">Premium Equestrian Excellence</p>
              </div>
            )}
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-accent-orange rounded-full opacity-70"></div>
          <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-accent-orange rounded-full opacity-50"></div>
        </div>
      </div>

      {/* Values Section */}
      {content.values && content.values.length > 0 && (
        <div className="border-t border-border-color pt-12">
          <h3 className="text-3xl font-bold text-accent-orange text-center mb-8 uppercase tracking-wide">
            Nuestros Valores
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.values.map((value, index) => (
              <div 
                key={index}
                className="bg-card-bg rounded-lg p-6 border border-border-color hover:border-accent-orange transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent-orange rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    {index + 1}
                  </div>
                                     <p className="text-text-light-gray leading-relaxed font-medium text-justify">
                     {value}
                   </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats Section */}
      {content.stats && content.stats.length > 0 && (
        <div className="border-t border-border-color pt-12 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {content.stats.map((stat, index) => (
              <div key={index} className="group">
                <div className="text-4xl md:text-5xl font-bold text-accent-orange mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-xl font-semibold text-text-white mb-2">
                  {stat.label}
                </div>
                <div className="text-text-gray text-sm">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
} 