import * as THREE from 'three';

// Create realistic glass material
export function createGlassMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    transparent: true,
    opacity: 0.05, // Very low opacity for clear glass
    transmission: 0.95, // High transmission for clear glass
    roughness: 0.0,
    metalness: 0.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.0,
    side: THREE.DoubleSide,
    color: 0xffffff, // Pure white to avoid color tinting
    ior: 1.52, // Index of refraction for glass
    thickness: 0.003, // Very thin glass
    envMapIntensity: 1.0,
    // Remove alphaTest and keep depthWrite true for proper sorting
    depthWrite: true,
    // Ensure it renders after opaque objects
    transparent: true,
  });
}

// Create glass panels for triple leaf window
export function createTripleLeafGlassPanels(
  group: THREE.Group,
  width: number,
  height: number,
  glassMaterial: THREE.MeshPhysicalMaterial
): void {
  const leafWidth = width * 0.3;
  const leafHeight = height * 0.7;
  const glassWidth = leafWidth * 0.8;
  const glassHeight = leafHeight * 0.85;
  
  // Left glass panel
  const leftGlassGeometry = new THREE.PlaneGeometry(glassWidth, glassHeight);
  const leftGlass = new THREE.Mesh(leftGlassGeometry, glassMaterial);
  leftGlass.position.set(-width/3, 0, 0.005);
  leftGlass.renderOrder = 1000;
  group.add(leftGlass);
  
  // Middle glass panel
  const middleGlassGeometry = new THREE.PlaneGeometry(glassWidth, glassHeight);
  const middleGlass = new THREE.Mesh(middleGlassGeometry, glassMaterial);
  middleGlass.position.set(0, 0, 0.005);
  middleGlass.renderOrder = 1000;
  group.add(middleGlass);
  
  // Right glass panel
  const rightGlassGeometry = new THREE.PlaneGeometry(glassWidth, glassHeight);
  const rightGlass = new THREE.Mesh(rightGlassGeometry, glassMaterial);
  rightGlass.position.set(width/3, 0, 0.005);
  rightGlass.renderOrder = 1000;
  group.add(rightGlass);
}

// Create rubber seal around glass for triple leaf window
export function createTripleLeafRubberSeal(group: THREE.Group, glassWidth: number, glassHeight: number, offsetX: number, rubberColor: THREE.Color) {
  const sealThickness = 0.015;
  const sealDepth = 0.02;
  
  const sealMaterial = new THREE.MeshStandardMaterial({
    color: rubberColor,
    roughness: 0.8,
    metalness: 0.0
  });
  
  // Top seal
  const topSealGeometry = new THREE.BoxGeometry(glassWidth + sealThickness * 2, sealThickness, sealDepth);
  const topSeal = new THREE.Mesh(topSealGeometry, sealMaterial);
  topSeal.position.set(offsetX, glassHeight/2 + sealThickness/2, 0.005);
  group.add(topSeal);
  
  // Bottom seal
  const bottomSeal = new THREE.Mesh(topSealGeometry, sealMaterial);
  bottomSeal.position.set(offsetX, -glassHeight/2 - sealThickness/2, 0.005);
  group.add(bottomSeal);
  
  // Left seal
  const sideSealGeometry = new THREE.BoxGeometry(sealThickness, glassHeight, sealDepth);
  const leftSeal = new THREE.Mesh(sideSealGeometry, sealMaterial);
  leftSeal.position.set(offsetX - glassWidth/2 - sealThickness/2, 0, 0.005);
  group.add(leftSeal);
  
  // Right seal
  const rightSeal = new THREE.Mesh(sideSealGeometry, sealMaterial);
  rightSeal.position.set(offsetX + glassWidth/2 + sealThickness/2, 0, 0.005);
  group.add(rightSeal);
}

// Create inner frame around glass (inside color)
export function createGlassFrame(group: THREE.Group, glassWidth: number, glassHeight: number, offsetX: number, material: THREE.Material) {
  const frameThickness = 0.04;
  
  // Top glass frame
  const topGeometry = new THREE.BoxGeometry(glassWidth + frameThickness * 2, frameThickness, 0.03);
  const topFrame = new THREE.Mesh(topGeometry, material);
  topFrame.position.set(offsetX, glassHeight/2 + frameThickness/2, 0.015);
  group.add(topFrame);
  
  // Bottom glass frame
  const bottomFrame = new THREE.Mesh(topGeometry, material);
  bottomFrame.position.set(offsetX, -glassHeight/2 - frameThickness/2, 0.015);
  group.add(bottomFrame);
  
  // Left glass frame
  const sideGeometry = new THREE.BoxGeometry(frameThickness, glassHeight, 0.03);
  const leftFrame = new THREE.Mesh(sideGeometry, material);
  leftFrame.position.set(offsetX - glassWidth/2 - frameThickness/2, 0, 0.015);
  group.add(leftFrame);
  
  // Right glass frame
  const rightFrame = new THREE.Mesh(sideGeometry, material);
  rightFrame.position.set(offsetX + glassWidth/2 + frameThickness/2, 0, 0.015);
  group.add(rightFrame);
}
