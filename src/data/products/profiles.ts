import { Profile } from './types';

// Window profiles
export const windowProfiles: Profile[] = [
  {
    id: 'greenEvolution-free',
    name: 'greenEvolution free',
    description: 'Sustainable and eco-friendly window system with exceptional thermal insulation.',
    features: [
      'Highly sustainable materials',
      'Optimal thermal insulation',
      'Eco-friendly production',
      'Energy-efficient design'
    ],
    imageUrl: '/lovable-uploads/34ca4ce9-f34e-497b-8f27-538240aa4f7e.png',
    images: [
      '/lovable-uploads/34ca4ce9-f34e-497b-8f27-538240aa4f7e.png',
      '/lovable-uploads/505a4c89-23e0-4113-ad03-b153f0863770.png',
      '/lovable-uploads/883765f6-26d4-4928-a4e1-d14babcf15aa.png',
      '/lovable-uploads/fba68147-76b8-4e55-90ae-80af2cc7ee25.png'
    ],
    basePrice: 250
  },
  {
    id: 'bluEvolution-92',
    name: 'bluEvolution 92',
    description: 'Premium window system with outstanding insulation properties for maximum energy efficiency.',
    features: [
      '92mm profile depth',
      'Triple glazing capability',
      '3 gasket sealing system',
      'U-value: 0.7 W/m²K'
    ],
    imageUrl: 'https://salamander-windows.com/wp-content/uploads/2022/06/Salamander-Windows-bluEvolution-facade.jpg',
    basePrice: 350
  },
  {
    id: 'evolutionDrive-HST',
    name: 'evolutionDrive HST',
    description: 'Premium lift-and-slide door system for large openings with smooth operation.',
    features: [
      'Lift-and-slide mechanism',
      'Large glass surfaces',
      'Barrier-free threshold',
      'Excellent thermal insulation'
    ],
    imageUrl: 'https://salamander-windows.com/wp-content/uploads/2022/06/evolutionDrive-HST-detail-United-Windows.jpg',
    basePrice: 400
  },
  {
    id: 'evolutionDrive-Plus',
    name: 'evolutionDrive Plus+',
    description: 'Enhanced sliding door system with premium features for comfort and efficiency.',
    features: [
      'Enhanced thermal breaks',
      'Multi-point locking system',
      'Smooth sliding operation',
      'Customizable configurations'
    ],
    imageUrl: 'https://salamander-windows.com/wp-content/uploads/2023/03/Salamander-Windows-evolutionDrive-HST-Villa-M.jpg',
    basePrice: 450
  },
  {
    id: 'evolutionDrive-SF',
    name: 'evolutionDrive SF',
    description: 'Slim-framed sliding door system for modern architectural designs.',
    features: [
      'Slim frame profile',
      'Maximized glass area',
      'Contemporary design',
      'Excellent weather resistance'
    ],
    imageUrl: 'https://salamander-windows.com/wp-content/uploads/2022/06/Salamander-Windows-Fassade-mit-evolutionDrive-SF.jpg',
    basePrice: 500
  },
  {
    id: 'evolutionDrive-60',
    name: 'evolutionDrive 60',
    description: 'Cost-effective sliding system with reliable performance and versatility.',
    features: [
      '60mm frame depth',
      'Double glazing capability',
      'Economical choice',
      'Various opening options'
    ],
    imageUrl: 'https://salamander-windows.com/wp-content/uploads/2022/06/Front-Door.jpg',
    basePrice: 300
  }
];

// Door profiles (using the same profiles as windows in this case)
export const doorProfiles: Profile[] = [
  {
    id: 'greenEvolution-free',
    name: 'greenEvolution free',
    description: 'Sustainable and eco-friendly door system with exceptional thermal insulation.',
    features: [
      'Highly sustainable materials',
      'Optimal thermal insulation',
      'Eco-friendly production',
      'Energy-efficient design'
    ],
    imageUrl: '/lovable-uploads/34ca4ce9-f34e-497b-8f27-538240aa4f7e.png',
    images: [
      '/lovable-uploads/34ca4ce9-f34e-497b-8f27-538240aa4f7e.png',
      '/lovable-uploads/505a4c89-23e0-4113-ad03-b153f0863770.png',
      '/lovable-uploads/883765f6-26d4-4928-a4e1-d14babcf15aa.png',
      '/lovable-uploads/fba68147-76b8-4e55-90ae-80af2cc7ee25.png'
    ],
    basePrice: 350
  },
  {
    id: 'bluEvolution-92',
    name: 'bluEvolution 92',
    description: 'Premium door system with outstanding insulation properties for maximum energy efficiency.',
    features: [
      '92mm profile depth',
      'Triple glazing capability',
      '3 gasket sealing system',
      'U-value: 0.7 W/m²K'
    ],
    imageUrl: 'https://salamander-windows.com/wp-content/uploads/2022/06/Salamander-Windows-bluEvolution-facade.jpg',
    basePrice: 450
  },
  {
    id: 'evolutionDrive-HST',
    name: 'evolutionDrive HST',
    description: 'Premium lift-and-slide door system for large openings with smooth operation.',
    features: [
      'Lift-and-slide mechanism',
      'Large glass surfaces',
      'Barrier-free threshold',
      'Excellent thermal insulation'
    ],
    imageUrl: 'https://salamander-windows.com/wp-content/uploads/2022/06/evolutionDrive-HST-detail-United-Windows.jpg',
    basePrice: 600
  },
  {
    id: 'evolutionDrive-Plus',
    name: 'evolutionDrive Plus+',
    description: 'Enhanced sliding door system with premium features for comfort and efficiency.',
    features: [
      'Enhanced thermal breaks',
      'Multi-point locking system',
      'Smooth sliding operation',
      'Customizable configurations'
    ],
    imageUrl: 'https://salamander-windows.com/wp-content/uploads/2023/03/Salamander-Windows-evolutionDrive-HST-Villa-M.jpg',
    basePrice: 650
  },
  {
    id: 'evolutionDrive-SF',
    name: 'evolutionDrive SF',
    description: 'Slim-framed sliding door system for modern architectural designs.',
    features: [
      'Slim frame profile',
      'Maximized glass area',
      'Contemporary design',
      'Excellent weather resistance'
    ],
    imageUrl: 'https://salamander-windows.com/wp-content/uploads/2022/06/Salamander-Windows-Fassade-mit-evolutionDrive-SF.jpg',
    basePrice: 700
  },
  {
    id: 'evolutionDrive-60',
    name: 'evolutionDrive 60',
    description: 'Cost-effective sliding system with reliable performance and versatility.',
    features: [
      '60mm frame depth',
      'Double glazing capability',
      'Economical choice',
      'Various opening options'
    ],
    imageUrl: 'https://salamander-windows.com/wp-content/uploads/2022/06/Front-Door.jpg',
    basePrice: 450
  }
];
