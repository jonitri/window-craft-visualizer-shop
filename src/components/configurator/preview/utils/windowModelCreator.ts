
import * as THREE from 'three';
import { createSingleLeafWindow } from './models/singleLeafWindow';
import { createDoubleLeafWindow } from './models/doubleLeafWindow';
import { createTripleLeafWindow } from './models/tripleLeafWindow';
import { createFixedWindow } from './models/fixedWindow';
import { addDebugVisualization, logObjectHierarchy } from './debugVisualization';
import type { WindowModelProps } from './models/windowModelTypes';

export type { WindowModelProps };

export function createWindowModel(
  scene: THREE.Scene,
  modelRef: React.MutableRefObject<THREE.Group | null>,
  props: WindowModelProps
): void {
  console.log("=== Creating window model with technical accuracy ===", props);
  
  if (!scene) {
    console.error("Scene is not available");
    return;
  }
  
  if (!props.textureRef.current) {
    console.error("Texture is not loaded");
    return;
  }
  
  // Clear any existing model
  if (modelRef.current) {
    scene.remove(modelRef.current);
    modelRef.current.traverse((child) => {
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
  
  const { width, height, baseColorObject, outsideColorObject, insideColorObject, rubberColorObject, textureRef, windowType = 'single-leaf' } = props;
  const windowGroup = new THREE.Group();
  windowGroup.name = `${windowType}-window-group`;
  
  // Calculate proper aspect ratio and scale
  const aspectRatio = width / height;
  const baseSize = 2.0; // Base size in Three.js units
  const windowWidth = baseSize;
  const windowHeight = baseSize / aspectRatio;
  
  console.log(`Creating ${windowType} window: ${windowWidth.toFixed(3)} x ${windowHeight.toFixed(3)} (aspect: ${aspectRatio.toFixed(3)})`);
  
  // Select the appropriate window model creation function
  switch (windowType) {
    case 'double-leaf':
      createDoubleLeafWindow(windowGroup, windowWidth, windowHeight, textureRef.current, baseColorObject, outsideColorObject, insideColorObject, rubberColorObject);
      break;
    case 'triple-leaf':
      createTripleLeafWindow(windowGroup, windowWidth, windowHeight, textureRef.current, baseColorObject, outsideColorObject, insideColorObject, rubberColorObject);
      break;
    case 'fixed':
      createFixedWindow(windowGroup, windowWidth, windowHeight, textureRef.current, baseColorObject, outsideColorObject, insideColorObject, rubberColorObject);
      break;
    case 'single-leaf':
    default:
      createSingleLeafWindow(windowGroup, windowWidth, windowHeight, textureRef.current, baseColorObject, outsideColorObject, insideColorObject, rubberColorObject);
      break;
  }
  
  // Add window model to scene
  scene.add(windowGroup);
  modelRef.current = windowGroup;
  
  // Add debug visualization in development
  if (process.env.NODE_ENV === 'development') {
    addDebugVisualization(scene, windowGroup);
    logObjectHierarchy(windowGroup);
  }
  
  console.log(`=== ${windowType} window model created successfully ===`);
}
