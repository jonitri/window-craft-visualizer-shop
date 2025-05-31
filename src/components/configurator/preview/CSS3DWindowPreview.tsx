
import { useEffect, useState } from 'react';
import { ColorOption } from '@/data/products';
import './css3d-window.css';

interface CSS3DWindowPreviewProps {
  width: number;
  height: number;
  selectedWindowType: string;
  baseColorObject: ColorOption;
  outsideColorObject: ColorOption;
  insideColorObject: ColorOption;
  rubberColorObject: ColorOption;
  rotationX: number;
  rotationY: number;
  viewMode: 'front' | 'back';
  isAutoRotating: boolean;
}

export const CSS3DWindowPreview = ({
  width,
  height,
  selectedWindowType,
  baseColorObject,
  outsideColorObject,
  insideColorObject,
  rubberColorObject,
  rotationX,
  rotationY,
  viewMode,
  isAutoRotating
}: CSS3DWindowPreviewProps) => {
  const [animationPhase, setAnimationPhase] = useState<'closed' | 'opening' | 'open'>('closed');
  const [autoRotationAngle, setAutoRotationAngle] = useState(0);

  // Handle auto rotation
  useEffect(() => {
    if (!isAutoRotating) return;
    
    const interval = setInterval(() => {
      setAutoRotationAngle(prev => (prev + 2) % 360);
    }, 50);
    
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  // Cycle through animation phases for demonstration
  useEffect(() => {
    const phaseInterval = setInterval(() => {
      setAnimationPhase(prev => {
        switch (prev) {
          case 'closed': return 'opening';
          case 'opening': return 'open';
          case 'open': return 'closed';
          default: return 'closed';
        }
      });
    }, 3000);
    
    return () => clearInterval(phaseInterval);
  }, []);

  const aspectRatio = width / height;
  const windowWidth = aspectRatio > 1 ? 300 : 200;
  const windowHeight = windowWidth / aspectRatio;

  const currentRotationY = isAutoRotating ? autoRotationAngle : rotationY;
  const finalRotationY = viewMode === 'back' ? currentRotationY + 180 : currentRotationY;

  const containerStyle = {
    '--window-width': `${windowWidth}px`,
    '--window-height': `${windowHeight}px`,
    '--base-color': baseColorObject.hex,
    '--outside-color': outsideColorObject.hex,
    '--inside-color': insideColorObject.hex,
    '--rubber-color': rubberColorObject.hex,
    '--rotation-x': `${rotationX}deg`,
    '--rotation-y': `${finalRotationY}deg`,
  } as React.CSSProperties;

  const renderWindow = () => {
    switch (selectedWindowType) {
      case 'double-leaf':
        return renderDoubleLeafWindow();
      case 'triple-leaf':
        return renderTripleLeafWindow();
      case 'fixed':
        return renderFixedWindow();
      default:
        return renderSingleLeafWindow();
    }
  };

  const renderSingleLeafWindow = () => (
    <div className={`window-3d single-leaf ${animationPhase}`}>
      <div className="window-frame">
        {/* Main frame structure with front and back sides */}
        <div className="frame-front"></div>
        <div className="frame-back"></div>
        <div className="frame-edges">
          <div className="frame-edge top"></div>
          <div className="frame-edge bottom"></div>
          <div className="frame-edge left"></div>
          <div className="frame-edge right"></div>
        </div>
        
        {/* Window sash with proper layering */}
        <div className="window-sash">
          <div className="sash-front"></div>
          <div className="sash-back"></div>
          
          {/* Glass panel in the center */}
          <div className="glass-panel">
            <div className="glass-surface"></div>
            <div className="glass-reflection"></div>
          </div>
          
          {/* Rubber seals around glass */}
          <div className="rubber-seals">
            <div className="rubber-seal top"></div>
            <div className="rubber-seal bottom"></div>
            <div className="rubber-seal left"></div>
            <div className="rubber-seal right"></div>
          </div>
          
          {/* Window handle */}
          <div className="window-handle">
            <div className="handle-base"></div>
            <div className="handle-lever"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDoubleLeafWindow = () => (
    <div className={`window-3d double-leaf ${animationPhase}`}>
      <div className="window-frame">
        <div className="frame-front"></div>
        <div className="frame-back"></div>
        <div className="frame-edges">
          <div className="frame-edge top"></div>
          <div className="frame-edge bottom"></div>
          <div className="frame-edge left"></div>
          <div className="frame-edge right"></div>
          <div className="frame-edge center-vertical"></div>
        </div>
        
        {/* Left sash */}
        <div className="window-sash left-sash">
          <div className="sash-front"></div>
          <div className="sash-back"></div>
          <div className="glass-panel">
            <div className="glass-surface"></div>
            <div className="glass-reflection"></div>
          </div>
          <div className="rubber-seals">
            <div className="rubber-seal top"></div>
            <div className="rubber-seal bottom"></div>
            <div className="rubber-seal left"></div>
            <div className="rubber-seal right"></div>
          </div>
          <div className="window-handle">
            <div className="handle-base"></div>
            <div className="handle-lever"></div>
          </div>
        </div>
        
        {/* Right sash */}
        <div className="window-sash right-sash">
          <div className="sash-front"></div>
          <div className="sash-back"></div>
          <div className="glass-panel">
            <div className="glass-surface"></div>
            <div className="glass-reflection"></div>
          </div>
          <div className="rubber-seals">
            <div className="rubber-seal top"></div>
            <div className="rubber-seal bottom"></div>
            <div className="rubber-seal left"></div>
            <div className="rubber-seal right"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTripleLeafWindow = () => (
    <div className={`window-3d triple-leaf ${animationPhase}`}>
      <div className="window-frame">
        <div className="frame-front"></div>
        <div className="frame-back"></div>
        <div className="frame-edges">
          <div className="frame-edge top"></div>
          <div className="frame-edge bottom"></div>
          <div className="frame-edge left"></div>
          <div className="frame-edge right"></div>
          <div className="frame-edge center-left"></div>
          <div className="frame-edge center-right"></div>
        </div>
        
        {['left', 'center', 'right'].map((position, index) => (
          <div key={position} className={`window-sash ${position}-sash`}>
            <div className="sash-front"></div>
            <div className="sash-back"></div>
            <div className="glass-panel">
              <div className="glass-surface"></div>
              <div className="glass-reflection"></div>
            </div>
            <div className="rubber-seals">
              <div className="rubber-seal top"></div>
              <div className="rubber-seal bottom"></div>
              <div className="rubber-seal left"></div>
              <div className="rubber-seal right"></div>
            </div>
            {index === 0 && (
              <div className="window-handle">
                <div className="handle-base"></div>
                <div className="handle-lever"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderFixedWindow = () => (
    <div className={`window-3d fixed ${animationPhase}`}>
      <div className="window-frame">
        <div className="frame-front"></div>
        <div className="frame-back"></div>
        <div className="frame-edges">
          <div className="frame-edge top"></div>
          <div className="frame-edge bottom"></div>
          <div className="frame-edge left"></div>
          <div className="frame-edge right"></div>
        </div>
        
        <div className="window-sash fixed-sash">
          <div className="sash-front"></div>
          <div className="sash-back"></div>
          <div className="glass-panel">
            <div className="glass-surface"></div>
            <div className="glass-reflection"></div>
          </div>
          <div className="rubber-seals">
            <div className="rubber-seal top"></div>
            <div className="rubber-seal bottom"></div>
            <div className="rubber-seal left"></div>
            <div className="rubber-seal right"></div>
          </div>
          <div className="fixed-label">FIXED</div>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      className="css3d-window-preview"
      style={{
        height: '450px',
        background: 'linear-gradient(to bottom, #e0e8f0, #c0d0e0)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1000px',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <div className="window-container" style={containerStyle}>
        {renderWindow()}
      </div>
      
      <div className="animation-status" style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px'
      }}>
        {animationPhase.charAt(0).toUpperCase() + animationPhase.slice(1)}
      </div>
    </div>
  );
};
