
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

  // Glass material
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.15,
    transmission: 0.85,
    roughness: 0.0,
    metalness: 0.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.0,
    ior: 1.52,
    thickness: 0.005
  });
  
  // Create frame structure with proper depth and color assignment
  createFrameStructure(group, width, height, frameThickness, frameDepth, baseMaterial, outsideMaterial, insideMaterial);
  
  // Add glass pane in the center
  createGlassPane(group, width, height, frameThickness, glassMaterial);
  
  console.log("Single leaf main frame created with proper 3D structure and color separation");
}

function createFrameStructure(
  group: THREE.Group,
  width: number,
  height: number,
  frameThickness: number,
  frameDepth: number,
  baseMaterial: THREE.Material,
  outsideMaterial: THREE.Material,
  insideMaterial: THREE.Material
): void {
  // Create outer frame perimeter (base color for sides)
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

  // Create front face panel (outside color)
  createFrontPanel(group, width, height, frameThickness, frameDepth, outsideMaterial);
  
  // Create back face panel (inside color)
  createBackPanel(group, width, height, frameThickness, frameDepth, insideMaterial);
}

function createFrontPanel(
  group: THREE.Group,
  width: number,
  height: number,
  frameThickness: number,
  frameDepth: number,
  outsideMaterial: THREE.Material
): void {
  const panelThickness = 0.015;
  const panelWidth = width - frameThickness * 2;
  const panelHeight = height - frameThickness * 2;
  
  // Create the front panel shape with window opening
  const frontPanelShape = new THREE.Shape();
  
  // Outer rectangle
  frontPanelShape.moveTo(-panelWidth/2, -panelHeight/2);
  frontPanelShape.lineTo(panelWidth/2, -panelHeight/2);
  frontPanelShape.lineTo(panelWidth/2, panelHeight/2);
  frontPanelShape.lineTo(-panelWidth/2, panelHeight/2);
  frontPanelShape.lineTo(-panelWidth/2, -panelHeight/2);
  
  // Create window opening (rectangular cutout)
  const openingWidth = panelWidth * 0.75;
  const openingHeight = panelHeight * 0.75;
  
  const opening = new THREE.Path();
  opening.moveTo(-openingWidth/2, -openingHeight/2);
  opening.lineTo(openingWidth/2, -openingHeight/2);
  opening.lineTo(openingWidth/2, openingHeight/2);
  opening.lineTo(-openingWidth/2, openingHeight/2);
  opening.lineTo(-openingWidth/2, -openingHeight/2);
  
  frontPanelShape.holes.push(opening);
  
  // Extrude the shape to create thickness
  const extrudeSettings = {
    depth: panelThickness,
    bevelEnabled: false
  };
  
  const frontPanelGeometry = new THREE.ExtrudeGeometry(frontPanelShape, extrudeSettings);
  const frontPanel = new THREE.Mesh(frontPanelGeometry, outsideMaterial);
  frontPanel.position.set(0, 0, frameDepth/2 + panelThickness/2);
  group.add(frontPanel);
}

function createBackPanel(
  group: THREE.Group,
  width: number,
  height: number,
  frameThickness: number,
  frameDepth: number,
  insideMaterial: THREE.Material
): void {
  const panelThickness = 0.015;
  const panelWidth = width - frameThickness * 2;
  const panelHeight = height - frameThickness * 2;
  
  // Create the back panel shape with window opening
  const backPanelShape = new THREE.Shape();
  
  // Outer rectangle
  backPanelShape.moveTo(-panelWidth/2, -panelHeight/2);
  backPanelShape.lineTo(panelWidth/2, -panelHeight/2);
  backPanelShape.lineTo(panelWidth/2, panelHeight/2);
  backPanelShape.lineTo(-panelWidth/2, panelHeight/2);
  backPanelShape.lineTo(-panelWidth/2, -panelHeight/2);
  
  // Create window opening (same size as front)
  const openingWidth = panelWidth * 0.75;
  const openingHeight = panelHeight * 0.75;
  
  const opening = new THREE.Path();
  opening.moveTo(-openingWidth/2, -openingHeight/2);
  opening.lineTo(openingWidth/2, -openingHeight/2);
  opening.lineTo(openingWidth/2, openingHeight/2);
  opening.lineTo(-openingWidth/2, openingHeight/2);
  opening.lineTo(-openingWidth/2, -openingHeight/2);
  
  backPanelShape.holes.push(opening);
  
  // Extrude the shape to create thickness
  const extrudeSettings = {
    depth: panelThickness,
    bevelEnabled: false
  };
  
  const backPanelGeometry = new THREE.ExtrudeGeometry(backPanelShape, extrudeSettings);
  const backPanel = new THREE.Mesh(backPanelGeometry, insideMaterial);
  backPanel.position.set(0, 0, -frameDepth/2 - panelThickness/2);
  backPanel.rotation.y = Math.PI; // Flip to face inward
  group.add(backPanel);
}

function createGlassPane(
  group: THREE.Group,
  width: number,
  height: number,
  frameThickness: number,
  glassMaterial: THREE.Material
): void {
  const panelWidth = width - frameThickness * 2;
  const panelHeight = height - frameThickness * 2;
  const glassWidth = panelWidth * 0.75;
  const glassHeight = panelHeight * 0.75;
  
  const glassGeometry = new THREE.PlaneGeometry(glassWidth, glassHeight);
  const glassPane = new THREE.Mesh(glassGeometry, glassMaterial);
  glassPane.position.set(0, 0, 0);
  glassPane.renderOrder = 1000; // Ensure proper transparency rendering
  group.add(glassPane);
}
