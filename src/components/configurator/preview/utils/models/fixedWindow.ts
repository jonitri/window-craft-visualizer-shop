import * as THREE from 'three';
import { ColorOption } from '@/data/products';

export function createFixedWindow(
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
  createFixedMainFrame(group, width, height, baseColor, outsideColor, insideColor);
  
  // Create glass panel with improved transparency
  const glassWidth = width * 0.8;
  const glassHeight = height * 0.8;
  
  const glassGeometry = new THREE.PlaneGeometry(glassWidth, glassHeight);
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    transparent: true,
    opacity: 0.05, // Very low opacity for clear glass
    transmission: 0.95, // High transmission for clear glass
    roughness: 0.0,
    metalness: 0.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.0,
    side: THREE.DoubleSide,
    color: 0xffffff, // Pure white to avoid color tinting
    ior: 1.52, // Index of refraction for glass
    thickness: 0.003, // Very thin glass
    envMapIntensity: 1.0,
    // Remove alphaTest and keep depthWrite true for proper sorting
    depthWrite: true,
  });
  
  const glassPanel = new THREE.Mesh(glassGeometry, glassMaterial);
  glassPanel.position.z = 0.01;
  glassPanel.renderOrder = 1000; // Ensure proper rendering order
  group.add(glassPanel);
  
  // Create rubber seal around glass
  createFixedRubberSeal(group, glassWidth, glassHeight, rubberColor);
  
  // Create inner frame around glass (uses inside color)
  createFixedInnerFrame(group, glassWidth, glassHeight, insideColor);
  
  // Add "Fixed" label
  const labelGeometry = new THREE.BoxGeometry(0.3, 0.08, 0.02);
  const labelMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
  const label = new THREE.Mesh(labelGeometry, labelMaterial);
  label.position.set(0, -height * 0.3, 0.06);
  group.add(label);
  
  console.log("Fixed window created with proper color application and rubber seal");
}

// Create rubber seal around glass for fixed window
function createFixedRubberSeal(group: THREE.Group, glassWidth: number, glassHeight: number, rubberColor: THREE.Color) {
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

// Create main frame for fixed window with proper color separation
function createFixedMainFrame(
  group: THREE.Group, 
  width: number, 
  height: number, 
  baseColor: THREE.Color, 
  outsideColor: THREE.Color, 
  insideColor: THREE.Color
) {
  const frameThickness = 0.1;
  const frameDepth = 0.12;
  
  // Frame depth material (base color for sides/depth)
  const frameDepthMaterial = new THREE.MeshStandardMaterial({
    color: baseColor,
    roughness: 0.6,
    metalness: 0.1
  });
  
  // Outside face material
  const outsideMaterial = new THREE.MeshStandardMaterial({
    color: outsideColor,
    roughness: 0.5,
    metalness: 0.1
  });
  
  // Inside face material
  const insideMaterial = new THREE.MeshStandardMaterial({
    color: insideColor,
    roughness: 0.5,
    metalness: 0.1
  });
  
  // Frame depth (uses base color)
  const frameGeometry = new THREE.BoxGeometry(width + frameThickness, height + frameThickness, frameDepth);
  const frameDepthMesh = new THREE.Mesh(frameGeometry, frameDepthMaterial);
  frameDepthMesh.position.set(0, 0, -frameDepth/2);
  group.add(frameDepthMesh);
  
  // Create front face (outside color)
  createFixedFrameFace(group, width, height, frameThickness, outsideMaterial, frameDepth/2 + 0.002, 'front');
  
  // Create back face (inside color)
  createFixedFrameFace(group, width, height, frameThickness, insideMaterial, -frameDepth/2 - 0.002, 'back');
}

// Create frame face for fixed window
function createFixedFrameFace(
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
  const innerWidth = width * 0.85;
  const innerHeight = height * 0.85;
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

function createFixedInnerFrame(group: THREE.Group, glassWidth: number, glassHeight: number, color: THREE.Color) {
  const thickness = 0.05;
  const material = new THREE.MeshStandardMaterial({
    color: color, // Uses inside color
    roughness: 0.4,
    metalness: 0.2
  });
  
  // Top inner frame
  const topGeometry = new THREE.BoxGeometry(glassWidth + thickness * 2, thickness, 0.06);
  const topFrame = new THREE.Mesh(topGeometry, material);
  topFrame.position.set(0, glassHeight/2 + thickness/2, 0.03);
  group.add(topFrame);
  
  // Bottom inner frame
  const bottomFrame = new THREE.Mesh(topGeometry, material);
  bottomFrame.position.set(0, -glassHeight/2 - thickness/2, 0.03);
  group.add(bottomFrame);
  
  // Left inner frame
  const sideGeometry = new THREE.BoxGeometry(thickness, glassHeight, 0.06);
  const leftFrame = new THREE.Mesh(sideGeometry, material);
  leftFrame.position.set(-glassWidth/2 - thickness/2, 0, 0.03);
  group.add(leftFrame);
  
  // Right inner frame
  const rightFrame = new THREE.Mesh(sideGeometry, material);
  rightFrame.position.set(glassWidth/2 + thickness/2, 0, 0.03);
  group.add(rightFrame);
}
