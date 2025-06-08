
import * as THREE from 'three';
import { assembleProfessionalFrame } from './professionalFrameAssembly';
import { createProfessionalGlazing } from './professionalGlazing';

// Create a complete professional window inspired by Salamander-style systems
export function createProfessionalWindow(
  windowGroup: THREE.Group,
  windowWidth: number,
  windowHeight: number,
  texture: THREE.Texture,
  baseColorObject: any,
  outsideColorObject: any,
  insideColorObject: any,
  rubberColorObject: any
): void {
  console.log("Creating professional window system inspired by Salamander design");
  
  windowGroup.clear();
  
  // Create professional frame assembly
  assembleProfessionalFrame(
    windowGroup,
    windowWidth,
    windowHeight,
    baseColorObject.hex,
    outsideColorObject.hex,
    insideColorObject.hex
  );
  
  // Add professional glazing system
  createProfessionalGlazing(windowGroup, windowWidth, windowHeight, 0.082);
  
  // Add professional sealing system
  addProfessionalSealing(windowGroup, windowWidth, windowHeight, rubberColorObject.hex);
  
  // Add professional hardware
  addProfessionalHardware(windowGroup, windowWidth, windowHeight, baseColorObject.hex);
  
  // Add drainage system
  addDrainageSystem(windowGroup, windowWidth, windowHeight);
  
  console.log("Professional window system completed");
}

function addProfessionalSealing(
  group: THREE.Group,
  width: number,
  height: number,
  rubberColorHex: string
): void {
  console.log("Adding professional multi-stage sealing system");
  
  const sealMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(rubberColorHex),
    roughness: 0.9,
    metalness: 0.0,
    bumpScale: 0.2
  });
  
  const frameThickness = 0.082;
  const sealThickness = 0.006;
  const sealHeight = 0.015;
  
  // Create professional seal profile
  const sealShape = new THREE.Shape();
  sealShape.moveTo(0, 0);
  sealShape.lineTo(sealThickness, 0);
  sealShape.lineTo(sealThickness * 0.8, sealHeight * 0.3);
  sealShape.lineTo(sealThickness * 0.5, sealHeight * 0.7);
  sealShape.lineTo(sealThickness * 0.3, sealHeight);
  sealShape.lineTo(0, sealHeight * 0.8);
  sealShape.lineTo(0, 0);
  
  // Primary seals (main weatherproofing)
  const primarySealInset = frameThickness * 0.4;
  
  // Top primary seal
  const topSealGeometry = new THREE.ExtrudeGeometry(sealShape, {
    depth: width - primarySealInset * 2,
    bevelEnabled: false
  });
  const topSeal = new THREE.Mesh(topSealGeometry, sealMaterial);
  topSeal.position.set(-width/2 + primarySealInset, height/2 - primarySealInset, 0.01);
  topSeal.rotation.z = Math.PI / 2;
  topSeal.rotation.x = -Math.PI / 2;
  topSeal.name = 'top-primary-seal';
  group.add(topSeal);
  
  // Create remaining seals (bottom, left, right)
  const bottomSeal = topSeal.clone();
  bottomSeal.position.set(-width/2 + primarySealInset, -height/2 + primarySealInset, 0.01);
  bottomSeal.rotation.z = -Math.PI / 2;
  bottomSeal.name = 'bottom-primary-seal';
  group.add(bottomSeal);
  
  const leftSealGeometry = new THREE.ExtrudeGeometry(sealShape, {
    depth: height - primarySealInset * 2,
    bevelEnabled: false
  });
  const leftSeal = new THREE.Mesh(leftSealGeometry, sealMaterial);
  leftSeal.position.set(-width/2 + primarySealInset, -height/2 + primarySealInset, 0.01);
  leftSeal.rotation.x = -Math.PI / 2;
  leftSeal.name = 'left-primary-seal';
  group.add(leftSeal);
  
  const rightSeal = leftSeal.clone();
  rightSeal.position.set(width/2 - primarySealInset, -height/2 + primarySealInset, 0.01);
  rightSeal.rotation.y = Math.PI;
  rightSeal.name = 'right-primary-seal';
  group.add(rightSeal);
  
  console.log("Professional sealing system installed");
}

