
import * as THREE from 'three';

// Create realistic Hoppe-style window handle with proper three-part construction
export function addRealisticWindowHandle(group: THREE.Group, x: number, y: number, z: number, color: THREE.Color) {
  // Create empty group for the complete handle assembly
  const realHandle = new THREE.Group();
  
  // Handle material - dark metallic for realistic appearance
  const handleMaterial = new THREE.MeshStandardMaterial({
    color: 0x2b2b2b, // Very dark gray/black metal
    roughness: 0.3,
    metalness: 0.9 // High metalness for shiny metal look
  });
  
  // ──────────────────────────────────────────────────────────
  // A) VERTICAL BACKPLATE (plate that screws to the frame)
  // ──────────────────────────────────────────────────────────
  const plateWidth = 0.02;   // thickness from frame surface
  const plateHeight = 0.20;  // full vertical length
  const plateDepth = 0.03;   // how wide (left-to-right) it is against the frame
  
  const plateGeometry = new THREE.BoxGeometry(plateWidth, plateHeight, plateDepth);
  
  // Translate geometry so back face is at x = 0 (flush against frame)
  plateGeometry.translate(plateWidth / 2, 0, 0);
  
  const plateMesh = new THREE.Mesh(plateGeometry, handleMaterial);
  realHandle.add(plateMesh);
  
  // ──────────────────────────────────────────────────────────
  // B) HORIZONTAL LEVER (L-shaped top piece)
  // ──────────────────────────────────────────────────────────
  const leverLength = 0.06;      // how far it sticks out from backplate
  const leverThickness = 0.015;  // thickness top-to-bottom
  const leverCrossDepth = 0.02;  // left-to-right width
  
  const leverGeometry = new THREE.BoxGeometry(leverLength, leverThickness, leverCrossDepth);
  
  // Move geometry so hinge point (where it meets plate) is at x = 0
  leverGeometry.translate(leverLength / 2, 0, 0);
  
  const leverMesh = new THREE.Mesh(leverGeometry, handleMaterial);
  
  // Position lever at top of plate
  leverMesh.position.set(
    0, // x (pivot point)
    (plateHeight / 2) - (leverThickness / 2), // y (top of plate)
    0  // z (centered with plate)
  );
  
  // Rotate lever downward to closed position (90 degrees down)
  leverMesh.rotation.z = -Math.PI / 2;
  
  realHandle.add(leverMesh);
  
  // ──────────────────────────────────────────────────────────
  // C) SMALL CYLINDRICAL NOSE (end cap of the lever)
  // ──────────────────────────────────────────────────────────
  const noseRadius = 0.007;
  const noseHeight = leverCrossDepth; // same depth as lever for flush look
  const noseGeometry = new THREE.CylinderGeometry(noseRadius, noseRadius, noseHeight, 16);
  
  const noseMesh = new THREE.Mesh(noseGeometry, handleMaterial);
  
  // Cylinder points along Y-axis by default; rotate to point along X-axis
  noseMesh.rotation.z = -Math.PI / 2;
  
  // Position at lever's tip (after rotation)
  noseMesh.position.set(
    leverLength + noseRadius, // x (at lever tip plus nose radius)
    (plateHeight / 2) - (leverThickness / 2), // y (same as lever)
    0 // z (centered)
  );
  
  realHandle.add(noseMesh);
  
  // ──────────────────────────────────────────────────────────
  // D) SCALE AND POSITION THE COMPLETE HANDLE
  // ──────────────────────────────────────────────────────────
  const handleScale = 1.0; // Adjust if needed for your scene scale
  realHandle.scale.set(handleScale, handleScale, handleScale);
  
  // Position the entire handle group at the specified location
  realHandle.position.set(x, y, z);
  
  // Add complete handle assembly to the main group
  group.add(realHandle);
  
  console.log("Realistic Hoppe-style window handle created with backplate, lever, and nose");
}
