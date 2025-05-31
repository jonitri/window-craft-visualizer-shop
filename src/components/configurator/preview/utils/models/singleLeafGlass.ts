import * as THREE from 'three';

// Create realistic glass material for single leaf window
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

// Create glass panel for single leaf window
export function createSingleLeafGlassPanel(
  group: THREE.Group,
  width: number,
  height: number,
  glassMaterial: THREE.Material
): void {
  const glassWidth = width * 0.75;
  const glassHeight = height * 0.75;
  
  const glassGeometry = new THREE.PlaneGeometry(glassWidth, glassHeight);
  const glassPanel = new THREE.Mesh(glassGeometry, glassMaterial);
  glassPanel.position.z = 0.01;
  
  // Ensure proper rendering order for transparency
  glassPanel.renderOrder = 1000;
  
  group.add(glassPanel);
}

// Create rubber seal around glass
export function createSingleLeafRubberSeal(
  group: THREE.Group,
  glassWidth: number,
  glassHeight: number,
  rubberColor: THREE.Color
): void {
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
  topSeal.position.set(0, glassHeight/2 + sealThickness/2, 0.005);
  group.add(topSeal);
  
  // Bottom seal
  const bottomSeal = new THREE.Mesh(topSealGeometry, sealMaterial);
  bottomSeal.position.set(0, -glassHeight/2 - sealThickness/2, 0.005);
  group.add(bottomSeal);
  
  // Left seal
  const sideSealGeometry = new THREE.BoxGeometry(sealThickness, glassHeight, sealDepth);
  const leftSeal = new THREE.Mesh(sideSealGeometry, sealMaterial);
  leftSeal.position.set(-glassWidth/2 - sealThickness/2, 0, 0.005);
  group.add(leftSeal);
  
  // Right seal
  const rightSeal = new THREE.Mesh(sideSealGeometry, sealMaterial);
  rightSeal.position.set(glassWidth/2 + sealThickness/2, 0, 0.005);
  group.add(rightSeal);
}

// Create window sash (thin frame around glass) - uses inside color
export function createSingleLeafWindowSash(
  group: THREE.Group,
  glassWidth: number,
  glassHeight: number,
  color: THREE.Color
): void {
  const sashThickness = 0.04;
  const sashMaterial = new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.4,
    metalness: 0.2
  });
  
  // Top sash
  const topSashGeometry = new THREE.BoxGeometry(glassWidth + sashThickness * 2, sashThickness, 0.06);
  const topSash = new THREE.Mesh(topSashGeometry, sashMaterial);
  topSash.position.set(0, glassHeight/2 + sashThickness/2, 0.03);
  group.add(topSash);
  
  // Bottom sash
  const bottomSash = new THREE.Mesh(topSashGeometry, sashMaterial);
  bottomSash.position.set(0, -glassHeight/2 - sashThickness/2, 0.03);
  group.add(bottomSash);
  
  // Left sash
  const sideSashGeometry = new THREE.BoxGeometry(sashThickness, glassHeight, 0.06);
  const leftSash = new THREE.Mesh(sideSashGeometry, sashMaterial);
  leftSash.position.set(-glassWidth/2 - sashThickness/2, 0, 0.03);
  group.add(leftSash);
  
  // Right sash
  const rightSash = new THREE.Mesh(sideSashGeometry, sashMaterial);
  rightSash.position.set(glassWidth/2 + sashThickness/2, 0, 0.03);
  group.add(rightSash);
}
