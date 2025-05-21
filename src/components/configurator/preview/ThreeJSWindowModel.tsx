
import { useRef, useCallback } from 'react';
import { ColorOption } from '@/data/products';
import { useThreeJsScene } from './hooks/useThreeJsScene';
import { useTextureLoader } from './hooks/useTextureLoader';
import { createWindowModel } from './utils/windowModelCreator';
import { useWindowAnimation } from './hooks/useWindowAnimation';
import * as THREE from 'three';

interface ThreeJSWindowModelProps {
  width: number;
  height: number;
  rotationX: number;
  rotationY: number;
  baseColorObject: ColorOption;
  outsideColorObject: ColorOption;
  insideColorObject: ColorOption;
  viewMode: 'front' | 'back';
  isAutoRotating: boolean;
}

export const ThreeJSWindowModel = ({
  width,
  height,
  rotationX,
  rotationY,
  baseColorObject,
  outsideColorObject,
  insideColorObject,
  viewMode,
  isAutoRotating
}: ThreeJSWindowModelProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const windowModelRef = useRef<THREE.Group | null>(null);
  
  // Initialize Three.js scene
  const sceneRefs = useThreeJsScene(mountRef);
  
  // Handle texture loading and model creation
  const handleTextureLoaded = useCallback((texture: THREE.Texture) => {
    if (!sceneRefs.scene.current) return;
    
    // Create window model when texture is loaded
    createWindowModel(
      sceneRefs.scene.current, 
      windowModelRef,
      {
        width,
        height,
        baseColorObject,
        outsideColorObject,
        insideColorObject,
        textureRef: { current: texture }
      }
    );
  }, [width, height, baseColorObject, outsideColorObject, insideColorObject]);
  
  const textureRef = useTextureLoader(handleTextureLoaded);
  
  // Set up animation
  useWindowAnimation({
    rotationX,
    rotationY,
    viewMode,
    isAutoRotating,
    sceneRefs,
    windowModelRef
  });

  return <div ref={mountRef} className="w-full h-full" style={{ minHeight: "300px" }} />;
};
