
import * as THREE from 'three';

// Create the main window frame structure with proper color separation
export function createSingleLeafMainFrame(
  group: THREE.Group,
  width: number,
  height: number,
  baseColor: THREE.Color,
  outsideColor: THREE.Color,
  insideColor: THREE.Color
): void {
  const frameThickness = 0.12;
  const frameDepth = 0.15;
  
  // Frame depth material (base color for sides/depth)
  const frameDepthMaterial = new THREE.MeshStandardMaterial({
    color: baseColor,
    roughness: 0.6,
    metalness: 0.1
  });
  
  // Outside face material (front of frame)
  const outsideMaterial = new THREE.MeshStandardMaterial({
    color: outsideColor,
    roughness: 0.5,
    metalness: 0.1
  });
  
  // Inside face material (back of frame)
  const insideMaterial = new THREE.MeshStandardMaterial({
    color: insideColor,
    roughness: 0.5,
    metalness: 0.1
  });
  
  // Create frame depth structure (uses base color)
  const frameGeometry = new THREE.BoxGeometry(width + frameThickness, height + frameThickness, frameDepth);
  const frameDepthMesh = new THREE.Mesh(frameGeometry, frameDepthMaterial);
  frameDepthMesh.position.set(0, 0, -frameDepth/2);
  group.add(frameDepthMesh);
  
  // Create front face overlay (outside color)
  createSingleLeafFrameFace(group, width, height, frameThickness, outsideMaterial, frameDepth/2 + 0.002, 'front');
  
  // Create back face overlay (inside color)
  createSingleLeafFrameFace(group, width, height, frameThickness, insideMaterial, -frameDepth/2 - 0.002, 'back');
}

// Create frame face (front or back)
export function createSingleLeafFrameFace(
  group: THREE.Group,
  width: number,
  height: number,
  thickness: number,
  material: THREE.Material,
  zPosition: number,
  side: 'front' | 'back'
): void {
  // Create outer frame shape
  const outerShape = new THREE.Shape();
  outerShape.moveTo(-(width + thickness)/2, -(height + thickness)/2);
  outerShape.lineTo((width + thickness)/2, -(height + thickness)/2);
  outerShape.lineTo((width + thickness)/2, (height + thickness)/2);
  outerShape.lineTo(-(width + thickness)/2, (height + thickness)/2);
  outerShape.lineTo(-(width + thickness)/2, -(height + thickness)/2);
  
  // Create inner cutout for glass
  const innerWidth = width * 0.8;
  const innerHeight = height * 0.8;
  const holeShape = new THREE.Path();
  holeShape.moveTo(-innerWidth/2, -innerHeight/2);
  holeShape.lineTo(innerWidth/2, -innerHeight/2);
  holeShape.lineTo(innerWidth/2, innerHeight/2);
  holeShape.lineTo(-innerWidth/2, innerHeight/2);
  holeShape.lineTo(-innerWidth/2, -innerHeight/2);
  outerShape.holes.push(holeShape);
  
  const faceGeometry = new THREE.ShapeGeometry(outerShape);
  const faceMesh = new THREE.Mesh(faceGeometry, material);
  faceMesh.position.z = zPosition;
  
  if (side === 'back') {
    faceMesh.rotation.y = Math.PI; // Flip back face
  }
  
  group.add(faceMesh);
}
