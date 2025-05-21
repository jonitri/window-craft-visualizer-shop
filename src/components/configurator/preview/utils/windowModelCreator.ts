
import * as THREE from 'three';
import { ColorOption } from '@/data/products';

export interface WindowModelProps {
  width: number;
  height: number;
  baseColorObject: ColorOption;
  outsideColorObject: ColorOption;
  insideColorObject: ColorOption;
  textureRef: React.MutableRefObject<THREE.Texture | null>;
  windowType?: 'single-leaf' | 'double-leaf' | 'triple-leaf' | 'fixed';
}

export function createWindowModel(
  scene: THREE.Scene,
  modelRef: React.MutableRefObject<THREE.Group | null>,
  props: WindowModelProps
): void {
  console.log("Creating window model", props);
  if (!scene) {
    console.error("Scene is not available");
    return;
  }
  
  if (!props.textureRef.current) {
    console.error("Texture is not loaded");
    return;
  }
  
  // Clear any existing model
  if (modelRef.current) {
    scene.remove(modelRef.current);
    modelRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach(material => material.dispose());
        } else {
          child.material.dispose();
        }
      }
    });
  }
  
  const { width, height, baseColorObject, outsideColorObject, insideColorObject, textureRef, windowType = 'single-leaf' } = props;
  const windowGroup = new THREE.Group();
  
  const aspectRatio = width / height;
  const windowWidth = 2;
  const windowHeight = windowWidth / aspectRatio;
  
  // Select the appropriate window model creation function based on type
  switch (windowType) {
    case 'double-leaf':
      createDoubleLeafWindow(windowGroup, windowWidth, windowHeight, textureRef.current, baseColorObject, outsideColorObject, insideColorObject);
      break;
    case 'triple-leaf':
      createTripleLeafWindow(windowGroup, windowWidth, windowHeight, textureRef.current, baseColorObject, outsideColorObject, insideColorObject);
      break;
    case 'fixed':
      createFixedWindow(windowGroup, windowWidth, windowHeight, textureRef.current, baseColorObject, outsideColorObject, insideColorObject);
      break;
    case 'single-leaf':
    default:
      createSingleLeafWindow(windowGroup, windowWidth, windowHeight, textureRef.current, baseColorObject, outsideColorObject, insideColorObject);
      break;
  }
  
  // Create frame components (common for all window types)
  createWindowFrame(windowGroup, {
    windowWidth,
    windowHeight,
    baseColorObject,
    outsideColorObject,
    insideColorObject,
  });
  
  // Add window model to scene
  scene.add(windowGroup);
  modelRef.current = windowGroup;
  
  console.log(`${windowType} window model created and added to scene`);
}

// Function to create a single-leaf window
function createSingleLeafWindow(
  group: THREE.Group, 
  width: number, 
  height: number, 
  texture: THREE.Texture,
  baseColorObject: ColorOption,
  outsideColorObject: ColorOption,
  insideColorObject: ColorOption
): void {
  // Create glass panel
  const geometry = new THREE.PlaneGeometry(width * 0.85, height * 0.85);
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    transparent: true,
    opacity: 0.6,
    transmission: 0.9,
    roughness: 0.1,
    metalness: 0.1,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    side: THREE.DoubleSide,
  });
  
  const glassPanel = new THREE.Mesh(geometry, glassMaterial);
  glassPanel.position.z = 0;
  group.add(glassPanel);
  
  // Create the window sash (the frame around the glass)
  const sashWidth = width * 0.9;
  const sashHeight = height * 0.9;
  const sashThickness = 0.05;
  
  // Outside sash frame (visible from front)
  const outsideColor = new THREE.Color(outsideColorObject.hex);
  const outsideSashMaterial = new THREE.MeshStandardMaterial({
    color: outsideColor,
    roughness: 0.5,
    metalness: 0.2
  });
  
  // Create sash with cutout for glass
  createWindowSash(group, sashWidth, sashHeight, sashThickness, outsideSashMaterial, 0.02, 'front');
  
  // Inside sash frame (visible from back)
  const insideColor = new THREE.Color(insideColorObject.hex);
  const insideSashMaterial = new THREE.MeshStandardMaterial({
    color: insideColor,
    roughness: 0.5,
    metalness: 0.2
  });
  
  createWindowSash(group, sashWidth, sashHeight, sashThickness, insideSashMaterial, -0.02, 'back');
}

