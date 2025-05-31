
import * as THREE from 'three';

export function createGlassPane(
  group: THREE.Group,
  width: number,
  height: number,
  frameThickness: number,
  glassMaterial: THREE.Material
): void {
  const panelWidth = width - frameThickness * 2;
  const panelHeight = height - frameThickness * 2;
  const glassWidth = panelWidth * 0.75;
  const glassHeight = panelHeight * 0.75;
  
  const glassGeometry = new THREE.PlaneGeometry(glassWidth, glassHeight);
  const glassPane = new THREE.Mesh(glassGeometry, glassMaterial);
  glassPane.position.set(0, 0, 0);
  glassPane.renderOrder = 1000; // Ensure proper transparency rendering
  group.add(glassPane);
}
