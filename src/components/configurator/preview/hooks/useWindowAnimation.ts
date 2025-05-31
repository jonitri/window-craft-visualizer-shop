
import { useEffect, useState } from 'react';

export const useWindowAnimation = () => {
  const [animationPhase, setAnimationPhase] = useState<'closed' | 'opening' | 'open'>('closed');

  useEffect(() => {
    const phaseInterval = setInterval(() => {
      setAnimationPhase(prev => {
        switch (prev) {
          case 'closed': return 'opening';
          case 'opening': return 'open';
          case 'open': return 'closed';
          default: return 'closed';
        }
      });
    }, 3000);
    
    return () => clearInterval(phaseInterval);
  }, []);

  return { animationPhase };
};
