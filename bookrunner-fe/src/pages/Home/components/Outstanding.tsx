import React, { useState, useEffect, useCallback } from 'react';
import OutstandingCard from '../../../components/OutstandingCard';
import { NovelData } from '../../../types/auth';

const Outstanding: React.FC = () => {
  const [novels, setNovels] = useState<NovelData[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const ITEMS_PER_SLIDE = 4;
  const TOTAL_SLIDES = 2;
  const server = import.meta.env.VITE_SERVER
  // console.log(server);

  useEffect(() => {
    const fetchOutstandingNovels = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${server}/api/novels/outstanding`);
        if (!response.ok) {
          throw new Error(`Failed to fetch outstanding novels: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        
        setNovels(data);
      } catch (error) {
        console.error("Error fetching outstanding novels:", error);
        setError(error instanceof Error ? error.message : "Failed to load content");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOutstandingNovels();
  }, []);

  const handlePrevious = useCallback(() => {
    setCurrentSlide(prevSlide => (prevSlide === 0 ? TOTAL_SLIDES - 1 : prevSlide - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentSlide(prevSlide => (prevSlide === TOTAL_SLIDES - 1 ? 0 : prevSlide + 1));
  }, []);

  const goToSlide = useCallback((slideIndex: number) => {
    setCurrentSlide(slideIndex);
  }, []);

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext();
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentSlide, handleNext]);

  return (
    <section className="w-full bg-gray-950 rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="px-3 py-1.5 bg-indigo-950 text-indigo-300 font-medium rounded-md tracking-wide">
          Featured
        </h2>
        <div className="font-medium text-indigo-200 tracking-wide">
          Novels
        </div>

        <div className="h-px flex-grow bg-gray-800 ml-2"></div>
      </div>

      <div className="relative min-h-[320px]">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-indigo-950 border-t-indigo-400 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-red-400 bg-red-900/20 p-4 rounded-lg">
              {error}
            </div>
          </div>
        ) : (
          <div className="relative overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {[...Array(TOTAL_SLIDES)].map((_, slideIndex) => (
                <div key={slideIndex} className="flex-shrink-0 w-full flex">
                  {novels.slice(slideIndex * ITEMS_PER_SLIDE, (slideIndex + 1) * ITEMS_PER_SLIDE).map((novel) => (
                    <div key={novel.id} className="w-1/4 p-2 flex justify-center relative group">
                      <div className="relative w-full transition-all duration-300 group-hover:scale-105 group-hover:z-10">
                        <div className="absolute inset-0 bg-indigo-900/0 group-hover:bg-indigo-900/30 rounded-lg transition-all duration-300 -z-10"></div>
                        <OutstandingCard data={novel} />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-indigo-900/70 text-white/70 hover:text-white transition-all duration-300 z-10 backdrop-blur-sm"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-indigo-900/70 text-white/70 hover:text-white transition-all duration-300 z-10 backdrop-blur-sm"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Dot indicators */}
        {!isLoading && !error && novels.length > 0 && (
          <div className="flex justify-center mt-6 space-x-3">
            {[...Array(TOTAL_SLIDES)].map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index
                  ? 'bg-indigo-400 scale-110'
                  : 'bg-gray-700 hover:bg-indigo-700'
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Outstanding;