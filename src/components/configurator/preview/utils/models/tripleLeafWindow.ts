
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
  const leafWidth = width * 0.28; // Each leaf is slightly less than a third of the total width
  const leafHeight = height * 0.85;
  
  // Create glass for all three leaves with visible transparency
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
  leftGlass.position.set(-width/3, 0, 0.01); // Slightly forward
  group.add(leftGlass);
  
  // Middle glass
  const middleGlass = new THREE.Mesh(glassGeometry, glassMaterial);
  middleGlass.position.set(0, 0, 0.01); // Slightly forward
  group.add(middleGlass);
  
  // Right glass
  const rightGlass = new THREE.Mesh(glassGeometry, glassMaterial);
  rightGlass.position.set(width/3, 0, 0.01); // Slightly forward
  group.add(rightGlass);
  
  // Create sashes for all three leaves
  const sashThickness = 0.05;
  
  // Colors
  const outsideColor = new THREE.Color(outsideColorObject.hex);
  const outsideSashMaterial = new THREE.MeshStandardMaterial({
    color: outsideColor,
    roughness: 0.4,
    metalness: 0.3
  });
  
  const insideColor = new THREE.Color(insideColorObject.hex);
  const insideSashMaterial = new THREE.MeshStandardMaterial({
    color: insideColor,
    roughness: 0.4,
    metalness: 0.3
  });
  
  // Left leaf sashes
  createWindowSash(group, leafWidth * 1.05, leafHeight * 1.05, sashThickness, outsideSashMaterial, 0.03, 'front', -width/3);
  createWindowSash(group, leafWidth * 1.05, leafHeight * 1.05, sashThickness, insideSashMaterial, -0.03, 'back', -width/3);
  
  // Middle leaf sashes
  createWindowSash(group, leafWidth * 1.05, leafHeight * 1.05, sashThickness, outsideSashMaterial, 0.03, 'front', 0);
  createWindowSash(group, leafWidth * 1.05, leafHeight * 1.05, sashThickness, insideSashMaterial, -0.03, 'back', 0);
  
  // Right leaf sashes
  createWindowSash(group, leafWidth * 1.05, leafHeight * 1.05, sashThickness, outsideSashMaterial, 0.03, 'front', width/3);
  createWindowSash(group, leafWidth * 1.05, leafHeight * 1.05, sashThickness, insideSashMaterial, -0.03, 'back', width/3);
  
  // Dividers (mullions) with base color - more prominent
  const baseColor = new THREE.Color(baseColorObject.hex);
  const dividerWidth = 0.12; // Increased width
  const dividerGeometry = new THREE.BoxGeometry(dividerWidth, height * 0.95, 0.12);
  const dividerMaterial = new THREE.MeshStandardMaterial({ 
    color: baseColor,
    roughness: 0.5,
    metalness: 0.4
  });
  
  // Left divider
  const leftDivider = new THREE.Mesh(dividerGeometry, dividerMaterial);
  leftDivider.position.set(-width/6, 0, 0);
  group.add(leftDivider);
  
  // Right divider
  const rightDivider = new THREE.Mesh(dividerGeometry, dividerMaterial);
  rightDivider.position.set(width/6, 0, 0);
  group.add(rightDivider);
  
  // Add handles
  addWindowHandle(group, -width/3 + leafWidth/2 - 0.1, -leafHeight/4, 0.04, outsideColor);
  addWindowHandle(group, width/3 - leafWidth/2 + 0.1, -leafHeight/4, 0.04, outsideColor);
}
