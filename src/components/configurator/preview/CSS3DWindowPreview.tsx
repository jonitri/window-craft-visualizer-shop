
import { ColorOption } from '@/data/products';

// Import refactored components
import { WindowStructure } from './components/WindowStructure';
import { WindowFrame } from './components/WindowFrame';
import { GlassContainer } from './components/GlassContainer';
import { WindowSash } from './components/WindowSash';
import { AnimationStatus } from './components/AnimationStatus';

// Import custom hooks
import { useWindowAnimation } from './hooks/useWindowAnimation';
import { useAutoRotation } from './hooks/useAutoRotation';
import { calculateWindowDimensions, createContainerStyle } from './utils/windowStyles';

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
  const { animationPhase } = useWindowAnimation();
  const { autoRotationAngle } = useAutoRotation(isAutoRotating);

  const { windowWidth, windowHeight } = calculateWindowDimensions(width, height);
  
  const currentRotationY = isAutoRotating ? autoRotationAngle : rotationY;
  const finalRotationY = viewMode === 'back' ? currentRotationY + 180 : currentRotationY;

  // Enhanced 3D styles with proper depth and perspective
  const window3DStyle: React.CSSProperties = {
    width: `${windowWidth}px`,
    height: `${windowHeight}px`,
    position: 'relative',
    transformStyle: 'preserve-3d',
    transform: `rotateX(${rotationX}deg) rotateY(${finalRotationY}deg)`,
    transition: isAutoRotating ? 'none' : 'transform 0.6s ease-out',
  };

  // Frame styles with actual thickness
  const frameStyle: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d',
  };

  // Frame face styles
  const frameFrontStyle: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: outsideColorObject.hex,
    border: `8px solid ${baseColorObject.hex}`,
    transform: 'translateZ(20px)',
    boxSizing: 'border-box',
  };

  const frameBackStyle: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: insideColorObject.hex,
    border: `8px solid ${baseColorObject.hex}`,
    transform: 'translateZ(-20px)',
    boxSizing: 'border-box',
  };

  // Frame sides (thickness)
  const frameTopStyle: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '40px',
    backgroundColor: baseColorObject.hex,
    transform: 'rotateX(90deg) translateZ(20px)',
    transformOrigin: 'top',
  };

  const frameBottomStyle: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '40px',
    bottom: '0',
    backgroundColor: baseColorObject.hex,
    transform: 'rotateX(-90deg) translateZ(20px)',
    transformOrigin: 'bottom',
  };

  const frameLeftStyle: React.CSSProperties = {
    position: 'absolute',
    width: '40px',
    height: '100%',
    backgroundColor: baseColorObject.hex,
    transform: 'rotateY(-90deg) translateZ(20px)',
    transformOrigin: 'left',
  };

  const frameRightStyle: React.CSSProperties = {
    position: 'absolute',
    width: '40px',
    height: '100%',
    right: '0',
    backgroundColor: baseColorObject.hex,
    transform: 'rotateY(90deg) translateZ(20px)',
    transformOrigin: 'right',
  };

  // Glass styles
  const glassStyle: React.CSSProperties = {
    position: 'absolute',
    top: '30px',
    left: '30px',
    right: '30px',
    bottom: '30px',
    backgroundColor: 'rgba(173, 216, 230, 0.3)',
    border: `2px solid ${rubberColorObject.hex}`,
    transform: 'translateZ(0px)',
    backdropFilter: 'blur(1px)',
    boxShadow: 'inset 0 0 20px rgba(255,255,255,0.2)',
  };

  // Handle style
  const handleStyle: React.CSSProperties = {
    position: 'absolute',
    right: '50px',
    top: '50%',
    transform: 'translateY(-50%) translateZ(25px)',
    width: '12px',
    height: '80px',
    backgroundColor: '#444',
    borderRadius: '6px',
    boxShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  };

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
      <div style={window3DStyle}>
        {/* Frame structure */}
        <div style={frameStyle}>
          {/* Frame faces */}
          <div style={frameFrontStyle}></div>
          <div style={frameBackStyle}></div>
          
          {/* Frame thickness sides */}
          <div style={frameTopStyle}></div>
          <div style={frameBottomStyle}></div>
          <div style={frameLeftStyle}></div>
          <div style={frameRightStyle}></div>
          
          {/* Glass panel */}
          <div style={glassStyle}></div>
          
          {/* Window handle */}
          {selectedWindowType !== 'fixed' && (
            <div style={handleStyle}></div>
          )}
          
          {/* Double leaf center divider */}
          {selectedWindowType === 'double-leaf' && (
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '20px',
              bottom: '20px',
              width: '8px',
              backgroundColor: baseColorObject.hex,
              transform: 'translateX(-50%) translateZ(25px)',
            }}></div>
          )}
          
          {/* Triple leaf dividers */}
          {selectedWindowType === 'triple-leaf' && (
            <>
              <div style={{
                position: 'absolute',
                left: '33.33%',
                top: '20px',
                bottom: '20px',
                width: '8px',
                backgroundColor: baseColorObject.hex,
                transform: 'translateX(-50%) translateZ(25px)',
              }}></div>
              <div style={{
                position: 'absolute',
                left: '66.66%',
                top: '20px',
                bottom: '20px',
                width: '8px',
                backgroundColor: baseColorObject.hex,
                transform: 'translateX(-50%) translateZ(25px)',
              }}></div>
            </>
          )}
        </div>
      </div>
      
      <AnimationStatus animationPhase={animationPhase} />
    </div>
  );
};
