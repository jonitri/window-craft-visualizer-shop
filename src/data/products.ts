
export interface Profile {
  id: string;
  name: string;
  description: string;
  features: string[];
  imageUrl: string;
  basePrice: number;
}

export interface GlazingOption {
  id: string;
  name: string;
  description: string;
  features: string[];
  imageUrl: string;
  priceModifier: number;
}

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  imageUrl: string;
  category: 'base' | 'outside' | 'inside' | 'rubber';
  priceModifier: number;
}

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
    imageUrl: 'https://salamander-windows.com/wp-content/uploads/2022/06/greenline-Detail-United-Windows.jpg',
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
    imageUrl: 'https://salamander-windows.com/wp-content/uploads/2022/06/greenline-Detail-United-Windows.jpg',
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

// Glazing options
export const glazingOptions: GlazingOption[] = [
  {
    id: 'glz-double',
    name: 'Double Glazing',
    description: 'Standard double glazing with good insulation properties.',
    features: [
      '24mm total thickness',
      'Argon filled',
      'Low-E coating',
      'U-value: 1.1 W/m²K'
    ],
    imageUrl: '/placeholder.svg',
    priceModifier: 0 // Base price
  },
  {
    id: 'glz-triple',
    name: 'Triple Glazing',
    description: 'Superior thermal and acoustic insulation.',
    features: [
      '44mm total thickness',
      'Krypton filled',
      'Double Low-E coating',
      'U-value: 0.7 W/m²K'
    ],
    imageUrl: '/placeholder.svg',
    priceModifier: 100
  },
  {
    id: 'glz-quad',
    name: '4 Glazing',
    description: 'Maximum insulation for extreme conditions and ultimate energy efficiency.',
    features: [
      '60mm total thickness',
      'Krypton and Argon filled',
      'Triple Low-E coating',
      'U-value: 0.5 W/m²K'
    ],
    imageUrl: '/placeholder.svg',
    priceModifier: 200
  }
];

// Base color options (main frame color)
export const baseColorOptions: ColorOption[] = [
  {
    id: 'col-white',
    name: 'White',
    hex: '#FFFFFF',
    imageUrl: '/placeholder.svg',
    category: 'base',
    priceModifier: 0 // Base price
  },
  {
    id: 'col-golden-oak',
    name: 'Golden Oak',
    hex: '#D4A76A',
    imageUrl: '/placeholder.svg',
    category: 'base',
    priceModifier: 100
  },
  {
    id: 'col-walnut',
    name: 'Walnut',
    hex: '#5C4033',
    imageUrl: '/placeholder.svg',
    category: 'base',
    priceModifier: 100
  },
  {
    id: 'col-black',
    name: 'Black',
    hex: '#1D1D1D',
    imageUrl: '/placeholder.svg',
    category: 'base',
    priceModifier: 100
  }
];

// Outside color options (Salamander colors)
export const outsideColorOptions: ColorOption[] = [
  {
    id: 'col-out-white',
    name: 'White',
    hex: '#FFFFFF',
    imageUrl: '/placeholder.svg',
    category: 'outside',
    priceModifier: 0
  },
  {
    id: 'col-out-cream-white',
    name: 'Cream White',
    hex: '#F5F5DC',
    imageUrl: '/placeholder.svg',
    category: 'outside',
    priceModifier: 50
  },
  {
    id: 'col-out-light-gray',
    name: 'Light Gray',
    hex: '#D3D3D3',
    imageUrl: '/placeholder.svg',
    category: 'outside',
    priceModifier: 50
  },
  {
    id: 'col-out-silver-gray',
    name: 'Silver Gray',
    hex: '#C0C0C0',
    imageUrl: '/placeholder.svg',
    category: 'outside',
    priceModifier: 50
  },
  {
    id: 'col-out-anthracite-gray',
    name: 'Anthracite Gray',
    hex: '#383E42',
    imageUrl: '/placeholder.svg',
    category: 'outside',
    priceModifier: 50
  },
  {
    id: 'col-out-green',
    name: 'Green',
    hex: '#0B6623',
    imageUrl: '/placeholder.svg',
    category: 'outside',
    priceModifier: 70
  },
  {
    id: 'col-out-brown',
    name: 'Brown',
    hex: '#964B00',
    imageUrl: '/placeholder.svg',
    category: 'outside',
    priceModifier: 70
  },
  {
    id: 'col-out-wine-red',
    name: 'Wine Red',
    hex: '#722F37',
    imageUrl: '/placeholder.svg',
    category: 'outside',
    priceModifier: 70
  },
  {
    id: 'col-out-midnight-blue',
    name: 'Midnight Blue',
    hex: '#191970',
    imageUrl: '/placeholder.svg',
    category: 'outside',
    priceModifier: 70
  },
  {
    id: 'col-out-black',
    name: 'Black',
    hex: '#000000',
    imageUrl: '/placeholder.svg',
    category: 'outside',
    priceModifier: 70
  },
  {
    id: 'col-out-golden-oak',
    name: 'Golden Oak',
    hex: '#D4A76A',
    imageUrl: '/placeholder.svg',
    category: 'outside',
    priceModifier: 100
  },
  {
    id: 'col-out-walnut',
    name: 'Walnut',
    hex: '#5C4033',
    imageUrl: '/placeholder.svg',
    category: 'outside',
    priceModifier: 100
  }
];

// Inside colors (same as outside for simplicity)
export const insideColorOptions: ColorOption[] = outsideColorOptions.map(color => ({
  ...color,
  id: color.id.replace('out', 'in'),
  category: 'inside' as const
}));

// Rubber seal colors
export const rubberColorOptions: ColorOption[] = [
  {
    id: 'col-rubber-black',
    name: 'Black',
    hex: '#000000',
    imageUrl: '/placeholder.svg',
    category: 'rubber',
    priceModifier: 0
  },
  {
    id: 'col-rubber-gray',
    name: 'Gray',
    hex: '#808080',
    imageUrl: '/placeholder.svg',
    category: 'rubber',
    priceModifier: 10
  },
  {
    id: 'col-rubber-brown',
    name: 'Brown',
    hex: '#964B00',
    imageUrl: '/placeholder.svg',
    category: 'rubber',
    priceModifier: 10
  },
  {
    id: 'col-rubber-white',
    name: 'White',
    hex: '#FFFFFF',
    imageUrl: '/placeholder.svg',
    category: 'rubber',
    priceModifier: 10
  }
];

// All color options combined
export const colorOptions = [
  ...baseColorOptions,
  ...outsideColorOptions,
  ...insideColorOptions,
  ...rubberColorOptions
];

export const calculatePrice = (
  basePrice: number,
  glazingModifier: number,
  colorModifier: number,
  width: number,
  height: number
) => {
  // Calculate area in square meters
  const area = (width / 1000) * (height / 1000);
  // Base calculation
  let price = basePrice + glazingModifier + colorModifier;
  // Multiply by area (minimum 1 sqm)
  price = price * Math.max(1, area);
  // Round to nearest whole number
  return Math.round(price);
};