// Function to create a double-leaf window
function createDoubleLeafWindow(
  group: THREE.Group, 
  width: number, 
  height: number, 
  texture: THREE.Texture,
  baseColorObject: ColorOption,
  outsideColorObject: ColorOption,
  insideColorObject: ColorOption
): void {
  const leafWidth = width * 0.425; // Each leaf is slightly less than half width
  const leafHeight = height * 0.85;
  
  // Create glass for both leaves
  const glassGeometry = new THREE.PlaneGeometry(leafWidth, leafHeight);
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    transparent: true,
    opacity: 0.6,
    transmission: 0.9,
    roughness: 0.1,
    metalness: 0.1,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    side: THREE.DoubleSide,
  });
  
  // Left glass
  const leftGlass = new THREE.Mesh(glassGeometry, glassMaterial);
  leftGlass.position.set(-width/4, 0, 0);
  group.add(leftGlass);
  
  // Right glass
  const rightGlass = new THREE.Mesh(glassGeometry, glassMaterial);
  rightGlass.position.set(width/4, 0, 0);
  group.add(rightGlass);
  
  // Create sashes for both leaves
  const sashThickness = 0.05;
  
  // Colors
  const outsideColor = new THREE.Color(outsideColorObject.hex);
  const outsideSashMaterial = new THREE.MeshStandardMaterial({
    color: outsideColor,
    roughness: 0.5,
    metalness: 0.2
  });
  
  const insideColor = new THREE.Color(insideColorObject.hex);
  const insideSashMaterial = new THREE.MeshStandardMaterial({
    color: insideColor,
    roughness: 0.5,
    metalness: 0.2
  });
  
  // Left leaf sashes
  createWindowSash(group, leafWidth * 1.05, leafHeight * 1.05, sashThickness, outsideSashMaterial, 0.02, 'front', -width/4);
  createWindowSash(group, leafWidth * 1.05, leafHeight * 1.05, sashThickness, insideSashMaterial, -0.02, 'back', -width/4);
  
  // Right leaf sashes
  createWindowSash(group, leafWidth * 1.05, leafHeight * 1.05, sashThickness, outsideSashMaterial, 0.02, 'front', width/4);
  createWindowSash(group, leafWidth * 1.05, leafHeight * 1.05, sashThickness, insideSashMaterial, -0.02, 'back', width/4);
  
  // Center divider (mullion)
  const baseColor = new THREE.Color(baseColorObject.hex);
  const dividerWidth = 0.08;
  const dividerGeometry = new THREE.BoxGeometry(dividerWidth, height * 0.9, 0.1);
  const dividerMaterial = new THREE.MeshStandardMaterial({ 
    color: baseColor,
    roughness: 0.5,
    metalness: 0.3
  });
  const divider = new THREE.Mesh(dividerGeometry, dividerMaterial);
  divider.position.set(0, 0, 0);
  group.add(divider);
  
  // Add handles
  addWindowHandle(group, width/4 - leafWidth/2 + 0.1, -leafHeight/4, 0.03, outsideColor);
  addWindowHandle(group, -width/4 + leafWidth/2 - 0.1, -leafHeight/4, 0.03, outsideColor);
}

