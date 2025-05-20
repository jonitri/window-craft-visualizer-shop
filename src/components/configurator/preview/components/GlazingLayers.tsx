
interface GlazingLayersProps {
  glazingId: string;
}

export const GlazingLayers = ({ glazingId }: GlazingLayersProps) => {
  return (
    <>
      {glazingId === 'glz-double' && (
        <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '50%'}}></div>
      )}
      
      {glazingId === 'glz-triple' && (
        <>
          <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '33%'}}></div>
          <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '66%'}}></div>
        </>
      )}
      
      {glazingId === 'glz-quad' && (
        <>
          <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '25%'}}></div>
          <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '50%'}}></div>
          <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '75%'}}></div>
        </>
      )}
    </>
  );
};
