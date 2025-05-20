
interface DoorHandleProps {
  position: 'left' | 'right';
  top?: string;
  isFront?: boolean;
}

export const DoorHandle = ({ 
  position, 
  top = '50%',
  isFront = true 
}: DoorHandleProps) => {
  // Determine positioning based on whether it's front or back and left or right
  const side = isFront 
    ? (position === 'right' ? 'right' : 'left')
    : (position === 'right' ? 'left' : 'right');
  
  const sideValue = position === 'right' ? '20%' : '20%';
  const transform = isFront
    ? `translateY(-50%) ${position === 'left' ? 'rotateY(180deg)' : ''} translateZ(6px)`
    : `translateY(-50%) rotateY(180deg) ${position === 'right' ? 'rotateY(180deg)' : ''} translateZ(6px)`;

  return (
    <div 
      className="absolute z-10"
      style={{ 
        [side]: sideValue,
        top,
        width: '15px', 
        height: '60px',
        backgroundColor: '#999',
        borderRadius: '3px',
        boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3), inset 1px 1px 2px rgba(255, 255, 255, 0.5)',
        transform,
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
  );
};
