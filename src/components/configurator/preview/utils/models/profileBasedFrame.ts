
import * as THREE from 'three';

// Create a realistic window frame based on the technical drawing profile
export function createProfileBasedFrame(
  group: THREE.Group,
  width: number,
  height: number,
  frameDepth: number,
  baseColorHex: string,
  outsideColorHex: string,
  insideColorHex: string
): void {
  console.log("Creating profile-based frame from technical drawing");
  
  const frameThickness = 0.15; // Frame profile thickness based on drawing
  
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
  const profileShape = createFrameProfileShape();
  
  // Create the four frame pieces by extruding the profile
  createFramePiece(group, profileShape, 'top', width, height, frameThickness, frameDepth, baseMaterial, outsideMaterial, insideMaterial);
  createFramePiece(group, profileShape, 'bottom', width, height, frameThickness, frameDepth, baseMaterial, outsideMaterial, insideMaterial);
  createFramePiece(group, profileShape, 'left', width, height, frameThickness, frameDepth, baseMaterial, outsideMaterial, insideMaterial);
  createFramePiece(group, profileShape, 'right', width, height, frameThickness, frameDepth, baseMaterial, outsideMaterial, insideMaterial);
  
  console.log("Profile-based frame created with extruded cross-sections");
}

// Create the profile shape based on the technical drawing
function createFrameProfileShape(): THREE.Shape {
  const shape = new THREE.Shape();
  
  // Create the outer profile boundary based on the drawing
  // The drawing shows a complex multi-chamber profile
  shape.moveTo(0, 0);
  shape.lineTo(0.15, 0); // Width of frame profile
  shape.lineTo(0.15, 0.08); // Height of frame profile
  shape.lineTo(0.12, 0.08);
  shape.lineTo(0.12, 0.06);
  shape.lineTo(0.10, 0.06);
  shape.lineTo(0.10, 0.04);
  shape.lineTo(0.05, 0.04);
  shape.lineTo(0.05, 0.06);
  shape.lineTo(0.03, 0.06);
  shape.lineTo(0.03, 0.08);
  shape.lineTo(0, 0.08);
  shape.lineTo(0, 0);
  
  // Add internal chambers as holes (representing the hollow sections in the drawing)
  const hole1 = new THREE.Path();
  hole1.moveTo(0.02, 0.02);
  hole1.lineTo(0.06, 0.02);
  hole1.lineTo(0.06, 0.05);
  hole1.lineTo(0.02, 0.05);
  hole1.lineTo(0.02, 0.02);
  shape.holes.push(hole1);
  
  const hole2 = new THREE.Path();
  hole2.moveTo(0.08, 0.02);
  hole2.lineTo(0.13, 0.02);
  hole2.lineTo(0.13, 0.06);
  hole2.lineTo(0.08, 0.06);
  hole2.lineTo(0.08, 0.02);
  shape.holes.push(hole2);
  
  return shape;
}

// Create individual frame pieces by extruding the profile shape
function createFramePiece(
  group: THREE.Group,
  profileShape: THREE.Shape,
  side: 'top' | 'bottom' | 'left' | 'right',
  width: number,
  height: number,
  frameThickness: number,
  frameDepth: number,
  baseMaterial: THREE.Material,
  outsideMaterial: THREE.Material,
  insideMaterial: THREE.Material
): void {
  const extrudeSettings = {
    depth: side === 'top' || side === 'bottom' ? width : height - frameThickness * 2,
    bevelEnabled: false
  };
  
  const geometry = new THREE.ExtrudeGeometry(profileShape, extrudeSettings);
  
  // Create multi-material array for different faces
  const materials = [
    baseMaterial,     // Sides
    baseMaterial,     // Sides  
    outsideMaterial,  // Front face (outside)
    insideMaterial,   // Back face (inside)
    baseMaterial,     // Top
    baseMaterial      // Bottom
  ];
  
  const framePiece = new THREE.Mesh(geometry, materials);
  
  // Position each frame piece correctly
  switch (side) {
    case 'top':
      framePiece.position.set(-width/2, height/2 - frameThickness/2, -frameDepth/2);
      framePiece.rotation.z = -Math.PI/2;
      break;
    case 'bottom':
      framePiece.position.set(-width/2, -height/2 + frameThickness/2, -frameDepth/2);
      framePiece.rotation.z = -Math.PI/2;
      break;
    case 'left':
      framePiece.position.set(-width/2 + frameThickness/2, height/2 - frameThickness, -frameDepth/2);
      break;
    case 'right':
      framePiece.position.set(width/2 - frameThickness/2, height/2 - frameThickness, -frameDepth/2);
      framePiece.rotation.z = Math.PI;
      break;
  }
  
  group.add(framePiece);
}

// Create glass panes to fit within the frame
export function createFrameGlass(
  group: THREE.Group,
  width: number,
  height: number,
  frameThickness: number
): void {
  const glassWidth = width - frameThickness * 2;
  const glassHeight = height - frameThickness * 2;
  
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
  
  const glassGeometry = new THREE.PlaneGeometry(glassWidth, glassHeight);
  const glass = new THREE.Mesh(glassGeometry, glassMaterial);
  glass.position.z = 0;
  
  group.add(glass);
}
