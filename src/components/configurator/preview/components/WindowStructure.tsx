
import { ReactNode } from 'react';

interface WindowStructureProps {
  children: ReactNode;
  animationPhase: 'closed' | 'opening' | 'open';
  windowType: string;
}

export const WindowStructure = ({ children, animationPhase, windowType }: WindowStructureProps) => {
  return (
    <div className={`window-3d ${windowType} ${animationPhase}`}>
      {children}
    </div>
  );
};
