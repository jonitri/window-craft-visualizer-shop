
import { forwardRef } from 'react';
import { ColorOption } from '@/data/products';
import { OpeningDirectionIcon } from './components/OpeningDirectionIcon';
import { GlazingLayers } from './components/GlazingLayers';
import { SingleLeafWindow } from './window-types/SingleLeafWindow';
import { DoubleLeafWindow } from './window-types/DoubleLeafWindow';
import { TripleLeafWindow } from './window-types/TripleLeafWindow';
import { FixedWindow } from './window-types/FixedWindow';

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
        {/* Base frame with depth - positioned further back */}
        <div 
          className="absolute inset-0 rounded-md"
          style={{ 
            backgroundColor: baseColorObject.hex,
            transform: 'translateZ(-3px)', // Moved backward
            transformStyle: 'preserve-3d',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        ></div>
        
        {/* Frame sides for depth - adjusted to connect with the recessed base */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-6"
          style={{ 
            backgroundColor: baseColorObject.hex,
            transform: 'rotateY(-90deg) translateZ(-3px)',
            transformOrigin: 'left',
            borderRight: '1px solid rgba(0,0,0,0.1)',
          }}
        ></div>
        
        <div 
          className="absolute right-0 top-0 bottom-0 w-6"
          style={{ 
            backgroundColor: baseColorObject.hex,
            transform: 'rotateY(90deg) translateZ(-3px)',
            transformOrigin: 'right',
            borderLeft: '1px solid rgba(0,0,0,0.1)',
          }}
        ></div>
        
        <div 
          className="absolute left-0 right-0 top-0 h-6"
          style={{ 
            backgroundColor: baseColorObject.hex,
            transform: 'rotateX(90deg) translateZ(-3px)',
            transformOrigin: 'top',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
          }}
        ></div>
        
        <div 
          className="absolute left-0 right-0 bottom-0 h-6"
          style={{ 
            backgroundColor: baseColorObject.hex,
            transform: 'rotateX(-90deg) translateZ(-3px)',
            transformOrigin: 'bottom',
            borderTop: '1px solid rgba(0,0,0,0.1)',
          }}
        ></div>
        
        {/* Outside frame (front face) - now positioned clearly in front of base */}
        <div 
          className="absolute inset-0 rounded-md"
          style={{ 
            backgroundColor: outsideColorObject.hex, 
            transform: 'translateZ(1px)',
            boxShadow: '0 0 8px rgba(0,0,0,0.1)',
          }}
        >
          {/* Inner cutout area that shows the glass */}
          <div 
            className="absolute" 
            style={{ 
              inset: `${frameThickness}px`,
              border: `2px solid ${outsideColorObject.hex}`,
              borderColor: `${outsideColorObject.hex} rgba(0,0,0,0.2) rgba(0,0,0,0.2) ${outsideColorObject.hex}`,
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)',
            }}
          ></div>
        </div>

        {/* Inside frame (back face) */}
        <div 
          className="absolute inset-0 rounded-md"
          style={{ 
            backgroundColor: insideColorObject.hex, 
            transform: 'rotateY(180deg) translateZ(1px)',
          }}
        >
          {/* Frame inner border */}
          <div 
            className="absolute" 
            style={{ 
              inset: `${frameThickness}px`,
              border: `2px solid ${insideColorObject.hex}`,
              borderColor: `${insideColorObject.hex} rgba(0,0,0,0.2) rgba(0,0,0,0.2) ${insideColorObject.hex}`,
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)',
            }}
          ></div>
        </div>
        
        {/* Render window based on type */}
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
        
        {selectedWindowType === 'fixed' && (
          <FixedWindow 
            frameThickness={frameThickness}
            glazingObject={glazingObject}
            glassOpacity={glassOpacity}
            rubberColorObject={rubberColorObject}
            insideColorObject={insideColorObject}
            profileObject={profileObject}
          />
        )}

        {/* Add hardware details like handles for opening windows */}
        {selectedWindowType !== 'fixed' && (
          <>
            {/* Handle for front side - positioned properly */}
            <div
              className="absolute z-10"
              style={{
                width: '12px',
                height: '30px',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%) translateZ(6px)',
                backgroundColor: '#888',
                borderRadius: '2px',
                boxShadow: '0 0 3px rgba(0,0,0,0.3)'
              }}
            >
              <div
                className="absolute"
                style={{
                  width: '20px',
                  height: '5px',
                  left: '-4px',
                  top: '12px',
                  backgroundColor: '#777',
                  borderRadius: '1px',
                }}
              />
            </div>

            {/* Handle for back side - positioned properly */}
            <div
              className="absolute z-10"
              style={{
                width: '12px',
                height: '30px',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%) rotateY(180deg) translateZ(6px)',
                backgroundColor: '#888',
                borderRadius: '2px',
                boxShadow: '0 0 3px rgba(0,0,0,0.3)'
              }}
            >
              <div
                className="absolute"
                style={{
                  width: '20px',
                  height: '5px',
                  left: '-4px',
                  top: '12px',
                  backgroundColor: '#777',
                  borderRadius: '1px',
                }}
              />
            </div>
          </>
        )}

        {/* Window silhouette shadow for depth */}
        <div
          className="absolute"
          style={{
            inset: '-10px',
            transform: 'translateZ(-10px)',
            backgroundColor: 'rgba(0,0,0,0.07)',
            filter: 'blur(10px)',
            borderRadius: '8px',
          }}
        />
      </div>
    );
  }
);

WindowPreview.displayName = 'WindowPreview';
