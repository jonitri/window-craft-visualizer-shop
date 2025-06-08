
import * as THREE from 'three';
import { createEnhancedTechnicalProfile, createEnhancedProfileMaterials } from './enhancedTechnicalProfile';

// Professional frame assembly inspired by Salamander-style systems
export function createProfessionalFrameProfile(
  length: number,
  baseColorHex: string,
  outsideColorHex: string,
  insideColorHex: string,
  orientation: 'horizontal' | 'vertical' = 'vertical'
): THREE.Group {
  console.log(`Creating professional frame profile - ${orientation}, length: ${length.toFixed(3)}m`);
  
  const profileGroup = new THREE.Group();
  const profileShape = createEnhancedTechnicalProfile();
  
  // Create enhanced materials
  const { baseMaterial, outsideMaterial, insideMaterial } = createEnhancedProfileMaterials(
    baseColorHex,
    outsideColorHex,
    insideColorHex
  );
  
  // Professional extrusion settings
  const extrudeSettings = {
    depth: length,
    bevelEnabled: false,
    steps: Math.max(1, Math.floor(length * 20)), // More steps for longer profiles
    curveSegments: 8 // Smoother curves
  };
  
  const profileGeometry = new THREE.ExtrudeGeometry(profileShape, extrudeSettings);
  
  // Enhanced material assignment for realistic appearance
  const materials = [
    baseMaterial,     // Side faces (profile edges)
    outsideMaterial,  // Front face (exterior side)
    insideMaterial    // Back face (interior side)
  ];
  
  const profileMesh = new THREE.Mesh(profileGeometry, materials);
  
  // Apply precise orientation transforms
  if (orientation === 'horizontal') {
    profileMesh.rotation.z = Math.PI / 2;
    profileMesh.rotation.x = -Math.PI / 2;
  } else {
    profileMesh.rotation.x = -Math.PI / 2;
  }
  
  // Add subtle edge beveling for realism
  profileMesh.castShadow = true;
  profileMesh.receiveShadow = true;
  
  profileGroup.add(profileMesh);
  
  console.log(`Professional frame profile completed - ${orientation}`);
  return profileGroup;
}

// Assemble complete professional window frame
export function assembleProfessionalFrame(
  group: THREE.Group,
  width: number,
  height: number,
  baseColorHex: string,
  outsideColorHex: string,
  insideColorHex: string
): void {
  console.log("Assembling professional window frame with precise joint connections");
  
  // Professional profile dimensions (based on enhanced technical profile)
  const profileWidth = 0.082;  // 82mm
  const profileHeight = 0.074; // 74mm
  
  group.clear();
  
  // Create frame profiles with professional joint overlaps
  const frameThickness = profileWidth;
  const jointOverlap = 0.008; // 8mm overlap for welded joints
  
  // Top profile (horizontal)
  const topProfile = createProfessionalFrameProfile(
    width + jointOverlap * 2, baseColorHex, outsideColorHex, insideColorHex, 'horizontal'
  );
  topProfile.position.set(0, height/2 - frameThickness/2, 0);
  topProfile.name = 'top-profile';
  group.add(topProfile);
  
  // Bottom profile (horizontal)
  const bottomProfile = createProfessionalFrameProfile(
    width + jointOverlap * 2, baseColorHex, outsideColorHex, insideColorHex, 'horizontal'
  );
  bottomProfile.position.set(0, -height/2 + frameThickness/2, 0);
  bottomProfile.name = 'bottom-profile';
  group.add(bottomProfile);
  
  // Left profile (vertical)
  const leftProfile = createProfessionalFrameProfile(
    height - frameThickness * 2, baseColorHex, outsideColorHex, insideColorHex, 'vertical'
  );
  leftProfile.position.set(-width/2 + frameThickness/2, 0, 0);
  leftProfile.name = 'left-profile';
  group.add(leftProfile);
  
  // Right profile (vertical)
  const rightProfile = createProfessionalFrameProfile(
    height - frameThickness * 2, baseColorHex, outsideColorHex, insideColorHex, 'vertical'
  );
  rightProfile.position.set(width/2 - frameThickness/2, 0, 0);
  rightProfile.name = 'right-profile';
  group.add(rightProfile);
  
  // Add professional welded corner joints
  addWeldedCorners(group, width, height, baseColorHex, frameThickness);
  
  // Add reinforcement steel inserts (typical in professional systems)
  addSteelReinforcement(group, width, height, frameThickness);
  
  console.log("Professional frame assembly completed with welded joints and reinforcement");
}

