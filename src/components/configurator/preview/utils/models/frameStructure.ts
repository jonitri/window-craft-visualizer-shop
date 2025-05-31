
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
  // Create six-material array for proper face assignment
  // This ensures outside face gets outsideMaterial and inside face gets insideMaterial
  const frameMaterialsArray = [
    baseMaterial,    // +X (right edge)
    baseMaterial,    // -X (left edge)
    baseMaterial,    // +Y (top edge)
    baseMaterial,    // -Y (bottom edge)
    outsideMaterial, // +Z (outside face)
    insideMaterial   // -Z (inside face)
  ];
  
  // Create frame pieces with multi-material setup
  // Top frame
  const topFrameGeometry = new THREE.BoxGeometry(width, frameThickness, frameDepth);
  const topFrame = new THREE.Mesh(topFrameGeometry, frameMaterialsArray);
  topFrame.position.set(0, height/2 - frameThickness/2, 0);
  group.add(topFrame);
  
  // Bottom frame
  const bottomFrame = new THREE.Mesh(topFrameGeometry, frameMaterialsArray);
  bottomFrame.position.set(0, -height/2 + frameThickness/2, 0);
  group.add(bottomFrame);
  
  // Left frame
  const sideFrameGeometry = new THREE.BoxGeometry(frameThickness, height - frameThickness * 2, frameDepth);
  const leftFrame = new THREE.Mesh(sideFrameGeometry, frameMaterialsArray);
  leftFrame.position.set(-width/2 + frameThickness/2, 0, 0);
  group.add(leftFrame);
  
  // Right frame
  const rightFrame = new THREE.Mesh(sideFrameGeometry, frameMaterialsArray);
  rightFrame.position.set(width/2 - frameThickness/2, 0, 0);
  group.add(rightFrame);
  
  console.log("Frame structure created with proper inside/outside color separation");
}
