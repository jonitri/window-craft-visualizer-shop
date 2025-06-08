
import * as THREE from 'three';
import { createProfileBasedWindow } from './profileBasedWindow';

export function createSingleLeafWindow(
  windowGroup: THREE.Group,
  windowWidth: number,
  windowHeight: number,
  texture: THREE.Texture,
  baseColorObject: any,
  outsideColorObject: any,
  insideColorObject: any,
  rubberColorObject: any
): void {
  console.log("Creating single leaf window with profile-based frame");
  
  // Use the profile-based window model
  createProfileBasedWindow(
    windowGroup,
    windowWidth,
    windowHeight,
    texture,
    baseColorObject,
    outsideColorObject,
    insideColorObject,
    rubberColorObject
  );
  
  // Add window handle for single leaf
  addWindowHandle(windowGroup, windowWidth * 0.35, 0, 0.08, new THREE.Color(baseColorObject.hex));
  
  console.log("Single leaf window with profile-based frame completed");
}

// Add a window handle to the frame
function addWindowHandle(
  group: THREE.Group,
  x: number,
  y: number,
  z: number,
  color: THREE.Color
): void {
  const handleMaterial = new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.3,
    metalness: 0.7
  });
  
  // Handle base
  const handleBaseGeometry = new THREE.BoxGeometry(0.08, 0.03, 0.03);
  const handleBase = new THREE.Mesh(handleBaseGeometry, handleMaterial);
  handleBase.position.set(x, y, z);
  group.add(handleBase);
  
  // Handle lever
  const handleGeometry = new THREE.CylinderGeometry(0.015, 0.015, 0.1, 8);
  handleGeometry.rotateX(Math.PI / 2);
  const handle = new THREE.Mesh(handleGeometry, handleMaterial);
  handle.position.set(x, y, z + 0.04);
  group.add(handle);
}
