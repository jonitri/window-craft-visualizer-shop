
import { ColorOption } from '@/data/products';
import { GlazingLayers } from '../components/GlazingLayers';
import { OpeningDirectionIcon } from '../components/OpeningDirectionIcon';

interface DoubleLeafWindowProps {
  frameThickness: number;
  glazingObject: { id: string; name: string };
  glassOpacity: number;
  rubberColorObject: ColorOption;
  outsideColorObject: ColorOption;
  insideColorObject: ColorOption;
  profileObject: { id: string; name: string };
  selectedOpeningDirection: string;
  viewMode: 'front' | 'back';
}

export const DoubleLeafWindow = ({
  frameThickness,
  glazingObject,
  glassOpacity,
  rubberColorObject,
  outsideColorObject,
  insideColorObject,
  profileObject,
  selectedOpeningDirection,
  viewMode
}: DoubleLeafWindowProps) => {
  const isFrontView = viewMode === 'front';
  const primaryColor = isFrontView ? outsideColorObject.hex : insideColorObject.hex;
  
  return (
    <>
      {/* Left leaf */}
      <div 
        className="absolute overflow-hidden"
        style={{ 
          top: `${frameThickness}px`,
          bottom: `${frameThickness}px`,
          left: `${frameThickness}px`,
          width: `calc(50% - ${frameThickness * 1.5}px)`,
          backgroundColor: `rgba(220, 230, 240, ${glassOpacity})`,
          boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.3)',
          borderRadius: '2px',
          transform: 'translateZ(5px)',
          border: `1px solid ${rubberColorObject.hex}`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Show opening direction icons only on front, and for correct directions */}
          {isFrontView && 
            (selectedOpeningDirection === 'left' || selectedOpeningDirection === 'top-left') ? 
            <OpeningDirectionIcon direction={selectedOpeningDirection} /> : null}
        </div>
        
        {/* Inner frame bezel for back view */}
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
        
        {/* Profile name on the left leaf */}
        <div className="text-xs text-center text-gray-600 font-medium opacity-70 z-10 absolute top-2 left-0 right-0">
          {profileObject.name}
        </div>
      </div>
      
      {/* Right leaf */}
      <div 
        className="absolute overflow-hidden"
        style={{ 
          top: `${frameThickness}px`,
          bottom: `${frameThickness}px`,
          right: `${frameThickness}px`,
          width: `calc(50% - ${frameThickness * 1.5}px)`,
          backgroundColor: `rgba(220, 230, 240, ${glassOpacity})`,
          boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.3)',
          borderRadius: '2px',
          transform: 'translateZ(5px)',
          border: `1px solid ${rubberColorObject.hex}`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Show opening direction icons only on front, and for correct directions */}
          {isFrontView && 
            (selectedOpeningDirection === 'right' || selectedOpeningDirection === 'top-right') ? 
            <OpeningDirectionIcon direction={selectedOpeningDirection} /> : null}
        </div>
        
        {/* Inner frame bezel for back view */}
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
      </div>
      
      {/* Central divider */}
      <div 
        className="absolute" 
        style={{ 
          left: '50%',
          top: `${frameThickness}px`,
          bottom: `${frameThickness}px`,
          width: `${frameThickness}px`,
          backgroundColor: primaryColor, 
          transform: 'translateX(-50%) translateZ(5px)',
          boxShadow: '0 0 5px rgba(0,0,0,0.2)',
        }} 
      />
    </>
  );
};
