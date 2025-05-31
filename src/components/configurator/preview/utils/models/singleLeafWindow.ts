import * as THREE from 'three';
import { ColorOption } from '@/data/products';

export function createSingleLeafWindow(
  group: THREE.Group, 
  width: number, 
  height: number, 
  texture: THREE.Texture,
  baseColorObject: ColorOption,
  outsideColorObject: ColorOption,
  insideColorObject: ColorOption,
  rubberColorObject?: ColorOption
): void {
  // Colors
  const outsideColor = new THREE.Color(outsideColorObject.hex);
  const insideColor = new THREE.Color(insideColorObject.hex);
  const baseColor = new THREE.Color(baseColorObject.hex);
  const rubberColor = rubberColorObject ? new THREE.Color(rubberColorObject.hex) : new THREE.Color('#000000');
  
  // Create main window frame structure
  createMainWindowFrame(group, width, height, baseColor, outsideColor, insideColor);
  
  // Create glass panel with realistic transparency (always transparent)
  const glassWidth = width * 0.75;
  const glassHeight = height * 0.75;
  
  const glassGeometry = new THREE.PlaneGeometry(glassWidth, glassHeight);
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    transparent: true,
    opacity: 0.05, // Very low opacity to ensure transparency
    transmission: 0.98,
    roughness: 0.0,
    metalness: 0.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    side: THREE.DoubleSide,
    color: 0xffffff, // Pure white to avoid color tinting
    ior: 1.52,
    thickness: 0.01,
    envMapIntensity: 0.5,
  });
  
  const glassPanel = new THREE.Mesh(glassGeometry, glassMaterial);
  glassPanel.position.z = 0.01;
  group.add(glassPanel);
  
  // Create rubber seal around glass
  createRubberSeal(group, glassWidth, glassHeight, rubberColor);
  
  // Create window sash (inner frame around glass) - uses inside color
  createWindowSash(group, glassWidth, glassHeight, insideColor);
  
  // Add realistic window handle
  addRealisticWindowHandle(group, width/2 - 0.15, -height/4, 0.05, baseColor);
  
  console.log("Single leaf window created with proper color application and rubber seal");
}

// Create rubber seal around glass
function createRubberSeal(group: THREE.Group, glassWidth: number, glassHeight: number, rubberColor: THREE.Color) {
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
  topSeal.position.set(0, glassHeight/2 + sealThickness/2, 0.005);
  group.add(topSeal);
  
  // Bottom seal
  const bottomSeal = new THREE.Mesh(topSealGeometry, sealMaterial);
  bottomSeal.position.set(0, -glassHeight/2 - sealThickness/2, 0.005);
  group.add(bottomSeal);
  
  // Left seal
  const sideSealGeometry = new THREE.BoxGeometry(sealThickness, glassHeight, sealDepth);
  const leftSeal = new THREE.Mesh(sideSealGeometry, sealMaterial);
  leftSeal.position.set(-glassWidth/2 - sealThickness/2, 0, 0.005);
  group.add(leftSeal);
  
  // Right seal
  const rightSeal = new THREE.Mesh(sideSealGeometry, sealMaterial);
  rightSeal.position.set(glassWidth/2 + sealThickness/2, 0, 0.005);
  group.add(rightSeal);
}

// Create the main window frame structure with proper color separation
function createMainWindowFrame(
  group: THREE.Group, 
  width: number, 
  height: number, 
  baseColor: THREE.Color, 
  outsideColor: THREE.Color, 
  insideColor: THREE.Color
) {
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
  createFrameFace(group, width, height, frameThickness, outsideMaterial, frameDepth/2 + 0.002, 'front');
  
  // Create back face overlay (inside color)
  createFrameFace(group, width, height, frameThickness, insideMaterial, -frameDepth/2 - 0.002, 'back');
}

// Create frame face (front or back)
function createFrameFace(
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

// Create window sash (thin frame around glass) - uses inside color
function createWindowSash(
  group: THREE.Group, 
  glassWidth: number, 
  glassHeight: number, 
  color: THREE.Color
) {
  const sashThickness = 0.04;
  const sashMaterial = new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.4,
    metalness: 0.2
  });
  
  // Top sash
  const topSashGeometry = new THREE.BoxGeometry(glassWidth + sashThickness * 2, sashThickness, 0.06);
  const topSash = new THREE.Mesh(topSashGeometry, sashMaterial);
  topSash.position.set(0, glassHeight/2 + sashThickness/2, 0.03);
  group.add(topSash);
  
  // Bottom sash
  const bottomSash = new THREE.Mesh(topSashGeometry, sashMaterial);
  bottomSash.position.set(0, -glassHeight/2 - sashThickness/2, 0.03);
  group.add(bottomSash);
  
  // Left sash
  const sideSashGeometry = new THREE.BoxGeometry(sashThickness, glassHeight, 0.06);
  const leftSash = new THREE.Mesh(sideSashGeometry, sashMaterial);
  leftSash.position.set(-glassWidth/2 - sashThickness/2, 0, 0.03);
  group.add(leftSash);
  
  // Right sash
  const rightSash = new THREE.Mesh(sideSashGeometry, sashMaterial);
  rightSash.position.set(glassWidth/2 + sashThickness/2, 0, 0.03);
  group.add(rightSash);
}

// Add realistic window handle
function addRealisticWindowHandle(group: THREE.Group, x: number, y: number, z: number, color: THREE.Color) {
  const handleMaterial = new THREE.MeshStandardMaterial({
    color: 0x888888,
    roughness: 0.3,
    metalness: 0.8
  });
  
  // Handle base plate
  const baseGeometry = new THREE.BoxGeometry(0.12, 0.06, 0.02);
  const handleBase = new THREE.Mesh(baseGeometry, handleMaterial);
  handleBase.position.set(x, y, z);
  group.add(handleBase);
  
  // Handle lever
  const leverGeometry = new THREE.BoxGeometry(0.15, 0.02, 0.02);
  const handleLever = new THREE.Mesh(leverGeometry, handleMaterial);
  handleLever.position.set(x + 0.08, y, z + 0.03);
  group.add(handleLever);
  
  // Handle grip
  const gripGeometry = new THREE.CylinderGeometry(0.012, 0.012, 0.08, 8);
  gripGeometry.rotateZ(Math.PI / 2);
  const handleGrip = new THREE.Mesh(gripGeometry, handleMaterial);
  handleGrip.position.set(x + 0.12, y, z + 0.03);
  group.add(handleGrip);
}
