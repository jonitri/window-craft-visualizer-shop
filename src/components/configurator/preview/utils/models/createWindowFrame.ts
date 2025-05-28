
import * as THREE from 'three';
import { ColorOption } from '@/data/products';

interface WindowFrameProps {
  windowWidth: number;
  windowHeight: number;
  baseColorObject: ColorOption;
  outsideColorObject: ColorOption;
  insideColorObject: ColorOption;
}

export function createWindowFrame(windowGroup: THREE.Group, props: WindowFrameProps): void {
  const { windowWidth, windowHeight, baseColorObject, outsideColorObject, insideColorObject } = props;
  
  const frameThickness = 0.1;
  const frameDepth = 0.15;
  
  // Convert colors
  const baseColor = new THREE.Color(baseColorObject.hex);
  const outsideColor = new THREE.Color(outsideColorObject.hex);
  const insideColor = new THREE.Color(insideColorObject.hex);
  
  // Create materials for different frame parts
  const baseMaterial = new THREE.MeshStandardMaterial({ 
    color: baseColor,
    roughness: 0.7,
    metalness: 0.2
  });
  
  const outsideMaterial = new THREE.MeshStandardMaterial({ 
    color: outsideColor,
    roughness: 0.6,
    metalness: 0.2
  });
  
  const insideMaterial = new THREE.MeshStandardMaterial({ 
    color: insideColor,
    roughness: 0.6,
    metalness: 0.2
  });
  
  // Create main outer frame with base color (this represents the frame depth/sides)
  const topFrameGeometry = new THREE.BoxGeometry(
    windowWidth + frameThickness * 2, 
    frameThickness, 
    frameDepth
  );
  
  // Top frame
  const topFrame = new THREE.Mesh(topFrameGeometry, baseMaterial);
  topFrame.position.y = windowHeight/2 + frameThickness/2;
  windowGroup.add(topFrame);
  
  // Bottom frame
  const bottomFrame = new THREE.Mesh(topFrameGeometry, baseMaterial);
  bottomFrame.position.y = -windowHeight/2 - frameThickness/2;
  windowGroup.add(bottomFrame);
  
  // Left frame
  const sideFrameGeometry = new THREE.BoxGeometry(
    frameThickness, 
    windowHeight + frameThickness * 2, 
    frameDepth
  );
  const leftFrame = new THREE.Mesh(sideFrameGeometry, baseMaterial);
  leftFrame.position.x = -windowWidth/2 - frameThickness/2;
  windowGroup.add(leftFrame);
  
  // Right frame
  const rightFrame = new THREE.Mesh(sideFrameGeometry, baseMaterial);
  rightFrame.position.x = windowWidth/2 + frameThickness/2;
  windowGroup.add(rightFrame);
  
  // Add front face overlay with outside color
  const frontFaceGeometry = new THREE.PlaneGeometry(
    windowWidth + frameThickness * 2,
    windowHeight + frameThickness * 2
  );
  const frontFace = new THREE.Mesh(frontFaceGeometry, outsideMaterial);
  frontFace.position.z = frameDepth/2 + 0.001;
  windowGroup.add(frontFace);
  
  // Add back face overlay with inside color
  const backFace = new THREE.Mesh(frontFaceGeometry, insideMaterial);
  backFace.position.z = -frameDepth/2 - 0.001;
  backFace.rotation.y = Math.PI; // Flip to face the right direction
  windowGroup.add(backFace);
}
