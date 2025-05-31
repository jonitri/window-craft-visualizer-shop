
import * as THREE from 'three';

export function createMainFramePanel(
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
  // ExtrudeGeometry has front face (outside) and back face (inside)
  const panelMaterials = [
    outsideMaterial, // Front face (outside)
    insideMaterial   // Back face (inside)
  ];
  
  const framePanel = new THREE.Mesh(framePanelGeometry, panelMaterials);
  framePanel.position.set(0, 0, -frameDepth/2);
  group.add(framePanel);
  
  console.log("Main frame panel created with proper front/back material assignment");
}
