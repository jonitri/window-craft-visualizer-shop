
import React, { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Image } from '@/components/ui/image';
import type { CarouselApi } from '@/components/ui/carousel';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  React.useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      setActiveIndex(api.selectedScrollSnap());
    });
  }, [api]);

  const isVideo = (url: string) => {
    return url.includes('.mp4') || url.includes('.webm') || url.includes('.ogg');
  };

  return (
    <div className="relative">
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>
          {images.map((mediaUrl, index) => (
            <CarouselItem key={index}>
              <div className="h-60 overflow-hidden bg-gray-100 rounded-lg">
                {isVideo(mediaUrl) ? (
                  <video 
                    src={mediaUrl}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    controls
                    muted
                    preload="metadata"
                    poster=""
                    onError={(e) => {
                      console.log(`Video failed to load: ${mediaUrl}`);
                      // Instead of hiding, show a placeholder
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      // Create a fallback image element
                      const fallback = document.createElement('div');
                      fallback.className = 'h-full w-full bg-gray-200 flex items-center justify-center text-gray-500';
                      fallback.textContent = 'Video unavailable';
                      target.parentNode?.appendChild(fallback);
                    }}
                  >
                    <source src={mediaUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image 
                    src={mediaUrl} 
                    alt={`${productName} - Media ${index + 1}`} 
                    className="h-full w-full transition-transform duration-500 hover:scale-105"
                  />
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
      
      {/* Media indicator dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((mediaUrl, index) => (
          <div 
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === activeIndex ? 'bg-salamander-green' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
