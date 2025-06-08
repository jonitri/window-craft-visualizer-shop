
import * as THREE from 'three';

// Professional glazing system inspired by high-end window manufacturers
export function createProfessionalGlazing(
  group: THREE.Group,
  width: number,
  height: number,
  frameThickness: number
): void {
  console.log("Creating professional glazing system with thermal performance");
  
  const glazingWidth = width - frameThickness * 1.2;
  const glazingHeight = height - frameThickness * 1.2;
  
  // Create triple glazing system (industry standard for high performance)
  createTripleGlazingSystem(group, glazingWidth, glazingHeight);
  
  // Add glazing beads (professional installation system)
  addGlazingBeads(group, glazingWidth, glazingHeight, frameThickness);
  
  console.log("Professional glazing system completed");
}

function createTripleGlazingSystem(
  group: THREE.Group,
  width: number,
  height: number
): void {
  console.log("Creating triple glazing system");
  
  // High-performance glass material
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.08,
    transmission: 0.92,
    roughness: 0.0,
    metalness: 0.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.0,
    ior: 1.52,
    thickness: 0.004,
    envMapIntensity: 0.8,
    side: THREE.DoubleSide
  });
  
  const glassGeometry = new THREE.PlaneGeometry(width, height);
  
  // Triple glazing configuration: 4mm + 16mm air + 4mm + 16mm air + 4mm
  const glassThickness = 0.004;
  const airGapThickness = 0.016;
  
  // Outer glass pane
  const outerGlass = new THREE.Mesh(glassGeometry, glassMaterial);
  outerGlass.position.z = glassThickness + airGapThickness;
  outerGlass.name = 'outer-glass-pane';
  outerGlass.renderOrder = 1000;
  group.add(outerGlass);
  
  // Middle glass pane
  const middleGlass = new THREE.Mesh(glassGeometry, glassMaterial);
  middleGlass.position.z = 0;
  middleGlass.name = 'middle-glass-pane';
  middleGlass.renderOrder = 1001;
  group.add(middleGlass);
  
  // Inner glass pane
  const innerGlass = new THREE.Mesh(glassGeometry, glassMaterial);
  innerGlass.position.z = -(glassThickness + airGapThickness);
  innerGlass.name = 'inner-glass-pane';
  innerGlass.renderOrder = 1002;
  group.add(innerGlass);
  
  // Add Low-E coating visualization (subtle tint on middle pane)
  const lowEMaterial = glassMaterial.clone();
  lowEMaterial.color.setHex(0xf0f8ff);
  lowEMaterial.opacity = 0.12;
  middleGlass.material = lowEMaterial;
  
  console.log("Triple glazing system with Low-E coating created");
}

function addGlazingBeads(
  group: THREE.Group,
  width: number,
  height: number,
  frameThickness: number
): void {
  console.log("Adding professional glazing beads");
  
  const beadMaterial = new THREE.MeshStandardMaterial({
    color: 0x2a2a2a, // Dark color typical for glazing beads
    roughness: 0.6,
    metalness: 0.1
  });
  
  const beadWidth = 0.012; // 12mm bead width
  const beadDepth = 0.008; // 8mm bead depth
  const beadInset = frameThickness * 0.3;
  
  // Create bead geometry with proper profile
  const beadShape = new THREE.Shape();
  beadShape.moveTo(0, 0);
  beadShape.lineTo(beadWidth, 0);
  beadShape.lineTo(beadWidth * 0.8, beadDepth * 0.6);
  beadShape.lineTo(beadWidth * 0.2, beadDepth);
  beadShape.lineTo(0, beadDepth * 0.8);
  beadShape.lineTo(0, 0);
  
  // Top bead
  const topBeadGeometry = new THREE.ExtrudeGeometry(beadShape, {
    depth: width - beadInset * 2,
    bevelEnabled: false
  });
  const topBead = new THREE.Mesh(topBeadGeometry, beadMaterial);
  topBead.position.set(-width/2 + beadInset, height/2 - beadInset, 0.02);
  topBead.rotation.z = Math.PI / 2;
  topBead.rotation.x = -Math.PI / 2;
  topBead.name = 'top-glazing-bead';
  group.add(topBead);
  
  // Bottom bead
  const bottomBead = topBead.clone();
  bottomBead.position.set(-width/2 + beadInset, -height/2 + beadInset, 0.02);
  bottomBead.rotation.z = -Math.PI / 2;
  bottomBead.name = 'bottom-glazing-bead';
  group.add(bottomBead);
  
  // Left bead
  const leftBeadGeometry = new THREE.ExtrudeGeometry(beadShape, {
    depth: height - beadInset * 2,
    bevelEnabled: false
  });
  const leftBead = new THREE.Mesh(leftBeadGeometry, beadMaterial);
  leftBead.position.set(-width/2 + beadInset, -height/2 + beadInset, 0.02);
  leftBead.rotation.x = -Math.PI / 2;
  leftBead.name = 'left-glazing-bead';
  group.add(leftBead);
  
  // Right bead
  const rightBead = leftBead.clone();
  rightBead.position.set(width/2 - beadInset, -height/2 + beadInset, 0.02);
  rightBead.rotation.y = Math.PI;
  rightBead.name = 'right-glazing-bead';
  group.add(rightBead);
  
  console.log("Professional glazing beads installed");
}
