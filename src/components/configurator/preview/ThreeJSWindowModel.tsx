
import { useRef, useCallback, useEffect } from 'react';
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
  console.log("ThreeJSWindowModel rendered with dimensions:", width, height);
  const mountRef = useRef<HTMLDivElement>(null);
  const windowModelRef = useRef<THREE.Group | null>(null);
  const modelCreatedRef = useRef<boolean>(false);
  
  // Initialize Three.js scene
  const sceneRefs = useThreeJsScene(mountRef);
  
  // Handle texture loading and model creation
  const handleTextureLoaded = useCallback((texture: THREE.Texture) => {
    console.log("Texture loaded callback triggered");
    if (!sceneRefs.scene.current) {
      console.error("Scene not initialized");
      return;
    }

    try {
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
      
      modelCreatedRef.current = true;
      console.log("Window model created successfully");
    } catch (error) {
      console.error("Error creating window model:", error);
    }
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

  // Debug log for component mounting and props changes
  useEffect(() => {
    console.log("ThreeJSWindowModel mounted or updated");
    console.log("Current props:", { width, height, rotationX, rotationY, viewMode, isAutoRotating });
    console.log("Scene initialized:", !!sceneRefs.scene.current);
    console.log("Renderer initialized:", !!sceneRefs.renderer.current);
    console.log("Model created:", modelCreatedRef.current);
    
    return () => {
      console.log("ThreeJSWindowModel unmounting");
    };
  }, [width, height, rotationX, rotationY, viewMode, isAutoRotating]);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full" 
      style={{ 
        minHeight: "400px", 
        position: "relative",
        zIndex: 10 
      }}
    >
      {/* Debugging overlay */}
      {process.env.NODE_ENV === 'development' && !modelCreatedRef.current && (
        <div 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            background: 'rgba(255,0,0,0.1)', 
            padding: '5px',
            color: 'white',
            zIndex: 20
          }}
        >
          Loading 3D model...
        </div>
      )}
    </div>
  );
};
