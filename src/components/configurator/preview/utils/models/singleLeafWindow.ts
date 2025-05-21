
import * as THREE from 'three';
import { ColorOption } from '@/data/products';
import { createWindowSash } from './windowComponents';

export function createSingleLeafWindow(
  group: THREE.Group, 
  width: number, 
  height: number, 
  texture: THREE.Texture,
  baseColorObject: ColorOption,
  outsideColorObject: ColorOption,
  insideColorObject: ColorOption
): void {
  // Create glass panel
  const geometry = new THREE.PlaneGeometry(width * 0.85, height * 0.85);
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
  
  const glassPanel = new THREE.Mesh(geometry, glassMaterial);
  glassPanel.position.z = 0;
  group.add(glassPanel);
  
  // Create the window sash (the frame around the glass)
  const sashWidth = width * 0.9;
  const sashHeight = height * 0.9;
  const sashThickness = 0.05;
  
  // Outside sash frame (visible from front)
  const outsideColor = new THREE.Color(outsideColorObject.hex);
  const outsideSashMaterial = new THREE.MeshStandardMaterial({
    color: outsideColor,
    roughness: 0.5,
    metalness: 0.2
  });
  
  // Create sash with cutout for glass
  createWindowSash(group, sashWidth, sashHeight, sashThickness, outsideSashMaterial, 0.02, 'front');
  
  // Inside sash frame (visible from back)
  const insideColor = new THREE.Color(insideColorObject.hex);
  const insideSashMaterial = new THREE.MeshStandardMaterial({
    color: insideColor,
    roughness: 0.5,
    metalness: 0.2
  });
  
  createWindowSash(group, sashWidth, sashHeight, sashThickness, insideSashMaterial, -0.02, 'back');
}
