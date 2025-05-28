
import * as THREE from 'three';
import { ColorOption } from '@/data/products';
import { createWindowSash, addWindowHandle } from './windowComponents';

export function createDoubleLeafWindow(
  group: THREE.Group, 
  width: number, 
  height: number, 
  texture: THREE.Texture,
  baseColorObject: ColorOption,
  outsideColorObject: ColorOption,
  insideColorObject: ColorOption
): void {
  const leafWidth = width * 0.45;
  const leafHeight = height * 0.7;
  const glassWidth = leafWidth * 0.8;
  const glassHeight = leafHeight * 0.85;
  
  // Create realistic glass material
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    transparent: true,
    opacity: 0.15, // Very transparent
    transmission: 0.95, // High transmission for realistic glass
    roughness: 0.05,
    metalness: 0.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    side: THREE.DoubleSide,
    color: 0xffffff, // Clear white
    ior: 1.52, // Glass refractive index
    thickness: 0.01,
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
  
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: outsideColor,
    roughness: 0.3,
    metalness: 0.1
  });
  
  // Create frames for both leaves
  createLeafFrame(group, leafWidth, leafHeight, -width/4, frameMaterial);
  createLeafFrame(group, leafWidth, leafHeight, width/4, frameMaterial);
  
  // Create inner frames around glass
  createGlassFrame(group, glassWidth, glassHeight, -width/4, frameMaterial);
  createGlassFrame(group, glassWidth, glassHeight, width/4, frameMaterial);
  
  // Center divider (mullion) with base color
  const dividerMaterial = new THREE.MeshStandardMaterial({ 
    color: baseColor,
    roughness: 0.4,
    metalness: 0.2
  });
  
  const dividerGeometry = new THREE.BoxGeometry(0.08, height * 0.9, 0.08);
  const divider = new THREE.Mesh(dividerGeometry, dividerMaterial);
  divider.position.set(0, 0, 0);
  group.add(divider);
  
  // Add outer frame depth
  addMainFrameDepth(group, width, height, baseColor);
  
  // Add handles
  addWindowHandle(group, -width/4 + glassWidth/2 + 0.05, -glassHeight/4, 0.03, outsideColor);
  addWindowHandle(group, width/4 - glassWidth/2 - 0.05, -glassHeight/4, 0.03, outsideColor);
}

// Create frame for each leaf
function createLeafFrame(group: THREE.Group, leafWidth: number, leafHeight: number, offsetX: number, material: THREE.Material) {
  const frameThickness = 0.06;
  
  // Top frame
  const topGeometry = new THREE.BoxGeometry(leafWidth, frameThickness, 0.05);
  const topFrame = new THREE.Mesh(topGeometry, material);
  topFrame.position.set(offsetX, leafHeight/2 - frameThickness/2, 0.025);
  group.add(topFrame);
  
  // Bottom frame
  const bottomFrame = new THREE.Mesh(topGeometry, material);
  bottomFrame.position.set(offsetX, -leafHeight/2 + frameThickness/2, 0.025);
  group.add(bottomFrame);
  
  // Left frame
  const sideGeometry = new THREE.BoxGeometry(frameThickness, leafHeight - frameThickness * 2, 0.05);
  const leftFrame = new THREE.Mesh(sideGeometry, material);
  leftFrame.position.set(offsetX - leafWidth/2 + frameThickness/2, 0, 0.025);
  group.add(leftFrame);
  
  // Right frame
  const rightFrame = new THREE.Mesh(sideGeometry, material);
  rightFrame.position.set(offsetX + leafWidth/2 - frameThickness/2, 0, 0.025);
  group.add(rightFrame);
}

// Create inner frame around glass
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

// Add main frame depth
function addMainFrameDepth(group: THREE.Group, width: number, height: number, baseColor: THREE.Color) {
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
