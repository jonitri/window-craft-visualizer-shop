
import * as THREE from 'three';
import { assembleAdvancedFrame } from './advancedFrameProfile';

// Create a realistic window frame using the advanced technical profile
export function createProfileBasedFrame(
  group: THREE.Group,
  width: number,
  height: number,
  frameDepth: number,
  baseColorHex: string,
  outsideColorHex: string,
  insideColorHex: string
): void {
  console.log("Creating profile-based frame with technical accuracy");
  
  // Use the improved advanced assembly method
  assembleAdvancedFrame(
    group,
    width,
    height,
    baseColorHex,
    outsideColorHex,
    insideColorHex
  );
  
  console.log("Profile-based frame created with realistic multi-chamber structure");
}

// Create high-quality glass panes to fit within the frame
export function createFrameGlass(
  group: THREE.Group,
  width: number,
  height: number,
  frameThickness: number
): void {
  console.log("Creating frame glass with realistic properties");
  
  const glassWidth = width - frameThickness * 1.5;
  const glassHeight = height - frameThickness * 1.5;
  
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.1,
    transmission: 0.9,
    roughness: 0.0,
    metalness: 0.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.0,
    ior: 1.52,
    thickness: 0.006,
    envMapIntensity: 1.0
  });
  
  const glassGeometry = new THREE.PlaneGeometry(glassWidth, glassHeight);
  const glass = new THREE.Mesh(glassGeometry, glassMaterial);
  glass.position.z = 0.01; // Slightly forward to avoid z-fighting
  glass.name = 'frame-glass';
  
  group.add(glass);
  
  console.log(`Glass pane created: ${glassWidth.toFixed(3)} x ${glassHeight.toFixed(3)}`);
}
