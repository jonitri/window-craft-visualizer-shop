
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
  
  // Create materials for different frame parts
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
    color: 0xd3d3d3, // Light gray for inside face
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
  
  // Create frame structure with proper multi-material setup
  createFrameStructure(group, width, height, frameThickness, frameDepth, baseMaterial, outsideMaterial, insideMaterial);
  
  // Add glass pane in the center
  createGlassPane(group, width, height, frameThickness, glassMaterial);
  
  console.log("Single leaf main frame created with proper inside/outside color separation");
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
  // Create multi-material array for frame pieces
  // Index 0: +X face, Index 1: -X face, Index 2: +Y face, Index 3: -Y face, Index 4: +Z face (outside), Index 5: -Z face (inside)
  const frameMaterials = [
    baseMaterial,    // +X (right edge)
    baseMaterial,    // -X (left edge) 
    baseMaterial,    // +Y (top edge)
    baseMaterial,    // -Y (bottom edge)
    outsideMaterial, // +Z (outside face)
    insideMaterial   // -Z (inside face)
  ];
  
  // Create side frames with multi-material setup
  // Top frame
  const topFrameGeometry = new THREE.BoxGeometry(width, frameThickness, frameDepth);
  const topFrame = new THREE.Mesh(topFrameGeometry, frameMaterials);
  topFrame.position.set(0, height/2 - frameThickness/2, 0);
  group.add(topFrame);
  
  // Bottom frame
  const bottomFrame = new THREE.Mesh(topFrameGeometry, frameMaterials);
  bottomFrame.position.set(0, -height/2 + frameThickness/2, 0);
  group.add(bottomFrame);
  
  // Left frame
  const sideFrameGeometry = new THREE.BoxGeometry(frameThickness, height - frameThickness * 2, frameDepth);
  const leftFrame = new THREE.Mesh(sideFrameGeometry, frameMaterials);
  leftFrame.position.set(-width/2 + frameThickness/2, 0, 0);
  group.add(leftFrame);
  
  // Right frame
  const rightFrame = new THREE.Mesh(sideFrameGeometry, frameMaterials);
  rightFrame.position.set(width/2 - frameThickness/2, 0, 0);
  group.add(rightFrame);

  // Create main frame panels with proper face materials
  createMainFramePanel(group, width, height, frameThickness, frameDepth, outsideMaterial, insideMaterial);
}

function createMainFramePanel(
  group: THREE.Group,
  width: number,
  height: number,
  frameThickness: number,
  frameDepth: number,
  outsideMaterial: THREE.Material,
  insideMaterial: THREE.Material
): void {
  const panelWidth = width - frameThickness * 2;
  const panelHeight = height - frameThickness * 2;
  
  // Create the main frame panel shape with window opening
  const framePanelShape = new THREE.Shape();
  
  // Outer rectangle
  framePanelShape.moveTo(-panelWidth/2, -panelHeight/2);
  framePanelShape.lineTo(panelWidth/2, -panelHeight/2);
  framePanelShape.lineTo(panelWidth/2, panelHeight/2);
  framePanelShape.lineTo(-panelWidth/2, panelHeight/2);
  framePanelShape.lineTo(-panelWidth/2, -panelHeight/2);
  
  // Create window opening (rectangular cutout)
  const openingWidth = panelWidth * 0.75;
  const openingHeight = panelHeight * 0.75;
  
  const opening = new THREE.Path();
  opening.moveTo(-openingWidth/2, -openingHeight/2);
  opening.lineTo(openingWidth/2, -openingHeight/2);
  opening.lineTo(openingWidth/2, openingHeight/2);
  opening.lineTo(-openingWidth/2, openingHeight/2);
  opening.lineTo(-openingWidth/2, -openingHeight/2);
  
  framePanelShape.holes.push(opening);
  
  // Create geometry with proper material assignment for front and back faces
  const extrudeSettings = {
    depth: frameDepth,
    bevelEnabled: false
  };
  
  const framePanelGeometry = new THREE.ExtrudeGeometry(framePanelShape, extrudeSettings);
  
  // Create materials array for extruded geometry
  // ExtrudeGeometry typically has: front face, back face, and side faces
  const panelMaterials = [
    outsideMaterial, // Front face (outside)
    insideMaterial   // Back face (inside)
  ];
  
  const framePanel = new THREE.Mesh(framePanelGeometry, panelMaterials);
  framePanel.position.set(0, 0, -frameDepth/2);
  group.add(framePanel);
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
