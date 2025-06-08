
import * as THREE from 'three';
import { createProfessionalWindow } from './professionalWindow';

export function createSingleLeafWindow(
  windowGroup: THREE.Group,
  windowWidth: number,
  windowHeight: number,
  texture: THREE.Texture,
  baseColorObject: any,
  outsideColorObject: any,
  insideColorObject: any,
  rubberColorObject: any
): void {
  console.log("Creating single leaf window with professional Salamander-inspired design");
  
  // Use the enhanced professional window system
  createProfessionalWindow(
    windowGroup,
    windowWidth,
    windowHeight,
    texture,
    baseColorObject,
    outsideColorObject,
    insideColorObject,
    rubberColorObject
  );
  
  console.log("Professional single leaf window completed");
}
