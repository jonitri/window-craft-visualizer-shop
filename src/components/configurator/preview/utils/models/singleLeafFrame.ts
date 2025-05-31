
import * as THREE from 'three';
import { createFrameMaterials, createGlassMaterial } from './frameMaterials';
import { createFrameStructure } from './frameStructure';
import { createMainFramePanel } from './framePanel';
import { createGlassPane } from './frameGlass';

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
  
  // Create materials with proper face separation
  const { baseMaterial, outsideMaterial, insideMaterial, frameMaterialsArray } = createFrameMaterials(
    baseColor, 
    outsideColor, 
    insideColor
  );

  // Glass material
  const glassMaterial = createGlassMaterial();
  
  // Create frame structure with proper multi-material setup for face separation
  createFrameStructure(group, width, height, frameThickness, frameDepth, baseMaterial, outsideMaterial, insideMaterial);
  
  // Create main frame panels with proper face materials
  createMainFramePanel(group, width, height, frameThickness, frameDepth, outsideMaterial, insideMaterial);
  
  // Add glass pane in the center
  createGlassPane(group, width, height, frameThickness, glassMaterial);
  
  console.log("Single leaf main frame created with proper inside/outside color separation using material arrays");
}
