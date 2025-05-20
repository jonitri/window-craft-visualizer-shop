
import { forwardRef } from 'react';
import { ColorOption } from '@/data/products';
import { WindowFrame } from './components/WindowFrame';
import { WindowHandles } from './components/WindowHandles';
import { WindowShadow } from './components/WindowShadow';
import { WindowTransform } from './components/WindowTransform';
import { WindowViewIndicator } from './components/WindowViewIndicator';
import { WindowContent } from './components/WindowContent';

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
    
    return (
      <WindowTransform
        width={width}
        height={height}
        rotationX={rotationX}
        rotationY={rotationY}
        viewMode={viewMode}
      >
        <div ref={ref} className="h-full w-full">
          {/* Main window frame */}
          <WindowFrame
            baseColorObject={baseColorObject}
            outsideColorObject={outsideColorObject}
            insideColorObject={insideColorObject}
            frameThickness={frameThickness}
            viewMode={viewMode}
          />
          
          {/* Window content based on type */}
          <WindowContent
            selectedWindowType={selectedWindowType}
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

          {/* Window handles for non-fixed windows */}
          <WindowHandles isFixed={isFixedWindow} viewMode={viewMode} />

          {/* Window shadow for depth effect */}
          <WindowShadow />
          
          {/* View indicator label */}
          <WindowViewIndicator viewMode={viewMode} />
        </div>
      </WindowTransform>
    );
  }
);

WindowPreview.displayName = 'WindowPreview';
