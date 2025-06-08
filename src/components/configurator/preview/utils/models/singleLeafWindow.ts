
import * as THREE from 'three';
import { createProfileBasedFrame, createFrameGlass } from './profileBasedFrame';

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
  console.log("Creating single leaf window with assembled profile frame");
  
  const frameDepth = 0.12;
  
  // Create the main frame using assembled profiles
  createProfileBasedFrame(
    windowGroup,
    windowWidth,
    windowHeight,
    frameDepth,
    baseColorObject.hex,
    outsideColorObject.hex,
    insideColorObject.hex
  );
  
  // Add glass panes
  createFrameGlass(windowGroup, windowWidth, windowHeight, 0.15);
  
  // Add rubber seals around the frame
  createRubberSeals(windowGroup, windowWidth, windowHeight, rubberColorObject.hex);
  
  // Add window handle for single leaf
  addWindowHandle(windowGroup, windowWidth * 0.35, 0, 0.08, new THREE.Color(baseColorObject.hex));
  
  console.log("Single leaf window with assembled profile frame completed");
}

// Create rubber seals
function createRubberSeals(
  group: THREE.Group,
  width: number,
  height: number,
  rubberColorHex: string
): void {
  const rubberMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(rubberColorHex),
    roughness: 0.8,
    metalness: 0.0
  });
  
  const sealThickness = 0.008;
  const sealDepth = 0.04;
  
  // Top seal
  const topSealGeometry = new THREE.BoxGeometry(width - 0.02, sealThickness, sealDepth);
  const topSeal = new THREE.Mesh(topSealGeometry, rubberMaterial);
  topSeal.position.set(0, height/2 - 0.08, 0.02);
  group.add(topSeal);
  
  // Bottom seal
  const bottomSeal = new THREE.Mesh(topSealGeometry, rubberMaterial);
  bottomSeal.position.set(0, -height/2 + 0.08, 0.02);
  group.add(bottomSeal);
  
  // Left seal
  const sideSealGeometry = new THREE.BoxGeometry(sealThickness, height - 0.16, sealDepth);
  const leftSeal = new THREE.Mesh(sideSealGeometry, rubberMaterial);
  leftSeal.position.set(-width/2 + 0.08, 0, 0.02);
  group.add(leftSeal);
  
  // Right seal
  const rightSeal = new THREE.Mesh(sideSealGeometry, rubberMaterial);
  rightSeal.position.set(width/2 - 0.08, 0, 0.02);
  group.add(rightSeal);
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
