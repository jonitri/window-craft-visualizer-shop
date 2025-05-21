
import * as THREE from 'three';
import { createSingleLeafWindow } from './models/singleLeafWindow';
import { createDoubleLeafWindow } from './models/doubleLeafWindow';
import { createTripleLeafWindow } from './models/tripleLeafWindow';
import { createFixedWindow } from './models/fixedWindow';
import { createWindowFrame } from './models/createWindowFrame';
import type { WindowModelProps } from './models/windowModelTypes';

export type { WindowModelProps } from './models/windowModelTypes';

export function createWindowModel(
  scene: THREE.Scene,
  modelRef: React.MutableRefObject<THREE.Group | null>,
  props: WindowModelProps
): void {
  console.log("Creating window model", props);
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
  
  const { width, height, baseColorObject, outsideColorObject, insideColorObject, textureRef, windowType = 'single-leaf' } = props;
  const windowGroup = new THREE.Group();
  
  const aspectRatio = width / height;
  const windowWidth = 2;
  const windowHeight = windowWidth / aspectRatio;
  
  // Select the appropriate window model creation function based on type
  switch (windowType) {
    case 'double-leaf':
      createDoubleLeafWindow(windowGroup, windowWidth, windowHeight, textureRef.current, baseColorObject, outsideColorObject, insideColorObject);
      break;
    case 'triple-leaf':
      createTripleLeafWindow(windowGroup, windowWidth, windowHeight, textureRef.current, baseColorObject, outsideColorObject, insideColorObject);
      break;
    case 'fixed':
      createFixedWindow(windowGroup, windowWidth, windowHeight, textureRef.current, baseColorObject, outsideColorObject, insideColorObject);
      break;
    case 'single-leaf':
    default:
      createSingleLeafWindow(windowGroup, windowWidth, windowHeight, textureRef.current, baseColorObject, outsideColorObject, insideColorObject);
      break;
  }
  
  // Create frame components (common for all window types)
  createWindowFrame(windowGroup, {
    windowWidth,
    windowHeight,
    baseColorObject,
    outsideColorObject,
    insideColorObject,
  });
  
  // Add window model to scene
  scene.add(windowGroup);
  modelRef.current = windowGroup;
  
  console.log(`${windowType} window model created and added to scene`);
}
