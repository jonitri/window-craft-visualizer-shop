
interface WindowHandlesProps {
  isFixed: boolean;
  viewMode: 'front' | 'back';
}

export const WindowHandles = ({ isFixed, viewMode }: WindowHandlesProps) => {
  if (isFixed) {
    return null;
  }

  const isFrontView = viewMode === 'front';
  
  return (
    <>
      {/* Handle on the primary face */}
      <div
        className="absolute z-10"
        style={{
          width: '12px',
          height: '30px',
          right: isFrontView ? '20px' : 'auto',
          left: isFrontView ? 'auto' : '20px',
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
    </>
  );
};
