
import * as THREE from 'three';

// Add realistic window handle
export function addRealisticWindowHandle(group: THREE.Group, x: number, y: number, z: number, color: THREE.Color) {
  const handleMaterial = new THREE.MeshStandardMaterial({
    color: 0x888888,
    roughness: 0.3,
    metalness: 0.8
  });
  
  // Handle base plate
  const baseGeometry = new THREE.BoxGeometry(0.1, 0.05, 0.02);
  const handleBase = new THREE.Mesh(baseGeometry, handleMaterial);
  handleBase.position.set(x, y, z);
  group.add(handleBase);
  
  // Handle lever
  const leverGeometry = new THREE.BoxGeometry(0.12, 0.015, 0.015);
  const handleLever = new THREE.Mesh(leverGeometry, handleMaterial);
  handleLever.position.set(x + 0.06, y, z + 0.025);
  group.add(handleLever);
  
  // Handle grip
  const gripGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.06, 8);
  gripGeometry.rotateZ(Math.PI / 2);
  const handleGrip = new THREE.Mesh(gripGeometry, handleMaterial);
  handleGrip.position.set(x + 0.09, y, z + 0.025);
  group.add(handleGrip);
}
