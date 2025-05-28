
import * as THREE from 'three';
import { ColorOption } from '@/data/products';
import { createWindowSash, addWindowHandle } from './windowComponents';

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
    opacity: 0.15,
    transmission: 0.95,
    roughness: 0.05,
    metalness: 0.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    side: THREE.DoubleSide,
    color: 0xffffff,
    ior: 1.52,
    thickness: 0.01,
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
  const baseColor = new THREE.Color(baseColorObject.hex);
  
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: outsideColor,
    roughness: 0.3,
    metalness: 0.1
  });
  
  // Create frames for all three leaves
  createTripleLeafFrame(group, leafWidth, leafHeight, -width/3, frameMaterial);
  createTripleLeafFrame(group, leafWidth, leafHeight, 0, frameMaterial);
  createTripleLeafFrame(group, leafWidth, leafHeight, width/3, frameMaterial);
  
  // Create inner frames around glass
  createTripleGlassFrame(group, glassWidth, glassHeight, -width/3, frameMaterial);
  createTripleGlassFrame(group, glassWidth, glassHeight, 0, frameMaterial);
  createTripleGlassFrame(group, glassWidth, glassHeight, width/3, frameMaterial);
  
  // Dividers (mullions) with base color
  const dividerMaterial = new THREE.MeshStandardMaterial({ 
    color: baseColor,
    roughness: 0.4,
    metalness: 0.2
  });
  
  const dividerGeometry = new THREE.BoxGeometry(0.06, height * 0.9, 0.08);
  
  // Left divider
  const leftDivider = new THREE.Mesh(dividerGeometry, dividerMaterial);
  leftDivider.position.set(-width/6, 0, 0);
  group.add(leftDivider);
  
  // Right divider
  const rightDivider = new THREE.Mesh(dividerGeometry, dividerMaterial);
  rightDivider.position.set(width/6, 0, 0);
  group.add(rightDivider);
  
  // Add main frame depth
  addTripleFrameDepth(group, width, height, baseColor);
  
  // Add handles
  addWindowHandle(group, -width/3 + glassWidth/2 + 0.03, -glassHeight/4, 0.025, outsideColor);
  addWindowHandle(group, width/3 - glassWidth/2 - 0.03, -glassHeight/4, 0.025, outsideColor);
}

// Create frame for each leaf in triple window
function createTripleLeafFrame(group: THREE.Group, leafWidth: number, leafHeight: number, offsetX: number, material: THREE.Material) {
  const frameThickness = 0.05;
  
  // Top frame
  const topGeometry = new THREE.BoxGeometry(leafWidth, frameThickness, 0.04);
  const topFrame = new THREE.Mesh(topGeometry, material);
  topFrame.position.set(offsetX, leafHeight/2 - frameThickness/2, 0.02);
  group.add(topFrame);
  
  // Bottom frame
  const bottomFrame = new THREE.Mesh(topGeometry, material);
  bottomFrame.position.set(offsetX, -leafHeight/2 + frameThickness/2, 0.02);
  group.add(bottomFrame);
  
  // Left frame
  const sideGeometry = new THREE.BoxGeometry(frameThickness, leafHeight - frameThickness * 2, 0.04);
  const leftFrame = new THREE.Mesh(sideGeometry, material);
  leftFrame.position.set(offsetX - leafWidth/2 + frameThickness/2, 0, 0.02);
  group.add(leftFrame);
  
  // Right frame
  const rightFrame = new THREE.Mesh(sideGeometry, material);
  rightFrame.position.set(offsetX + leafWidth/2 - frameThickness/2, 0, 0.02);
  group.add(rightFrame);
}

// Create inner frame around glass for triple window
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

// Add main frame depth for triple window
function addTripleFrameDepth(group: THREE.Group, width: number, height: number, baseColor: THREE.Color) {
  const depthMaterial = new THREE.MeshStandardMaterial({
    color: baseColor,
    roughness: 0.5,
    metalness: 0.2
  });
  
  const frameDepth = 0.1;
  const frameGeometry = new THREE.BoxGeometry(width + 0.02, height + 0.02, frameDepth);
  const frameDepthMesh = new THREE.Mesh(frameGeometry, depthMaterial);
  frameDepthMesh.position.set(0, 0, -frameDepth/2);
  group.add(frameDepthMesh);
}
