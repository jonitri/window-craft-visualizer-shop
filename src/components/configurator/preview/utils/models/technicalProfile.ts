
import * as THREE from 'three';

// Create the exact profile shape from the technical drawing
export function createTechnicalProfileShape(): THREE.Shape {
  console.log("Creating technical profile shape from detailed drawing");
  
  const shape = new THREE.Shape();
  
  // Based on the technical drawing, this appears to be a multi-chamber PVC profile
  // Main dimensions from drawing (scaled for 3D scene)
  const totalWidth = 0.12;   // Total profile width
  const totalHeight = 0.08;  // Total profile height
  
  // Start creating the outer boundary
  shape.moveTo(0, 0);
  
  // Outer profile - complex shape with multiple chambers
  // Bottom edge
  shape.lineTo(totalWidth, 0);
  
  // Right edge with step details
  shape.lineTo(totalWidth, 0.015);
  shape.lineTo(totalWidth - 0.01, 0.015);
  shape.lineTo(totalWidth - 0.01, 0.03);
  shape.lineTo(totalWidth, 0.03);
  shape.lineTo(totalWidth, totalHeight - 0.02);
  shape.lineTo(totalWidth - 0.008, totalHeight - 0.02);
  shape.lineTo(totalWidth - 0.008, totalHeight);
  
  // Top edge
  shape.lineTo(0.008, totalHeight);
  shape.lineTo(0.008, totalHeight - 0.02);
  shape.lineTo(0, totalHeight - 0.02);
  
  // Left edge back to start
  shape.lineTo(0, 0);
  
  // Add internal chambers as holes
  addInternalChambers(shape, totalWidth, totalHeight);
  
  return shape;
}

function addInternalChambers(shape: THREE.Shape, width: number, height: number): void {
  // Chamber 1 - Left reinforcement chamber
  const chamber1 = new THREE.Path();
  const c1x = 0.01, c1y = 0.01, c1w = 0.025, c1h = height - 0.02;
  chamber1.moveTo(c1x, c1y);
  chamber1.lineTo(c1x + c1w, c1y);
  chamber1.lineTo(c1x + c1w, c1y + c1h);
  chamber1.lineTo(c1x, c1y + c1h);
  chamber1.lineTo(c1x, c1y);
  shape.holes.push(chamber1);
  
  // Chamber 2 - Center main chamber
  const chamber2 = new THREE.Path();
  const c2x = 0.04, c2y = 0.015, c2w = 0.04, c2h = height - 0.03;
  chamber2.moveTo(c2x, c2y);
  chamber2.lineTo(c2x + c2w, c2y);
  chamber2.lineTo(c2x + c2w, c2y + c2h);
  chamber2.lineTo(c2x, c2y + c2h);
  chamber2.lineTo(c2x, c2y);
  shape.holes.push(chamber2);
  
  // Chamber 3 - Right reinforcement chamber
  const chamber3 = new THREE.Path();
  const c3x = width - 0.035, c3y = 0.01, c3w = 0.025, c3h = height - 0.02;
  chamber3.moveTo(c3x, c3y);
  chamber3.lineTo(c3x + c3w, c3y);
  chamber3.lineTo(c3x + c3w, c3y + c3h);
  chamber3.lineTo(c3x, c3y + c3h);
  chamber3.lineTo(c3x, c3y);
  shape.holes.push(chamber3);
  
  // Additional smaller chambers for thermal breaks
  const chamber4 = new THREE.Path();
  const c4x = 0.025, c4y = height - 0.025, c4w = 0.015, c4h = 0.015;
  chamber4.moveTo(c4x, c4y);
  chamber4.lineTo(c4x + c4w, c4y);
  chamber4.lineTo(c4x + c4w, c4y + c4h);
  chamber4.lineTo(c4x, c4y + c4h);
  chamber4.lineTo(c4x, c4y);
  shape.holes.push(chamber4);
  
  const chamber5 = new THREE.Path();
  const c5x = width - 0.04, c5y = height - 0.025, c5w = 0.015, c5h = 0.015;
  chamber5.moveTo(c5x, c5y);
  chamber5.lineTo(c5x + c5w, c5y);
  chamber5.lineTo(c5x + c5w, c5y + c5h);
  chamber5.lineTo(c5x, c5y + c5h);
  chamber5.lineTo(c5x, c5y);
  shape.holes.push(chamber5);
}

export function createProfileMaterials(
  baseColorHex: string,
  outsideColorHex: string,
  insideColorHex: string
) {
  const baseMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(baseColorHex),
    roughness: 0.4,
    metalness: 0.2
  });
  
  const outsideMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(outsideColorHex),
    roughness: 0.3,
    metalness: 0.1
  });
  
  const insideMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(insideColorHex),
    roughness: 0.3,
    metalness: 0.1
  });

  return { baseMaterial, outsideMaterial, insideMaterial };
}
