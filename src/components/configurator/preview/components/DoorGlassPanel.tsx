
import { GlazingLayers } from './GlazingLayers';

interface DoorGlassPanelProps {
  position: 'top' | 'bottom';
  left: string;
  right: string;
  top: string;
  bottom: string;
  glassOpacity: number;
  rubberColor: string;
  glazingId: string;
  profileName?: string;
  isFront?: boolean;
}

export const DoorGlassPanel = ({
  position,
  left,
  right,
  top,
  bottom,
  glassOpacity,
  rubberColor,
  glazingId,
  profileName,
  isFront = true
}: DoorGlassPanelProps) => {
  const transform = isFront 
    ? 'translateZ(6px)' 
    : 'rotateY(180deg) translateZ(6px)';

  return (
    <div 
      className="absolute flex items-center justify-center"
      style={{ 
        left,
        right,
        top,
        bottom,
        backgroundColor: `rgba(220, 230, 240, ${glassOpacity})`,
        boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.2), 0 0 20px rgba(255, 255, 255, 0.3)',
        borderRadius: '2px',
        transform,
        border: `2px solid ${rubberColor}`,
      }}
    >
      {/* Display profile name only on front panel and only for top position */}
      {isFront && position === 'top' && profileName && (
        <div className="text-xs text-center text-gray-600 font-medium opacity-70 z-10">
          {profileName}
        </div>
      )}
      
      {/* Glazing layers visualization */}
      <GlazingLayers glazingId={glazingId} />
    </div>
  );
};
