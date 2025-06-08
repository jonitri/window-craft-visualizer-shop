
import { ColorOption } from '@/data/products';
import { useThreeJSScene } from './hooks/useThreeJSScene';
import { useWindowModel } from './hooks/useWindowModel';
import { useThreeJSAnimation } from './hooks/useThreeJSAnimation';
import { useThreeJSResize } from './hooks/useThreeJSResize';
import { ThreeJSCanvas } from './components/ThreeJSCanvas';

interface ThreeJSPreviewProps {
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

export const ThreeJSPreview = ({
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
}: ThreeJSPreviewProps) => {
  // Initialize Three.js scene
  const { mountRef, sceneRef, cameraRef, rendererRef } = useThreeJSScene();

  // Manage window model
  const { windowModelRef } = useWindowModel({
    scene: sceneRef.current,
    width,
    height,
    selectedWindowType,
    baseColorObject,
    outsideColorObject,
    insideColorObject,
    rubberColorObject
  });

  // Handle animation loop
  useThreeJSAnimation({
    scene: sceneRef.current,
    camera: cameraRef.current,
    renderer: rendererRef.current,
    windowModel: windowModelRef.current,
    rotationX,
    rotationY,
    viewMode,
    isAutoRotating
  });

  // Handle resize events
  useThreeJSResize({
    mountRef,
    camera: cameraRef.current,
    renderer: rendererRef.current
  });

  return <ThreeJSCanvas ref={mountRef} />;
};
