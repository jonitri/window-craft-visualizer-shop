
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { createWindowModel } from '../utils/windowModelCreator';
import { ColorOption } from '@/data/products';

interface UseWindowModelProps {
  scene: THREE.Scene | null;
  width: number;
  height: number;
  selectedWindowType: string;
  baseColorObject: ColorOption;
  outsideColorObject: ColorOption;
  insideColorObject: ColorOption;
  rubberColorObject: ColorOption;
}

export const useWindowModel = ({
  scene,
  width,
  height,
  selectedWindowType,
  baseColorObject,
  outsideColorObject,
  insideColorObject,
  rubberColorObject
}: UseWindowModelProps) => {
  const windowModelRef = useRef<THREE.Group | null>(null);

  // Create/update window model
  const createModel = () => {
    console.log("Creating window model", { selectedWindowType, width, height });
    
    if (!scene) {
      console.error("Scene is not available");
      return;
    }

    // Remove existing model
    if (windowModelRef.current) {
      scene.remove(windowModelRef.current);
      windowModelRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach(material => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    }

    // Create a simple texture
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d');
    if (context) {
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, 256, 256);
      context.fillStyle = '#cccccc';
      for (let i = 0; i < 256; i += 32) {
        for (let j = 0; j < 256; j += 32) {
          if ((i + j) % 64 === 0) {
            context.fillRect(i, j, 32, 32);
          }
        }
      }
    }
    const texture = new THREE.CanvasTexture(canvas);

    // Create new model with the texture
    createWindowModel(
      scene,
      windowModelRef,
      {
        width,
        height,
        baseColorObject,
        outsideColorObject,
        insideColorObject,
        rubberColorObject,
        textureRef: { current: texture },
        windowType: selectedWindowType as 'single-leaf' | 'double-leaf' | 'triple-leaf' | 'fixed'
      }
    );

    console.log("Window model creation completed");
  };

  // Update model when dependencies change
  useEffect(() => {
    createModel();
  }, [scene, width, height, baseColorObject.id, outsideColorObject.id, insideColorObject.id, rubberColorObject.id, selectedWindowType]);

  return { windowModelRef };
};
