
import * as THREE from 'three';

// Glass panel (always centered at z = 0 or slightly in front on +Z):
export function addGlass(
  group: THREE.Group,
  outerWidth: number,
  outerHeight: number,
  thickness: number // same as 'depth' from your frame builder
) {
  // Let the glass take up 75% of the opening (for example)
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
    side: THREE.DoubleSide
  });

  const planeGeo = new THREE.PlaneGeometry(glassW, glassH);
  const glassMesh = new THREE.Mesh(planeGeo, glassMat);
  
  // Push it slightly forward so it does not z-fight with the frame's inside face
  glassMesh.position.z = thickness / 2 + 0.001;
  glassMesh.renderOrder = 1000;
  group.add(glassMesh);
}

// Rubber seal around the glass - positioned closer to glass for more realistic appearance
export function addRubberSeal(
  group: THREE.Group,
  outerWidth: number,
  outerHeight: number,
  thickness: number, // same as 'depth'
  colorHex: string    // rubberColorObject.hex
) {
  const rubberColor = new THREE.Color(colorHex);
  const sealMat = new THREE.MeshStandardMaterial({
    color: rubberColor,
    roughness: 0.8,
    metalness: 0
  });

  // Glass opening:
  const openingW = (outerWidth - thickness * 2) * 0.75;
  const openingH = (outerHeight - thickness * 2) * 0.75;
  const sealThick = 0.015;
  const sealDepth = 0.02;

  // Position rubber seal to hug glass more closely (reduced Z offset)
  const sealZ = thickness / 2 + 0.001; // Same Z as glass for tight fit

  // Top seal:
  const topSealGeo = new THREE.BoxGeometry(openingW + sealThick * 2, sealThick, sealDepth);
  const topSeal = new THREE.Mesh(topSealGeo, sealMat);
  topSeal.position.set(
    0,
    (openingH / 2) + sealThick / 2,
    sealZ
  );
  group.add(topSeal);

  // Bottom seal:
  const bottomSeal = new THREE.Mesh(topSealGeo, sealMat);
  bottomSeal.position.set(
    0,
    - (openingH / 2) - sealThick / 2,
    sealZ
  );
  group.add(bottomSeal);

  // Left seal:
  const sideSealGeo = new THREE.BoxGeometry(sealThick, openingH, sealDepth);
  const leftSeal = new THREE.Mesh(sideSealGeo, sealMat);
  leftSeal.position.set(
    - (openingW / 2) - sealThick / 2,
    0,
    sealZ
  );
  group.add(leftSeal);

  // Right seal:
  const rightSeal = new THREE.Mesh(sideSealGeo, sealMat);
  rightSeal.position.set(
    (openingW / 2) + sealThick / 2,
    0,
    sealZ
  );
  group.add(rightSeal);
}

// Thin sash (inner frame) with improved positioning - slightly more prominent
export function addWindowSash(
  group: THREE.Group,
  outerWidth: number,
  outerHeight: number,
  thickness: number,  // same as depth
  insideColorHex: string
) {
  const sashMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(insideColorHex),
    roughness: 0.4,
    metalness: 0.2
  });

  // Opening for glass inside that sash:
  const sashThick = 0.04;
  const openingW = (outerWidth - thickness * 2) * 0.75;
  const openingH = (outerHeight - thickness * 2) * 0.75;

  // Push sash slightly further forward for better definition
  const sashZ = thickness / 2 + 0.015; // Increased from 0.01 to 0.015

  // Top sash bar:
  const topSashGeo = new THREE.BoxGeometry(openingW + sashThick * 2, sashThick, 0.06);
  const topSash = new THREE.Mesh(topSashGeo, sashMat);
  topSash.position.set(
    0,
    (openingH / 2) + sashThick / 2,
    sashZ
  );
  group.add(topSash);

  // Bottom sash bar:
  const bottomSash = new THREE.Mesh(topSashGeo, sashMat);
  bottomSash.position.set(
    0,
    - (openingH / 2) - sashThick / 2,
    sashZ
  );
  group.add(bottomSash);

  // Left sash bar:
  const sideSashGeo = new THREE.BoxGeometry(sashThick, openingH, 0.06);
  const leftSash = new THREE.Mesh(sideSashGeo, sashMat);
  leftSash.position.set(
    - (openingW / 2) - sashThick / 2,
    0,
    sashZ
  );
  group.add(leftSash);

  // Right sash bar:
  const rightSash = new THREE.Mesh(sideSashGeo, sashMat);
  rightSash.position.set(
    (openingW / 2) + sashThick / 2,
    0,
    sashZ
  );
  group.add(rightSash);
}
