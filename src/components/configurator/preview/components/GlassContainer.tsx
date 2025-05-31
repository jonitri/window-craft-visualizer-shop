
interface GlassPanelProps {
  style?: React.CSSProperties;
}

const GlassPanel = ({ style }: GlassPanelProps) => (
  <div className="glass-panel" style={style}>
    <div className="glass-surface"></div>
    <div className="glass-edge top"></div>
    <div className="glass-edge bottom"></div>
    <div className="glass-edge left"></div>
    <div className="glass-edge right"></div>
    <div className="glass-reflection"></div>
  </div>
);

interface GlassContainerProps {
  windowType: string;
}

export const GlassContainer = ({ windowType }: GlassContainerProps) => {
  const renderGlassPanels = () => {
    switch (windowType) {
      case 'double-leaf':
        return (
          <>
            <GlassPanel style={{ width: '48%', right: '52%' }} />
            <GlassPanel style={{ width: '48%', left: '52%' }} />
          </>
        );
      
      case 'triple-leaf':
        return (
          <>
            <GlassPanel style={{ width: '30%', left: '2%' }} />
            <GlassPanel style={{ width: '30%', left: '35%' }} />
            <GlassPanel style={{ width: '30%', left: '68%' }} />
          </>
        );
      
      default:
        return <GlassPanel />;
    }
  };

  return (
    <div className="glass-container">
      {renderGlassPanels()}
    </div>
  );
};
