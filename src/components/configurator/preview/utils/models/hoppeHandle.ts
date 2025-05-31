
import * as THREE from 'three';

export function addHoppeHandle(
  group: THREE.Group,
  x: number,
  y: number,
  z: number,
  plateHeight: number = 0.22,   // increased from 0.20 for better proportions
  plateThickness: number = 0.025,// slightly thicker for more substantial look
  plateDepth: number = 0.035    // wider for better visual presence
) {
  const handleMat = new THREE.MeshStandardMaterial({
    color: 0x2b2b2b,
    roughness: 0.3,
    metalness: 0.9
  });
  
  // (A) Vertical backplate with improved dimensions:
  const plateGeo = new THREE.BoxGeometry(plateThickness, plateHeight, plateDepth);
  plateGeo.translate(plateThickness / 2, 0, 0); 
  // Now its back face is at local x=0 to mount flush on the frame
  const plateMesh = new THREE.Mesh(plateGeo, handleMat);
  const handleGroup = new THREE.Group();
  handleGroup.add(plateMesh);

  // (B) Horizontal lever with refined proportions:
  const leverLength = 0.065; // slightly longer for better grip
  const leverThick  = 0.018; // slightly thicker
  const leverDeep   = 0.025; // proportional to new plate depth
  const leverGeo = new THREE.BoxGeometry(leverLength, leverThick, leverDeep);
  leverGeo.translate(leverLength / 2, 0, 0);
  const leverMesh = new THREE.Mesh(leverGeo, handleMat);
  
  // Position at optimal height on plate:
  leverMesh.position.set(
    0,
    (plateHeight / 2) - (leverThick / 2) - 0.01, // slight offset from top
    0
  );
  // Fold it down 90° so it rests in "closed" position:
  leverMesh.rotation.z = -Math.PI / 2;
  handleGroup.add(leverMesh);

  // (C) Enhanced cylindrical nose:
  const noseRad  = 0.008; // slightly larger
  const noseDepth= leverDeep;
  const noseGeo  = new THREE.CylinderGeometry(noseRad, noseRad, noseDepth, 16);
  const noseMesh = new THREE.Mesh(noseGeo, handleMat);
  // Cylinder faces +Y by default; rotate it so it points +X:
  noseMesh.rotation.z = -Math.PI / 2;
  // Position at the lever tip:
  noseMesh.position.set(
    leverLength + noseRad,
    (plateHeight / 2) - (leverThick / 2) - 0.01,
    0
  );
  handleGroup.add(noseMesh);

  // (D) Apply enhanced scale for optimal visibility (25% larger)
  const handleScale = 1.25; // Increased from 1.2 for even better presence
  handleGroup.scale.set(handleScale, handleScale, handleScale);

  // (E) Set LOWER render order to ensure proper layering behind all panels
  handleGroup.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.renderOrder = 0; // Lowest priority - always renders first/behind everything
    }
  });

  // (F) Position the complete handle assembly:
  handleGroup.position.set(x, y, z);
  group.add(handleGroup);

  console.log("Enhanced Hoppe-style handle created with lowest render order for proper layering");
}
