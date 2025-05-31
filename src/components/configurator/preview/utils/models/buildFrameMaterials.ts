
import * as THREE from 'three';

export function buildFrameMaterials(
  baseColorHex: string,     // e.g. "#000000" if you want black edges
  outsideColorHex: string,  // the "outside" color (Walnut, WineRed, etc.)
  insideColorHex: string    // the "inside" color (LightGray, etc.)
) {
  const baseMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(baseColorHex),
    roughness: 0.4,
    metalness: 0.2
  });
  
  const outsideMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(outsideColorHex),
    roughness: 0.3,
    metalness: 0.1
  });
  
  const insideMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(insideColorHex),
    roughness: 0.3,
    metalness: 0.1
  });

  // Six-material array for BoxGeometry faces in this exact order:
  //   0: +X (right face)
  //   1: -X (left face)
  //   2: +Y (top face)
  //   3: -Y (bottom face)
  //   4: +Z (front face → "outside")
  //   5: -Z (back face → "inside")
  const materialArray = [
    baseMat,     // +X edge
    baseMat,     // -X edge
    baseMat,     // +Y edge
    baseMat,     // -Y edge
    outsideMat,  // +Z front
    insideMat    // -Z back
  ];

  return { baseMat, outsideMat, insideMat, materialArray };
}
