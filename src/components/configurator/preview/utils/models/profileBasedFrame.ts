
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
  console.log("Creating profile-based frame using advanced technical profile");
  
  // Use the new advanced assembly method
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

// Create glass panes to fit within the frame
export function createFrameGlass(
  group: THREE.Group,
  width: number,
  height: number,
  frameThickness: number
): void {
  const glassWidth = width - frameThickness * 2;
  const glassHeight = height - frameThickness * 2;
  
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.15,
    transmission: 0.85,
    roughness: 0.0,
    metalness: 0.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.0,
    ior: 1.52,
    thickness: 0.005
  });
  
  const glassGeometry = new THREE.PlaneGeometry(glassWidth, glassHeight);
  const glass = new THREE.Mesh(glassGeometry, glassMaterial);
  glass.position.z = 0;
  
  group.add(glass);
}
