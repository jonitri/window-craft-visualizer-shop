
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

  // 3) Add glass, rubber seal, and sash (all at the same "front" Z plane = +frameDepth/2)
  addGlass(group, width, height, frameDepth);
  
  if (rubberColorObject) {
    addRubberSeal(group, width, height, frameDepth, rubberColorObject.hex);
  }
  
  addWindowSash(group, width, height, frameDepth, insideColorObject.hex);

  // 4) Place a single Hoppe-style handle on the inside face (Z = -frameDepth/2)
  //    Let's put it about 25 cm from the top and 15 cm from the right edge:
  const handleX = width / 2 - 0.15;               // 15 cm from right
  const handleY = height / 2 - 0.25;              // 25 cm down from top
  const handleZ = -frameDepth / 2 - 0.001;        // flush on the inside face, just behind it

  addHoppeHandle(group, handleX, handleY, handleZ);

  console.log("Single leaf window created with single-source approach - no overlapping geometry, consistent materials, and properly positioned handle");
}
