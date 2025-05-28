
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
  // Colors
  const outsideColor = new THREE.Color(outsideColorObject.hex);
  const baseColor = new THREE.Color(baseColorObject.hex);
  
  // Create main window frame structure first
  createFixedMainFrame(group, width, height, baseColor, outsideColor);
  
  // Create glass panel that's clearly visible
  const glassWidth = width * 0.8;
  const glassHeight = height * 0.8;
  
  const glassGeometry = new THREE.PlaneGeometry(glassWidth, glassHeight);
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    transparent: true,
    opacity: 0.25,
    transmission: 0.85,
    roughness: 0.0,
    metalness: 0.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    side: THREE.DoubleSide,
    color: 0xE6F3FF,  // Light blue tint
    ior: 1.52,
    thickness: 0.02,
  });
  
  const glassPanel = new THREE.Mesh(glassGeometry, glassMaterial);
  glassPanel.position.z = 0.01;
  group.add(glassPanel);
  
  // Create inner frame around glass
  createFixedInnerFrame(group, glassWidth, glassHeight, outsideColor);
  
  // Add "Fixed" label
  const labelGeometry = new THREE.BoxGeometry(0.3, 0.08, 0.02);
  const labelMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
  const label = new THREE.Mesh(labelGeometry, labelMaterial);
  label.position.set(0, -height * 0.3, 0.06);
  group.add(label);
  
  console.log("Fixed window created with visible glass");
}

// Create main frame for fixed window
function createFixedMainFrame(
  group: THREE.Group, 
  width: number, 
  height: number, 
  baseColor: THREE.Color, 
  outsideColor: THREE.Color
) {
  const frameThickness = 0.1;
  const frameDepth = 0.12;
  
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: baseColor,
    roughness: 0.6,
    metalness: 0.1
  });
  
  const outsideMaterial = new THREE.MeshStandardMaterial({
    color: outsideColor,
    roughness: 0.5,
    metalness: 0.1
  });
  
  // Frame depth
  const frameGeometry = new THREE.BoxGeometry(width + frameThickness, height + frameThickness, frameDepth);
  const frameDepthMesh = new THREE.Mesh(frameGeometry, frameMaterial);
  frameDepthMesh.position.set(0, 0, -frameDepth/2);
  group.add(frameDepthMesh);
  
  // Create outer frame borders
  createFixedFrameBorder(group, width, height, frameThickness, outsideMaterial);
}

// Create outer frame border for fixed window
function createFixedFrameBorder(group: THREE.Group, width: number, height: number, thickness: number, material: THREE.Material) {
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

// Create inner frame around glass for fixed window
function createFixedInnerFrame(group: THREE.Group, glassWidth: number, glassHeight: number, color: THREE.Color) {
  const thickness = 0.05;
  const material = new THREE.MeshStandardMaterial({
    color: color,
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
