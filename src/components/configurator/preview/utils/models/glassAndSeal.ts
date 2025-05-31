
import * as THREE from 'three';

// Glass panel positioned at frame center for proper transparency layering
export function addGlass(
  group: THREE.Group,
  outerWidth: number,
  outerHeight: number,
  thickness: number // frame depth
) {
  // Glass takes up 75% of the opening
  const glassW = (outerWidth - thickness * 2) * 0.75;
  const glassH = (outerHeight - thickness * 2) * 0.75;

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.05,
    transmission: 0.95,
    roughness: 0,
    metalness: 0,
    ior: 1.52,
    thickness: 0.003,
    side: THREE.DoubleSide,
    clearcoat: 1.0,
    clearcoatRoughness: 0.0
  });

  const planeGeo = new THREE.PlaneGeometry(glassW, glassH);
  const glassMesh = new THREE.Mesh(planeGeo, glassMat);
  
  // Position at frame center for proper layering
  glassMesh.position.z = 0;
  glassMesh.renderOrder = 1000;
  group.add(glassMesh);
}

// Rubber seal positioned slightly behind glass for realistic appearance
export function addRubberSeal(
  group: THREE.Group,
  outerWidth: number,
  outerHeight: number,
  thickness: number,
  colorHex: string
) {
  const rubberColor = new THREE.Color(colorHex);
  const sealMat = new THREE.MeshStandardMaterial({
    color: rubberColor,
    roughness: 0.8,
    metalness: 0
  });

  const openingW = (outerWidth - thickness * 2) * 0.75;
  const openingH = (outerHeight - thickness * 2) * 0.75;
  const sealThick = 0.012;
  const sealDepth = 0.018;

  // Position rubber seal slightly behind glass
  const sealZ = -0.005;

  // Top seal
  const topSealGeo = new THREE.BoxGeometry(openingW + sealThick * 2, sealThick, sealDepth);
  const topSeal = new THREE.Mesh(topSealGeo, sealMat);
  topSeal.position.set(0, (openingH / 2) + sealThick / 2, sealZ);
  topSeal.renderOrder = 2;
  group.add(topSeal);

  // Bottom seal
  const bottomSeal = new THREE.Mesh(topSealGeo, sealMat);
  bottomSeal.position.set(0, -(openingH / 2) - sealThick / 2, sealZ);
  bottomSeal.renderOrder = 2;
  group.add(bottomSeal);

  // Left seal
  const sideSealGeo = new THREE.BoxGeometry(sealThick, openingH, sealDepth);
  const leftSeal = new THREE.Mesh(sideSealGeo, sealMat);
  leftSeal.position.set(-(openingW / 2) - sealThick / 2, 0, sealZ);
  leftSeal.renderOrder = 2;
  group.add(leftSeal);

  // Right seal
  const rightSeal = new THREE.Mesh(sideSealGeo, sealMat);
  rightSeal.position.set((openingW / 2) + sealThick / 2, 0, sealZ);
  rightSeal.renderOrder = 2;
  group.add(rightSeal);
}

// Window sash positioned in front of glass using proper inside color
export function addWindowSash(
  group: THREE.Group,
  outerWidth: number,
  outerHeight: number,
  thickness: number,
  insideColorHex: string
) {
  const sashMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(insideColorHex),
    roughness: 0.4,
    metalness: 0.2
  });

  const sashThick = 0.045;
  const sashDepth = 0.025;
  const openingW = (outerWidth - thickness * 2) * 0.75;
  const openingH = (outerHeight - thickness * 2) * 0.75;

  // Position sash in front of glass for proper layering
  const sashZ_center = thickness / 2 - sashDepth / 2;

  // Top sash bar
  const topSashGeo = new THREE.BoxGeometry(openingW + sashThick * 2, sashThick, sashDepth);
  const topSash = new THREE.Mesh(topSashGeo, sashMat);
  topSash.position.set(0, (openingH / 2) + sashThick / 2, sashZ_center);
  topSash.renderOrder = 5;
  group.add(topSash);

  // Bottom sash bar
  const bottomSash = new THREE.Mesh(topSashGeo, sashMat);
  bottomSash.position.set(0, -(openingH / 2) - sashThick / 2, sashZ_center);
  bottomSash.renderOrder = 5;
  group.add(bottomSash);

  // Left sash bar
  const sideSashGeo = new THREE.BoxGeometry(sashThick, openingH, sashDepth);
  const leftSash = new THREE.Mesh(sideSashGeo, sashMat);
  leftSash.position.set(-(openingW / 2) - sashThick / 2, 0, sashZ_center);
  leftSash.renderOrder = 5;
  group.add(leftSash);

  // Right sash bar
  const rightSash = new THREE.Mesh(sideSashGeo, sashMat);
  rightSash.position.set((openingW / 2) + sashThick / 2, 0, sashZ_center);
  rightSash.renderOrder = 5;
  group.add(rightSash);

  console.log("Window sash created with proper inside color and layering");
}
