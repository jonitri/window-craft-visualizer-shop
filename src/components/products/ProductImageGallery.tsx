
import React, { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Image } from '@/components/ui/image';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const isVideo = (url: string) => {
    return url.includes('.mp4') || url.includes('.webm') || url.includes('.ogg');
  };

  return (
    <div className="relative">
      <Carousel className="w-full" onSelect={(index) => setActiveIndex(index || 0)}>
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
                    onError={(e) => {
                      console.log(`Video failed to load: ${mediaUrl}`);
                      e.currentTarget.style.display = 'none';
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
