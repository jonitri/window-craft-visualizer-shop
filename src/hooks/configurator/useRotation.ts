
import { useState, useEffect } from 'react';

export function useRotation() {
  const [rotationX, setRotationX] = useState<number>(0);
  const [rotationY, setRotationY] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'front' | 'back'>('front');
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(false);
  
  // Handle auto rotation
  useEffect(() => {
    let animationFrameId: number;
    
    if (isAutoRotating) {
      const animate = () => {
        setRotationY(prev => (prev + 0.5) % 360);
        animationFrameId = requestAnimationFrame(animate);
      };
      
      animationFrameId = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isAutoRotating]);

  // Handle manual rotation steps
  const handleRotateLeft = () => {
    setRotationY((prev) => prev - 15);
    setIsAutoRotating(false);
  };

  const handleRotateRight = () => {
    setRotationY((prev) => prev + 15);
    setIsAutoRotating(false);
  };

  const resetRotation = () => {
    setRotationX(0);
    setRotationY(0);
    setIsAutoRotating(false);
  };

  // Toggle auto rotation
  const toggleAutoRotation = () => {
    setIsAutoRotating(prev => !prev);
  };

  // Toggle between front and back views
  const toggleView = () => {
    setViewMode(prev => prev === 'front' ? 'back' : 'front');
    resetRotation();
  };

  return {
    rotationX,
    rotationY,
    viewMode,
    isAutoRotating,
    handleRotateLeft,
    handleRotateRight,
    resetRotation,
    toggleAutoRotation,
    toggleView
  };
}
