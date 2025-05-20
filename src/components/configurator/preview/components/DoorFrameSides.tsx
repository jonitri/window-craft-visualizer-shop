
interface DoorFrameSidesProps {
  baseColor: string;
}

export const DoorFrameSides = ({ baseColor }: DoorFrameSidesProps) => {
  return (
    <>
      {/* Left side */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-10"
        style={{ 
          backgroundColor: baseColor,
          transform: 'rotateY(-90deg) translateZ(0px)',
          transformOrigin: 'left',
          borderRight: '1px solid rgba(0,0,0,0.1)',
        }}
      />
      
      {/* Right side */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-10"
        style={{ 
          backgroundColor: baseColor,
          transform: 'rotateY(90deg) translateZ(0px)',
          transformOrigin: 'right',
          borderLeft: '1px solid rgba(0,0,0,0.1)',
        }}
      />
      
      {/* Top side */}
      <div 
        className="absolute left-0 right-0 top-0 h-10"
        style={{ 
          backgroundColor: baseColor,
          transform: 'rotateX(90deg) translateZ(0px)',
          transformOrigin: 'top',
          borderBottom: '1px solid rgba(0,0,0,0.1)',
        }}
      />
      
      {/* Bottom side */}
      <div 
        className="absolute left-0 right-0 bottom-0 h-10"
        style={{ 
          backgroundColor: baseColor,
          transform: 'rotateX(-90deg) translateZ(0px)',
          transformOrigin: 'bottom',
          borderTop: '1px solid rgba(0,0,0,0.1)',
        }}
      />
    </>
  );
};
