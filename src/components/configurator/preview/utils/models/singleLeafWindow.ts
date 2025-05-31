
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

  // 3) Add OUTSIDE FILL PANEL - eliminates see-through gap on front face
  addOutsideFillPanel(group, width, height, frameThickness, frameDepth, outsideColorObject.hex);

  // 4) Add glass, rubber seal, and sash (all at carefully calculated Z positions)
  addGlass(group, width, height, frameDepth);
  
  if (rubberColorObject) {
    addRubberSeal(group, width, height, frameDepth, rubberColorObject.hex);
  }
  
  addWindowSash(group, width, height, frameDepth, insideColorObject.hex);

  // 5) Add INSIDE FILL PANEL - eliminates see-through gap on back face
  addInsideFillPanel(group, width, height, frameThickness, frameDepth, insideColorObject.hex);

  // 6) Position handle BEHIND the sash for proper layering
  const sashDepth = 0.025; // Must match the sashDepth from glassAndSeal.ts
  const sashFrontZ = frameDepth / 2 + 0.001; // Where sash front sits
  const sashBackZ = sashFrontZ - sashDepth;  // Where sash back sits
  const handleZ = sashBackZ - 0.002;         // Place handle behind sash back

  // Optimized handle positioning for better realism
  const handleX = width / 2 - 0.12;    // 12 cm from right edge
  const handleY = height / 2 - 0.08;   // 8 cm from top

  addHoppeHandle(group, handleX, handleY, handleZ);

  console.log("Single leaf window created with solid fill panels and properly positioned handle");
}

// Add outside fill panel to eliminate front-face transparency
function addOutsideFillPanel(
  group: THREE.Group,
  totalWidth: number,
  totalHeight: number,
  frameThickness: number,
  frameDepth: number,
  outsideColorHex: string
): void {
  const openingWidth = totalWidth - frameThickness * 2;
  const openingHeight = totalHeight - frameThickness * 2;
  const fillDepth = 0.001; // Very thin to avoid z-fighting

  const outsideFillGeo = new THREE.BoxGeometry(openingWidth, openingHeight, fillDepth);
  const outsideFillMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(outsideColorHex),
    roughness: 0.4,
    metalness: 0.1
  });
  const outsideFillMesh = new THREE.Mesh(outsideFillGeo, outsideFillMat);

  // Position so front face aligns with sash front
  const sashFrontZ = frameDepth / 2 + 0.001;
  outsideFillMesh.position.set(
    0,
    0,
    sashFrontZ - fillDepth / 2
  );
  outsideFillMesh.renderOrder = 3; // Between handle and sash
  group.add(outsideFillMesh);
}

// Add inside fill panel to eliminate back-face transparency
function addInsideFillPanel(
  group: THREE.Group,
  totalWidth: number,
  totalHeight: number,
  frameThickness: number,
  frameDepth: number,
  insideColorHex: string
): void {
  const openingWidth = totalWidth - frameThickness * 2;
  const openingHeight = totalHeight - frameThickness * 2;
  const fillDepth = 0.001; // Very thin to avoid z-fighting

  const insideFillGeo = new THREE.BoxGeometry(openingWidth, openingHeight, fillDepth);
  const insideFillMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(insideColorHex),
    roughness: 0.4,
    metalness: 0.1
  });
  const insideFillMesh = new THREE.Mesh(insideFillGeo, insideFillMat);

  // Calculate sash back position and place fill panel there
  const sashDepth = 0.025; // Must match sashDepth from glassAndSeal.ts
  const sashFrontZ = frameDepth / 2 + 0.001;
  const sashBackZ = sashFrontZ - sashDepth;
  
  insideFillMesh.position.set(
    0,
    0,
    sashBackZ + fillDepth / 2
  );
  insideFillMesh.renderOrder = 1; // Behind everything else
  group.add(insideFillMesh);
}
