
import * as THREE from 'three';
import { ColorOption } from '@/data/products';

export function createTripleLeafWindow(
  group: THREE.Group, 
  width: number, 
  height: number, 
  texture: THREE.Texture,
  baseColorObject: ColorOption,
  outsideColorObject: ColorOption,
  insideColorObject: ColorOption
): void {
  const leafWidth = width * 0.28;
  const leafHeight = height * 0.75;
  const glassWidth = leafWidth * 0.8;
  const glassHeight = leafHeight * 0.85;
  
  // Create realistic glass material
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    transparent: true,
    opacity: 0.1,
    transmission: 0.98,
    roughness: 0.0,
    metalness: 0.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    side: THREE.DoubleSide,
    color: 0xffffff,
    ior: 1.52,
    thickness: 0.01,
    envMapIntensity: 0.5,
  });
  
  // Create glass panels for all three leaves
  const glassGeometry = new THREE.PlaneGeometry(glassWidth, glassHeight);
  
  // Left glass
  const leftGlass = new THREE.Mesh(glassGeometry, glassMaterial);
  leftGlass.position.set(-width/3, 0, 0.005);
  group.add(leftGlass);
  
  // Middle glass
  const middleGlass = new THREE.Mesh(glassGeometry, glassMaterial);
  middleGlass.position.set(0, 0, 0.005);
  group.add(middleGlass);
  
  // Right glass
  const rightGlass = new THREE.Mesh(glassGeometry, glassMaterial);
  rightGlass.position.set(width/3, 0, 0.005);
  group.add(rightGlass);
  
  // Colors
  const outsideColor = new THREE.Color(outsideColorObject.hex);
  const insideColor = new THREE.Color(insideColorObject.hex);
  const baseColor = new THREE.Color(baseColorObject.hex);
  
  // Create main frame with proper color separation
  createTripleLeafMainFrame(group, width, height, baseColor, outsideColor, insideColor);
  
  // Create sash materials
  const outsideSashMaterial = new THREE.MeshStandardMaterial({
    color: outsideColor,
    roughness: 0.3,
    metalness: 0.1
  });
  
  const insideSashMaterial = new THREE.MeshStandardMaterial({
    color: insideColor,
    roughness: 0.3,
    metalness: 0.1
  });
  
  // Create frames for all three leaves
  createTripleLeafFrame(group, leafWidth, leafHeight, -width/3, outsideSashMaterial, insideSashMaterial);
  createTripleLeafFrame(group, leafWidth, leafHeight, 0, outsideSashMaterial, insideSashMaterial);
  createTripleLeafFrame(group, leafWidth, leafHeight, width/3, outsideSashMaterial, insideSashMaterial);
  
  // Create inner frames around glass (inside color)
  createTripleGlassFrame(group, glassWidth, glassHeight, -width/3, insideSashMaterial);
  createTripleGlassFrame(group, glassWidth, glassHeight, 0, insideSashMaterial);
  createTripleGlassFrame(group, glassWidth, glassHeight, width/3, insideSashMaterial);
  
  // Dividers (mullions) with base color
  const dividerMaterial = new THREE.MeshStandardMaterial({ 
    color: baseColor,
    roughness: 0.4,
    metalness: 0.2
  });
  
  const dividerGeometry = new THREE.BoxGeometry(0.06, height * 0.9, 0.15);
  
  // Left divider
  const leftDivider = new THREE.Mesh(dividerGeometry, dividerMaterial);
  leftDivider.position.set(-width/6, 0, 0);
  group.add(leftDivider);
  
  // Right divider
  const rightDivider = new THREE.Mesh(dividerGeometry, dividerMaterial);
  rightDivider.position.set(width/6, 0, 0);
  group.add(rightDivider);
  
  // Add realistic handles
  addRealisticWindowHandle(group, -width/3 + glassWidth/2 + 0.03, -glassHeight/4, 0.08, baseColor);
  addRealisticWindowHandle(group, width/3 - glassWidth/2 - 0.03, -glassHeight/4, 0.08, baseColor);
}

