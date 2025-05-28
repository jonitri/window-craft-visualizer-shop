
import * as THREE from 'three';
import { ColorOption } from '@/data/products';
import { addWindowHandle } from './windowComponents';

export function createSingleLeafWindow(
  group: THREE.Group, 
  width: number, 
  height: number, 
  texture: THREE.Texture,
  baseColorObject: ColorOption,
  outsideColorObject: ColorOption,
  insideColorObject: ColorOption
): void {
  // Colors
  const outsideColor = new THREE.Color(outsideColorObject.hex);
  const insideColor = new THREE.Color(insideColorObject.hex);
  const baseColor = new THREE.Color(baseColorObject.hex);
  
  // Create main window frame structure first (only frame depth uses base color)
  createMainWindowFrame(group, width, height, baseColor, outsideColor, insideColor);
  
  // Create glass panel with fixed transparent material (no color dependency)
  const glassWidth = width * 0.75;
  const glassHeight = height * 0.75;
  
  const glassGeometry = new THREE.PlaneGeometry(glassWidth, glassHeight);
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    transparent: true,
    opacity: 0.15,
    transmission: 0.95,
    roughness: 0.0,
    metalness: 0.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    side: THREE.DoubleSide,
    color: 0xffffff, // Always white/clear - never changes
    ior: 1.52,
    thickness: 0.02,
  });
  
  const glassPanel = new THREE.Mesh(glassGeometry, glassMaterial);
  glassPanel.position.z = 0.01;
  group.add(glassPanel);
  
  // Create window sash (inner frame around glass) - uses outside color for front face
  createWindowSash(group, glassWidth, glassHeight, outsideColor);
  
  // Add handle
  addWindowHandle(group, width/2 - 0.15, -height/4, 0.05, outsideColor);
  
  console.log("Single leaf window created with transparent glass");
}

// Create the main window frame structure
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
  
  // Frame depth material (base color only for sides/depth)
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
  
  // Create frame depth (back structure) - this uses base color
  const frameGeometry = new THREE.BoxGeometry(width + frameThickness, height + frameThickness, frameDepth);
  const frameDepthMesh = new THREE.Mesh(frameGeometry, frameDepthMaterial);
  frameDepthMesh.position.set(0, 0, -frameDepth/2);
  group.add(frameDepthMesh);
  
  // Create outer frame borders (front face) - uses outside color
  createFrameBorders(group, width, height, frameThickness, outsideMaterial);
}

// Create the frame borders (front face only)
function createFrameBorders(
  group: THREE.Group, 
  width: number, 
  height: number, 
  thickness: number, 
  material: THREE.Material
) {
  // Top border
  const topGeometry = new THREE.BoxGeometry(width + thickness, thickness, 0.08);
  const topBorder = new THREE.Mesh(topGeometry, material);
  topBorder.position.set(0, height/2 + thickness/2, 0.04);
  group.add(topBorder);
  
  // Bottom border
  const bottomBorder = new THREE.Mesh(topGeometry, material);
  bottomBorder.position.set(0, -height/2 - thickness/2, 0.04);
  group.add(bottomBorder);
  
  // Left border
  const sideGeometry = new THREE.BoxGeometry(thickness, height, 0.08);
  const leftBorder = new THREE.Mesh(sideGeometry, material);
  leftBorder.position.set(-width/2 - thickness/2, 0, 0.04);
  group.add(leftBorder);
  
  // Right border
  const rightBorder = new THREE.Mesh(sideGeometry, material);
  rightBorder.position.set(width/2 + thickness/2, 0, 0.04);
  group.add(rightBorder);
}

// Create window sash (thin frame around glass) - uses outside color
function createWindowSash(
  group: THREE.Group, 
  glassWidth: number, 
  glassHeight: number, 
  color: THREE.Color
) {
  const sashThickness = 0.04;
  const sashMaterial = new THREE.MeshStandardMaterial({
    color: color, // Uses outside color, not base color
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
