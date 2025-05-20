
import { useState } from 'react';

export function useRotation() {
  const [rotationX, setRotationX] = useState<number>(0);
  const [rotationY, setRotationY] = useState<number>(0);

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

  return {
    rotationX,
    rotationY,
    handleRotateLeft,
    handleRotateRight,
    resetRotation
  };
}
