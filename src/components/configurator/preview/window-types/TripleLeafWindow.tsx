
import { ColorOption } from '@/data/products';
import { OpeningDirectionIcon } from '../components/OpeningDirectionIcon';

interface TripleLeafWindowProps {
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

export const TripleLeafWindow = ({
  frameThickness,
  glazingObject,
  glassOpacity,
  rubberColorObject,
  outsideColorObject,
  insideColorObject,
  profileObject,
  selectedOpeningDirection,
  viewMode
}: TripleLeafWindowProps) => {
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
          width: `calc(33.33% - ${frameThickness * 1.33}px)`,
          backgroundColor: `rgba(220, 230, 240, ${glassOpacity})`,
          boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.3)',
          borderRadius: '2px',
          transform: 'translateZ(2px)',
          border: `1px solid ${rubberColorObject.hex}`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {isFrontView && 
            (selectedOpeningDirection === 'left' || selectedOpeningDirection === 'top-left') ? 
            <OpeningDirectionIcon direction={selectedOpeningDirection} /> : null}
        </div>
        
        {/* Inner frame bezel for back view */}
        {!isFrontView && (
          <div
            className="absolute"
            style={{ 
              inset: '8px',
              backgroundColor: `rgba(220, 230, 240, ${glassOpacity})`,
              boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.3)',
              border: `4px solid ${insideColorObject.hex}`,
            }}
          ></div>
        )}
        
        {/* Profile name on left leaf */}
        <div className="text-xs text-center text-gray-600 font-medium opacity-70 z-10 absolute top-2 left-0 right-0">
          {profileObject.name}
        </div>
      </div>
      
      {/* Middle leaf */}
      <div 
        className="absolute overflow-hidden"
        style={{ 
          top: `${frameThickness}px`,
          bottom: `${frameThickness}px`,
          left: `calc(33.33% + ${frameThickness * 0.67}px)`,
          width: `calc(33.34% - ${frameThickness * 1.34}px)`,
          backgroundColor: `rgba(220, 230, 240, ${glassOpacity})`,
          boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.3)',
          borderRadius: '2px',
          transform: 'translateZ(2px)',
          border: `1px solid ${rubberColorObject.hex}`,
        }}
      >
        {/* Inner frame bezel for back view */}
        {!isFrontView && (
          <div
            className="absolute"
            style={{ 
              inset: '8px',
              backgroundColor: `rgba(220, 230, 240, ${glassOpacity})`,
              boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.3)',
              border: `4px solid ${insideColorObject.hex}`,
            }}
          ></div>
        )}
      </div>
      
      {/* Right leaf */}
      <div 
        className="absolute overflow-hidden"
        style={{ 
          top: `${frameThickness}px`,
          bottom: `${frameThickness}px`,
          right: `${frameThickness}px`,
          width: `calc(33.33% - ${frameThickness * 1.33}px)`,
          backgroundColor: `rgba(220, 230, 240, ${glassOpacity})`,
          boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.3)',
          borderRadius: '2px',
          transform: 'translateZ(2px)',
          border: `1px solid ${rubberColorObject.hex}`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {isFrontView && 
            (selectedOpeningDirection === 'right' || selectedOpeningDirection === 'top-right') ? 
            <OpeningDirectionIcon direction={selectedOpeningDirection} /> : null}
        </div>
        
        {/* Inner frame bezel for back view */}
        {!isFrontView && (
          <div
            className="absolute"
            style={{ 
              inset: '8px',
              backgroundColor: `rgba(220, 230, 240, ${glassOpacity})`,
              boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.3)',
              border: `4px solid ${insideColorObject.hex}`,
            }}
          ></div>
        )}
      </div>
      
      {/* Dividers */}
      <div 
        className="absolute" 
        style={{ 
          left: '33.33%',
          top: `${frameThickness}px`,
          bottom: `${frameThickness}px`,
          width: `${frameThickness}px`,
          backgroundColor: primaryColor, 
          transform: 'translateX(-50%) translateZ(2px)',
          boxShadow: '0 0 5px rgba(0,0,0,0.2)',
        }} 
      />
      
      <div 
        className="absolute" 
        style={{ 
          left: '66.67%',
          top: `${frameThickness}px`,
          bottom: `${frameThickness}px`,
          width: `${frameThickness}px`,
          backgroundColor: primaryColor, 
          transform: 'translateX(-50%) translateZ(2px)',
          boxShadow: '0 0 5px rgba(0,0,0,0.2)',
        }} 
      />
    </>
  );
};