// Function to create a triple-leaf window
function createTripleLeafWindow(
  group: THREE.Group, 
  width: number, 
  height: number, 
  texture: THREE.Texture,
  baseColorObject: ColorOption,
  outsideColorObject: ColorOption,
  insideColorObject: ColorOption
): void {
  const leafWidth = width * 0.28; // Each leaf is slightly less than a third of the total width
  const leafHeight = height * 0.85;
  
  // Create glass for all three leaves
  const glassGeometry = new THREE.PlaneGeometry(leafWidth, leafHeight);
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    transparent: true,
    opacity: 0.6,
    transmission: 0.9,
    roughness: 0.1,
    metalness: 0.1,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    side: THREE.DoubleSide,
  });
  
  // Left glass
  const leftGlass = new THREE.Mesh(glassGeometry, glassMaterial);
  leftGlass.position.set(-width/3, 0, 0);
  group.add(leftGlass);
  
  // Middle glass
  const middleGlass = new THREE.Mesh(glassGeometry, glassMaterial);
  middleGlass.position.set(0, 0, 0);
  group.add(middleGlass);
  
  // Right glass
  const rightGlass = new THREE.Mesh(glassGeometry, glassMaterial);
  rightGlass.position.set(width/3, 0, 0);
  group.add(rightGlass);
  
  // Create sashes for all three leaves
  const sashThickness = 0.05;
  
  // Colors
  const outsideColor = new THREE.Color(outsideColorObject.hex);
  const outsideSashMaterial = new THREE.MeshStandardMaterial({
    color: outsideColor,
    roughness: 0.5,
    metalness: 0.2
  });
  
  const insideColor = new THREE.Color(insideColorObject.hex);
  const insideSashMaterial = new THREE.MeshStandardMaterial({
    color: insideColor,
    roughness: 0.5,
    metalness: 0.2
  });
  
  // Left leaf sashes
  createWindowSash(group, leafWidth * 1.05, leafHeight * 1.05, sashThickness, outsideSashMaterial, 0.02, 'front', -width/3);
  createWindowSash(group, leafWidth * 1.05, leafHeight * 1.05, sashThickness, insideSashMaterial, -0.02, 'back', -width/3);
  
  // Middle leaf sashes
  createWindowSash(group, leafWidth * 1.05, leafHeight * 1.05, sashThickness, outsideSashMaterial, 0.02, 'front', 0);
  createWindowSash(group, leafWidth * 1.05, leafHeight * 1.05, sashThickness, insideSashMaterial, -0.02, 'back', 0);
  
  // Right leaf sashes
  createWindowSash(group, leafWidth * 1.05, leafHeight * 1.05, sashThickness, outsideSashMaterial, 0.02, 'front', width/3);
  createWindowSash(group, leafWidth * 1.05, leafHeight * 1.05, sashThickness, insideSashMaterial, -0.02, 'back', width/3);
  
  // Dividers (mullions)
  const baseColor = new THREE.Color(baseColorObject.hex);
  const dividerWidth = 0.08;
  const dividerGeometry = new THREE.BoxGeometry(dividerWidth, height * 0.9, 0.1);
  const dividerMaterial = new THREE.MeshStandardMaterial({ 
    color: baseColor,
    roughness: 0.5,
    metalness: 0.3
  });
  
  // Left divider
  const leftDivider = new THREE.Mesh(dividerGeometry, dividerMaterial);
  leftDivider.position.set(-width/6, 0, 0);
  group.add(leftDivider);
  
  // Right divider
  const rightDivider = new THREE.Mesh(dividerGeometry, dividerMaterial);
  rightDivider.position.set(width/6, 0, 0);
  group.add(rightDivider);
  
  // Add handles
  addWindowHandle(group, -width/3 + leafWidth/2 - 0.1, -leafHeight/4, 0.03, outsideColor);
  addWindowHandle(group, width/3 - leafWidth/2 + 0.1, -leafHeight/4, 0.03, outsideColor);
}