function addWeldedCorners(
  group: THREE.Group,
  width: number,
  height: number,
  baseColorHex: string,
  frameThickness: number
): void {
  console.log("Adding professional welded corner joints");
  
  const cornerMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(baseColorHex).multiplyScalar(0.95), // Slightly darker for weld seam
    roughness: 0.4,
    metalness: 0.1
  });
  
  const cornerSize = frameThickness * 0.15;
  const cornerGeometry = new THREE.CylinderGeometry(cornerSize, cornerSize, 0.06, 8);
  
  const corners = [
    [-width/2 + frameThickness/2, height/2 - frameThickness/2, 0],    // Top-left
    [width/2 - frameThickness/2, height/2 - frameThickness/2, 0],     // Top-right
    [-width/2 + frameThickness/2, -height/2 + frameThickness/2, 0],   // Bottom-left
    [width/2 - frameThickness/2, -height/2 + frameThickness/2, 0]     // Bottom-right
  ];
  
  corners.forEach((pos, index) => {
    const corner = new THREE.Mesh(cornerGeometry, cornerMaterial);
    corner.position.set(pos[0], pos[1], pos[2]);
    corner.rotation.x = Math.PI / 2;
    corner.name = `welded-corner-${index}`;
    corner.castShadow = true;
    group.add(corner);
  });
}

function addSteelReinforcement(
  group: THREE.Group,
  width: number,
  height: number,
  frameThickness: number
): void {
  console.log("Adding steel reinforcement inserts");
  
  const steelMaterial = new THREE.MeshStandardMaterial({
    color: 0x444444,
    roughness: 0.2,
    metalness: 0.8,
    envMapIntensity: 1.0
  });
  
  const reinforcementThickness = 0.003; // 3mm steel thickness
  const reinforcementWidth = frameThickness * 0.4;
  
  // Horizontal reinforcements
  const horizontalGeometry = new THREE.BoxGeometry(width * 0.8, reinforcementThickness, reinforcementWidth);
  
  const topReinforcement = new THREE.Mesh(horizontalGeometry, steelMaterial);
  topReinforcement.position.set(0, height/2 - frameThickness/2, 0);
  topReinforcement.name = 'top-steel-reinforcement';
  group.add(topReinforcement);
  
  const bottomReinforcement = new THREE.Mesh(horizontalGeometry, steelMaterial);
  bottomReinforcement.position.set(0, -height/2 + frameThickness/2, 0);
  bottomReinforcement.name = 'bottom-steel-reinforcement';
  group.add(bottomReinforcement);
  
  // Vertical reinforcements
  const verticalGeometry = new THREE.BoxGeometry(reinforcementThickness, height * 0.8, reinforcementWidth);
  
  const leftReinforcement = new THREE.Mesh(verticalGeometry, steelMaterial);
  leftReinforcement.position.set(-width/2 + frameThickness/2, 0, 0);
  leftReinforcement.name = 'left-steel-reinforcement';
  group.add(leftReinforcement);
  
  const rightReinforcement = new THREE.Mesh(verticalGeometry, steelMaterial);
  rightReinforcement.position.set(width/2 - frameThickness/2, 0, 0);
  rightReinforcement.name = 'right-steel-reinforcement';
  group.add(rightReinforcement);
  
  console.log("Steel reinforcement inserts added");
}
