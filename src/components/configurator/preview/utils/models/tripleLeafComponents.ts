
import * as THREE from 'three';

// Create dividers (mullions) for triple leaf window
export function createTripleLeafDividers(
  group: THREE.Group,
  width: number,
  height: number,
  baseColor: THREE.Color
): void {
  const dividerMaterial = new THREE.MeshStandardMaterial({ 
    color: baseColor,
    roughness: 0.4,
    metalness: 0.2
  });
  
  // Left divider
  const leftDividerGeometry = new THREE.BoxGeometry(0.08, height * 0.9, 0.15);
  const leftDivider = new THREE.Mesh(leftDividerGeometry, dividerMaterial);
  leftDivider.position.set(-width/6, 0, 0);
  group.add(leftDivider);
  
  // Right divider
  const rightDivider = new THREE.Mesh(leftDividerGeometry, dividerMaterial);
  rightDivider.position.set(width/6, 0, 0);
  group.add(rightDivider);
}
