
import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ src, alt, fallbackSrc = '/placeholder.svg', className, ...props }, ref) => {
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const imgRef = useRef<HTMLImageElement>(null);

    const handleError = () => {
      console.log(`Image failed to load: ${src}`);
      setHasError(true);
      setIsLoading(false);
    };

    const handleLoad = () => {
      setIsLoading(false);
    };

    const currentSrc = hasError ? fallbackSrc : src;

    return (
      <div className={cn("relative overflow-hidden", className)}>
        {isLoading && (
          <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-muted-foreground/20 border-t-muted-foreground rounded-full animate-spin" />
          </div>
        )}
        <img
          ref={ref || imgRef}
          src={currentSrc}
          alt={alt}
          onError={handleError}
          onLoad={handleLoad}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          {...props}
        />
      </div>
    );
  }
);

Image.displayName = 'Image';

export { Image };
