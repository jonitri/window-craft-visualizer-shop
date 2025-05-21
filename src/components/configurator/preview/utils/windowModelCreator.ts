
import * as THREE from 'three';
import { ColorOption } from '@/data/products';

export interface WindowModelProps {
  width: number;
  height: number;
  baseColorObject: ColorOption;
  outsideColorObject: ColorOption;
  insideColorObject: ColorOption;
  textureRef: React.MutableRefObject<THREE.Texture | null>;
}

export function createWindowModel(
  scene: THREE.Scene,
  modelRef: React.MutableRefObject<THREE.Group | null>,
  props: WindowModelProps
): void {
  if (!scene || !props.textureRef.current) return;
  
  const { width, height, baseColorObject, outsideColorObject, insideColorObject, textureRef } = props;
  const windowGroup = new THREE.Group();
  
  const aspectRatio = width / height;
  const windowWidth = 2;
  const windowHeight = windowWidth / aspectRatio;
  
  // Front and back panels with the window texture
  const geometry = new THREE.PlaneGeometry(windowWidth, windowHeight);

  // Using material with the loaded texture
  const frontMaterial = new THREE.MeshStandardMaterial({
    map: textureRef.current,
    side: THREE.FrontSide,
  });
  
  const backMaterial = new THREE.MeshStandardMaterial({
    map: textureRef.current,
    side: THREE.BackSide,
  });

  const frontPanel = new THREE.Mesh(geometry, frontMaterial);
  frontPanel.position.z = 0.01;
  windowGroup.add(frontPanel);
  
  const backPanel = new THREE.Mesh(geometry, backMaterial);
  backPanel.position.z = -0.01;
  backPanel.rotation.y = Math.PI;
  windowGroup.add(backPanel);
  
  // Create frame components
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
  
  console.log("Window model created and added to scene");
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
  const frameDepth = 0.1;
  
  // Convert color hex to THREE color
  const baseColor = new THREE.Color(baseColorObject.hex);
  
  // Top frame
  const topFrameGeometry = new THREE.BoxGeometry(
    windowWidth + frameThickness, 
    frameThickness, 
    frameDepth
  );
  const topFrameMaterial = new THREE.MeshStandardMaterial({ color: baseColor });
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