// Function to create a fixed window
function createFixedWindow(
  group: THREE.Group, 
  width: number, 
  height: number, 
  texture: THREE.Texture,
  baseColorObject: ColorOption,
  outsideColorObject: ColorOption,
  insideColorObject: ColorOption
): void {
  // Create a larger glass panel for fixed windows
  const geometry = new THREE.PlaneGeometry(width * 0.85, height * 0.85);
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    transparent: true,
    opacity: 0.7,
    transmission: 0.9,
    roughness: 0.05,
    metalness: 0.1,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    side: THREE.DoubleSide,
  });
  
  const glassPanel = new THREE.Mesh(geometry, glassMaterial);
  group.add(glassPanel);
  
  // Create window sash
  const sashWidth = width * 0.9;
  const sashHeight = height * 0.9;
  const sashThickness = 0.05;
  
  // Outside sash
  const outsideColor = new THREE.Color(outsideColorObject.hex);
  const outsideSashMaterial = new THREE.MeshStandardMaterial({
    color: outsideColor,
    roughness: 0.5,
    metalness: 0.2
  });
  
  // Create sash with cutout for glass
  createWindowSash(group, sashWidth, sashHeight, sashThickness, outsideSashMaterial, 0.02, 'front');
  
  // Inside sash
  const insideColor = new THREE.Color(insideColorObject.hex);
  const insideSashMaterial = new THREE.MeshStandardMaterial({
    color: insideColor,
    roughness: 0.5,
    metalness: 0.2
  });
  
  createWindowSash(group, sashWidth, sashHeight, sashThickness, insideSashMaterial, -0.02, 'back');
  
  // Add a "Fixed" label using simple geometry instead of TextGeometry
  const labelGeometry = new THREE.BoxGeometry(0.4, 0.1, 0.01);
  const labelMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
  const label = new THREE.Mesh(labelGeometry, labelMaterial);
  label.position.set(0, -height * 0.3, 0.05);
  group.add(label);
  
  // Add a small indicator dot above the label
  const dotGeometry = new THREE.CircleGeometry(0.05, 16);
  const dot = new THREE.Mesh(dotGeometry, labelMaterial);
  dot.position.set(0, -height * 0.25, 0.05);
  group.add(dot);
}

// Helper function to create window sash with cutout for glass
function createWindowSash(
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
function addWindowHandle(group: THREE.Group, x: number, y: number, z: number, color: THREE.Color) {
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

interface WindowFrameProps {
  windowWidth: number;
  windowHeight: number;
  baseColorObject: ColorOption;
  outsideColorObject: ColorOption;
  insideColorObject: ColorOption;
}

function createWindowFrame(windowGroup: THREE.Group, props: WindowFrameProps): void {
  const { windowWidth, windowHeight, baseColorObject } = props;
  
  const frameThickness = 0.1;
  const frameDepth = 0.15;
  
  // Convert color hex to THREE color
  const baseColor = new THREE.Color(baseColorObject.hex);
  
  // Create main outer frame
  const topFrameGeometry = new THREE.BoxGeometry(
    windowWidth + frameThickness * 2, 
    frameThickness, 
    frameDepth
  );
  const frameMaterial = new THREE.MeshStandardMaterial({ 
    color: baseColor,
    roughness: 0.7,
    metalness: 0.2
  });
  
  // Top frame
  const topFrame = new THREE.Mesh(topFrameGeometry, frameMaterial);
  topFrame.position.y = windowHeight/2 + frameThickness/2;
  windowGroup.add(topFrame);
  
  // Bottom frame
  const bottomFrame = new THREE.Mesh(topFrameGeometry, frameMaterial);
  bottomFrame.position.y = -windowHeight/2 - frameThickness/2;
  windowGroup.add(bottomFrame);
  
  // Left frame
  const sideFrameGeometry = new THREE.BoxGeometry(
    frameThickness, 
    windowHeight + frameThickness * 2, 
    frameDepth
  );
  const leftFrame = new THREE.Mesh(sideFrameGeometry, frameMaterial);
  leftFrame.position.x = -windowWidth/2 - frameThickness/2;
  windowGroup.add(leftFrame);
  
  // Right frame
  const rightFrame = new THREE.Mesh(sideFrameGeometry, frameMaterial);
  rightFrame.position.x = windowWidth/2 + frameThickness/2;
  windowGroup.add(rightFrame);
}
