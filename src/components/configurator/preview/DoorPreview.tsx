
import { forwardRef } from 'react';
import { ColorOption } from '@/data/products';
import { GlazingLayers } from './components/GlazingLayers';

interface DoorPreviewProps {
  width: number;
  height: number;
  baseColorObject: ColorOption;
  outsideColorObject: ColorOption;
  insideColorObject: ColorOption;
  rubberColorObject: ColorOption;
  glazingObject: { id: string; name: string };
  profileObject: { id: string; name: string };
  rotationX: number;
  rotationY: number;
  glassOpacity: number;
}

export const DoorPreview = forwardRef<HTMLDivElement, DoorPreviewProps>(
  ({ 
    width, 
    height, 
    baseColorObject, 
    outsideColorObject, 
    insideColorObject, 
    rubberColorObject, 
    glazingObject,
    profileObject,
    rotationX,
    rotationY,
    glassOpacity
  }, ref) => {
    return (
      <div 
        ref={ref}
        className="relative transition-transform duration-500"
        style={{
          width: `${Math.min(60, (width / height) * 45)}%`,
          height: `${Math.min(80, (height / width) * 75)}%`,
          maxWidth: '70%',
          maxHeight: '80%',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
          boxShadow: '0px 30px 60px rgba(0,0,0,0.4)',
        }}
      >
        {/* Base frame */}
        <div 
          className="absolute inset-0 rounded-md"
          style={{ 
            backgroundColor: baseColorObject.hex,
            transform: 'translateZ(0px)',
            transformStyle: 'preserve-3d',
          }}
        ></div>
        
        {/* Frame sides for proper depth */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-10"
          style={{ 
            backgroundColor: baseColorObject.hex,
            transform: 'rotateY(-90deg) translateZ(0px)',
            transformOrigin: 'left',
            borderRight: '1px solid rgba(0,0,0,0.1)',
          }}
        ></div>
        
        <div 
          className="absolute right-0 top-0 bottom-0 w-10"
          style={{ 
            backgroundColor: baseColorObject.hex,
            transform: 'rotateY(90deg) translateZ(0px)',
            transformOrigin: 'right',
            borderLeft: '1px solid rgba(0,0,0,0.1)',
          }}
        ></div>
        
        <div 
          className="absolute left-0 right-0 top-0 h-10"
          style={{ 
            backgroundColor: baseColorObject.hex,
            transform: 'rotateX(90deg) translateZ(0px)',
            transformOrigin: 'top',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
          }}
        ></div>
        
        <div 
          className="absolute left-0 right-0 bottom-0 h-10"
          style={{ 
            backgroundColor: baseColorObject.hex,
            transform: 'rotateX(-90deg) translateZ(0px)',
            transformOrigin: 'bottom',
            borderTop: '1px solid rgba(0,0,0,0.1)',
          }}
        ></div>
        
        {/* Outside surface (front) */}
        <div 
          className="absolute inset-0 rounded-md"
          style={{ 
            backgroundColor: outsideColorObject.hex, 
            transform: 'translateZ(5px)',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)',
          }}
        ></div>

        {/* Inside surface (back) */}
        <div 
          className="absolute inset-0 rounded-md"
          style={{ 
            backgroundColor: insideColorObject.hex, 
            transform: 'rotateY(180deg) translateZ(5px)',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)',
          }}
        ></div>
        
        {/* Door handle - front */}
        <div 
          className="absolute z-10"
          style={{ 
            right: '20%',
            top: '50%',
            width: '15px', 
            height: '60px',
            backgroundColor: '#999',
            borderRadius: '3px',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3), inset 1px 1px 2px rgba(255, 255, 255, 0.5)',
            transform: 'translateY(-50%) translateZ(6px)',
          }}
        >
          <div
            className="absolute"
            style={{
              width: '25px',
              height: '10px',
              left: '-5px',
              top: '25px',
              backgroundColor: '#888',
              borderRadius: '2px',
              boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)'
            }}
          />
        </div>
        
        {/* Door handle - back */}
        <div 
          className="absolute z-10"
          style={{ 
            left: '20%', 
            top: '50%',
            width: '15px', 
            height: '60px',
            backgroundColor: '#999',
            borderRadius: '3px',
            boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3), inset 1px 1px 2px rgba(255, 255, 255, 0.5)',
            transform: 'translateY(-50%) rotateY(180deg) translateZ(6px)',
          }}
        >
          <div
            className="absolute"
            style={{
              width: '25px',
              height: '10px',
              left: '-5px',
              top: '25px',
              backgroundColor: '#888',
              borderRadius: '2px',
              boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)'
            }}
          />
        </div>
        
        {/* Door glass panel - front */}
        {profileObject && (profileObject.id !== 'evolutionDrive-60') && (
          <div 
            className="absolute flex items-center justify-center"
            style={{ 
              left: '20%',
              right: '20%',
              top: '20%',
              bottom: '50%',
              backgroundColor: `rgba(220, 230, 240, ${glassOpacity})`,
              boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.2), 0 0 20px rgba(255, 255, 255, 0.3)',
              borderRadius: '2px',
              transform: 'translateZ(6px)',
              border: `2px solid ${rubberColorObject.hex}`,
            }}
          >
            {/* Profile name on door glass - clearly visible on front */}
            <div className="text-xs text-center text-gray-600 font-medium opacity-70 z-10">
              {profileObject.name}
            </div>
            
            {/* Glazing layers visualization */}
            <GlazingLayers glazingId={glazingObject.id} />
          </div>
        )}

        {/* Door glass panel - back */}
        {profileObject && (profileObject.id !== 'evolutionDrive-60') && (
          <div 
            className="absolute flex items-center justify-center"
            style={{ 
              left: '20%',
              right: '20%',
              top: '20%',
              bottom: '50%',
              backgroundColor: `rgba(220, 230, 240, ${glassOpacity})`,
              boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.2), 0 0 20px rgba(255, 255, 255, 0.3)',
              borderRadius: '2px',
              transform: 'rotateY(180deg) translateZ(6px)',
              border: `2px solid ${rubberColorObject.hex}`,
            }}
          >
            {/* Glazing layers visualization */}
            <GlazingLayers glazingId={glazingObject.id} />
          </div>
        )}
        
        {/* Premium door has additional lower panel - front */}
        {profileObject && profileObject.id === 'bluEvolution-92' && (
          <div 
            className="absolute flex items-center justify-center"
            style={{ 
              left: '20%',
              right: '20%',
              top: '60%',
              bottom: '20%',
              backgroundColor: `rgba(220, 230, 240, ${glassOpacity})`,
              boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.2), 0 0 20px rgba(255, 255, 255, 0.3)',
              borderRadius: '2px',
              transform: 'translateZ(6px)',
              border: `2px solid ${rubberColorObject.hex}`,
            }}
          >
            {/* Glazing layers visualization */}
            <GlazingLayers glazingId={glazingObject.id} />
          </div>
        )}

        {/* Premium door has additional lower panel - back */}
        {profileObject && profileObject.id === 'bluEvolution-92' && (
          <div 
            className="absolute flex items-center justify-center"
            style={{ 
              left: '20%',
              right: '20%',
              top: '60%',
              bottom: '20%',
              backgroundColor: `rgba(220, 230, 240, ${glassOpacity})`,
              boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.2), 0 0 20px rgba(255, 255, 255, 0.3)',
              borderRadius: '2px',
              transform: 'rotateY(180deg) translateZ(6px)',
              border: `2px solid ${rubberColorObject.hex}`,
            }}
          >
            {/* Glazing layers visualization */}
            <GlazingLayers glazingId={glazingObject.id} />
          </div>
        )}

        {/* Rubber seals - front */}
        <div 
          className="absolute rounded-sm pointer-events-none"
          style={{ 
            inset: '5%',
            border: `3px solid ${rubberColorObject.hex}`,
            opacity: 0.9,
            transform: 'translateZ(6px)',
          }}
        ></div>

        {/* Rubber seals - back */}
        <div 
          className="absolute rounded-sm pointer-events-none"
          style={{ 
            inset: '5%',
            border: `3px solid ${rubberColorObject.hex}`,
            opacity: 0.9,
            transform: 'rotateY(180deg) translateZ(6px)',
          }}
        ></div>
        
        {/* Door hinges - front */}
        <div className="absolute left-[10%] top-[20%] w-[15px] h-[40px] bg-gray-400 rounded-sm" style={{ transform: 'translateZ(6px)', boxShadow: '2px 2px 4px rgba(0,0,0,0.2)' }} />
        <div className="absolute left-[10%] bottom-[20%] w-[15px] h-[40px] bg-gray-400 rounded-sm" style={{ transform: 'translateZ(6px)', boxShadow: '2px 2px 4px rgba(0,0,0,0.2)' }} />
        
        {/* Door hinges - back */}
        <div className="absolute right-[10%] top-[20%] w-[15px] h-[40px] bg-gray-400 rounded-sm" style={{ transform: 'rotateY(180deg) translateZ(6px)', boxShadow: '2px 2px 4px rgba(0,0,0,0.2)' }} />
        <div className="absolute right-[10%] bottom-[20%] w-[15px] h-[40px] bg-gray-400 rounded-sm" style={{ transform: 'rotateY(180deg) translateZ(6px)', boxShadow: '2px 2px 4px rgba(0,0,0,0.2)' }} />

        {/* Profile name on the door - positioned on front */}
        {profileObject && (
          <div className="absolute bottom-[5%] left-0 right-0 text-xs text-center text-gray-100 font-medium opacity-90 z-20"
               style={{ transform: 'translateZ(6px)' }}>
            {profileObject.name}
          </div>
        )}
        
        {/* Door silhouette shadow for depth */}
        <div
          className="absolute"
          style={{
            inset: '-15px',
            transform: 'translateZ(-10px)',
            backgroundColor: 'rgba(0,0,0,0.1)',
            filter: 'blur(15px)',
            borderRadius: '10px',
          }}
        />
      </div>
    );
  }
);

DoorPreview.displayName = 'DoorPreview';
