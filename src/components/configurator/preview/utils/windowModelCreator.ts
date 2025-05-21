
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
  const geometry = new THREE.PlaneGeometry(width * 0.9, height * 0.9);

  // Outside panel material
  const outsideColor = new THREE.Color(outsideColorObject.hex);
  const outsideMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    color: outsideColor,
    side: THREE.FrontSide,
    transparent: true,
    opacity: 0.9,
  });
  
  // Inside panel material
  const insideColor = new THREE.Color(insideColorObject.hex);
  const insideMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    color: insideColor,
    side: THREE.BackSide,
    transparent: true,
    opacity: 0.9,
  });

  // Create panels
  const frontPanel = new THREE.Mesh(geometry, outsideMaterial);
  frontPanel.position.z = 0.01;
  group.add(frontPanel);
  
  const backPanel = new THREE.Mesh(geometry, insideMaterial);
  backPanel.position.z = -0.01;
  group.add(backPanel);
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
  const leafWidth = width * 0.45; // Each leaf is slightly less than half width
  const leafHeight = height * 0.9;
  const geometry = new THREE.PlaneGeometry(leafWidth, leafHeight);
  
  // Colors
  const outsideColor = new THREE.Color(outsideColorObject.hex);
  const insideColor = new THREE.Color(insideColorObject.hex);
  const baseColor = new THREE.Color(baseColorObject.hex);
  
  // Materials
  const outsideMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    color: outsideColor,
    side: THREE.FrontSide,
    transparent: true,
    opacity: 0.9,
  });
  
  const insideMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    color: insideColor,
    side: THREE.BackSide,
    transparent: true,
    opacity: 0.9,
  });
  
  // Left leaf
  const leftFrontPanel = new THREE.Mesh(geometry, outsideMaterial);
  leftFrontPanel.position.set(-width/4, 0, 0.01);
  group.add(leftFrontPanel);
  
  const leftBackPanel = new THREE.Mesh(geometry, insideMaterial);
  leftBackPanel.position.set(-width/4, 0, -0.01);
  group.add(leftBackPanel);
  
  // Right leaf
  const rightFrontPanel = new THREE.Mesh(geometry, outsideMaterial);
  rightFrontPanel.position.set(width/4, 0, 0.01);
  group.add(rightFrontPanel);
  
  const rightBackPanel = new THREE.Mesh(geometry, insideMaterial);
  rightBackPanel.position.set(width/4, 0, -0.01);
  group.add(rightBackPanel);
  
  // Center divider
  const dividerGeometry = new THREE.BoxGeometry(0.05, height * 0.9, 0.1);
  const dividerMaterial = new THREE.MeshStandardMaterial({ color: baseColor });
  const divider = new THREE.Mesh(dividerGeometry, dividerMaterial);
  divider.position.set(0, 0, 0);
  group.add(divider);
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
  const leafWidth = width * 0.3; // Each leaf is about a third of the total width
  const leafHeight = height * 0.9;
  const geometry = new THREE.PlaneGeometry(leafWidth, leafHeight);
  
  // Colors
  const outsideColor = new THREE.Color(outsideColorObject.hex);
  const insideColor = new THREE.Color(insideColorObject.hex);
  const baseColor = new THREE.Color(baseColorObject.hex);
  
  // Materials
  const outsideMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    color: outsideColor,
    side: THREE.FrontSide,
    transparent: true,
    opacity: 0.9,
  });
  
  const insideMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    color: insideColor,
    side: THREE.BackSide,
    transparent: true,
    opacity: 0.9,
  });
  
  // Left leaf
  const leftFrontPanel = new THREE.Mesh(geometry, outsideMaterial);
  leftFrontPanel.position.set(-width/3, 0, 0.01);
  group.add(leftFrontPanel);
  
  const leftBackPanel = new THREE.Mesh(geometry, insideMaterial);
  leftBackPanel.position.set(-width/3, 0, -0.01);
  group.add(leftBackPanel);
  
  // Middle leaf
  const middleFrontPanel = new THREE.Mesh(geometry, outsideMaterial);
  middleFrontPanel.position.set(0, 0, 0.01);
  group.add(middleFrontPanel);
  
  const middleBackPanel = new THREE.Mesh(geometry, insideMaterial);
  middleBackPanel.position.set(0, 0, -0.01);
  group.add(middleBackPanel);
  
  // Right leaf
  const rightFrontPanel = new THREE.Mesh(geometry, outsideMaterial);
  rightFrontPanel.position.set(width/3, 0, 0.01);
  group.add(rightFrontPanel);
  
  const rightBackPanel = new THREE.Mesh(geometry, insideMaterial);
  rightBackPanel.position.set(width/3, 0, -0.01);
  group.add(rightBackPanel);
  
  // Left divider
  const leftDividerGeometry = new THREE.BoxGeometry(0.05, height * 0.9, 0.1);
  const dividerMaterial = new THREE.MeshStandardMaterial({ color: baseColor });
  const leftDivider = new THREE.Mesh(leftDividerGeometry, dividerMaterial);
  leftDivider.position.set(-width/6, 0, 0);
  group.add(leftDivider);
  
  // Right divider
  const rightDividerGeometry = new THREE.BoxGeometry(0.05, height * 0.9, 0.1);
  const rightDivider = new THREE.Mesh(rightDividerGeometry, dividerMaterial);
  rightDivider.position.set(width/6, 0, 0);
  group.add(rightDivider);
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
  const geometry = new THREE.PlaneGeometry(width * 0.9, height * 0.9);
  
  // Outside panel material with the outside color tint
  const outsideColor = new THREE.Color(outsideColorObject.hex);
  const outsideMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    color: outsideColor,
    side: THREE.FrontSide,
    transparent: true,
    opacity: 0.95,
  });
  
  // Inside panel material with the inside color tint
  const insideColor = new THREE.Color(insideColorObject.hex);
  const insideMaterial = new THREE.MeshStandardMaterial({
    map: texture,
    color: insideColor,
    side: THREE.BackSide,
    transparent: true,
    opacity: 0.95,
  });
  
  // Fixed windows typically have an additional glass pane for better insulation
  const frontPanel = new THREE.Mesh(geometry, outsideMaterial);
  frontPanel.position.z = 0.02;
  group.add(frontPanel);
  
  const middlePanel = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.3,
  }));
  group.add(middlePanel);
  
  const backPanel = new THREE.Mesh(geometry, insideMaterial);
  backPanel.position.z = -0.02;
  group.add(backPanel);

  // Add a "Fixed" label in the center (optional)
  const labelGeometry = new THREE.TextGeometry('Fixed', {
    font: undefined, // You would need to load a font
    size: 0.1,
    height: 0.01,
  });
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
  const frameDepth = 0.12;
  
  // Convert color hex to THREE color
  const baseColor = new THREE.Color(baseColorObject.hex);
  
  // Top frame
  const topFrameGeometry = new THREE.BoxGeometry(
    windowWidth + frameThickness, 
    frameThickness, 
    frameDepth
  );
  const topFrameMaterial = new THREE.MeshStandardMaterial({ 
    color: baseColor,
    roughness: 0.7,
    metalness: 0.3
  });
  const topFrame = new THREE.Mesh(topFrameGeometry, topFrameMaterial);
  topFrame.position.y = windowHeight/2 + frameThickness/2;
  windowGroup.add(topFrame);
  
  // Bottom frame
  const bottomFrame = new THREE.Mesh(topFrameGeometry, topFrameMaterial);
  bottomFrame.position.y = -windowHeight/2 - frameThickness/2;
  windowGroup.add(bottomFrame);
  
  // Left frame
  const sideFrameGeometry = new THREE.BoxGeometry(
    frameThickness, 
    windowHeight + frameThickness * 2, 
    frameDepth
  );
  const leftFrame = new THREE.Mesh(sideFrameGeometry, topFrameMaterial);
  leftFrame.position.x = -windowWidth/2 - frameThickness/2;
  windowGroup.add(leftFrame);
  
  // Right frame
  const rightFrame = new THREE.Mesh(sideFrameGeometry, topFrameMaterial);
  rightFrame.position.x = windowWidth/2 + frameThickness/2;
  windowGroup.add(rightFrame);
}
