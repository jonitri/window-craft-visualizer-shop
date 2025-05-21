
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
  
  // Create glass for both leaves
  const glassGeometry = new THREE.PlaneGeometry(leafWidth, leafHeight);
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    transparent: true,
    opacity: 0.6,
    transmission: 0.9,
    roughness: 0.1,
    metalness: 0.1,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    side: THREE.DoubleSide,
  });
  
  // Left glass
  const leftGlass = new THREE.Mesh(glassGeometry, glassMaterial);
  leftGlass.position.set(-width/4, 0, 0);
  group.add(leftGlass);
  
  // Right glass
  const rightGlass = new THREE.Mesh(glassGeometry, glassMaterial);
  rightGlass.position.set(width/4, 0, 0);
  group.add(rightGlass);
  
  // Create sashes for both leaves
  const sashThickness = 0.05;
  
  // Colors
  const outsideColor = new THREE.Color(outsideColorObject.hex);
  const outsideSashMaterial = new THREE.MeshStandardMaterial({
    color: outsideColor,
    roughness: 0.5,
    metalness: 0.2
  });
  
  const insideColor = new THREE.Color(insideColorObject.hex);
  const insideSashMaterial = new THREE.MeshStandardMaterial({
    color: insideColor,
    roughness: 0.5,
    metalness: 0.2
  });
  
  // Left leaf sashes - using outsideSashMaterial for front, insideSashMaterial for back
  createWindowSash(group, leafWidth * 1.05, leafHeight * 1.05, sashThickness, outsideSashMaterial, 0.02, 'front', -width/4);
  createWindowSash(group, leafWidth * 1.05, leafHeight * 1.05, sashThickness, insideSashMaterial, -0.02, 'back', -width/4);
  
  // Right leaf sashes - using outsideSashMaterial for front, insideSashMaterial for back
  createWindowSash(group, leafWidth * 1.05, leafHeight * 1.05, sashThickness, outsideSashMaterial, 0.02, 'front', width/4);
  createWindowSash(group, leafWidth * 1.05, leafHeight * 1.05, sashThickness, insideSashMaterial, -0.02, 'back', width/4);
  
  // Center divider (mullion)
  const baseColor = new THREE.Color(baseColorObject.hex);
  const dividerWidth = 0.08;
  const dividerGeometry = new THREE.BoxGeometry(dividerWidth, height * 0.9, 0.1);
  const dividerMaterial = new THREE.MeshStandardMaterial({ 
    color: baseColor,
    roughness: 0.5,
    metalness: 0.3
  });
  const divider = new THREE.Mesh(dividerGeometry, dividerMaterial);
  divider.position.set(0, 0, 0);
  group.add(divider);
  
  // Add handles on both sides for more realism
  // Outside handles
  addWindowHandle(group, width/4 - leafWidth/2 + 0.1, -leafHeight/4, 0.03, outsideColor);
  addWindowHandle(group, -width/4 + leafWidth/2 - 0.1, -leafHeight/4, 0.03, outsideColor);
  
  // Add more realistic details
  // Frame edge highlights
  addFrameHighlights(group, width, height, baseColor);
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
