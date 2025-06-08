
import * as THREE from 'three';
import { createProfileBasedFrame, createFrameGlass } from './profileBasedFrame';
import type { WindowModelProps } from './windowModelTypes';

export function createProfileBasedWindow(
  windowGroup: THREE.Group,
  windowWidth: number,
  windowHeight: number,
  texture: THREE.Texture,
  baseColorObject: any,
  outsideColorObject: any,
  insideColorObject: any,
  rubberColorObject: any
): void {
  console.log("Creating profile-based window with realistic frame cross-section");
  
  const frameDepth = 0.12;
  
  // Create the main frame using the profile extrusion
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
  
  console.log("Profile-based window completed with extruded frame sections");
}

// Create rubber seals based on the technical drawing
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
