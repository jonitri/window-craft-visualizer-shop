
import { ReactNode } from 'react';

interface WindowTransformProps {
  children: ReactNode;
  width: number;
  height: number;
  rotationX: number;
  rotationY: number;
  viewMode: 'front' | 'back';
}

export const WindowTransform = ({
  children,
  width,
  height,
  rotationX,
  rotationY,
  viewMode
}: WindowTransformProps) => {
  // Calculate effective rotation for smooth transitions
  const isFrontView = viewMode === 'front';
  const effectiveRotation = isFrontView ? rotationY : rotationY + 180;
  
  return (
    <div 
      className="relative transition-all duration-300"
      style={{
        width: `${Math.min(70, (width / height) * 55)}%`,
        height: `${Math.min(70, (height / width) * 55)}%`,
        maxWidth: '80%',
        maxHeight: '80%',
        transform: `perspective(1000px) rotateX(${rotationX}deg) rotateY(${effectiveRotation}deg)`,
        transformStyle: 'preserve-3d',
        boxShadow: '0px 20px 40px rgba(0,0,0,0.3)',
      }}
    >
      {children}
    </div>
  );
};
