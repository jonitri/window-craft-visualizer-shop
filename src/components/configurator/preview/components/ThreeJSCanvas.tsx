
import { forwardRef } from 'react';

interface ThreeJSCanvasProps {
  className?: string;
  style?: React.CSSProperties;
}

export const ThreeJSCanvas = forwardRef<HTMLDivElement, ThreeJSCanvasProps>(
  ({ className = "bg-secondary rounded-lg", style }, ref) => {
    return (
      <div 
        ref={ref}
        className={className}
        style={{ 
          height: '450px',
          background: 'linear-gradient(to bottom, #e0e8f0, #c0d0e0)',
          ...style
        }}
      />
    );
  }
);

ThreeJSCanvas.displayName = 'ThreeJSCanvas';
