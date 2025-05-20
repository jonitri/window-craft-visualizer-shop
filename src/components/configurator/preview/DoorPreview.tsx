
import { forwardRef } from 'react';
import { ColorOption } from '@/data/products';
import { WindowShadow } from './components/WindowShadow';
import { DoorGlassPanel } from './components/DoorGlassPanel';
import { DoorHandle } from './components/DoorHandle';
import { DoorHinge } from './components/DoorHinge';
import { DoorRubberSeal } from './components/DoorRubberSeal';
import { ProfileLabel } from './components/ProfileLabel';
import { DoorFrameSides } from './components/DoorFrameSides';
import { DoorSurface } from './components/DoorSurface';

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
    const showGlassPanel = profileObject && (profileObject.id !== 'evolutionDrive-60');
    const showSecondGlassPanel = profileObject && profileObject.id === 'bluEvolution-92';

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
        />
        
        {/* Frame sides for proper depth */}
        <DoorFrameSides baseColor={baseColorObject.hex} />
        
        {/* Outside surface (front) */}
        <DoorSurface color={outsideColorObject.hex} isFront={true} />

        {/* Inside surface (back) */}
        <DoorSurface color={insideColorObject.hex} isFront={false} />
        
        {/* Door handles */}
        <DoorHandle position="right" isFront={true} />
        <DoorHandle position="right" isFront={false} />
        
        {/* Door glass panels */}
        {showGlassPanel && (
          <>
            {/* Top panel - front */}
            <DoorGlassPanel 
              position="top"
              left="20%"
              right="20%"
              top="20%"
              bottom="50%"
              glassOpacity={glassOpacity}
              rubberColor={rubberColorObject.hex}
              glazingId={glazingObject.id}
              profileName={profileObject.name}
              isFront={true}
            />
            
            {/* Top panel - back */}
            <DoorGlassPanel 
              position="top"
              left="20%"
              right="20%"
              top="20%"
              bottom="50%"
              glassOpacity={glassOpacity}
              rubberColor={rubberColorObject.hex}
              glazingId={glazingObject.id}
              isFront={false}
            />
          </>
        )}
        
        {/* Premium door additional panels */}
        {showSecondGlassPanel && (
          <>
            {/* Bottom panel - front */}
            <DoorGlassPanel 
              position="bottom"
              left="20%"
              right="20%"
              top="60%"
              bottom="20%"
              glassOpacity={glassOpacity}
              rubberColor={rubberColorObject.hex}
              glazingId={glazingObject.id}
              isFront={true}
            />
            
            {/* Bottom panel - back */}
            <DoorGlassPanel 
              position="bottom"
              left="20%"
              right="20%"
              top="60%"
              bottom="20%"
              glassOpacity={glassOpacity}
              rubberColor={rubberColorObject.hex}
              glazingId={glazingObject.id}
              isFront={false}
            />
          </>
        )}

        {/* Rubber seals */}
        <DoorRubberSeal rubberColor={rubberColorObject.hex} isFront={true} />
        <DoorRubberSeal rubberColor={rubberColorObject.hex} isFront={false} />
        
        {/* Door hinges */}
        <DoorHinge position="top" side="left" isFront={true} />
        <DoorHinge position="bottom" side="left" isFront={true} />
        <DoorHinge position="top" side="left" isFront={false} />
        <DoorHinge position="bottom" side="left" isFront={false} />

        {/* Profile name on the door */}
        {profileObject && (
          <ProfileLabel profileName={profileObject.name} position="bottom" />
        )}
        
        {/* Door silhouette shadow for depth */}
        <WindowShadow />
      </div>
    );
  }
);

DoorPreview.displayName = 'DoorPreview';
