
import * as THREE from 'three';

export function addDebugVisualization(scene: THREE.Scene, windowModel: THREE.Group): void {
  console.log("Adding debug visualization");
  
  // Remove existing debug objects
  const existingDebug = scene.getObjectByName('debug-group');
  if (existingDebug) {
    scene.remove(existingDebug);
  }
  
  const debugGroup = new THREE.Group();
  debugGroup.name = 'debug-group';
  
  // Add coordinate system helper
  const axesHelper = new THREE.AxesHelper(1);
  axesHelper.position.set(-2, -2, 0);
  debugGroup.add(axesHelper);
  
  // Add bounding box helper for the window model
  if (windowModel) {
    const box = new THREE.BoxHelper(windowModel, 0xff0000);
    box.name = 'window-bounding-box';
    debugGroup.add(box);
    
    // Add dimensions text (simplified)
    const bbox = new THREE.Box3().setFromObject(windowModel);
    const size = bbox.getSize(new THREE.Vector3());
    console.log(`Window model dimensions: ${size.x.toFixed(3)} x ${size.y.toFixed(3)} x ${size.z.toFixed(3)}`);
  }
  
  // Add grid helper
  const gridHelper = new THREE.GridHelper(4, 20, 0x444444, 0x888888);
  gridHelper.rotation.x = Math.PI / 2;
  gridHelper.position.z = -0.1;
  debugGroup.add(gridHelper);
  
  scene.add(debugGroup);
  console.log("Debug visualization added to scene");
}

export function logObjectHierarchy(object: THREE.Object3D, depth: number = 0): void {
  const indent = '  '.repeat(depth);
  console.log(`${indent}${object.name || object.type} (${object.children.length} children)`);
  
  if (object instanceof THREE.Mesh) {
    const geometry = object.geometry;
    const material = object.material;
    console.log(`${indent}  Geometry: ${geometry.type}, Materials: ${Array.isArray(material) ? material.length : 1}`);
    
    if (geometry.boundingBox) {
      const size = geometry.boundingBox.getSize(new THREE.Vector3());
      console.log(`${indent}  Size: ${size.x.toFixed(3)} x ${size.y.toFixed(3)} x ${size.z.toFixed(3)}`);
    }
  }
  
  object.children.forEach(child => logObjectHierarchy(child, depth + 1));
}
