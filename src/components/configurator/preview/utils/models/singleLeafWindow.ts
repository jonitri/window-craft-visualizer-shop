
import * as THREE from 'three';
import { ColorOption } from '@/data/products';
import { addRealisticWindowHandle } from './windowHandles';
import { 
  createGlassMaterial, 
  createSingleLeafGlassPanel, 
  createSingleLeafRubberSeal, 
  createSingleLeafWindowSash 
} from './singleLeafGlass';
import { createSingleLeafMainFrame } from './singleLeafFrame';

export function createSingleLeafWindow(
  group: THREE.Group, 
  width: number, 
  height: number, 
  texture: THREE.Texture,
  baseColorObject: ColorOption,
  outsideColorObject: ColorOption,
  insideColorObject: ColorOption,
  rubberColorObject?: ColorOption
): void {
  // Colors
  const outsideColor = new THREE.Color(outsideColorObject.hex);
  const insideColor = new THREE.Color(insideColorObject.hex);
  const baseColor = new THREE.Color(baseColorObject.hex);
  const rubberColor = rubberColorObject ? new THREE.Color(rubberColorObject.hex) : new THREE.Color('#000000');
  
  // Create main window frame structure
  createSingleLeafMainFrame(group, width, height, baseColor, outsideColor, insideColor);
  
  // Create glass panel with realistic transparency (always transparent)
  const glassWidth = width * 0.75;
  const glassHeight = height * 0.75;
  
  const glassMaterial = createGlassMaterial();
  createSingleLeafGlassPanel(group, width, height, glassMaterial);
  
  // Create rubber seal around glass
  createSingleLeafRubberSeal(group, glassWidth, glassHeight, rubberColor);
  
  // Create window sash (inner frame around glass) - uses inside color
  createSingleLeafWindowSash(group, glassWidth, glassHeight, insideColor);
  
  // Add realistic window handle positioned on the inside face
  const frameDepth = 0.08;
  const handleX = width/2 - 0.25; // Position on right side of window
  const handleY = -height/4; // Lower third of window
  const handleZ = -frameDepth/2 - 0.02; // On inside face (negative Z)
  
  addRealisticWindowHandle(group, handleX, handleY, handleZ, baseColor);
  
  console.log("Single leaf window created with inside view, properly positioned handle, and correct color application");
}
