
import * as THREE from 'three';

// Create the exact profile shape from the technical drawing
export function createTechnicalProfileShape(): THREE.Shape {
  console.log("Creating technical profile shape from detailed technical drawing");
  
  const shape = new THREE.Shape();
  
  // Scale factor to convert from mm to Three.js units (assuming drawing is in mm)
  const scale = 0.001; // 1mm = 0.001 units
  
  // Based on the technical drawing analysis:
  // Total width appears to be approximately 120mm
  // Total height appears to be approximately 80mm
  const totalWidth = 120 * scale;
  const totalHeight = 80 * scale;
  
  // Create the outer boundary following the technical drawing outline
  shape.moveTo(0, 0);
  
  // Bottom edge with drainage channels
  shape.lineTo(8 * scale, 0);
  shape.lineTo(8 * scale, 3 * scale);
  shape.lineTo(15 * scale, 3 * scale);
  shape.lineTo(15 * scale, 0);
  shape.lineTo(45 * scale, 0);
  shape.lineTo(45 * scale, 3 * scale);
  shape.lineTo(52 * scale, 3 * scale);
  shape.lineTo(52 * scale, 0);
  shape.lineTo(totalWidth, 0);
  
  // Right edge with stepped profile
  shape.lineTo(totalWidth, 12 * scale);
  shape.lineTo((totalWidth - 8 * scale), 12 * scale);
  shape.lineTo((totalWidth - 8 * scale), 20 * scale);
  shape.lineTo(totalWidth, 20 * scale);
  shape.lineTo(totalWidth, 35 * scale);
  shape.lineTo((totalWidth - 6 * scale), 35 * scale);
  shape.lineTo((totalWidth - 6 * scale), 45 * scale);
  shape.lineTo(totalWidth, 45 * scale);
  shape.lineTo(totalWidth, totalHeight);
  
  // Top edge
  shape.lineTo(8 * scale, totalHeight);
  shape.lineTo(8 * scale, (totalHeight - 12 * scale));
  shape.lineTo(0, (totalHeight - 12 * scale));
  
  // Left edge back to start
  shape.lineTo(0, 0);
  
  // Add internal chambers as holes based on the technical drawing
  addTechnicalChambers(shape, totalWidth, totalHeight, scale);
  
  console.log(`Profile created with dimensions: ${totalWidth}x${totalHeight}`);
  return shape;
}

function addTechnicalChambers(shape: THREE.Shape, width: number, height: number, scale: number): void {
  console.log("Adding technical chambers based on drawing specifications");
  
  // Main reinforcement chamber (left side)
  const chamber1 = new THREE.Path();
  const c1x = 12 * scale, c1y = 15 * scale, c1w = 20 * scale, c1h = 45 * scale;
  chamber1.moveTo(c1x, c1y);
  chamber1.lineTo(c1x + c1w, c1y);
  chamber1.lineTo(c1x + c1w, c1y + c1h);
  chamber1.lineTo(c1x, c1y + c1h);
  chamber1.lineTo(c1x, c1y);
  shape.holes.push(chamber1);
  
  // Central chamber (main structural cavity)
  const chamber2 = new THREE.Path();
  const c2x = 40 * scale, c2y = 8 * scale, c2w = 25 * scale, c2h = 55 * scale;
  chamber2.moveTo(c2x, c2y);
  chamber2.lineTo(c2x + c2w, c2y);
  chamber2.lineTo(c2x + c2w, c2y + c2h);
  chamber2.lineTo(c2x, c2y + c2h);
  chamber2.lineTo(c2x, c2y);
  shape.holes.push(chamber2);
  
  // Right reinforcement chamber
  const chamber3 = new THREE.Path();
  const c3x = 75 * scale, c3y = 15 * scale, c3w = 20 * scale, c3h = 45 * scale;
  chamber3.moveTo(c3x, c3y);
  chamber3.lineTo(c3x + c3w, c3y);
  chamber3.lineTo(c3x + c3w, c3y + c3h);
  chamber3.lineTo(c3x, c3y + c3h);
  chamber3.lineTo(c3x, c3y);
  shape.holes.push(chamber3);
  
  // Thermal break chambers (small upper chambers)
  const chamber4 = new THREE.Path();
  const c4x = 20 * scale, c4y = 65 * scale, c4w = 12 * scale, c4h = 10 * scale;
  chamber4.moveTo(c4x, c4y);
  chamber4.lineTo(c4x + c4w, c4y);
  chamber4.lineTo(c4x + c4w, c4y + c4h);
  chamber4.lineTo(c4x, c4y + c4h);
  chamber4.lineTo(c4x, c4y);
  shape.holes.push(chamber4);
  
  const chamber5 = new THREE.Path();
  const c5x = 88 * scale, c5y = 65 * scale, c5w = 12 * scale, c5h = 10 * scale;
  chamber5.moveTo(c5x, c5y);
  chamber5.lineTo(c5x + c5w, c5y);
  chamber5.lineTo(c5x + c5w, c5y + c5h);
  chamber5.lineTo(c5x, c5y + c5h);
  chamber5.lineTo(c5x, c5y);
  shape.holes.push(chamber5);
  
  // Drainage chambers (bottom)
  const drainChamber1 = new THREE.Path();
  const d1x = 20 * scale, d1y = 5 * scale, d1w = 15 * scale, d1h = 8 * scale;
  drainChamber1.moveTo(d1x, d1y);
  drainChamber1.lineTo(d1x + d1w, d1y);
  drainChamber1.lineTo(d1x + d1w, d1y + d1h);
  drainChamber1.lineTo(d1x, d1y + d1h);
  drainChamber1.lineTo(d1x, d1y);
  shape.holes.push(drainChamber1);
  
  const drainChamber2 = new THREE.Path();
  const d2x = 85 * scale, d2y = 5 * scale, d2w = 15 * scale, d2h = 8 * scale;
  drainChamber2.moveTo(d2x, d2y);
  drainChamber2.lineTo(d2x + d2w, d2y);
  drainChamber2.lineTo(d2x + d2w, d2y + d2h);
  drainChamber2.lineTo(d2x, d2y + d2h);
  drainChamber2.lineTo(d2x, d2y);
  shape.holes.push(drainChamber2);
  
  console.log(`Added ${shape.holes.length} chambers to profile`);
}

export function createProfileMaterials(
  baseColorHex: string,
  outsideColorHex: string,
  insideColorHex: string
) {
  console.log("Creating profile materials with proper PBR properties");
  
  const baseMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(baseColorHex),
    roughness: 0.3,
    metalness: 0.1,
    envMapIntensity: 0.5
  });
  
  const outsideMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(outsideColorHex),
    roughness: 0.2,
    metalness: 0.05,
    envMapIntensity: 0.6
  });
  
  const insideMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(insideColorHex),
    roughness: 0.4,
    metalness: 0.1,
    envMapIntensity: 0.4
  });

  return { baseMaterial, outsideMaterial, insideMaterial };
}
