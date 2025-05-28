
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
  const leafWidth = width * 0.425; // Each leaf is slightly less than half width
  const leafHeight = height * 0.85;
  
  // Create glass for both leaves with visible transparency
  const glassGeometry = new THREE.PlaneGeometry(leafWidth, leafHeight);
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    transparent: true,
    opacity: 0.6, // Increased opacity to make it more visible
    transmission: 0.8, // Reduced transmission for better visibility
    roughness: 0.1,
    metalness: 0.0,
    clearcoat: 0.5,
    clearcoatRoughness: 0.1,
    side: THREE.DoubleSide,
    color: 0xe6f3ff, // Light blue tint to make glass visible
    ior: 1.5,
  });
  
  // Left glass
  const leftGlass = new THREE.Mesh(glassGeometry, glassMaterial);
  leftGlass.position.set(-width/4, 0, 0.01); // Slightly forward
  group.add(leftGlass);
  
  // Right glass
  const rightGlass = new THREE.Mesh(glassGeometry, glassMaterial);
  rightGlass.position.set(width/4, 0, 0.01); // Slightly forward
  group.add(rightGlass);
  
  // Create sashes for both leaves with proper color assignment
  const sashThickness = 0.05;
  
  // Colors
  const outsideColor = new THREE.Color(outsideColorObject.hex);
  const insideColor = new THREE.Color(insideColorObject.hex);
  const baseColor = new THREE.Color(baseColorObject.hex);
  
  const outsideSashMaterial = new THREE.MeshStandardMaterial({
    color: outsideColor,
    roughness: 0.4,
    metalness: 0.3
  });
  
  const insideSashMaterial = new THREE.MeshStandardMaterial({
    color: insideColor,
    roughness: 0.4,
    metalness: 0.3
  });
  
  // Left leaf sashes
  createWindowSash(group, leafWidth * 1.05, leafHeight * 1.05, sashThickness, outsideSashMaterial, 0.03, 'front', -width/4);
  createWindowSash(group, leafWidth * 1.05, leafHeight * 1.05, sashThickness, insideSashMaterial, -0.03, 'back', -width/4);
  
  // Right leaf sashes
  createWindowSash(group, leafWidth * 1.05, leafHeight * 1.05, sashThickness, outsideSashMaterial, 0.03, 'front', width/4);
  createWindowSash(group, leafWidth * 1.05, leafHeight * 1.05, sashThickness, insideSashMaterial, -0.03, 'back', width/4);
  
  // Add frame depth/sides with base color for both leaves
  addLeafFrameDepth(group, leafWidth * 1.05, leafHeight * 1.05, sashThickness, baseColor, -width/4);
  addLeafFrameDepth(group, leafWidth * 1.05, leafHeight * 1.05, sashThickness, baseColor, width/4);
  
  // Center divider (mullion) with base color - more prominent
  const dividerWidth = 0.12; // Increased width
  const dividerGeometry = new THREE.BoxGeometry(dividerWidth, height * 0.95, 0.12);
  const dividerMaterial = new THREE.MeshStandardMaterial({ 
    color: baseColor,
    roughness: 0.5,
    metalness: 0.4
  });
  const divider = new THREE.Mesh(dividerGeometry, dividerMaterial);
  divider.position.set(0, 0, 0);
  group.add(divider);
  
  // Add handles with outside color
  addWindowHandle(group, width/4 - leafWidth/2 + 0.1, -leafHeight/4, 0.04, outsideColor);
  addWindowHandle(group, -width/4 + leafWidth/2 - 0.1, -leafHeight/4, 0.04, outsideColor);
  
  // Add realistic frame highlights
  addFrameHighlights(group, width, height, baseColor);
}

// Helper function to add frame depth for each leaf
function addLeafFrameDepth(group: THREE.Group, width: number, height: number, thickness: number, baseColor: THREE.Color, offsetX: number) {
  const depthMaterial = new THREE.MeshStandardMaterial({
    color: baseColor,
    roughness: 0.6,
    metalness: 0.3
  });
  
  const frameDepth = 0.04;
  
  // Top edge
  const topEdgeGeometry = new THREE.BoxGeometry(width, thickness, frameDepth);
  const topEdge = new THREE.Mesh(topEdgeGeometry, depthMaterial);
  topEdge.position.set(offsetX, height/2 - thickness/2, 0);
  group.add(topEdge);
  
  // Bottom edge
  const bottomEdge = new THREE.Mesh(topEdgeGeometry, depthMaterial);
  bottomEdge.position.set(offsetX, -height/2 + thickness/2, 0);
  group.add(bottomEdge);
  
  // Left edge
  const sideEdgeGeometry = new THREE.BoxGeometry(thickness, height - thickness * 2, frameDepth);
  const leftEdge = new THREE.Mesh(sideEdgeGeometry, depthMaterial);
  leftEdge.position.set(offsetX - width/2 + thickness/2, 0, 0);
  group.add(leftEdge);
  
  // Right edge
  const rightEdge = new THREE.Mesh(sideEdgeGeometry, depthMaterial);
  rightEdge.position.set(offsetX + width/2 - thickness/2, 0, 0);
  group.add(rightEdge);
}

// Helper function to add additional details to make the window more realistic
function addFrameHighlights(group: THREE.Group, width: number, height: number, baseColor: THREE.Color) {
  // Add subtle edge highlights to simulate weatherstripping and seals
  const highlightMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x333333),
    roughness: 0.8,
    metalness: 0.1
  });
  
  // Create thin strips along the edges where the windows meet
  const stripWidth = 0.01;
  const stripGeometry = new THREE.BoxGeometry(stripWidth, height * 0.85, 0.06);
  
  // Left strip
  const leftStrip = new THREE.Mesh(stripGeometry, highlightMaterial);
  leftStrip.position.set(-stripWidth/2, 0, 0.03);
  group.add(leftStrip);
  
  // Right strip
  const rightStrip = new THREE.Mesh(stripGeometry, highlightMaterial);
  rightStrip.position.set(stripWidth/2, 0, 0.03);
  group.add(rightStrip);
}
