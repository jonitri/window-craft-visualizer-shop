
import * as THREE from 'three';
import { ColorOption } from '@/data/products';
import { addRealisticWindowHandle } from './windowHandles';
import { 
  createGlassMaterial, 
  createTripleLeafGlassPanels, 
  createTripleLeafRubberSeal, 
  createGlassFrame 
} from './tripleLeafGlass';
import { 
  createTripleLeafMainFrame, 
  createLeafFrame 
} from './tripleLeafFrame';
import { createTripleLeafDividers } from './tripleLeafComponents';

export function createTripleLeafWindow(
  group: THREE.Group, 
  width: number, 
  height: number, 
  texture: THREE.Texture,
  baseColorObject: ColorOption,
  outsideColorObject: ColorOption,
  insideColorObject: ColorOption,
  rubberColorObject?: ColorOption
): void {
  const leafWidth = width * 0.3;
  const leafHeight = height * 0.7;
  const glassWidth = leafWidth * 0.8;
  const glassHeight = leafHeight * 0.85;
  
  // Create realistic glass material and panels
  const glassMaterial = createGlassMaterial();
  createTripleLeafGlassPanels(group, width, height, glassMaterial);
  
  // Colors
  const outsideColor = new THREE.Color(outsideColorObject.hex);
  const insideColor = new THREE.Color(insideColorObject.hex);
  const baseColor = new THREE.Color(baseColorObject.hex);
  const rubberColor = rubberColorObject ? new THREE.Color(rubberColorObject.hex) : new THREE.Color('#000000');
  
  // Create main frame with proper color separation
  createTripleLeafMainFrame(group, width, height, baseColor, outsideColor, insideColor);
  
  // Create sash materials
  const outsideSashMaterial = new THREE.MeshStandardMaterial({
    color: outsideColor,
    roughness: 0.3,
    metalness: 0.1
  });
  
  const insideSashMaterial = new THREE.MeshStandardMaterial({
    color: insideColor,
    roughness: 0.3,
    metalness: 0.1
  });
  
  // Create frames for all three leaves
  createLeafFrame(group, leafWidth, leafHeight, -width/3, outsideSashMaterial, insideSashMaterial);
  createLeafFrame(group, leafWidth, leafHeight, 0, outsideSashMaterial, insideSashMaterial);
  createLeafFrame(group, leafWidth, leafHeight, width/3, outsideSashMaterial, insideSashMaterial);
  
  // Create inner frames around glass
  createGlassFrame(group, glassWidth, glassHeight, -width/3, insideSashMaterial);
  createGlassFrame(group, glassWidth, glassHeight, 0, insideSashMaterial);
  createGlassFrame(group, glassWidth, glassHeight, width/3, insideSashMaterial);
  
  // Create rubber seals around glass
  createTripleLeafRubberSeal(group, glassWidth, glassHeight, -width/3, rubberColor);
  createTripleLeafRubberSeal(group, glassWidth, glassHeight, 0, rubberColor);
  createTripleLeafRubberSeal(group, glassWidth, glassHeight, width/3, rubberColor);
  
  // Create dividers (mullions) with base color
  createTripleLeafDividers(group, width, height, baseColor);
  
  // Add realistic handles
  addRealisticWindowHandle(group, -width/3 + glassWidth/2 + 0.05, -glassHeight/4, 0.08, baseColor);
  addRealisticWindowHandle(group, width/3 - glassWidth/2 - 0.05, -glassHeight/4, 0.08, baseColor);
}
