
import { ColorOption } from '@/data/products';
import './css/base.css';
import './css/frame.css';
import './css/sash.css';
import './css/glass.css';
import './css/animations.css';
import './css/responsive.css';

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

  const containerStyle = createContainerStyle(
    windowWidth,
    windowHeight,
    baseColorObject,
    outsideColorObject,
    insideColorObject,
    rubberColorObject,
    rotationX,
    finalRotationY
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
        <WindowStructure animationPhase={animationPhase} windowType={selectedWindowType}>
          <WindowFrame windowType={selectedWindowType} />
          <GlassContainer windowType={selectedWindowType} />
          <WindowSash windowType={selectedWindowType} />
        </WindowStructure>
      </div>
      
      <AnimationStatus animationPhase={animationPhase} />
    </div>
  );
};
