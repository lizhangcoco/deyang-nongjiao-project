import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
}

const slides: Slide[] = [
  {
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600',
    title: '服务乡村振兴战略',
    subtitle: '推动农村产权流转交易市场化、规范化',
  },
  {
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600',
    title: '农村土地经营权流转',
    subtitle: '盘活农村土地资源，促进农业规模化经营',
  },
  {
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600',
    title: '林权流转交易服务',
    subtitle: '规范林权流转，保护林农合法权益',
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative h-[400px] md:h-[500px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={clsx(
            'absolute inset-0 transition-opacity duration-700',
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
              <div className="max-w-xl animate-slide-up">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-6">
                  {slide.subtitle}
                </p>
                <button className="bg-primary hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  了解更多
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={clsx(
              'w-3 h-3 rounded-full transition-all',
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/70'
            )}
          />
        ))}
      </div>
    </div>
  );
}
