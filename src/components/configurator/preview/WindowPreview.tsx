
import { forwardRef } from 'react';
import { ColorOption } from '@/data/products';
import { SingleLeafWindow } from './window-types/SingleLeafWindow';
import { DoubleLeafWindow } from './window-types/DoubleLeafWindow';
import { TripleLeafWindow } from './window-types/TripleLeafWindow';
import { FixedWindow } from './window-types/FixedWindow';
import { WindowFrame } from './components/WindowFrame';
import { WindowHandles } from './components/WindowHandles';
import { WindowShadow } from './components/WindowShadow';

interface WindowPreviewProps {
  width: number;
  height: number;
  baseColorObject: ColorOption;
  outsideColorObject: ColorOption;
  insideColorObject: ColorOption;
  rubberColorObject: ColorOption;
  glazingObject: { id: string; name: string };
  profileObject: { id: string; name: string };
  selectedWindowType: string;
  selectedOpeningDirection: string;
  rotationX: number;
  rotationY: number;
  frameThickness: number;
  glassOpacity: number;
}

export const WindowPreview = forwardRef<HTMLDivElement, WindowPreviewProps>(
  ({ 
    width, 
    height, 
    baseColorObject, 
    outsideColorObject, 
    insideColorObject, 
    rubberColorObject, 
    glazingObject,
    profileObject,
    selectedWindowType,
    selectedOpeningDirection,
    rotationX,
    rotationY,
    frameThickness,
    glassOpacity
  }, ref) => {
    const isFixedWindow = selectedWindowType === 'fixed';
    
    return (
      <div 
        ref={ref}
        className="relative transition-transform duration-500"
        style={{
          width: `${Math.min(70, (width / height) * 55)}%`,
          height: `${Math.min(70, (height / width) * 55)}%`,
          maxWidth: '80%',
          maxHeight: '80%',
          transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
          transformStyle: 'preserve-3d',
          boxShadow: '0px 20px 40px rgba(0,0,0,0.3)',
        }}
      >
        {/* Main window frame */}
        <WindowFrame
          baseColorObject={baseColorObject}
          outsideColorObject={outsideColorObject}
          insideColorObject={insideColorObject}
          frameThickness={frameThickness}
        />
        
        {/* Window content based on type */}
        {selectedWindowType === 'single-leaf' && (
          <SingleLeafWindow 
            frameThickness={frameThickness}
            glazingObject={glazingObject}
            glassOpacity={glassOpacity}
            rubberColorObject={rubberColorObject}
            insideColorObject={insideColorObject}
            profileObject={profileObject}
            selectedOpeningDirection={selectedOpeningDirection}
          />
        )}
        
        {selectedWindowType === 'double-leaf' && (
          <DoubleLeafWindow 
            frameThickness={frameThickness}
            glazingObject={glazingObject}
            glassOpacity={glassOpacity}
            rubberColorObject={rubberColorObject}
            outsideColorObject={outsideColorObject}
            insideColorObject={insideColorObject}
            profileObject={profileObject}
            selectedOpeningDirection={selectedOpeningDirection}
          />
        )}
        
        {selectedWindowType === 'triple-leaf' && (
          <TripleLeafWindow 
            frameThickness={frameThickness}
            glazingObject={glazingObject}
            glassOpacity={glassOpacity}
            rubberColorObject={rubberColorObject}
            outsideColorObject={outsideColorObject}
            insideColorObject={insideColorObject}
            profileObject={profileObject}
            selectedOpeningDirection={selectedOpeningDirection}
          />
        )}
        
        {isFixedWindow && (
          <FixedWindow 
            frameThickness={frameThickness}
            glazingObject={glazingObject}
            glassOpacity={glassOpacity}
            rubberColorObject={rubberColorObject}
            insideColorObject={insideColorObject}
            profileObject={profileObject}
          />
        )}

        {/* Window handles for opening windows */}
        <WindowHandles isFixed={isFixedWindow} />

        {/* Window shadow for depth effect */}
        <WindowShadow />
      </div>
    );
  }
);

WindowPreview.displayName = 'WindowPreview';
