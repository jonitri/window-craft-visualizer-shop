
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
  
  // Add realistic window handle
  addRealisticWindowHandle(group, width/2 - 0.15, -height/4, 0.05, baseColor);
  
  console.log("Single leaf window created with proper color application and rubber seal");
}
