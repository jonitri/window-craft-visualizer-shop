
import * as THREE from 'three';

// Helper function to create window sash with cutout for glass
export function createWindowSash(
  group: THREE.Group, 
  width: number, 
  height: number, 
  thickness: number,
  material: THREE.Material,
  zPosition: number,
  side: 'front' | 'back',
  xOffset: number = 0
) {
  // Create outer frame
  const outerShape = new THREE.Shape();
  outerShape.moveTo(-width/2, -height/2);
  outerShape.lineTo(width/2, -height/2);
  outerShape.lineTo(width/2, height/2);
  outerShape.lineTo(-width/2, height/2);
  outerShape.lineTo(-width/2, -height/2);
  
  // Create inner cutout for glass
  const innerWidth = width * 0.85;
  const innerHeight = height * 0.85;
  const holeShape = new THREE.Path();
  holeShape.moveTo(-innerWidth/2, -innerHeight/2);
  holeShape.lineTo(innerWidth/2, -innerHeight/2);
  holeShape.lineTo(innerWidth/2, innerHeight/2);
  holeShape.lineTo(-innerWidth/2, innerHeight/2);
  holeShape.lineTo(-innerWidth/2, -innerHeight/2);
  outerShape.holes.push(holeShape);
  
  // Create geometry from shape
  const geometry = new THREE.ShapeGeometry(outerShape);
  const sash = new THREE.Mesh(geometry, material);
  sash.position.set(xOffset, 0, zPosition);
  
  group.add(sash);
}

// Helper function to add a window handle
export function addWindowHandle(group: THREE.Group, x: number, y: number, z: number, color: THREE.Color) {
  const handleBaseGeometry = new THREE.BoxGeometry(0.1, 0.04, 0.04);
  const handleMaterial = new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.3,
    metalness: 0.7
  });
  
  const handleBase = new THREE.Mesh(handleBaseGeometry, handleMaterial);
  handleBase.position.set(x, y, z);
  group.add(handleBase);
  
  const handleGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.12, 8);
  handleGeometry.rotateX(Math.PI / 2);
  const handle = new THREE.Mesh(handleGeometry, handleMaterial);
  handle.position.set(x, y, z + 0.05);
  group.add(handle);
}
