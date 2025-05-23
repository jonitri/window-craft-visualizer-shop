
import { ColorOption } from '@/data/products';
import { GlazingLayers } from '../components/GlazingLayers';
import { OpeningDirectionIcon } from '../components/OpeningDirectionIcon';

interface SingleLeafWindowProps {
  frameThickness: number;
  glazingObject: { id: string; name: string };
  glassOpacity: number;
  rubberColorObject: ColorOption;
  insideColorObject: ColorOption;
  profileObject: { id: string; name: string };
  selectedOpeningDirection: string;
  viewMode: 'front' | 'back';
}

export const SingleLeafWindow = ({
  frameThickness,
  glazingObject,
  glassOpacity,
  rubberColorObject,
  insideColorObject,
  profileObject,
  selectedOpeningDirection,
  viewMode
}: SingleLeafWindowProps) => {
  const isFrontView = viewMode === 'front';
  
  return (
    <>
      {/* Glass panel */}
      <div 
        className="absolute flex items-center justify-center overflow-hidden"
        style={{ 
          inset: `${frameThickness}px`,
          backgroundColor: `rgba(220, 230, 240, ${glassOpacity})`,
          boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.3)',
          borderRadius: '2px',
          transform: 'translateZ(5px)',
          border: `1px solid ${rubberColorObject.hex}`,
        }}
      >
        {/* Opening direction indicator - only on front for certain directions */}
        {isFrontView && selectedOpeningDirection !== 'fixed' && (
          <div className="absolute">
            <OpeningDirectionIcon direction={selectedOpeningDirection} />
          </div>
        )}
        
        {/* Inside frame with small bezel - only on back view */}
        {!isFrontView && (
          <div 
            className="absolute pointer-events-none" 
            style={{ 
              inset: '0',
              border: `8px solid ${insideColorObject.hex}`,
              borderRadius: '2px',
            }}
          ></div>
        )}
        
        {/* Glazing layers visualization */}
        <GlazingLayers glazingId={glazingObject.id} />

        {/* Profile name on glass */}
        <div className="text-xs text-center text-gray-600 font-medium opacity-70 z-10 absolute">
          {profileObject.name}
        </div>
      </div>
    </>
  );
};
