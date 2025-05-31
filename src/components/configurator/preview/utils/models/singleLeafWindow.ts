
import * as THREE from 'three';
import { ColorOption } from '@/data/products';
import { createSingleBoxFrame } from './createSingleBoxFrame';
import { addGlass, addRubberSeal, addWindowSash } from './glassAndSeal';
import { addHoppeHandle } from './hoppeHandle';

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
  // 1) Choose the values you want (all depths/thicknesses must match)
  const frameThickness = 0.1; // 10 cm profile
  const frameDepth     = 0.08; // 8 cm "in→out" extrusion

  // 2) Build the frame (four thin boxes, all sharing the same 6-material array)
  createSingleBoxFrame(
    group,
    width,
    height,
    frameThickness,
    frameDepth,
    baseColorObject.hex,
    outsideColorObject.hex,
    insideColorObject.hex
  );

  // 3) Add glass, rubber seal, and sash (all at carefully calculated Z positions)
  addGlass(group, width, height, frameDepth);
  
  if (rubberColorObject) {
    addRubberSeal(group, width, height, frameDepth, rubberColorObject.hex);
  }
  
  addWindowSash(group, width, height, frameDepth, insideColorObject.hex);

  // 4) Place a single Hoppe-style handle with optimized positioning:
  //    - 8 cm from the top (more realistic for typical window heights)
  //    - 12 cm from the right edge (better proportional spacing)
  //    - Enhanced scale for improved visibility and realism
  const handleX = width / 2 - 0.12;               // 12 cm from right (was 15 cm)
  const handleY = height / 2 - 0.08;              // 8 cm down from top (was 10 cm)
  const handleZ = -frameDepth / 2 - 0.003;        // slightly further behind for better layering

  addHoppeHandle(group, handleX, handleY, handleZ);

  console.log("Single leaf window created with optimized handle positioning and enhanced component layering");
}
