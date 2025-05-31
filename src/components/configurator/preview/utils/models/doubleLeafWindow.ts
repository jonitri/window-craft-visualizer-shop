import * as THREE from 'three';
import { ColorOption } from '@/data/products';

export function createDoubleLeafWindow(
  group: THREE.Group, 
  width: number, 
  height: number, 
  texture: THREE.Texture,
  baseColorObject: ColorOption,
  outsideColorObject: ColorOption,
  insideColorObject: ColorOption,
  rubberColorObject?: ColorOption
): void {
  const leafWidth = width * 0.45;
  const leafHeight = height * 0.7;
  const glassWidth = leafWidth * 0.8;
  const glassHeight = leafHeight * 0.85;
  
  // Create realistic glass material with improved transparency
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    transparent: true,
    opacity: 0.1, // Increased slightly for better visibility of transparency
    transmission: 1.0, // Maximum transmission for clear glass
    roughness: 0.0,
    metalness: 0.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.0,
    side: THREE.DoubleSide,
    color: 0xffffff, // Pure white to avoid color tinting
    ior: 1.52, // Index of refraction for glass
    thickness: 0.005, // Reduced thickness
    envMapIntensity: 1.0,
    // Force transparency rendering
    alphaTest: 0,
    depthWrite: false, // Important for transparent materials
  });
  
  // Left glass panel
  const leftGlassGeometry = new THREE.PlaneGeometry(glassWidth, glassHeight);
  const leftGlass = new THREE.Mesh(leftGlassGeometry, glassMaterial);
  leftGlass.position.set(-width/4, 0, 0.005);
  group.add(leftGlass);
  
  // Right glass panel
  const rightGlassGeometry = new THREE.PlaneGeometry(glassWidth, glassHeight);
  const rightGlass = new THREE.Mesh(rightGlassGeometry, glassMaterial);
  rightGlass.position.set(width/4, 0, 0.005);
  group.add(rightGlass);
  
  // Colors
  const outsideColor = new THREE.Color(outsideColorObject.hex);
  const insideColor = new THREE.Color(insideColorObject.hex);
  const baseColor = new THREE.Color(baseColorObject.hex);
  const rubberColor = rubberColorObject ? new THREE.Color(rubberColorObject.hex) : new THREE.Color('#000000');
  
  // Create main frame with proper color separation
  createDoubleLeafMainFrame(group, width, height, baseColor, outsideColor, insideColor);
  
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
  
  // Create frames for both leaves
  createLeafFrame(group, leafWidth, leafHeight, -width/4, outsideSashMaterial, insideSashMaterial);
  createLeafFrame(group, leafWidth, leafHeight, width/4, outsideSashMaterial, insideSashMaterial);
  
  // Create inner frames around glass
  createGlassFrame(group, glassWidth, glassHeight, -width/4, insideSashMaterial);
  createGlassFrame(group, glassWidth, glassHeight, width/4, insideSashMaterial);
  
  // Create rubber seals around glass
  createDoubleLeafRubberSeal(group, glassWidth, glassHeight, -width/4, rubberColor);
  createDoubleLeafRubberSeal(group, glassWidth, glassHeight, width/4, rubberColor);
  
  // Center divider (mullion) with base color
  const dividerMaterial = new THREE.MeshStandardMaterial({ 
    color: baseColor,
    roughness: 0.4,
    metalness: 0.2
  });
  
  const dividerGeometry = new THREE.BoxGeometry(0.08, height * 0.9, 0.15);
  const divider = new THREE.Mesh(dividerGeometry, dividerMaterial);
  divider.position.set(0, 0, 0);
  group.add(divider);
  
  // Add realistic handles
  addRealisticWindowHandle(group, -width/4 + glassWidth/2 + 0.05, -glassHeight/4, 0.08, baseColor);
  addRealisticWindowHandle(group, width/4 - glassWidth/2 - 0.05, -glassHeight/4, 0.08, baseColor);
}

