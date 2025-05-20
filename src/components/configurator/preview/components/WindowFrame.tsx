
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

  return (
    <>
      {/* Base frame with depth */}
      <div 
        className="absolute inset-0 rounded-md"
        style={{ 
          backgroundColor: baseColorObject.hex,
          transform: 'translateZ(-3px)',
          transformStyle: 'preserve-3d',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
      ></div>
      
      {/* Frame sides for depth */}
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
      
      {/* Main frame face (primary color based on view) */}
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
    </>
  );
};
