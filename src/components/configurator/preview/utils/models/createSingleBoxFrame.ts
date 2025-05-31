
import * as THREE from 'three';
import { buildFrameMaterials } from './buildFrameMaterials';

export function createSingleBoxFrame(
  group: THREE.Group,
  totalWidth: number,     // full outer width of window
  totalHeight: number,    // full outer height of window
  thickness: number,      // how thick the profile is on all sides
  depth: number,          // how "deep" (in Z) the extruded frame is
  baseColorHex: string,
  outsideColorHex: string,
  insideColorHex: string
) {
  // 1) Build the materials once
  const { materialArray } = buildFrameMaterials(baseColorHex, outsideColorHex, insideColorHex);

  // 2) Create four thin boxes that line up perfectly with no overlapping planes

  // Top bar:
  const topGeo = new THREE.BoxGeometry(totalWidth, thickness, depth);
  const topMesh = new THREE.Mesh(topGeo, materialArray);
  topMesh.position.set(0, totalHeight / 2 - thickness / 2, 0);
  group.add(topMesh);

  // Bottom bar:
  const bottomMesh = new THREE.Mesh(topGeo, materialArray);
  bottomMesh.position.set(0, -totalHeight / 2 + thickness / 2, 0);
  group.add(bottomMesh);

  // Side bars: note that height for side bars must exclude top/bottom thickness
  const sideGeo = new THREE.BoxGeometry(thickness, totalHeight - thickness * 2, depth);
  
  // Left bar:
  const leftMesh = new THREE.Mesh(sideGeo, materialArray);
  leftMesh.position.set(-totalWidth / 2 + thickness / 2, 0, 0);
  group.add(leftMesh);

  // Right bar:
  const rightMesh = new THREE.Mesh(sideGeo, materialArray);
  rightMesh.position.set(totalWidth / 2 - thickness / 2, 0, 0);
  group.add(rightMesh);

  console.log("Single box frame created with consistent material arrays and no overlapping geometry");
}
