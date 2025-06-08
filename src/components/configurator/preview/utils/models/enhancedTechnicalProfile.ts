
import * as THREE from 'three';

// Enhanced technical profile based on professional window systems
export function createEnhancedTechnicalProfile(): THREE.Shape {
  console.log("Creating enhanced technical profile inspired by professional systems");
  
  const shape = new THREE.Shape();
  
  // Scale: 1 unit = 1mm for precise technical accuracy
  const scale = 0.001;
  
  // Professional PVC window profile dimensions (based on Salamander-style systems)
  const totalWidth = 82 * scale;   // 82mm total width
  const totalHeight = 74 * scale;  // 74mm total height
  
  // Create the sophisticated outer profile shape
  shape.moveTo(0, 0);
  
  // Bottom edge with precise drainage channels
  shape.lineTo(6 * scale, 0);
  shape.lineTo(6 * scale, 4 * scale);
  shape.lineTo(12 * scale, 4 * scale);
  shape.lineTo(12 * scale, 0);
  shape.lineTo(28 * scale, 0);
  shape.lineTo(28 * scale, 3 * scale);
  shape.lineTo(35 * scale, 3 * scale);
  shape.lineTo(35 * scale, 0);
  shape.lineTo(54 * scale, 0);
  shape.lineTo(54 * scale, 4 * scale);
  shape.lineTo(60 * scale, 4 * scale);
  shape.lineTo(60 * scale, 0);
  shape.lineTo(totalWidth, 0);
  
  // Right edge with thermal break design
  shape.lineTo(totalWidth, 8 * scale);
  shape.lineTo((totalWidth - 6 * scale), 8 * scale);
  shape.lineTo((totalWidth - 6 * scale), 15 * scale);
  shape.lineTo(totalWidth, 15 * scale);
  shape.lineTo(totalWidth, 28 * scale);
  shape.lineTo((totalWidth - 4 * scale), 28 * scale);
  shape.lineTo((totalWidth - 4 * scale), 35 * scale);
  shape.lineTo(totalWidth, 35 * scale);
  shape.lineTo(totalWidth, 48 * scale);
  shape.lineTo((totalWidth - 6 * scale), 48 * scale);
  shape.lineTo((totalWidth - 6 * scale), 55 * scale);
  shape.lineTo(totalWidth, 55 * scale);
  shape.lineTo(totalWidth, totalHeight);
  
  // Top edge with glazing bead integration
  shape.lineTo(6 * scale, totalHeight);
  shape.lineTo(6 * scale, (totalHeight - 8 * scale));
  shape.lineTo(0, (totalHeight - 8 * scale));
  
  // Left edge back to start
  shape.lineTo(0, 0);
  
  // Add professional multi-chamber system
  addProfessionalChambers(shape, totalWidth, totalHeight, scale);
  
  console.log(`Enhanced profile created: ${(totalWidth/scale).toFixed(0)}mm x ${(totalHeight/scale).toFixed(0)}mm`);
  return shape;
}

function addProfessionalChambers(shape: THREE.Shape, width: number, height: number, scale: number): void {
  console.log("Adding professional multi-chamber system");
  
  // Main structural chambers (7-chamber system)
  const chambers = [
    // Left reinforcement chamber
    { x: 8 * scale, y: 12 * scale, w: 16 * scale, h: 48 * scale },
    // Central thermal break chamber
    { x: 28 * scale, y: 8 * scale, w: 18 * scale, h: 55 * scale },
    // Right reinforcement chamber  
    { x: 50 * scale, y: 12 * scale, w: 16 * scale, h: 48 * scale },
    // Upper thermal chambers
    { x: 12 * scale, y: 62 * scale, w: 10 * scale, h: 8 * scale },
    { x: 48 * scale, y: 62 * scale, w: 10 * scale, h: 8 * scale },
    // Lower drainage chambers
    { x: 16 * scale, y: 6 * scale, w: 8 * scale, h: 8 * scale },
    { x: 42 * scale, y: 6 * scale, w: 8 * scale, h: 8 * scale }
  ];
  
  chambers.forEach((chamber, index) => {
    const chamberPath = new THREE.Path();
    chamberPath.moveTo(chamber.x, chamber.y);
    chamberPath.lineTo(chamber.x + chamber.w, chamber.y);
    chamberPath.lineTo(chamber.x + chamber.w, chamber.y + chamber.h);
    chamberPath.lineTo(chamber.x, chamber.y + chamber.h);
    chamberPath.lineTo(chamber.x, chamber.y);
    shape.holes.push(chamberPath);
  });
  
  console.log(`Added ${chambers.length} professional chambers`);
}

export function createEnhancedProfileMaterials(
  baseColorHex: string,
  outsideColorHex: string,
  insideColorHex: string
) {
  console.log("Creating enhanced profile materials with realistic PBR properties");
  
  // Enhanced PVC material properties
  const baseMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(baseColorHex),
    roughness: 0.25,
    metalness: 0.05,
    envMapIntensity: 0.4,
    bumpScale: 0.02
  });
  
  const outsideMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(outsideColorHex),
    roughness: 0.2,
    metalness: 0.03,
    envMapIntensity: 0.5,
    clearcoat: 0.1,
    clearcoatRoughness: 0.3
  });
  
  const insideMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(insideColorHex),
    roughness: 0.3,
    metalness: 0.05,
    envMapIntensity: 0.3
  });

  return { baseMaterial, outsideMaterial, insideMaterial };
}
