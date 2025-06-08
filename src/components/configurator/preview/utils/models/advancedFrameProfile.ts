
import * as THREE from 'three';
import { createTechnicalProfileShape, createProfileMaterials } from './technicalProfile';

// Create a single extruded frame profile with proper materials
export function createAdvancedFrameProfile(
  length: number,
  baseColorHex: string,
  outsideColorHex: string,
  insideColorHex: string
): THREE.Group {
  console.log("Creating advanced frame profile with technical shape");
  
  const profileGroup = new THREE.Group();
  const profileShape = createTechnicalProfileShape();
  
  // Create materials
  const { baseMaterial, outsideMaterial, insideMaterial } = createProfileMaterials(
    baseColorHex,
    outsideColorHex,
    insideColorHex
  );
  
  // Extrude the profile along the length
  const extrudeSettings = {
    depth: length,
    bevelEnabled: false,
    steps: 1
  };
  
  const profileGeometry = new THREE.ExtrudeGeometry(profileShape, extrudeSettings);
  
  // Create material groups for different faces
  const materials = [
    baseMaterial,     // Side faces
    baseMaterial,     // Side faces
    outsideMaterial,  // Front face (outside)
    insideMaterial,   // Back face (inside)
    baseMaterial,     // End caps
    baseMaterial      // End caps
  ];
  
  const profileMesh = new THREE.Mesh(profileGeometry, materials);
  
  // Rotate the profile to align properly (the extrusion goes along Z, we want it along Y for vertical profiles)
  profileMesh.rotation.x = -Math.PI / 2;
  
  profileGroup.add(profileMesh);
  
  console.log("Advanced frame profile created with multi-chamber structure");
  return profileGroup;
}

// Assemble four advanced profiles into a complete frame with mitered corners
export function assembleAdvancedFrame(
  group: THREE.Group,
  width: number,
  height: number,
  baseColorHex: string,
  outsideColorHex: string,
  insideColorHex: string
): void {
  console.log("Assembling advanced frame with mitered corners");
  
  const frameThickness = 0.12; // Profile thickness
  
  // Create top profile (horizontal)
  const topProfile = createAdvancedFrameProfile(width, baseColorHex, outsideColorHex, insideColorHex);
  topProfile.position.set(-width/2, height/2 - frameThickness/2, 0);
  topProfile.rotation.z = Math.PI/2; // Rotate for horizontal orientation
  group.add(topProfile);
  
  // Create bottom profile (horizontal)
  const bottomProfile = createAdvancedFrameProfile(width, baseColorHex, outsideColorHex, insideColorHex);
  bottomProfile.position.set(-width/2, -height/2 + frameThickness/2, 0);
  bottomProfile.rotation.z = Math.PI/2; // Rotate for horizontal orientation
  group.add(bottomProfile);
  
  // Create left profile (vertical)
  const leftProfile = createAdvancedFrameProfile(height - frameThickness * 2, baseColorHex, outsideColorHex, insideColorHex);
  leftProfile.position.set(-width/2 + frameThickness/2, 0, 0);
  // No rotation needed for vertical profiles
  group.add(leftProfile);
  
  // Create right profile (vertical) 
  const rightProfile = createAdvancedFrameProfile(height - frameThickness * 2, baseColorHex, outsideColorHex, insideColorHex);
  rightProfile.position.set(width/2 - frameThickness/2, 0, 0);
  // No rotation needed for vertical profiles
  group.add(rightProfile);
  
  // Add corner reinforcements for better visual connection
  addCornerReinforcements(group, width, height, baseColorHex);
  
  console.log("Advanced frame assembled with technical profile structure");
}

function addCornerReinforcements(
  group: THREE.Group,
  width: number,
  height: number,
  baseColorHex: string
): void {
  const cornerMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(baseColorHex),
    roughness: 0.4,
    metalness: 0.2
  });
  
  const cornerSize = 0.02;
  const cornerGeometry = new THREE.BoxGeometry(cornerSize, cornerSize, 0.08);
  
  // Add small corner pieces to clean up the joints
  const positions = [
    [-width/2 + cornerSize/2, height/2 - cornerSize/2, 0],
    [width/2 - cornerSize/2, height/2 - cornerSize/2, 0],
    [-width/2 + cornerSize/2, -height/2 + cornerSize/2, 0],
    [width/2 - cornerSize/2, -height/2 + cornerSize/2, 0]
  ];
  
  positions.forEach(pos => {
    const corner = new THREE.Mesh(cornerGeometry, cornerMaterial);
    corner.position.set(pos[0], pos[1], pos[2]);
    group.add(corner);
  });
}
