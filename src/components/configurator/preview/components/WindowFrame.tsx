
import { ColorOption } from '@/data/products';

interface WindowFrameProps {
  baseColorObject: ColorOption;
  outsideColorObject: ColorOption;
  insideColorObject: ColorOption;
  frameThickness: number;
}

export const WindowFrame = ({
  baseColorObject,
  outsideColorObject,
  insideColorObject,
  frameThickness
}: WindowFrameProps) => {
  return (
    <>
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
    </>
  );
};