// Create main frame for triple leaf window
function createTripleLeafMainFrame(
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
function createTripleFrameFace(
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
  const leafWidth = width * 0.28;
  const leafHeight = height * 0.75;
  const glassW = leafWidth * 0.85;
  const glassH = leafHeight * 0.9;
  
  // Left cutout
  const leftHole = new THREE.Path();
  leftHole.moveTo(-width/3 - glassW/2, -glassH/2);
  leftHole.lineTo(-width/3 + glassW/2, -glassH/2);
  leftHole.lineTo(-width/3 + glassW/2, glassH/2);
  leftHole.lineTo(-width/3 - glassW/2, glassH/2);
  leftHole.lineTo(-width/3 - glassW/2, -glassH/2);
  outerShape.holes.push(leftHole);
  
  // Middle cutout
  const middleHole = new THREE.Path();
  middleHole.moveTo(-glassW/2, -glassH/2);
  middleHole.lineTo(glassW/2, -glassH/2);
  middleHole.lineTo(glassW/2, glassH/2);
  middleHole.lineTo(-glassW/2, glassH/2);
  middleHole.lineTo(-glassW/2, -glassH/2);
  outerShape.holes.push(middleHole);
  
  // Right cutout
  const rightHole = new THREE.Path();
  rightHole.moveTo(width/3 - glassW/2, -glassH/2);
  rightHole.lineTo(width/3 + glassW/2, -glassH/2);
  rightHole.lineTo(width/3 + glassW/2, glassH/2);
  rightHole.lineTo(width/3 - glassW/2, glassH/2);
  rightHole.lineTo(width/3 - glassW/2, -glassH/2);
  outerShape.holes.push(rightHole);
  
  const faceGeometry = new THREE.ShapeGeometry(outerShape);
  const faceMesh = new THREE.Mesh(faceGeometry, material);
  faceMesh.position.z = zPosition;
  
  if (side === 'back') {
    faceMesh.rotation.y = Math.PI;
  }
  
  group.add(faceMesh);
}

// Create frame for each leaf in triple window
function createTripleLeafFrame(
  group: THREE.Group, 
  leafWidth: number, 
  leafHeight: number, 
  offsetX: number, 
  outsideMaterial: THREE.Material,
  insideMaterial: THREE.Material
) {
  const frameThickness = 0.05;
  
  // Front frames (outside color)
  createTripleLeafFrameBorders(group, leafWidth, leafHeight, offsetX, frameThickness, outsideMaterial, 0.02);
  
  // Back frames (inside color)
  createTripleLeafFrameBorders(group, leafWidth, leafHeight, offsetX, frameThickness, insideMaterial, -0.02);
}

function createTripleLeafFrameBorders(
  group: THREE.Group,
  leafWidth: number,
  leafHeight: number,
  offsetX: number,
  thickness: number,
  material: THREE.Material,
  zPos: number
) {
  // Top border
  const topGeometry = new THREE.BoxGeometry(leafWidth, thickness, 0.04);
  const topBorder = new THREE.Mesh(topGeometry, material);
  topBorder.position.set(offsetX, leafHeight/2 - thickness/2, zPos);
  group.add(topBorder);
  
  // Bottom border
  const bottomBorder = new THREE.Mesh(topGeometry, material);
  bottomBorder.position.set(offsetX, -leafHeight/2 + thickness/2, zPos);
  group.add(bottomBorder);
  
  // Left border
  const sideGeometry = new THREE.BoxGeometry(thickness, leafHeight - thickness * 2, 0.04);
  const leftBorder = new THREE.Mesh(sideGeometry, material);
  leftBorder.position.set(offsetX - leafWidth/2 + thickness/2, 0, zPos);
  group.add(leftBorder);
  
  // Right border
  const rightBorder = new THREE.Mesh(sideGeometry, material);
  rightBorder.position.set(offsetX + leafWidth/2 - thickness/2, 0, zPos);
  group.add(rightBorder);
}

// Create inner frame around glass for triple window (inside color)
function createTripleGlassFrame(group: THREE.Group, glassWidth: number, glassHeight: number, offsetX: number, material: THREE.Material) {
  const frameThickness = 0.03;
  
  // Top glass frame
  const topGeometry = new THREE.BoxGeometry(glassWidth + frameThickness * 2, frameThickness, 0.025);
  const topFrame = new THREE.Mesh(topGeometry, material);
  topFrame.position.set(offsetX, glassHeight/2 + frameThickness/2, 0.01);
  group.add(topFrame);
  
  // Bottom glass frame
  const bottomFrame = new THREE.Mesh(topGeometry, material);
  bottomFrame.position.set(offsetX, -glassHeight/2 - frameThickness/2, 0.01);
  group.add(bottomFrame);
  
  // Left glass frame
  const sideGeometry = new THREE.BoxGeometry(frameThickness, glassHeight, 0.025);
  const leftFrame = new THREE.Mesh(sideGeometry, material);
  leftFrame.position.set(offsetX - glassWidth/2 - frameThickness/2, 0, 0.01);
  group.add(leftFrame);
  
  // Right glass frame
  const rightFrame = new THREE.Mesh(sideGeometry, material);
  rightFrame.position.set(offsetX + glassWidth/2 + frameThickness/2, 0, 0.01);
  group.add(rightFrame);
}

// Add realistic window handle
function addRealisticWindowHandle(group: THREE.Group, x: number, y: number, z: number, color: THREE.Color) {
  const handleMaterial = new THREE.MeshStandardMaterial({
    color: 0x888888,
    roughness: 0.3,
    metalness: 0.8
  });
  
  // Handle base plate
  const baseGeometry = new THREE.BoxGeometry(0.08, 0.04, 0.015);
  const handleBase = new THREE.Mesh(baseGeometry, handleMaterial);
  handleBase.position.set(x, y, z);
  group.add(handleBase);
  
  // Handle lever
  const leverGeometry = new THREE.BoxGeometry(0.1, 0.012, 0.012);
  const handleLever = new THREE.Mesh(leverGeometry, handleMaterial);
  handleLever.position.set(x + 0.05, y, z + 0.02);
  group.add(handleLever);
  
  // Handle grip
  const gripGeometry = new THREE.CylinderGeometry(0.008, 0.008, 0.05, 8);
  gripGeometry.rotateZ(Math.PI / 2);
  const handleGrip = new THREE.Mesh(gripGeometry, handleMaterial);
  handleGrip.position.set(x + 0.075, y, z + 0.02);
  group.add(handleGrip);
}
