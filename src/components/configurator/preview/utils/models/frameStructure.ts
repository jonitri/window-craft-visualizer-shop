
import * as THREE from 'three';

export function createFrameStructure(
  group: THREE.Group,
  width: number,
  height: number,
  frameThickness: number,
  frameDepth: number,
  baseMaterial: THREE.Material,
  outsideMaterial: THREE.Material,
  insideMaterial: THREE.Material
): void {
  // Create multi-material array for frame pieces
  // Index 0: +X face, Index 1: -X face, Index 2: +Y face, Index 3: -Y face, Index 4: +Z face (outside), Index 5: -Z face (inside)
  const frameMaterials = [
    baseMaterial,    // +X (right edge)
    baseMaterial,    // -X (left edge) 
    baseMaterial,    // +Y (top edge)
    baseMaterial,    // -Y (bottom edge)
    outsideMaterial, // +Z (outside face)
    insideMaterial   // -Z (inside face)
  ];
  
  // Create side frames with multi-material setup
  // Top frame
  const topFrameGeometry = new THREE.BoxGeometry(width, frameThickness, frameDepth);
  const topFrame = new THREE.Mesh(topFrameGeometry, frameMaterials);
  topFrame.position.set(0, height/2 - frameThickness/2, 0);
  group.add(topFrame);
  
  // Bottom frame
  const bottomFrame = new THREE.Mesh(topFrameGeometry, frameMaterials);
  bottomFrame.position.set(0, -height/2 + frameThickness/2, 0);
  group.add(bottomFrame);
  
  // Left frame
  const sideFrameGeometry = new THREE.BoxGeometry(frameThickness, height - frameThickness * 2, frameDepth);
  const leftFrame = new THREE.Mesh(sideFrameGeometry, frameMaterials);
  leftFrame.position.set(-width/2 + frameThickness/2, 0, 0);
  group.add(leftFrame);
  
  // Right frame
  const rightFrame = new THREE.Mesh(sideFrameGeometry, frameMaterials);
  rightFrame.position.set(width/2 - frameThickness/2, 0, 0);
  group.add(rightFrame);
}
