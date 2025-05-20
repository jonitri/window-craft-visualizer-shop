
import { ColorOption } from '@/data/products';
import { GlazingLayers } from '../components/GlazingLayers';

interface FixedWindowProps {
  frameThickness: number;
  glazingObject: { id: string; name: string };
  glassOpacity: number;
  rubberColorObject: ColorOption;
  insideColorObject: ColorOption;
  profileObject: { id: string; name: string };
  viewMode: 'front' | 'back';
}

export const FixedWindow = ({
  frameThickness,
  glazingObject,
  glassOpacity,
  rubberColorObject,
  insideColorObject,
  profileObject,
  viewMode
}: FixedWindowProps) => {
  const isFrontView = viewMode === 'front';
  const glassSeparation = 7; // Depth between front and back glass panels
  
  return (
    <>
      {/* Front glass panel */}
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
        {/* Fixed label - positioned at the front */}
        {isFrontView && (
          <div className="text-sm font-medium opacity-70 z-10 absolute">Fixed</div>
        )}
        
        {/* Glazing layers visualization */}
        <GlazingLayers glazingId={glazingObject.id} />

        {/* Profile name on front glass */}
        <div className="text-xs text-center text-gray-600 font-medium opacity-70 z-10 absolute bottom-4">
          {profileObject.name}
        </div>
      </div>
      
      {/* Back glass panel */}
      <div 
        className="absolute flex items-center justify-center overflow-hidden"
        style={{ 
          inset: `${frameThickness}px`,
          backgroundColor: `rgba(220, 230, 240, ${glassOpacity * 0.9})`,
          boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.2)',
          borderRadius: '2px',
          transform: `translateZ(-${glassSeparation}px)`,
          border: `1px solid ${rubberColorObject.hex}`,
          backdropFilter: 'blur(1px)',
        }}
      >
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
        
        {/* Profile name on back glass - only visible from back */}
        {!isFrontView && (
          <div className="text-xs text-center text-gray-600 font-medium opacity-70 z-10 absolute">
            {profileObject.name}
          </div>
        )}
      </div>
    </>
  );
};
