
import * as THREE from 'three';

// Add realistic window handle - positioned and sized for inside view with proper pivot and rotation
export function addRealisticWindowHandle(group: THREE.Group, x: number, y: number, z: number, color: THREE.Color) {
  const handleMaterial = new THREE.MeshStandardMaterial({
    color: 0x333333, // Dark metallic color for better realism
    roughness: 0.3,
    metalness: 0.8
  });
  
  // Handle dimensions - more realistic proportions
  const handleLength = 0.15; // How far it sticks out
  const handleWidth = 0.05;  // Thickness front-to-back  
  const handleHeight = 0.02; // Thickness top-to-bottom
  
  // Create handle base plate - where it attaches to frame
  const baseGeometry = new THREE.BoxGeometry(0.08, 0.04, 0.015);
  const handleBase = new THREE.Mesh(baseGeometry, handleMaterial);
  handleBase.position.set(x, y, z);
  group.add(handleBase);
  
  // Create main handle lever with proper geometry
  const leverGeometry = new THREE.BoxGeometry(handleLength, handleHeight, handleWidth);
  
  // Translate geometry so pivot point is at the back face (where it connects to base)
  leverGeometry.translate(handleLength / 2, 0, 0);
  
  const handleLever = new THREE.Mesh(leverGeometry, handleMaterial);
  
  // Position the lever so its pivot sits against the base
  handleLever.position.set(x + 0.04, y, z - 0.005);
  
  // Rotate the handle downward to closed position (90 degrees down)
  handleLever.rotation.z = -Math.PI / 2;
  
  // Scale up the handle to make it more visible and realistic
  handleLever.scale.set(1.3, 1.3, 1.3);
  
  group.add(handleLever);
  
  // Add handle grip at the end for extra realism
  const gripGeometry = new THREE.CylinderGeometry(0.008, 0.008, 0.03, 8);
  const handleGrip = new THREE.Mesh(gripGeometry, handleMaterial);
  
  // Position grip at the end of the rotated lever
  const leverEndX = x + 0.04;
  const leverEndY = y - (handleLength * 1.3); // Account for scaling and rotation
  const leverEndZ = z - 0.005;
  
  handleGrip.position.set(leverEndX, leverEndY, leverEndZ);
  gripGeometry.rotateZ(Math.PI / 2);
  group.add(handleGrip);
  
  console.log("Realistic window handle added with proper pivot, rotation, and metallic appearance");
}
