
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
  viewMode: 'front' | 'back';
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
    glassOpacity,
    viewMode
  }, ref) => {
    const isFixedWindow = selectedWindowType === 'fixed';
    const isFrontView = viewMode === 'front';
    
    // Calculate effective rotation for smooth transitions
    const effectiveRotation = isFrontView ? rotationY : rotationY + 180;
    
    return (
      <div 
        ref={ref}
        className="relative transition-all duration-300"
        style={{
          width: `${Math.min(70, (width / height) * 55)}%`,
          height: `${Math.min(70, (height / width) * 55)}%`,
          maxWidth: '80%',
          maxHeight: '80%',
          transform: `rotateX(${rotationX}deg) rotateY(${effectiveRotation}deg)`,
          transformStyle: 'preserve-3d',
          boxShadow: '0px 20px 40px rgba(0,0,0,0.3)',
        }}
      >
        {/* Main window frame - conditionally render based on view */}
        <WindowFrame
          baseColorObject={baseColorObject}
          outsideColorObject={outsideColorObject}
          insideColorObject={insideColorObject}
          frameThickness={frameThickness}
          viewMode={viewMode}
        />
        
        {/* Window content based on type - front view */}
        {selectedWindowType === 'single-leaf' && (
          <SingleLeafWindow 
            frameThickness={frameThickness}
            glazingObject={glazingObject}
            glassOpacity={glassOpacity}
            rubberColorObject={rubberColorObject}
            insideColorObject={insideColorObject}
            profileObject={profileObject}
            selectedOpeningDirection={selectedOpeningDirection}
            viewMode={viewMode}
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
            viewMode={viewMode}
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
            viewMode={viewMode}
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
            viewMode={viewMode}
          />
        )}

        {/* Window handles for non-fixed windows */}
        <WindowHandles isFixed={isFixedWindow} viewMode={viewMode} />

        {/* Window shadow for depth effect */}
        <WindowShadow />
        
        {/* View indicator label */}
        <div className="absolute top-2 left-0 right-0 text-center z-20 pointer-events-none">
          <span className="bg-black bg-opacity-70 text-white text-xs font-medium px-3 py-1 rounded-full">
            {isFrontView ? 'Outside View' : 'Inside View'}
          </span>
        </div>
      </div>
    );
  }
);

WindowPreview.displayName = 'WindowPreview';
