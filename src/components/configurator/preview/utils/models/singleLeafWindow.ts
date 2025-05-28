
import * as THREE from 'three';
import { ColorOption } from '@/data/products';
import { createWindowSash, addWindowHandle } from './windowComponents';

export function createSingleLeafWindow(
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
  
  // Create highly transparent glass with subtle reflection
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
  
  const glassPanel = new THREE.Mesh(geometry, glassMaterial);
  glassPanel.position.z = 0.005; // Slightly forward
  group.add(glassPanel);
  
  // Create the window frame that surrounds the glass
  const frameThickness = 0.08;
  
  // Colors
  const outsideColor = new THREE.Color(outsideColorObject.hex);
  const insideColor = new THREE.Color(insideColorObject.hex);
  const baseColor = new THREE.Color(baseColorObject.hex);
  
  // Frame material
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: outsideColor,
    roughness: 0.3,
    metalness: 0.1
  });
  
  // Create outer frame border
  createFrameBorder(group, width, height, frameThickness, frameMaterial);
  
  // Create inner frame that holds the glass
  createInnerFrame(group, glassWidth, glassHeight, frameThickness * 0.6, frameMaterial);
  
  // Add frame depth with base color
  addFrameDepth(group, width, height, frameThickness, baseColor);
  
  // Add handle
  addWindowHandle(group, width/2 - 0.15, -height/4, 0.04, outsideColor);
}

// Create the outer frame border
function createFrameBorder(group: THREE.Group, width: number, height: number, thickness: number, material: THREE.Material) {
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

// Create the inner frame that directly surrounds the glass
function createInnerFrame(group: THREE.Group, glassWidth: number, glassHeight: number, thickness: number, material: THREE.Material) {
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

// Helper function to add frame depth with base color
function addFrameDepth(group: THREE.Group, width: number, height: number, thickness: number, baseColor: THREE.Color) {
  const depthMaterial = new THREE.MeshStandardMaterial({
    color: baseColor,
    roughness: 0.5,
    metalness: 0.2
  });
  
  const frameDepth = 0.1;
  
  // Create frame depth structure
  const frameGeometry = new THREE.BoxGeometry(width + 0.02, height + 0.02, frameDepth);
  const frameDepthMesh = new THREE.Mesh(frameGeometry, depthMaterial);
  frameDepthMesh.position.set(0, 0, -frameDepth/2);
  group.add(frameDepthMesh);
}
