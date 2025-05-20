
import { ColorOption } from '@/data/products';
import { GlazingLayers } from '../components/GlazingLayers';

interface FixedWindowProps {
  frameThickness: number;
  glazingObject: { id: string; name: string };
  glassOpacity: number;
  rubberColorObject: ColorOption;
  insideColorObject: ColorOption;
  profileObject: { id: string; name: string };
}

export const FixedWindow = ({
  frameThickness,
  glazingObject,
  glassOpacity,
  rubberColorObject,
  insideColorObject,
  profileObject
}: FixedWindowProps) => {
  return (
    <>
      {/* Fixed front glass panel */}
      <div 
        className="absolute flex items-center justify-center overflow-hidden"
        style={{ 
          inset: `${frameThickness}px`,
          backgroundColor: `rgba(220, 230, 240, ${glassOpacity})`,
          boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.3)',
          borderRadius: '2px',
          transform: 'translateZ(5px)', // Positioned in front of the frame
          border: `1px solid ${rubberColorObject.hex}`,
        }}
      >
        {/* Fixed label - positioned at the front */}
        <div className="text-sm font-medium opacity-70 z-10 absolute">Fixed</div>
        
        {/* Visualize glazing layers */}
        <GlazingLayers glazingId={glazingObject.id} />

        {/* Profile name on front glass */}
        <div className="text-xs text-center text-gray-600 font-medium opacity-70 z-10 absolute bottom-4">
          {profileObject.name}
        </div>
      </div>

      {/* Fixed back glass panel */}
      <div 
        className="absolute overflow-hidden"
        style={{ 
          inset: `${frameThickness}px`,
          backgroundColor: `rgba(220, 230, 240, ${glassOpacity})`,
          boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.3)',
          borderRadius: '2px',
          transform: 'rotateY(180deg) translateZ(5px)', // Positioned at the back
          border: `1px solid ${rubberColorObject.hex}`,
        }}
      >
        {/* Inner frame with small bezel */}
        <div 
          className="absolute pointer-events-none" 
          style={{ 
            inset: '0',
            border: `8px solid ${insideColorObject.hex}`, // Bezel around glass
            borderRadius: '2px',
          }}
        ></div>
      </div>
    </>
  );
};
