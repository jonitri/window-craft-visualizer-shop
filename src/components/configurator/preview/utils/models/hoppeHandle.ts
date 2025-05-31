import * as THREE from 'three';

export function addHoppeHandle(
  group: THREE.Group,
  x: number,
  y: number,
  z: number,
  plateHeight: number = 0.20,   // overall length of the vertical backplate
  plateThickness: number = 0.02,// how thick that plate is front→back
  plateDepth: number = 0.03     // how wide that plate is side→side
) {
  const handleMat = new THREE.MeshStandardMaterial({
    color: 0x2b2b2b,
    roughness: 0.3,
    metalness: 0.9
  });
  
  // (A) Vertical backplate:
  const plateGeo = new THREE.BoxGeometry(plateThickness, plateHeight, plateDepth);
  plateGeo.translate(plateThickness / 2, 0, 0); 
  // Now its back face is at local x=0 to mount flush on the frame
  const plateMesh = new THREE.Mesh(plateGeo, handleMat);
  // We'll position the entire group later. For now, keep at local origin.
  const handleGroup = new THREE.Group();
  handleGroup.add(plateMesh);

  // (B) Horizontal lever:
  const leverLength = 0.06;
  const leverThick  = 0.015;
  const leverDeep   = 0.02;
  const leverGeo = new THREE.BoxGeometry(leverLength, leverThick, leverDeep);
  leverGeo.translate(leverLength / 2, 0, 0);
  const leverMesh = new THREE.Mesh(leverGeo, handleMat);
  // Move it up so it meets top of plate:
  leverMesh.position.set(
    0,
    (plateHeight / 2) - (leverThick / 2),
    0
  );
  // Fold it down 90° so it rests in "closed" position:
  leverMesh.rotation.z = -Math.PI / 2;
  handleGroup.add(leverMesh);

  // (C) Small cylindrical nose:
  const noseRad  = 0.007;
  const noseDepth= leverDeep;
  const noseGeo  = new THREE.CylinderGeometry(noseRad, noseRad, noseDepth, 16);
  const noseMesh = new THREE.Mesh(noseGeo, handleMat);
  // Cylinder faces +Y by default; rotate it so it points +X:
  noseMesh.rotation.z = -Math.PI / 2;
  // Position at the lever tip:
  noseMesh.position.set(
    leverLength + noseRad,
    (plateHeight / 2) - (leverThick / 2),
    0
  );
  handleGroup.add(noseMesh);

  // (D) Now move entire handleGroup to the desired (x,y,z) in world space:
  handleGroup.position.set(x, y, z);
  group.add(handleGroup);

  console.log("Hoppe-style handle created with consistent positioning and proper assembly");
}
