
import * as THREE from 'three';
import { createTechnicalProfileShape, createProfileMaterials } from './technicalProfile';

// Create a single extruded frame profile with proper materials and orientation
export function createAdvancedFrameProfile(
  length: number,
  baseColorHex: string,
  outsideColorHex: string,
  insideColorHex: string,
  orientation: 'horizontal' | 'vertical' = 'vertical'
): THREE.Group {
  console.log(`Creating advanced frame profile - ${orientation}, length: ${length}`);
  
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
    steps: 1,
    curveSegments: 1
  };
  
  const profileGeometry = new THREE.ExtrudeGeometry(profileShape, extrudeSettings);
  
  // Create multi-material setup for different faces
  // ExtrudeGeometry material order: [sides, front, back]
  const materials = [
    baseMaterial,     // Side faces (edges)
    outsideMaterial,  // Front face (outside)
    insideMaterial    // Back face (inside)
  ];
  
  const profileMesh = new THREE.Mesh(profileGeometry, materials);
  
  // Apply proper orientation transforms
  if (orientation === 'horizontal') {
    // For horizontal profiles (top/bottom)
    profileMesh.rotation.z = Math.PI / 2; // Rotate 90 degrees around Z
    profileMesh.rotation.x = -Math.PI / 2; // Align extrusion with window plane
  } else {
    // For vertical profiles (left/right)
    profileMesh.rotation.x = -Math.PI / 2; // Align extrusion with window plane
  }
  
  profileGroup.add(profileMesh);
  
  console.log(`Advanced frame profile created with technical shape - ${orientation}`);
  return profileGroup;
}

// Assemble four advanced profiles into a complete frame with proper positioning
export function assembleAdvancedFrame(
  group: THREE.Group,
  width: number,
  height: number,
  baseColorHex: string,
  outsideColorHex: string,
  insideColorHex: string
): void {
  console.log("Assembling advanced frame with precise positioning");
  
  // Profile dimensions from technical drawing (in Three.js units)
  const profileWidth = 0.12;  // 120mm
  const profileHeight = 0.08; // 80mm
  
  // Clear any existing geometry
  group.clear();
  
  // Create top profile (horizontal)
  const topProfile = createAdvancedFrameProfile(
    width, baseColorHex, outsideColorHex, insideColorHex, 'horizontal'
  );
  topProfile.position.set(0, height/2, 0);
  group.add(topProfile);
  
  // Create bottom profile (horizontal)
  const bottomProfile = createAdvancedFrameProfile(
    width, baseColorHex, outsideColorHex, insideColorHex, 'horizontal'
  );
  bottomProfile.position.set(0, -height/2, 0);
  group.add(bottomProfile);
  
  // Create left profile (vertical)
  const leftProfile = createAdvancedFrameProfile(
    height - profileHeight * 2, baseColorHex, outsideColorHex, insideColorHex, 'vertical'
  );
  leftProfile.position.set(-width/2 + profileWidth/2, 0, 0);
  group.add(leftProfile);
  
  // Create right profile (vertical)
  const rightProfile = createAdvancedFrameProfile(
    height - profileHeight * 2, baseColorHex, outsideColorHex, insideColorHex, 'vertical'
  );
  rightProfile.position.set(width/2 - profileWidth/2, 0, 0);
  group.add(rightProfile);
  
  // Add corner connection details
  addCornerConnections(group, width, height, baseColorHex);
  
  console.log("Advanced frame assembled with technical profile accuracy");
}

function addCornerConnections(
  group: THREE.Group,
  width: number,
  height: number,
  baseColorHex: string
): void {
  console.log("Adding corner connections for realistic assembly");
  
  const cornerMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(baseColorHex),
    roughness: 0.3,
    metalness: 0.1
  });
  
  const cornerSize = 0.015;
  const cornerGeometry = new THREE.BoxGeometry(cornerSize, cornerSize, 0.08);
  
  // Add corner reinforcement pieces
  const corners = [
    [-width/2 + cornerSize/2, height/2 - cornerSize/2, 0],    // Top-left
    [width/2 - cornerSize/2, height/2 - cornerSize/2, 0],     // Top-right
    [-width/2 + cornerSize/2, -height/2 + cornerSize/2, 0],   // Bottom-left
    [width/2 - cornerSize/2, -height/2 + cornerSize/2, 0]     // Bottom-right
  ];
  
  corners.forEach((pos, index) => {
    const corner = new THREE.Mesh(cornerGeometry, cornerMaterial);
    corner.position.set(pos[0], pos[1], pos[2]);
    corner.name = `corner-${index}`;
    group.add(corner);
  });
}
