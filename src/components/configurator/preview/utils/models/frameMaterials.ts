
import * as THREE from 'three';

export function createFrameMaterials(
  baseColor: THREE.Color,
  outsideColor: THREE.Color,
  insideColor: THREE.Color
) {
  // Create three distinct materials for different frame parts
  const baseMaterial = new THREE.MeshStandardMaterial({
    color: baseColor,
    roughness: 0.4,
    metalness: 0.2
  });
  
  const outsideMaterial = new THREE.MeshStandardMaterial({
    color: outsideColor,
    roughness: 0.3,
    metalness: 0.1
  });
  
  const insideMaterial = new THREE.MeshStandardMaterial({
    color: insideColor,
    roughness: 0.3,
    metalness: 0.1
  });

  // Create six-material array for BoxGeometry faces
  // Index 0: +X face (right edge)
  // Index 1: -X face (left edge) 
  // Index 2: +Y face (top edge)
  // Index 3: -Y face (bottom edge)
  // Index 4: +Z face (outside face)
  // Index 5: -Z face (inside face)
  const frameMaterialsArray = [
    baseMaterial,    // +X (right edge)
    baseMaterial,    // -X (left edge)
    baseMaterial,    // +Y (top edge)
    baseMaterial,    // -Y (bottom edge)
    outsideMaterial, // +Z (outside face)
    insideMaterial   // -Z (inside face)
  ];

  return {
    baseMaterial,
    outsideMaterial,
    insideMaterial,
    frameMaterialsArray
  };
}

export function createGlassMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
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
}
