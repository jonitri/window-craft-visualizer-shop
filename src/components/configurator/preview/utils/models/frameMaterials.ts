
import * as THREE from 'three';

export function createFrameMaterials(
  baseColor: THREE.Color,
  outsideColor: THREE.Color,
  insideColor: THREE.Color
) {
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
    color: 0xd3d3d3, // Light gray for inside face
    roughness: 0.3,
    metalness: 0.1
  });

  return {
    baseMaterial,
    outsideMaterial,
    insideMaterial
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
