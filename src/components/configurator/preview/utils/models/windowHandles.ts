
import * as THREE from 'three';

// Add realistic window handle - positioned and sized for inside view
export function addRealisticWindowHandle(group: THREE.Group, x: number, y: number, z: number, color: THREE.Color) {
  const handleMaterial = new THREE.MeshStandardMaterial({
    color: 0x666666, // Darker grey for better visibility
    roughness: 0.3,
    metalness: 0.8
  });
  
  // Scale factor for larger, more visible handle
  const scale = 2.5;
  
  // Handle base plate - larger and more visible
  const baseGeometry = new THREE.BoxGeometry(0.08 * scale, 0.04 * scale, 0.015 * scale);
  const handleBase = new THREE.Mesh(baseGeometry, handleMaterial);
  // Position on inside face (negative Z)
  handleBase.position.set(x, y, z);
  group.add(handleBase);
  
  // Handle lever - scaled up and properly oriented
  const leverGeometry = new THREE.BoxGeometry(0.1 * scale, 0.012 * scale, 0.012 * scale);
  const handleLever = new THREE.Mesh(leverGeometry, handleMaterial);
  // Position lever extending from base, rotated downward for closed position
  handleLever.position.set(x, y - 0.04 * scale, z - 0.005 * scale);
  handleLever.rotation.z = -Math.PI / 6; // Slight downward angle for closed handle
  group.add(handleLever);
  
  // Handle grip - larger and more prominent
  const gripGeometry = new THREE.CylinderGeometry(0.008 * scale, 0.008 * scale, 0.05 * scale, 8);
  const handleGrip = new THREE.Mesh(gripGeometry, handleMaterial);
  // Position at end of lever, rotated to align with lever
  gripGeometry.rotateZ(Math.PI / 2);
  handleGrip.position.set(x, y - 0.065 * scale, z - 0.005 * scale);
  group.add(handleGrip);
  
  console.log("Realistic window handle added with proper scaling and inside positioning");
}
