
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
  const { windowWidth, windowHeight, baseColorObject } = props;
  
  const frameThickness = 0.1;
  const frameDepth = 0.15;
  
  // Convert color hex to THREE color
  const baseColor = new THREE.Color(baseColorObject.hex);
  
  // Create main outer frame
  const topFrameGeometry = new THREE.BoxGeometry(
    windowWidth + frameThickness * 2, 
    frameThickness, 
    frameDepth
  );
  const frameMaterial = new THREE.MeshStandardMaterial({ 
    color: baseColor,
    roughness: 0.7,
    metalness: 0.2
  });
  
  // Top frame
  const topFrame = new THREE.Mesh(topFrameGeometry, frameMaterial);
  topFrame.position.y = windowHeight/2 + frameThickness/2;
  windowGroup.add(topFrame);
  
  // Bottom frame
  const bottomFrame = new THREE.Mesh(topFrameGeometry, frameMaterial);
  bottomFrame.position.y = -windowHeight/2 - frameThickness/2;
  windowGroup.add(bottomFrame);
  
  // Left frame
  const sideFrameGeometry = new THREE.BoxGeometry(
    frameThickness, 
    windowHeight + frameThickness * 2, 
    frameDepth
  );
  const leftFrame = new THREE.Mesh(sideFrameGeometry, frameMaterial);
  leftFrame.position.x = -windowWidth/2 - frameThickness/2;
  windowGroup.add(leftFrame);
  
  // Right frame
  const rightFrame = new THREE.Mesh(sideFrameGeometry, frameMaterial);
  rightFrame.position.x = windowWidth/2 + frameThickness/2;
  windowGroup.add(rightFrame);
}
