
interface WindowFrameProps {
  windowType: string;
}

export const WindowFrame = ({ windowType }: WindowFrameProps) => {
  const renderFrameEdges = () => {
    const baseEdges = ['top', 'bottom', 'left', 'right'];
    
    if (windowType === 'double-leaf') {
      return [...baseEdges, 'center-vertical'];
    }
    
    if (windowType === 'triple-leaf') {
      return [...baseEdges, 'center-left', 'center-right'];
    }
    
    return baseEdges;
  };

  return (
    <div className="frame-container">
      <div className="frame-front"></div>
      <div className="frame-back"></div>
      <div className="frame-edges">
        {renderFrameEdges().map(edge => (
          <div key={edge} className={`frame-edge ${edge}`}></div>
        ))}
      </div>
    </div>
  );
};
