
import * as THREE from 'three';

// Create main frame for triple leaf window
export function createTripleLeafMainFrame(
  group: THREE.Group, 
  width: number, 
  height: number, 
  baseColor: THREE.Color, 
  outsideColor: THREE.Color, 
  insideColor: THREE.Color
) {
  const frameThickness = 0.12;
  const frameDepth = 0.15;
  
  // Frame depth material (base color)
  const frameDepthMaterial = new THREE.MeshStandardMaterial({
    color: baseColor,
    roughness: 0.6,
    metalness: 0.1
  });
  
  // Create main frame depth
  const frameGeometry = new THREE.BoxGeometry(width + frameThickness, height + frameThickness, frameDepth);
  const frameDepthMesh = new THREE.Mesh(frameGeometry, frameDepthMaterial);
  frameDepthMesh.position.set(0, 0, -frameDepth/2);
  group.add(frameDepthMesh);
  
  // Create front and back faces
  const outsideMaterial = new THREE.MeshStandardMaterial({ color: outsideColor, roughness: 0.5, metalness: 0.1 });
  const insideMaterial = new THREE.MeshStandardMaterial({ color: insideColor, roughness: 0.5, metalness: 0.1 });
  
  createTripleFrameFace(group, width, height, frameThickness, outsideMaterial, frameDepth/2 + 0.002, 'front');
  createTripleFrameFace(group, width, height, frameThickness, insideMaterial, -frameDepth/2 - 0.002, 'back');
}

// Create frame face for triple leaf
export function createTripleFrameFace(
  group: THREE.Group, 
  width: number, 
  height: number, 
  thickness: number, 
  material: THREE.Material,
  zPosition: number,
  side: 'front' | 'back'
) {
  // Create outer frame shape
  const outerShape = new THREE.Shape();
  outerShape.moveTo(-(width + thickness)/2, -(height + thickness)/2);
  outerShape.lineTo((width + thickness)/2, -(height + thickness)/2);
  outerShape.lineTo((width + thickness)/2, (height + thickness)/2);
  outerShape.lineTo(-(width + thickness)/2, (height + thickness)/2);
  outerShape.lineTo(-(width + thickness)/2, -(height + thickness)/2);
  
  // Create inner cutouts for glass (three rectangles)
  const leafWidth = width * 0.3;
  const leafHeight = height * 0.7;
  
  // Left cutout
  const leftHole = new THREE.Path();
  const leftX = -width/3;
  const leftGlassW = leafWidth * 0.85;
  const leftGlassH = leafHeight * 0.9;
  leftHole.moveTo(leftX - leftGlassW/2, -leftGlassH/2);
  leftHole.lineTo(leftX + leftGlassW/2, -leftGlassH/2);
  leftHole.lineTo(leftX + leftGlassW/2, leftGlassH/2);
  leftHole.lineTo(leftX - leftGlassW/2, leftGlassH/2);
  leftHole.lineTo(leftX - leftGlassW/2, -leftGlassH/2);
  outerShape.holes.push(leftHole);
  
  // Middle cutout
  const middleHole = new THREE.Path();
  const middleX = 0;
  middleHole.moveTo(middleX - leftGlassW/2, -leftGlassH/2);
  middleHole.lineTo(middleX + leftGlassW/2, -leftGlassH/2);
  middleHole.lineTo(middleX + leftGlassW/2, leftGlassH/2);
  middleHole.lineTo(middleX - leftGlassW/2, leftGlassH/2);
  middleHole.lineTo(middleX - leftGlassW/2, -leftGlassH/2);
  outerShape.holes.push(middleHole);
  
  // Right cutout
  const rightHole = new THREE.Path();
  const rightX = width/3;
  rightHole.moveTo(rightX - leftGlassW/2, -leftGlassH/2);
  rightHole.lineTo(rightX + leftGlassW/2, -leftGlassH/2);
  rightHole.lineTo(rightX + leftGlassW/2, leftGlassH/2);
  rightHole.lineTo(rightX - leftGlassW/2, leftGlassH/2);
  rightHole.lineTo(rightX - leftGlassW/2, -leftGlassH/2);
  outerShape.holes.push(rightHole);
  
  const faceGeometry = new THREE.ShapeGeometry(outerShape);
  const faceMesh = new THREE.Mesh(faceGeometry, material);
  faceMesh.position.z = zPosition;
  
  if (side === 'back') {
    faceMesh.rotation.y = Math.PI;
  }
  
  group.add(faceMesh);
}

// Create frame for each leaf
export function createLeafFrame(
  group: THREE.Group, 
  leafWidth: number, 
  leafHeight: number, 
  offsetX: number, 
  outsideMaterial: THREE.Material,
  insideMaterial: THREE.Material
) {
  const frameThickness = 0.06;
  
  // Front frames (outside color)
  createLeafFrameBorders(group, leafWidth, leafHeight, offsetX, frameThickness, outsideMaterial, 0.025);
  
  // Back frames (inside color)  
  createLeafFrameBorders(group, leafWidth, leafHeight, offsetX, frameThickness, insideMaterial, -0.025);
}

export function createLeafFrameBorders(
  group: THREE.Group,
  leafWidth: number,
  leafHeight: number,
  offsetX: number,
  thickness: number,
  material: THREE.Material,
  zPos: number
) {
  // Top border
  const topGeometry = new THREE.BoxGeometry(leafWidth, thickness, 0.05);
  const topBorder = new THREE.Mesh(topGeometry, material);
  topBorder.position.set(offsetX, leafHeight/2 - thickness/2, zPos);
  group.add(topBorder);
  
  // Bottom border
  const bottomBorder = new THREE.Mesh(topGeometry, material);
  bottomBorder.position.set(offsetX, -leafHeight/2 + thickness/2, zPos);
  group.add(bottomBorder);
  
  // Left border
  const sideGeometry = new THREE.BoxGeometry(thickness, leafHeight - thickness * 2, 0.05);
  const leftBorder = new THREE.Mesh(sideGeometry, material);
  leftBorder.position.set(offsetX - leafWidth/2 + thickness/2, 0, zPos);
  group.add(leftBorder);
  
  // Right border
  const rightBorder = new THREE.Mesh(sideGeometry, material);
  rightBorder.position.set(offsetX + leafWidth/2 - thickness/2, 0, zPos);
  group.add(rightBorder);
}