// Create rubber seal around glass for double leaf window
function createDoubleLeafRubberSeal(group: THREE.Group, glassWidth: number, glassHeight: number, offsetX: number, rubberColor: THREE.Color) {
  const sealThickness = 0.015;
  const sealDepth = 0.02;
  
  const sealMaterial = new THREE.MeshStandardMaterial({
    color: rubberColor,
    roughness: 0.8,
    metalness: 0.0
  });
  
  // Top seal
  const topSealGeometry = new THREE.BoxGeometry(glassWidth + sealThickness * 2, sealThickness, sealDepth);
  const topSeal = new THREE.Mesh(topSealGeometry, sealMaterial);
  topSeal.position.set(offsetX, glassHeight/2 + sealThickness/2, 0.005);
  group.add(topSeal);
  
  // Bottom seal
  const bottomSeal = new THREE.Mesh(topSealGeometry, sealMaterial);
  bottomSeal.position.set(offsetX, -glassHeight/2 - sealThickness/2, 0.005);
  group.add(bottomSeal);
  
  // Left seal
  const sideSealGeometry = new THREE.BoxGeometry(sealThickness, glassHeight, sealDepth);
  const leftSeal = new THREE.Mesh(sideSealGeometry, sealMaterial);
  leftSeal.position.set(offsetX - glassWidth/2 - sealThickness/2, 0, 0.005);
  group.add(leftSeal);
  
  // Right seal
  const rightSeal = new THREE.Mesh(sideSealGeometry, sealMaterial);
  rightSeal.position.set(offsetX + glassWidth/2 + sealThickness/2, 0, 0.005);
  group.add(rightSeal);
}

// Create main frame for double leaf window
function createDoubleLeafMainFrame(
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
  
  createDoubleFrameFace(group, width, height, frameThickness, outsideMaterial, frameDepth/2 + 0.002, 'front');
  createDoubleFrameFace(group, width, height, frameThickness, insideMaterial, -frameDepth/2 - 0.002, 'back');
}

// Create frame face for double leaf
function createDoubleFrameFace(
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
  
  // Create inner cutouts for glass (two rectangles)
  const leafWidth = width * 0.45;
  const leafHeight = height * 0.7;
  
  // Left cutout
  const leftHole = new THREE.Path();
  const leftX = -width/4;
  const leftGlassW = leafWidth * 0.85;
  const leftGlassH = leafHeight * 0.9;
  leftHole.moveTo(leftX - leftGlassW/2, -leftGlassH/2);
  leftHole.lineTo(leftX + leftGlassW/2, -leftGlassH/2);
  leftHole.lineTo(leftX + leftGlassW/2, leftGlassH/2);
  leftHole.lineTo(leftX - leftGlassW/2, leftGlassH/2);
  leftHole.lineTo(leftX - leftGlassW/2, -leftGlassH/2);
  outerShape.holes.push(leftHole);
  
  // Right cutout
  const rightHole = new THREE.Path();
  const rightX = width/4;
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
function createLeafFrame(
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

function createLeafFrameBorders(
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

// Create inner frame around glass (inside color)
function createGlassFrame(group: THREE.Group, glassWidth: number, glassHeight: number, offsetX: number, material: THREE.Material) {
  const frameThickness = 0.04;
  
  // Top glass frame
  const topGeometry = new THREE.BoxGeometry(glassWidth + frameThickness * 2, frameThickness, 0.03);
  const topFrame = new THREE.Mesh(topGeometry, material);
  topFrame.position.set(offsetX, glassHeight/2 + frameThickness/2, 0.015);
  group.add(topFrame);
  
  // Bottom glass frame
  const bottomFrame = new THREE.Mesh(topGeometry, material);
  bottomFrame.position.set(offsetX, -glassHeight/2 - frameThickness/2, 0.015);
  group.add(bottomFrame);
  
  // Left glass frame
  const sideGeometry = new THREE.BoxGeometry(frameThickness, glassHeight, 0.03);
  const leftFrame = new THREE.Mesh(sideGeometry, material);
  leftFrame.position.set(offsetX - glassWidth/2 - frameThickness/2, 0, 0.015);
  group.add(leftFrame);
  
  // Right glass frame
  const rightFrame = new THREE.Mesh(sideGeometry, material);
  rightFrame.position.set(offsetX + glassWidth/2 + frameThickness/2, 0, 0.015);
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
  const baseGeometry = new THREE.BoxGeometry(0.1, 0.05, 0.02);
  const handleBase = new THREE.Mesh(baseGeometry, handleMaterial);
  handleBase.position.set(x, y, z);
  group.add(handleBase);
  
  // Handle lever
  const leverGeometry = new THREE.BoxGeometry(0.12, 0.015, 0.015);
  const handleLever = new THREE.Mesh(leverGeometry, handleMaterial);
  handleLever.position.set(x + 0.06, y, z + 0.025);
  group.add(handleLever);
  
  // Handle grip
  const gripGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.06, 8);
  gripGeometry.rotateZ(Math.PI / 2);
  const handleGrip = new THREE.Mesh(gripGeometry, handleMaterial);
  handleGrip.position.set(x + 0.09, y, z + 0.025);
  group.add(handleGrip);
}
