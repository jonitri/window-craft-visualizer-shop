
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
    imageUrl: '/lovable-uploads/9251d6ee-801d-4c7e-a63c-f40a315b2366.png',
    images: [
      '/lovable-uploads/9251d6ee-801d-4c7e-a63c-f40a315b2366.png',
      '/lovable-uploads/c3f5718f-3f42-43f4-af8e-5638d87c3de9.png',
      '/lovable-uploads/d3148200-17a1-4156-9545-9dc09fda85e4.png',
      '/lovable-uploads/5dc9cf40-442a-47e8-bf43-4b449d214e58.png',
      '/lovable-uploads/51b07477-453d-480b-8a5b-c2a0428d3891.png',
      '/lovable-uploads/7305db7d-bb8f-449b-b1e4-7505647384f5.png',
      '/lovable-uploads/151335ed-04e7-48e6-9077-f01474b3bcaf.png',
      '/lovable-uploads/eda5a50e-17ce-4c58-802d-198bacec1500.png',
      '/lovable-uploads/83bff046-9e09-4512-9843-0ab79f8d24c9.png',
      '/lovable-uploads/fcb42c92-2828-482d-adaf-a4480faad48f.png'
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
    imageUrl: '/lovable-uploads/bluevolution-92-main.jpg',
    images: [
      '/lovable-uploads/bluevolution-92-main.jpg',
      '/lovable-uploads/bluevolution-92-slide.gif',
      '/lovable-uploads/bluevolution-92-straight.gif',
      '/lovable-uploads/bluevolution-92-free.gif'
    ],
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
    imageUrl: '/lovable-uploads/evolution-drive-hst.jpg',
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
    imageUrl: '/lovable-uploads/evolution-drive-plus.jpg',
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
    imageUrl: '/lovable-uploads/evolution-drive-sf.jpg',
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
    imageUrl: '/lovable-uploads/evolution-drive-60.jpg',
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
    imageUrl: '/lovable-uploads/9251d6ee-801d-4c7e-a63c-f40a315b2366.png',
    images: [
      '/lovable-uploads/9251d6ee-801d-4c7e-a63c-f40a315b2366.png',
      '/lovable-uploads/c3f5718f-3f42-43f4-af8e-5638d87c3de9.png',
      '/lovable-uploads/d3148200-17a1-4156-9545-9dc09fda85e4.png',
      '/lovable-uploads/5dc9cf40-442a-47e8-bf43-4b449d214e58.png',
      '/lovable-uploads/51b07477-453d-480b-8a5b-c2a0428d3891.png',
      '/lovable-uploads/7305db7d-bb8f-449b-b1e4-7505647384f5.png',
      '/lovable-uploads/151335ed-04e7-48e6-9077-f01474b3bcaf.png',
      '/lovable-uploads/eda5a50e-17ce-4c58-802d-198bacec1500.png',
      '/lovable-uploads/83bff046-9e09-4512-9843-0ab79f8d24c9.png',
      '/lovable-uploads/fcb42c92-2828-482d-adaf-a4480faad48f.png'
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
    imageUrl: '/lovable-uploads/bluevolution-92-main.jpg',
    images: [
      '/lovable-uploads/bluevolution-92-main.jpg',
      '/lovable-uploads/bluevolution-92-slide.gif',
      '/lovable-uploads/bluevolution-92-straight.gif',
      '/lovable-uploads/bluevolution-92-free.gif'
    ],
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
    imageUrl: '/lovable-uploads/evolution-drive-hst.jpg',
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
    imageUrl: '/lovable-uploads/evolution-drive-plus.jpg',
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
    imageUrl: '/lovable-uploads/evolution-drive-sf.jpg',
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
    imageUrl: '/lovable-uploads/evolution-drive-60.jpg',
    basePrice: 450
  }
];
