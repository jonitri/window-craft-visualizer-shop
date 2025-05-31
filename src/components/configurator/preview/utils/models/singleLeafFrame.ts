
import * as THREE from 'three';

export function createSingleLeafMainFrame(
  group: THREE.Group, 
  width: number, 
  height: number, 
  baseColor: THREE.Color, 
  outsideColor: THREE.Color, 
  insideColor: THREE.Color
): void {
  const frameThickness = 0.12;
  const frameDepth = 0.08;
  
  // Create materials
  const baseMaterial = new THREE.MeshStandardMaterial({
    color: baseColor,
    roughness: 0.4,
    metalness: 0.2
  });
  
  const outsideMaterial = new THREE.MeshStandardMaterial({
    color: outsideColor,
    roughness: 0.3,
    metalness: 0.1
  });
  
  const insideMaterial = new THREE.MeshStandardMaterial({
    color: insideColor,
    roughness: 0.3,
    metalness: 0.1
  });
  
  // Create outer frame perimeter (base color)
  // Top frame
  const topFrameGeometry = new THREE.BoxGeometry(width, frameThickness, frameDepth);
  const topFrame = new THREE.Mesh(topFrameGeometry, baseMaterial);
  topFrame.position.set(0, height/2 - frameThickness/2, 0);
  group.add(topFrame);
  
  // Bottom frame
  const bottomFrame = new THREE.Mesh(topFrameGeometry, baseMaterial);
  bottomFrame.position.set(0, -height/2 + frameThickness/2, 0);
  group.add(bottomFrame);
  
  // Left frame
  const sideFrameGeometry = new THREE.BoxGeometry(frameThickness, height, frameDepth);
  const leftFrame = new THREE.Mesh(sideFrameGeometry, baseMaterial);
  leftFrame.position.set(-width/2 + frameThickness/2, 0, 0);
  group.add(leftFrame);
  
  // Right frame
  const rightFrame = new THREE.Mesh(sideFrameGeometry, baseMaterial);
  rightFrame.position.set(width/2 - frameThickness/2, 0, 0);
  group.add(rightFrame);
  
  // Front face (outside material)
  const frontFaceGeometry = new THREE.PlaneGeometry(width - frameThickness * 2, height - frameThickness * 2);
  const frontFace = new THREE.Mesh(frontFaceGeometry, outsideMaterial);
  frontFace.position.set(0, 0, frameDepth/2 + 0.001);
  group.add(frontFace);
  
  // Back face with cutout (inside material)
  // Create the back panel with a rectangular cutout
  const backPanelShape = new THREE.Shape();
  const panelWidth = width - frameThickness * 2;
  const panelHeight = height - frameThickness * 2;
  
  // Outer rectangle
  backPanelShape.moveTo(-panelWidth/2, -panelHeight/2);
  backPanelShape.lineTo(panelWidth/2, -panelHeight/2);
  backPanelShape.lineTo(panelWidth/2, panelHeight/2);
  backPanelShape.lineTo(-panelWidth/2, panelHeight/2);
  backPanelShape.lineTo(-panelWidth/2, -panelHeight/2);
  
  // Create cutout hole (positioned where the arrow points in the image)
  const cutoutWidth = panelWidth * 0.3; // 30% of panel width
  const cutoutHeight = panelHeight * 0.4; // 40% of panel height
  const cutoutX = -panelWidth * 0.15; // Position on the left side
  const cutoutY = panelHeight * 0.1; // Slightly above center
  
  const cutoutHole = new THREE.Path();
  cutoutHole.moveTo(cutoutX - cutoutWidth/2, cutoutY - cutoutHeight/2);
  cutoutHole.lineTo(cutoutX + cutoutWidth/2, cutoutY - cutoutHeight/2);
  cutoutHole.lineTo(cutoutX + cutoutWidth/2, cutoutY + cutoutHeight/2);
  cutoutHole.lineTo(cutoutX - cutoutWidth/2, cutoutY + cutoutHeight/2);
  cutoutHole.lineTo(cutoutX - cutoutWidth/2, cutoutY - cutoutHeight/2);
  
  backPanelShape.holes.push(cutoutHole);
  
  const backPanelGeometry = new THREE.ShapeGeometry(backPanelShape);
  const backPanel = new THREE.Mesh(backPanelGeometry, insideMaterial);
  backPanel.position.set(0, 0, -frameDepth/2 - 0.001);
  backPanel.rotation.y = Math.PI; // Flip to face inward
  group.add(backPanel);
  
  console.log("Single leaf main frame created with cutout in back panel");
}
