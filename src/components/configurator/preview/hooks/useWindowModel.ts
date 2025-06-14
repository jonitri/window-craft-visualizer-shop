
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { createWindowModel } from '../utils/windowModelCreator';
import { useGLTFLoader } from './useGLTFLoader';
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
  
  // Try to load external .glb model first
  const glbModelUrl = "https://1drv.ms/u/c/55aa21a38a5a57e0/EYRrc3FqCrBLsVxOICJhMaMBnhS8h3WPRHQrRxjA_F3nQg?e=lGOYis&download=1";
  const { model: glbModel, isLoading, error } = useGLTFLoader({ 
    modelUrl: glbModelUrl, 
    scene 
  });

  // Create fallback procedural model
  const createFallbackModel = () => {
    console.log("Creating fallback procedural window model");
    
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

    // Create fallback model
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
  };

  // Handle model loading states
  useEffect(() => {
    if (isLoading) {
      console.log("Loading external 3D model...");
      return;
    }

    if (error) {
      console.warn("Failed to load external model, using fallback:", error);
      createFallbackModel();
      return;
    }

    if (glbModel) {
      console.log("External 3D model loaded successfully");
      windowModelRef.current = glbModel;
      
      // Apply color modifications to the loaded model
      applyColorsToModel(glbModel, baseColorObject, outsideColorObject, insideColorObject, rubberColorObject);
      return;
    }

    // If no external model and not loading, create fallback
    if (!glbModel && !isLoading) {
      createFallbackModel();
    }
  }, [scene, glbModel, isLoading, error, width, height, baseColorObject.id, outsideColorObject.id, insideColorObject.id, rubberColorObject.id, selectedWindowType]);

  return { windowModelRef };
};

// Helper function to apply colors to loaded model
function applyColorsToModel(
  model: THREE.Group,
  baseColorObject: ColorOption,
  outsideColorObject: ColorOption,
  insideColorObject: ColorOption,
  rubberColorObject: ColorOption
) {
  console.log("Applying colors to loaded 3D model");
  
  model.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      // Apply colors based on material names or object names
      const name = child.name.toLowerCase();
      
      if (name.includes('frame') || name.includes('base')) {
        if (Array.isArray(child.material)) {
          child.material.forEach(mat => {
            if (mat instanceof THREE.MeshStandardMaterial) {
              mat.color.setHex(parseInt(baseColorObject.hex.replace('#', '0x')));
            }
          });
        } else if (child.material instanceof THREE.MeshStandardMaterial) {
          child.material.color.setHex(parseInt(baseColorObject.hex.replace('#', '0x')));
        }
      } else if (name.includes('outside') || name.includes('exterior')) {
        if (Array.isArray(child.material)) {
          child.material.forEach(mat => {
            if (mat instanceof THREE.MeshStandardMaterial) {
              mat.color.setHex(parseInt(outsideColorObject.hex.replace('#', '0x')));
            }
          });
        } else if (child.material instanceof THREE.MeshStandardMaterial) {
          child.material.color.setHex(parseInt(outsideColorObject.hex.replace('#', '0x')));
        }
      } else if (name.includes('inside') || name.includes('interior')) {
        if (Array.isArray(child.material)) {
          child.material.forEach(mat => {
            if (mat instanceof THREE.MeshStandardMaterial) {
              mat.color.setHex(parseInt(insideColorObject.hex.replace('#', '0x')));
            }
          });
        } else if (child.material instanceof THREE.MeshStandardMaterial) {
          child.material.color.setHex(parseInt(insideColorObject.hex.replace('#', '0x')));
        }
      } else if (name.includes('rubber') || name.includes('seal')) {
        if (Array.isArray(child.material)) {
          child.material.forEach(mat => {
            if (mat instanceof THREE.MeshStandardMaterial) {
              mat.color.setHex(parseInt(rubberColorObject.hex.replace('#', '0x')));
            }
          });
        } else if (child.material instanceof THREE.MeshStandardMaterial) {
          child.material.color.setHex(parseInt(rubberColorObject.hex.replace('#', '0x')));
        }
      }
    }
  });
}
