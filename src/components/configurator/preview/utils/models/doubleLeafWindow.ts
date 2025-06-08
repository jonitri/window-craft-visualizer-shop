
import * as THREE from 'three';
import { createProfileBasedFrame, createFrameGlass } from './profileBasedFrame';

export function createDoubleLeafWindow(
  windowGroup: THREE.Group,
  windowWidth: number,
  windowHeight: number,
  texture: THREE.Texture,
  baseColorObject: any,
  outsideColorObject: any,
  insideColorObject: any,
  rubberColorObject: any
): void {
  console.log("Creating double leaf window with profile-based frame");
  
  const frameDepth = 0.12;
  
  // Create the main frame
  createProfileBasedFrame(
    windowGroup,
    windowWidth,
    windowHeight,
    frameDepth,
    baseColorObject.hex,
    outsideColorObject.hex,
    insideColorObject.hex
  );
  
  // Create center mullion (vertical divider)
  createCenterMullion(windowGroup, windowHeight, frameDepth, baseColorObject.hex, outsideColorObject.hex, insideColorObject.hex);
  
  // Add glass panes for both leaves
  const leafWidth = (windowWidth - 0.15) / 2;
  createLeafGlass(windowGroup, -leafWidth/2, 0, leafWidth, windowHeight - 0.15);
  createLeafGlass(windowGroup, leafWidth/2, 0, leafWidth, windowHeight - 0.15);
  
  // Add rubber seals
  createDoubleLeafSeals(windowGroup, windowWidth, windowHeight, rubberColorObject.hex);
  
  // Add handles for both leaves
  addWindowHandle(windowGroup, -windowWidth/4, 0, 0.08, new THREE.Color(baseColorObject.hex));
  addWindowHandle(windowGroup, windowWidth/4, 0, 0.08, new THREE.Color(baseColorObject.hex));
  
  console.log("Double leaf window with profile-based frame completed");
}

// Create center mullion using the same profile
function createCenterMullion(
  group: THREE.Group,
  height: number,
  depth: number,
  baseColorHex: string,
  outsideColorHex: string,
  insideColorHex: string
): void {
  const mullionThickness = 0.08;
  
  const materials = [
    new THREE.MeshStandardMaterial({ color: new THREE.Color(baseColorHex) }),
    new THREE.MeshStandardMaterial({ color: new THREE.Color(baseColorHex) }),
    new THREE.MeshStandardMaterial({ color: new THREE.Color(outsideColorHex) }),
    new THREE.MeshStandardMaterial({ color: new THREE.Color(insideColorHex) }),
    new THREE.MeshStandardMaterial({ color: new THREE.Color(baseColorHex) }),
    new THREE.MeshStandardMaterial({ color: new THREE.Color(baseColorHex) })
  ];
  
  const mullionGeometry = new THREE.BoxGeometry(mullionThickness, height - 0.15, depth);
  const mullion = new THREE.Mesh(mullionGeometry, materials);
  mullion.position.set(0, 0, -depth/2);
  group.add(mullion);
}

// Create glass for individual leaves
function createLeafGlass(
  group: THREE.Group,
  x: number,
  y: number,
  width: number,
  height: number
): void {
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
  
  const glassGeometry = new THREE.PlaneGeometry(width * 0.85, height * 0.85);
  const glass = new THREE.Mesh(glassGeometry, glassMaterial);
  glass.position.set(x, y, 0);
  group.add(glass);
}

// Create rubber seals for double leaf configuration
function createDoubleLeafSeals(
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
  
  // Perimeter seals
  const topSealGeometry = new THREE.BoxGeometry(width - 0.02, sealThickness, sealDepth);
  const topSeal = new THREE.Mesh(topSealGeometry, rubberMaterial);
  topSeal.position.set(0, height/2 - 0.08, 0.02);
  group.add(topSeal);
  
  const bottomSeal = new THREE.Mesh(topSealGeometry, rubberMaterial);
  bottomSeal.position.set(0, -height/2 + 0.08, 0.02);
  group.add(bottomSeal);
  
  const sideSealGeometry = new THREE.BoxGeometry(sealThickness, height - 0.16, sealDepth);
  const leftSeal = new THREE.Mesh(sideSealGeometry, rubberMaterial);
  leftSeal.position.set(-width/2 + 0.08, 0, 0.02);
  group.add(leftSeal);
  
  const rightSeal = new THREE.Mesh(sideSealGeometry, rubberMaterial);
  rightSeal.position.set(width/2 - 0.08, 0, 0.02);
  group.add(rightSeal);
  
  // Center seal between leaves
  const centerSeal = new THREE.Mesh(sideSealGeometry, rubberMaterial);
  centerSeal.position.set(0, 0, 0.02);
  group.add(centerSeal);
}

// Add window handles
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
  
  const handleBaseGeometry = new THREE.BoxGeometry(0.08, 0.03, 0.03);
  const handleBase = new THREE.Mesh(handleBaseGeometry, handleMaterial);
  handleBase.position.set(x, y, z);
  group.add(handleBase);
  
  const handleGeometry = new THREE.CylinderGeometry(0.015, 0.015, 0.1, 8);
  handleGeometry.rotateX(Math.PI / 2);
  const handle = new THREE.Mesh(handleGeometry, handleMaterial);
  handle.position.set(x, y, z + 0.04);
  group.add(handle);
}
