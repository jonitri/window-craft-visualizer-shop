
import { ColorOption } from '@/data/products';

interface WindowFrameProps {
  baseColorObject: ColorOption;
  outsideColorObject: ColorOption;
  insideColorObject: ColorOption;
  frameThickness: number;
  viewMode: 'front' | 'back';
}

export const WindowFrame = ({
  baseColorObject,
  outsideColorObject,
  insideColorObject,
  frameThickness,
  viewMode
}: WindowFrameProps) => {
  const isFrontView = viewMode === 'front';
  const primaryColor = isFrontView ? outsideColorObject.hex : insideColorObject.hex;
  const secondaryColor = isFrontView ? insideColorObject.hex : outsideColorObject.hex;
  const frameDepth = 10; // Increased depth of window frame for better visibility

  return (
    <>
      {/* Base frame with depth */}
      <div 
        className="absolute inset-0 rounded-md"
        style={{ 
          backgroundColor: baseColorObject.hex,
          transform: `translateZ(-${frameDepth}px)`,
          transformStyle: 'preserve-3d',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
      ></div>
      
      {/* Frame sides - with increased width for better visibility */}
      {/* Left side */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-10"
        style={{ 
          backgroundColor: baseColorObject.hex,
          transform: 'rotateY(-90deg) translateZ(5px)',
          transformOrigin: 'left',
          borderRight: '2px solid rgba(0,0,0,0.15)',
        }}
      ></div>
      
      {/* Right side */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-10"
        style={{ 
          backgroundColor: baseColorObject.hex,
          transform: 'rotateY(90deg) translateZ(5px)',
          transformOrigin: 'right',
          borderLeft: '2px solid rgba(0,0,0,0.15)',
        }}
      ></div>
      
      {/* Top side */}
      <div 
        className="absolute left-0 right-0 top-0 h-10"
        style={{ 
          backgroundColor: baseColorObject.hex,
          transform: 'rotateX(90deg) translateZ(5px)',
          transformOrigin: 'top',
          borderBottom: '2px solid rgba(0,0,0,0.15)',
        }}
      ></div>
      
      {/* Bottom side */}
      <div 
        className="absolute left-0 right-0 bottom-0 h-10"
        style={{ 
          backgroundColor: baseColorObject.hex,
          transform: 'rotateX(-90deg) translateZ(5px)',
          transformOrigin: 'bottom',
          borderTop: '2px solid rgba(0,0,0,0.15)',
        }}
      ></div>
      
      {/* Front face (primary color based on view) */}
      <div 
        className="absolute inset-0 rounded-md"
        style={{ 
          backgroundColor: primaryColor, 
          transform: 'translateZ(1px)',
          boxShadow: '0 0 8px rgba(0,0,0,0.1)',
        }}
      >
        {/* Inner cutout area that shows the glass */}
        <div 
          className="absolute" 
          style={{ 
            inset: `${frameThickness}px`,
            border: `2px solid ${primaryColor}`,
            borderColor: `${primaryColor} rgba(0,0,0,0.2) rgba(0,0,0,0.2) ${primaryColor}`,
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)',
          }}
        ></div>
      </div>
      
      {/* Back face of frame */}
      <div 
        className="absolute inset-0 rounded-md"
        style={{ 
          backgroundColor: secondaryColor, 
          transform: `translateZ(-${frameDepth}px)`,
          boxShadow: 'inset 0 0 8px rgba(0,0,0,0.15)',
        }}
      >
        {/* Inner cutout area that shows the glass on back side */}
        <div 
          className="absolute" 
          style={{ 
            inset: `${frameThickness}px`,
            border: `2px solid ${secondaryColor}`,
            borderColor: `${secondaryColor} rgba(0,0,0,0.2) rgba(0,0,0,0.2) ${secondaryColor}`,
            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)',
          }}
        ></div>
      </div>
      
      {/* Back glass panel (always visible but more prominent from back side) */}
      <div 
        className="absolute"
        style={{ 
          inset: `${frameThickness}px`,
          backgroundColor: 'rgba(220, 230, 240, 0.6)',
          transform: 'translateZ(-8px)',
          backdropFilter: 'blur(1px)',
          boxShadow: 'inset 0 0 15px rgba(255, 255, 255, 0.3)',
        }}
      ></div>
    </>
  );
};
