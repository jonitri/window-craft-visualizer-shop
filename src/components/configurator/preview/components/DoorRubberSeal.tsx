
interface DoorRubberSealProps {
  rubberColor: string;
  isFront?: boolean;
}

export const DoorRubberSeal = ({ 
  rubberColor, 
  isFront = true 
}: DoorRubberSealProps) => {
  const transform = isFront 
    ? 'translateZ(6px)' 
    : 'rotateY(180deg) translateZ(6px)';
  
  return (
    <div 
      className="absolute rounded-sm pointer-events-none"
      style={{ 
        inset: '5%',
        border: `3px solid ${rubberColor}`,
        opacity: 0.9,
        transform,
      }}
    />
  );
};
