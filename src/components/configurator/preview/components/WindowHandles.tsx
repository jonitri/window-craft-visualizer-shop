
interface WindowHandlesProps {
  isFixed: boolean;
}

export const WindowHandles = ({ isFixed }: WindowHandlesProps) => {
  if (isFixed) {
    return null;
  }
  
  return (
    <>
      {/* Handle for front side - positioned properly */}
      <div
        className="absolute z-10"
        style={{
          width: '12px',
          height: '30px',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%) translateZ(6px)',
          backgroundColor: '#888',
          borderRadius: '2px',
          boxShadow: '0 0 3px rgba(0,0,0,0.3)'
        }}
      >
        <div
          className="absolute"
          style={{
            width: '20px',
            height: '5px',
            left: '-4px',
            top: '12px',
            backgroundColor: '#777',
            borderRadius: '1px',
          }}
        />
      </div>

      {/* Handle for back side - positioned properly */}
      <div
        className="absolute z-10"
        style={{
          width: '12px',
          height: '30px',
          left: '20px',
          top: '50%',
          transform: 'translateY(-50%) rotateY(180deg) translateZ(6px)',
          backgroundColor: '#888',
          borderRadius: '2px',
          boxShadow: '0 0 3px rgba(0,0,0,0.3)'
        }}
      >
        <div
          className="absolute"
          style={{
            width: '20px',
            height: '5px',
            left: '-4px',
            top: '12px',
            backgroundColor: '#777',
            borderRadius: '1px',
          }}
        />
      </div>
    </>
  );
};
