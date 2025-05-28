
import * as THREE from 'three';
import { ColorOption } from '@/data/products';
import { createWindowSash } from './windowComponents';

export function createFixedWindow(
  group: THREE.Group, 
  width: number, 
  height: number, 
  texture: THREE.Texture,
  baseColorObject: ColorOption,
  outsideColorObject: ColorOption,
  insideColorObject: ColorOption
): void {
  // Create a larger glass panel for fixed windows
  const geometry = new THREE.PlaneGeometry(width * 0.85, height * 0.85);
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    transparent: true,
    opacity: 0.7,
    transmission: 0.9,
    roughness: 0.05,
    metalness: 0.1,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    side: THREE.DoubleSide,
  });
  
  const glassPanel = new THREE.Mesh(geometry, glassMaterial);
  group.add(glassPanel);
  
  // Create window sash with proper color assignment
  const sashWidth = width * 0.9;
  const sashHeight = height * 0.9;
  const sashThickness = 0.05;
  
  // Colors
  const outsideColor = new THREE.Color(outsideColorObject.hex);
  const insideColor = new THREE.Color(insideColorObject.hex);
  const baseColor = new THREE.Color(baseColorObject.hex);
  
  const outsideSashMaterial = new THREE.MeshStandardMaterial({
    color: outsideColor,
    roughness: 0.5,
    metalness: 0.2
  });
  
  const insideSashMaterial = new THREE.MeshStandardMaterial({
    color: insideColor,
    roughness: 0.5,
    metalness: 0.2
  });
  
  // Create sash with cutout for glass
  createWindowSash(group, sashWidth, sashHeight, sashThickness, outsideSashMaterial, 0.02, 'front');
  createWindowSash(group, sashWidth, sashHeight, sashThickness, insideSashMaterial, -0.02, 'back');
  
  // Add frame depth/sides with base color
  addFrameDepth(group, sashWidth, sashHeight, sashThickness, baseColor);
  
  // Add a "Fixed" label using simple geometry
  const labelGeometry = new THREE.BoxGeometry(0.4, 0.1, 0.01);
  const labelMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
  const label = new THREE.Mesh(labelGeometry, labelMaterial);
  label.position.set(0, -height * 0.3, 0.05);
  group.add(label);
  
  // Add a small indicator dot above the label
  const dotGeometry = new THREE.CircleGeometry(0.05, 16);
  const dot = new THREE.Mesh(dotGeometry, labelMaterial);
  dot.position.set(0, -height * 0.25, 0.05);
  group.add(dot);
}

// Helper function to add frame depth with base color
function addFrameDepth(group: THREE.Group, width: number, height: number, thickness: number, baseColor: THREE.Color) {
  const depthMaterial = new THREE.MeshStandardMaterial({
    color: baseColor,
    roughness: 0.6,
    metalness: 0.3
  });
  
  const frameDepth = 0.04;
  
  // Top edge
  const topEdgeGeometry = new THREE.BoxGeometry(width, thickness, frameDepth);
  const topEdge = new THREE.Mesh(topEdgeGeometry, depthMaterial);
  topEdge.position.set(0, height/2 - thickness/2, 0);
  group.add(topEdge);
  
  // Bottom edge
  const bottomEdge = new THREE.Mesh(topEdgeGeometry, depthMaterial);
  bottomEdge.position.set(0, -height/2 + thickness/2, 0);
  group.add(bottomEdge);
  
  // Left edge
  const sideEdgeGeometry = new THREE.BoxGeometry(thickness, height - thickness * 2, frameDepth);
  const leftEdge = new THREE.Mesh(sideEdgeGeometry, depthMaterial);
  leftEdge.position.set(-width/2 + thickness/2, 0, 0);
  group.add(leftEdge);
  
  // Right edge
  const rightEdge = new THREE.Mesh(sideEdgeGeometry, depthMaterial);
  rightEdge.position.set(width/2 - thickness/2, 0, 0);
  group.add(rightEdge);
}
