
import * as THREE from 'three';
import { ColorOption } from '@/data/products';

export function createFixedWindow(
  group: THREE.Group, 
  width: number, 
  height: number, 
  texture: THREE.Texture,
  baseColorObject: ColorOption,
  outsideColorObject: ColorOption,
  insideColorObject: ColorOption
): void {
  // Create realistic glass panel
  const glassWidth = width * 0.7;
  const glassHeight = height * 0.7;
  const geometry = new THREE.PlaneGeometry(glassWidth, glassHeight);
  
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
  
  const glassPanel = new THREE.Mesh(geometry, glassMaterial);
  glassPanel.position.z = 0.005;
  group.add(glassPanel);
  
  // Colors
  const outsideColor = new THREE.Color(outsideColorObject.hex);
  const baseColor = new THREE.Color(baseColorObject.hex);
  
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: outsideColor,
    roughness: 0.3,
    metalness: 0.1
  });
  
  // Create outer frame
  createFixedFrameBorder(group, width, height, 0.08, frameMaterial);
  
  // Create inner frame around glass
  createFixedInnerFrame(group, glassWidth, glassHeight, 0.05, frameMaterial);
  
  // Add frame depth
  addFixedFrameDepth(group, width, height, 0.08, baseColor);
  
  // Add "Fixed" indicator
  const labelGeometry = new THREE.BoxGeometry(0.3, 0.08, 0.02);
  const labelMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
  const label = new THREE.Mesh(labelGeometry, labelMaterial);
  label.position.set(0, -height * 0.25, 0.04);
  group.add(label);
}

// Create outer frame border for fixed window
function createFixedFrameBorder(group: THREE.Group, width: number, height: number, thickness: number, material: THREE.Material) {
  // Top border
  const topGeometry = new THREE.BoxGeometry(width, thickness, 0.06);
  const topBorder = new THREE.Mesh(topGeometry, material);
  topBorder.position.set(0, height/2 - thickness/2, 0.03);
  group.add(topBorder);
  
  // Bottom border
  const bottomBorder = new THREE.Mesh(topGeometry, material);
  bottomBorder.position.set(0, -height/2 + thickness/2, 0.03);
  group.add(bottomBorder);
  
  // Left border
  const sideGeometry = new THREE.BoxGeometry(thickness, height - thickness * 2, 0.06);
  const leftBorder = new THREE.Mesh(sideGeometry, material);
  leftBorder.position.set(-width/2 + thickness/2, 0, 0.03);
  group.add(leftBorder);
  
  // Right border
  const rightBorder = new THREE.Mesh(sideGeometry, material);
  rightBorder.position.set(width/2 - thickness/2, 0, 0.03);
  group.add(rightBorder);
}

// Create inner frame around glass for fixed window
function createFixedInnerFrame(group: THREE.Group, glassWidth: number, glassHeight: number, thickness: number, material: THREE.Material) {
  // Top inner frame
  const topGeometry = new THREE.BoxGeometry(glassWidth + thickness * 2, thickness, 0.04);
  const topFrame = new THREE.Mesh(topGeometry, material);
  topFrame.position.set(0, glassHeight/2 + thickness/2, 0.02);
  group.add(topFrame);
  
  // Bottom inner frame
  const bottomFrame = new THREE.Mesh(topGeometry, material);
  bottomFrame.position.set(0, -glassHeight/2 - thickness/2, 0.02);
  group.add(bottomFrame);
  
  // Left inner frame
  const sideGeometry = new THREE.BoxGeometry(thickness, glassHeight, 0.04);
  const leftFrame = new THREE.Mesh(sideGeometry, material);
  leftFrame.position.set(-glassWidth/2 - thickness/2, 0, 0.02);
  group.add(leftFrame);
  
  // Right inner frame
  const rightFrame = new THREE.Mesh(sideGeometry, material);
  rightFrame.position.set(glassWidth/2 + thickness/2, 0, 0.02);
  group.add(rightFrame);
}

// Add frame depth for fixed window
function addFixedFrameDepth(group: THREE.Group, width: number, height: number, thickness: number, baseColor: THREE.Color) {
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
