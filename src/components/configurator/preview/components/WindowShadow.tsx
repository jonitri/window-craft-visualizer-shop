
export const WindowShadow = () => {
  return (
    <div
      className="absolute"
      style={{
        inset: '-10px',
        transform: 'translateZ(-10px)',
        backgroundColor: 'rgba(0,0,0,0.07)',
        filter: 'blur(10px)',
        borderRadius: '8px',
      }}
    />
  );
};
