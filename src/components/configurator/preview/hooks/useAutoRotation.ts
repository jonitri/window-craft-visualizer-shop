
import { useEffect, useState } from 'react';

export const useAutoRotation = (isAutoRotating: boolean) => {
  const [autoRotationAngle, setAutoRotationAngle] = useState(0);

  useEffect(() => {
    if (!isAutoRotating) return;
    
    const interval = setInterval(() => {
      setAutoRotationAngle(prev => (prev + 2) % 360);
    }, 50);
    
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  return { autoRotationAngle };
};
