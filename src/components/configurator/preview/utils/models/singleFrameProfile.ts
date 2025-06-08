
import * as THREE from 'three';

// Create a single frame profile based on the technical drawing
export function createSingleFrameProfile(
  length: number,
  baseColorHex: string,
  outsideColorHex: string,
  insideColorHex: string
): THREE.Group {
  console.log("Creating single frame profile from technical sketch");
  
  const profileGroup = new THREE.Group();
  
  // Create materials
  const baseMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(baseColorHex),
    roughness: 0.4,
    metalness: 0.2
  });
  
  const outsideMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(outsideColorHex),
    roughness: 0.3,
    metalness: 0.1
  });
  
  const insideMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(insideColorHex),
    roughness: 0.3,
    metalness: 0.1
  });

  // Create the profile shape based on the technical drawing
  const profileShape = createTechnicalProfileShape();
  
  // Extrude the profile along the length
  const extrudeSettings = {
    depth: length,
    bevelEnabled: false,
    steps: 1
  };
  
  const profileGeometry = new THREE.ExtrudeGeometry(profileShape, extrudeSettings);
  
  // Create material array for different faces
  const materials = [
    baseMaterial,     // Side faces
    baseMaterial,     // Side faces
    outsideMaterial,  // Front face (outside)
    insideMaterial,   // Back face (inside)
    baseMaterial,     // End caps
    baseMaterial      // End caps
  ];
  
  const profileMesh = new THREE.Mesh(profileGeometry, materials);
  profileGroup.add(profileMesh);
  
  console.log("Single frame profile created with technical specifications");
  return profileGroup;
}

// Create the exact profile shape from the technical drawing
function createTechnicalProfileShape(): THREE.Shape {
  const shape = new THREE.Shape();
  
  // Based on the technical drawing, create the multi-chamber profile
  // Main outer boundary (15cm wide x 8cm high as per drawing)
  const width = 0.15;  // 15cm
  const height = 0.08; // 8cm
  
  // Create the outer profile
  shape.moveTo(0, 0);
  shape.lineTo(width, 0);
  shape.lineTo(width, height);
  shape.lineTo(0, height);
  shape.lineTo(0, 0);
  
  // Add the internal chambers as holes (hollow sections)
  // Chamber 1 (left side)
  const chamber1 = new THREE.Path();
  chamber1.moveTo(0.01, 0.01);
  chamber1.lineTo(0.05, 0.01);
  chamber1.lineTo(0.05, 0.07);
  chamber1.lineTo(0.01, 0.07);
  chamber1.lineTo(0.01, 0.01);
  shape.holes.push(chamber1);
  
  // Chamber 2 (center)
  const chamber2 = new THREE.Path();
  chamber2.moveTo(0.06, 0.01);
  chamber2.lineTo(0.09, 0.01);
  chamber2.lineTo(0.09, 0.07);
  chamber2.lineTo(0.06, 0.07);
  chamber2.lineTo(0.06, 0.01);
  shape.holes.push(chamber2);
  
  // Chamber 3 (right side)
  const chamber3 = new THREE.Path();
  chamber3.moveTo(0.10, 0.01);
  chamber3.lineTo(0.14, 0.01);
  chamber3.lineTo(0.14, 0.07);
  chamber3.lineTo(0.10, 0.07);
  chamber3.lineTo(0.10, 0.01);
  shape.holes.push(chamber3);
  
  return shape;
}

// Assemble four profiles into a complete frame
export function assembleFrameFromProfiles(
  group: THREE.Group,
  width: number,
  height: number,
  baseColorHex: string,
  outsideColorHex: string,
  insideColorHex: string
): void {
  console.log("Assembling frame from four individual profiles");
  
  const frameThickness = 0.15; // Profile thickness from drawing
  
  // Create top profile
  const topProfile = createSingleFrameProfile(width, baseColorHex, outsideColorHex, insideColorHex);
  topProfile.position.set(-width/2, height/2 - frameThickness/2, 0);
  topProfile.rotation.z = Math.PI/2; // Rotate to horizontal
  group.add(topProfile);
  
  // Create bottom profile
  const bottomProfile = createSingleFrameProfile(width, baseColorHex, outsideColorHex, insideColorHex);
  bottomProfile.position.set(-width/2, -height/2 + frameThickness/2, 0);
  bottomProfile.rotation.z = Math.PI/2; // Rotate to horizontal
  group.add(bottomProfile);
  
  // Create left profile
  const leftProfile = createSingleFrameProfile(height - frameThickness * 2, baseColorHex, outsideColorHex, insideColorHex);
  leftProfile.position.set(-width/2 + frameThickness/2, frameThickness, 0);
  group.add(leftProfile);
  
  // Create right profile
  const rightProfile = createSingleFrameProfile(height - frameThickness * 2, baseColorHex, outsideColorHex, insideColorHex);
  rightProfile.position.set(width/2 - frameThickness/2, frameThickness, 0);
  group.add(rightProfile);
  
  console.log("Frame assembled from four individual profiles at 90-degree angles");
}