function addProfessionalHardware(
  group: THREE.Group,
  width: number,
  height: number,
  baseColorHex: string
): void {
  console.log("Adding professional window hardware");
  
  const hardwareMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(baseColorHex).multiplyScalar(0.7),
    roughness: 0.15,
    metalness: 0.9,
    envMapIntensity: 1.2
  });
  
  // Professional tilt-turn handle (Salamander style)
  const handleBaseGeometry = new THREE.BoxGeometry(0.08, 0.035, 0.02);
  const handleBase = new THREE.Mesh(handleBaseGeometry, hardwareMaterial);
  handleBase.position.set(width * 0.35, -0.05, 0.05);
  handleBase.name = 'professional-handle-base';
  handleBase.castShadow = true;
  group.add(handleBase);
  
  // Handle lever with realistic proportions
  const leverGeometry = new THREE.CylinderGeometry(0.008, 0.006, 0.12, 12);
  leverGeometry.rotateZ(Math.PI / 2);
  const handleLever = new THREE.Mesh(leverGeometry, hardwareMaterial);
  handleLever.position.set(width * 0.35 + 0.06, -0.05, 0.065);
  handleLever.name = 'professional-handle-lever';
  handleLever.castShadow = true;
  group.add(handleLever);
  
  // Handle grip with ergonomic design
  const gripGeometry = new THREE.CapsuleGeometry(0.015, 0.04, 8, 16);
  gripGeometry.rotateZ(Math.PI / 2);
  const handleGrip = new THREE.Mesh(gripGeometry, hardwareMaterial);
  handleGrip.position.set(width * 0.35 + 0.12, -0.05, 0.065);
  handleGrip.name = 'professional-handle-grip';
  handleGrip.castShadow = true;
  group.add(handleGrip);
  
  // Add corner reinforcement brackets (typical in professional systems)
  addCornerBrackets(group, width, height, hardwareMaterial);
  
  console.log("Professional hardware installed");
}

function addCornerBrackets(
  group: THREE.Group,
  width: number,
  height: number,
  material: THREE.Material
): void {
  const bracketGeometry = new THREE.BoxGeometry(0.025, 0.025, 0.004);
  
  const corners = [
    [-width/2 + 0.04, height/2 - 0.04, 0.04],
    [width/2 - 0.04, height/2 - 0.04, 0.04],
    [-width/2 + 0.04, -height/2 + 0.04, 0.04],
    [width/2 - 0.04, -height/2 + 0.04, 0.04]
  ];
  
  corners.forEach((pos, index) => {
    const bracket = new THREE.Mesh(bracketGeometry, material);
    bracket.position.set(pos[0], pos[1], pos[2]);
    bracket.name = `corner-bracket-${index}`;
    bracket.castShadow = true;
    group.add(bracket);
  });
}

function addDrainageSystem(
  group: THREE.Group,
  width: number,
  height: number
): void {
  console.log("Adding professional drainage system");
  
  const drainMaterial = new THREE.MeshStandardMaterial({
    color: 0x333333,
    roughness: 0.4,
    metalness: 0.3
  });
  
  // Drainage slots in bottom frame
  const slotGeometry = new THREE.BoxGeometry(0.015, 0.003, 0.025);
  
  const drainageSlots = [
    [-width * 0.3, -height/2 + 0.02, 0],
    [width * 0.3, -height/2 + 0.02, 0]
  ];
  
  drainageSlots.forEach((pos, index) => {
    const slot = new THREE.Mesh(slotGeometry, drainMaterial);
    slot.position.set(pos[0], pos[1], pos[2]);
    slot.name = `drainage-slot-${index}`;
    group.add(slot);
  });
  
  console.log("Professional drainage system installed");
}
