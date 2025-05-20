
import { useState } from 'react';

export function useRotation() {
  const [rotationX, setRotationX] = useState<number>(0);
  const [rotationY, setRotationY] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'front' | 'back'>('front');

  // Handle rotation
  const handleRotateLeft = () => {
    setRotationY((prev) => prev - 30);
  };

  const handleRotateRight = () => {
    setRotationY((prev) => prev + 30);
  };

  const resetRotation = () => {
    setRotationX(0);
    setRotationY(0);
  };

  // Toggle between front and back views
  const toggleView = () => {
    setViewMode(prev => prev === 'front' ? 'back' : 'front');
    // Reset rotation when toggling views
    resetRotation();
  };

  return {
    rotationX,
    rotationY,
    viewMode,
    handleRotateLeft,
    handleRotateRight,
    resetRotation,
    toggleView
  };
}
