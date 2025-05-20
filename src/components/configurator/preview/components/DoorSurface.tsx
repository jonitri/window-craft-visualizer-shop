
interface DoorSurfaceProps {
  color: string;
  isFront?: boolean;
}

export const DoorSurface = ({ 
  color, 
  isFront = true 
}: DoorSurfaceProps) => {
  const transform = isFront 
    ? 'translateZ(5px)' 
    : 'rotateY(180deg) translateZ(5px)';
  
  return (
    <div 
      className="absolute inset-0 rounded-md"
      style={{ 
        backgroundColor: color, 
        transform,
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)',
      }}
    />
  );
};
