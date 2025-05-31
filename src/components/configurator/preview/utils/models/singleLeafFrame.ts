
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
  // Create side frames ONLY (base color for sides/edges)
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
  const sideFrameGeometry = new THREE.BoxGeometry(frameThickness, height - frameThickness * 2, frameDepth);
  const leftFrame = new THREE.Mesh(sideFrameGeometry, baseMaterial);
  leftFrame.position.set(-width/2 + frameThickness/2, 0, 0);
  group.add(leftFrame);
  
  // Right frame
  const rightFrame = new THREE.Mesh(sideFrameGeometry, baseMaterial);
  rightFrame.position.set(width/2 - frameThickness/2, 0, 0);
  group.add(rightFrame);

  // Create front face panel (outside color) - thin panel for outside face
  createOutsidePanel(group, width, height, frameThickness, frameDepth, outsideMaterial);
  
  // Create back face panel (inside color) - thin panel for inside face
  createInsidePanel(group, width, height, frameThickness, frameDepth, insideMaterial);
}

function createOutsidePanel(
  group: THREE.Group,
  width: number,
  height: number,
  frameThickness: number,
  frameDepth: number,
  outsideMaterial: THREE.Material
): void {
  const panelThickness = 0.005;
  const panelWidth = width - frameThickness * 2;
  const panelHeight = height - frameThickness * 2;
  
  // Create the outside panel shape with window opening
  const outsidePanelShape = new THREE.Shape();
  
  // Outer rectangle
  outsidePanelShape.moveTo(-panelWidth/2, -panelHeight/2);
  outsidePanelShape.lineTo(panelWidth/2, -panelHeight/2);
  outsidePanelShape.lineTo(panelWidth/2, panelHeight/2);
  outsidePanelShape.lineTo(-panelWidth/2, panelHeight/2);
  outsidePanelShape.lineTo(-panelWidth/2, -panelHeight/2);
  
  // Create window opening (rectangular cutout)
  const openingWidth = panelWidth * 0.75;
  const openingHeight = panelHeight * 0.75;
  
  const opening = new THREE.Path();
  opening.moveTo(-openingWidth/2, -openingHeight/2);
  opening.lineTo(openingWidth/2, -openingHeight/2);
  opening.lineTo(openingWidth/2, openingHeight/2);
  opening.lineTo(-openingWidth/2, openingHeight/2);
  opening.lineTo(-openingWidth/2, -openingHeight/2);
  
  outsidePanelShape.holes.push(opening);
  
  // Extrude the shape to create thickness
  const extrudeSettings = {
    depth: panelThickness,
    bevelEnabled: false
  };
  
  const outsidePanelGeometry = new THREE.ExtrudeGeometry(outsidePanelShape, extrudeSettings);
  const outsidePanel = new THREE.Mesh(outsidePanelGeometry, outsideMaterial);
  outsidePanel.position.set(0, 0, frameDepth/2 + panelThickness/2);
  group.add(outsidePanel);
}

function createInsidePanel(
  group: THREE.Group,
  width: number,
  height: number,
  frameThickness: number,
  frameDepth: number,
  insideMaterial: THREE.Material
): void {
  const panelThickness = 0.005;
  const panelWidth = width - frameThickness * 2;
  const panelHeight = height - frameThickness * 2;
  
  // Create the inside panel shape with window opening
  const insidePanelShape = new THREE.Shape();
  
  // Outer rectangle
  insidePanelShape.moveTo(-panelWidth/2, -panelHeight/2);
  insidePanelShape.lineTo(panelWidth/2, -panelHeight/2);
  insidePanelShape.lineTo(panelWidth/2, panelHeight/2);
  insidePanelShape.lineTo(-panelWidth/2, panelHeight/2);
  insidePanelShape.lineTo(-panelWidth/2, -panelHeight/2);
  
  // Create window opening (same size as outside)
  const openingWidth = panelWidth * 0.75;
  const openingHeight = panelHeight * 0.75;
  
  const opening = new THREE.Path();
  opening.moveTo(-openingWidth/2, -openingHeight/2);
  opening.lineTo(openingWidth/2, -openingHeight/2);
  opening.lineTo(openingWidth/2, openingHeight/2);
  opening.lineTo(-openingWidth/2, openingHeight/2);
  opening.lineTo(-openingWidth/2, -openingHeight/2);
  
  insidePanelShape.holes.push(opening);
  
  // Extrude the shape to create thickness
  const extrudeSettings = {
    depth: panelThickness,
    bevelEnabled: false
  };
  
  const insidePanelGeometry = new THREE.ExtrudeGeometry(insidePanelShape, extrudeSettings);
  const insidePanel = new THREE.Mesh(insidePanelGeometry, insideMaterial);
  insidePanel.position.set(0, 0, -frameDepth/2 - panelThickness/2);
  group.add(insidePanel);
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
