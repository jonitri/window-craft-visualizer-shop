
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
  console.log("Creating single leaf window with improved technical profile");
  
  const frameDepth = 0.08; // Match technical drawing depth
  
  // Clear any existing geometry
  windowGroup.clear();
  
  // Create the main frame using technical profiles
  createProfileBasedFrame(
    windowGroup,
    windowWidth,
    windowHeight,
    frameDepth,
    baseColorObject.hex,
    outsideColorObject.hex,
    insideColorObject.hex
  );
  
  // Add glass panes with proper sizing
  createFrameGlass(windowGroup, windowWidth, windowHeight, 0.12);
  
  // Add rubber seals around the frame
  createTechnicalRubberSeals(windowGroup, windowWidth, windowHeight, rubberColorObject.hex);
  
  // Add window handle for single leaf
  addWindowHandle(windowGroup, windowWidth * 0.35, 0, 0.05, new THREE.Color(baseColorObject.hex));
  
  console.log("Single leaf window with technical profile completed");
}

// Create rubber seals based on technical specifications
function createTechnicalRubberSeals(
  group: THREE.Group,
  width: number,
  height: number,
  rubberColorHex: string
): void {
  console.log("Creating technical rubber seals");
  
  const rubberMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(rubberColorHex),
    roughness: 0.9,
    metalness: 0.0,
    bumpScale: 0.1
  });
  
  const sealThickness = 0.006;
  const sealDepth = 0.025;
  const inset = 0.06; // Distance from frame edge
  
  // Create seal geometries
  const horizontalSealGeometry = new THREE.BoxGeometry(width - inset * 2, sealThickness, sealDepth);
  const verticalSealGeometry = new THREE.BoxGeometry(sealThickness, height - inset * 2, sealDepth);
  
  // Top seal
  const topSeal = new THREE.Mesh(horizontalSealGeometry, rubberMaterial);
  topSeal.position.set(0, height/2 - inset, 0.01);
  topSeal.name = 'top-rubber-seal';
  group.add(topSeal);
  
  // Bottom seal
  const bottomSeal = new THREE.Mesh(horizontalSealGeometry, rubberMaterial);
  bottomSeal.position.set(0, -height/2 + inset, 0.01);
  bottomSeal.name = 'bottom-rubber-seal';
  group.add(bottomSeal);
  
  // Left seal
  const leftSeal = new THREE.Mesh(verticalSealGeometry, rubberMaterial);
  leftSeal.position.set(-width/2 + inset, 0, 0.01);
  leftSeal.name = 'left-rubber-seal';
  group.add(leftSeal);
  
  // Right seal
  const rightSeal = new THREE.Mesh(verticalSealGeometry, rubberMaterial);
  rightSeal.position.set(width/2 - inset, 0, 0.01);
  rightSeal.name = 'right-rubber-seal';
  group.add(rightSeal);
  
  console.log("Technical rubber seals created");
}

// Add a realistic window handle to the frame
function addWindowHandle(
  group: THREE.Group,
  x: number,
  y: number,
  z: number,
  color: THREE.Color
): void {
  console.log("Adding window handle");
  
  const handleMaterial = new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.2,
    metalness: 0.8,
    envMapIntensity: 1.0
  });
  
  // Handle base plate
  const handleBaseGeometry = new THREE.BoxGeometry(0.06, 0.025, 0.015);
  const handleBase = new THREE.Mesh(handleBaseGeometry, handleMaterial);
  handleBase.position.set(x, y, z);
  handleBase.name = 'handle-base';
  group.add(handleBase);
  
  // Handle lever
  const leverGeometry = new THREE.CylinderGeometry(0.008, 0.008, 0.08, 8);
  leverGeometry.rotateZ(Math.PI / 2); // Horizontal orientation
  const handleLever = new THREE.Mesh(leverGeometry, handleMaterial);
  handleLever.position.set(x + 0.03, y, z + 0.02);
  handleLever.name = 'handle-lever';
  group.add(handleLever);
  
  // Handle grip
  const gripGeometry = new THREE.SphereGeometry(0.012, 8, 6);
  const handleGrip = new THREE.Mesh(gripGeometry, handleMaterial);
  handleGrip.position.set(x + 0.07, y, z + 0.02);
  handleGrip.name = 'handle-grip';
  group.add(handleGrip);
  
  console.log("Window handle created");
}
