
interface DoorHingeProps {
  position: 'top' | 'bottom';
  side: 'left' | 'right';
  isFront?: boolean;
}

export const DoorHinge = ({ 
  position, 
  side, 
  isFront = true 
}: DoorHingeProps) => {
  // Determine vertical position
  const verticalPos = position === 'top' ? 'top' : 'bottom';
  const verticalValue = '20%';
  
  // Determine horizontal position based on front/back and side
  const horizontalPos = isFront 
    ? side 
    : (side === 'left' ? 'right' : 'left');
  const horizontalValue = '10%';
  
  // Create transform based on front/back
  const transform = isFront 
    ? 'translateZ(6px)' 
    : 'rotateY(180deg) translateZ(6px)';
  
  return (
    <div 
      className="absolute w-[15px] h-[40px] bg-gray-400 rounded-sm" 
      style={{ 
        [horizontalPos]: horizontalValue, 
        [verticalPos]: verticalValue, 
        transform,
        boxShadow: '2px 2px 4px rgba(0,0,0,0.2)' 
      }}
    />
  );
};
