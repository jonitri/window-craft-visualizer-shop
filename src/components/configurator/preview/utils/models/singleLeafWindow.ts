
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
  // Create glass panel with enhanced transparency
  const geometry = new THREE.PlaneGeometry(width * 0.85, height * 0.85);
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    transparent: true,
    opacity: 0.3, // More transparent
    transmission: 1.0, // Maximum transmission
    roughness: 0.05,
    metalness: 0.0,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    side: THREE.DoubleSide,
    color: 0xffffff,
    ior: 1.5, // Index of refraction for glass
  });
  
  const glassPanel = new THREE.Mesh(geometry, glassMaterial);
  glassPanel.position.z = 0;
  group.add(glassPanel);
  
  // Create the window sash with proper color assignment
  const sashWidth = width * 0.9;
  const sashHeight = height * 0.9;
  const sashThickness = 0.05;
  
  // Colors
  const outsideColor = new THREE.Color(outsideColorObject.hex);
  const insideColor = new THREE.Color(insideColorObject.hex);
  const baseColor = new THREE.Color(baseColorObject.hex);
  
  // Outside sash frame (front face) - using outside color
  const outsideSashMaterial = new THREE.MeshStandardMaterial({
    color: outsideColor,
    roughness: 0.4,
    metalness: 0.3
  });
  
  // Inside sash frame (back face) - using inside color
  const insideSashMaterial = new THREE.MeshStandardMaterial({
    color: insideColor,
    roughness: 0.4,
    metalness: 0.3
  });
  
  // Create sash components with proper color assignment
  createWindowSash(group, sashWidth, sashHeight, sashThickness, outsideSashMaterial, 0.03, 'front');
  createWindowSash(group, sashWidth, sashHeight, sashThickness, insideSashMaterial, -0.03, 'back');
  
  // Add frame depth/sides with base color - more prominent
  addFrameDepth(group, sashWidth, sashHeight, sashThickness, baseColor);
  
  // Add handle with outside color
  addWindowHandle(group, sashWidth/2 - 0.1, -sashHeight/4, 0.04, outsideColor);
}

// Helper function to add frame depth with base color - enhanced visibility
function addFrameDepth(group: THREE.Group, width: number, height: number, thickness: number, baseColor: THREE.Color) {
  const depthMaterial = new THREE.MeshStandardMaterial({
    color: baseColor,
    roughness: 0.5,
    metalness: 0.4
  });
  
  const frameDepth = 0.08; // Increased depth for better visibility
  
  // Top edge
  const topEdgeGeometry = new THREE.BoxGeometry(width + thickness, thickness * 1.5, frameDepth);
  const topEdge = new THREE.Mesh(topEdgeGeometry, depthMaterial);
  topEdge.position.set(0, height/2 + thickness/4, 0);
  group.add(topEdge);
  
  // Bottom edge
  const bottomEdge = new THREE.Mesh(topEdgeGeometry, depthMaterial);
  bottomEdge.position.set(0, -height/2 - thickness/4, 0);
  group.add(bottomEdge);
  
  // Left edge
  const sideEdgeGeometry = new THREE.BoxGeometry(thickness * 1.5, height + thickness, frameDepth);
  const leftEdge = new THREE.Mesh(sideEdgeGeometry, depthMaterial);
  leftEdge.position.set(-width/2 - thickness/4, 0, 0);
  group.add(leftEdge);
  
  // Right edge
  const rightEdge = new THREE.Mesh(sideEdgeGeometry, depthMaterial);
  rightEdge.position.set(width/2 + thickness/4, 0, 0);
  group.add(rightEdge);
}
