
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
  // 1) Frame parameters - all depths/thicknesses must be consistent
  const frameThickness = 0.1; // 10 cm profile
  const frameDepth     = 0.08; // 8 cm "in→out" extrusion

  // 2) Build the main frame structure with proper color materials
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

  // 3) Calculate Z positions for proper layering
  const frameBack = -frameDepth / 2;       // Back of frame
  const frameCenter = 0;                   // Center of frame depth
  const frameFront = frameDepth / 2;       // Front of frame
  
  // 4) Add glass at the center position
  const openingWidth = width - frameThickness * 2;
  const openingHeight = height - frameThickness * 2;
  const glassWidth = openingWidth * 0.8;
  const glassHeight = openingHeight * 0.8;
  
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.05,
    transmission: 0.95,
    roughness: 0.0,
    metalness: 0.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.0,
    side: THREE.DoubleSide,
    ior: 1.52,
    thickness: 0.003,
    depthWrite: true
  });
  
  const glassGeometry = new THREE.PlaneGeometry(glassWidth, glassHeight);
  const glassMesh = new THREE.Mesh(glassGeometry, glassMaterial);
  glassMesh.position.set(0, 0, frameCenter);
  glassMesh.renderOrder = 1000;
  group.add(glassMesh);

  // 5) Add rubber seal around glass (if specified)
  if (rubberColorObject) {
    addRubberSeal(group, width, height, frameDepth, rubberColorObject.hex);
  }
  
  // 6) Add window sash (inner frame) using inside color
  addWindowSash(group, width, height, frameDepth, insideColorObject.hex);

  // 7) Create inside surface panel (visible from outside looking in)
  const insidePanelGeo = new THREE.PlaneGeometry(openingWidth, openingHeight);
  const insidePanelMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(insideColorObject.hex),
    roughness: 0.4,
    metalness: 0.1,
    side: THREE.FrontSide
  });
  const insidePanelMesh = new THREE.Mesh(insidePanelGeo, insidePanelMat);
  insidePanelMesh.position.set(0, 0, frameBack - 0.001);
  insidePanelMesh.renderOrder = 1;
  group.add(insidePanelMesh);

  // 8) Create outside surface panel (visible from inside looking out)
  const outsidePanelGeo = new THREE.PlaneGeometry(openingWidth, openingHeight);
  const outsidePanelMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(outsideColorObject.hex),
    roughness: 0.4,
    metalness: 0.1,
    side: THREE.BackSide
  });
  const outsidePanelMesh = new THREE.Mesh(outsidePanelGeo, outsidePanelMat);
  outsidePanelMesh.position.set(0, 0, frameFront + 0.001);
  outsidePanelMesh.renderOrder = 2;
  group.add(outsidePanelMesh);

  // 9) Position handle properly behind the sash
  const sashDepth = 0.025;
  const sashFrontZ = frameDepth / 2 + 0.001;
  const sashBackZ = sashFrontZ - sashDepth;
  const handleZ = sashBackZ - 0.002;

  // Optimized handle positioning
  const handleX = width / 2 - 0.12;    // 12 cm from right edge
  const handleY = height / 2 - 0.08;   // 8 cm from top

  addHoppeHandle(group, handleX, handleY, handleZ);

  console.log("Single leaf window created with proper inside/outside color separation and layering");
}
