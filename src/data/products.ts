
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
  priceModifier: number;
}

// Window profiles
export const windowProfiles: Profile[] = [
  {
    id: 'wp-standard',
    name: 'Standard Series',
    description: 'Our cost-effective solution with excellent insulation properties.',
    features: [
      '70mm frame depth',
      'Double glazing capability',
      '2 gasket sealing system',
      'U-value: 1.3 W/m²K'
    ],
    imageUrl: '/placeholder.svg',
    basePrice: 200
  },
  {
    id: 'wp-premium',
    name: 'Premium Series',
    description: 'Enhanced thermal and sound insulation for comfortable living.',
    features: [
      '80mm frame depth',
      'Triple glazing capability',
      '3 gasket sealing system',
      'U-value: 0.9 W/m²K'
    ],
    imageUrl: '/placeholder.svg',
    basePrice: 350
  },
  {
    id: 'wp-elite',
    name: 'Elite Series',
    description: 'Top-tier performance with maximum comfort and energy efficiency.',
    features: [
      '90mm frame depth',
      'Triple glazing as standard',
      'Advanced thermal breaks',
      'U-value: 0.7 W/m²K'
    ],
    imageUrl: '/placeholder.svg',
    basePrice: 500
  }
];

// Door profiles
export const doorProfiles: Profile[] = [
  {
    id: 'dp-entry',
    name: 'Entry Series',
    description: 'Reliable, secure entry doors for everyday use.',
    features: [
      '70mm frame depth',
      'Multi-point locking system',
      'Standard threshold',
      'U-value: 1.4 W/m²K'
    ],
    imageUrl: '/placeholder.svg',
    basePrice: 450
  },
  {
    id: 'dp-security',
    name: 'Security Series',
    description: 'Enhanced protection with advanced security features.',
    features: [
      '80mm frame depth',
      'Advanced multi-point locking',
      'Reinforced panels',
      'U-value: 1.1 W/m²K'
    ],
    imageUrl: '/placeholder.svg',
    basePrice: 650
  },
  {
    id: 'dp-premium',
    name: 'Premium Entrance',
    description: 'Luxurious entrance doors with superior insulation and security.',
    features: [
      '90mm frame depth',
      'Biometric locking options',
      'Low-threshold accessibility',
      'U-value: 0.8 W/m²K'
    ],
    imageUrl: '/placeholder.svg',
    basePrice: 850
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
    id: 'glz-acoustic',
    name: 'Acoustic Glazing',
    description: 'Specialized sound reduction glass for noisy environments.',
    features: [
      'Laminated acoustic interlayer',
      'Different glass thickness for each pane',
      '38dB sound reduction',
      'U-value: 1.0 W/m²K'
    ],
    imageUrl: '/placeholder.svg',
    priceModifier: 150
  },
  {
    id: 'glz-security',
    name: 'Security Glazing',
    description: 'Impact-resistant glazing for enhanced security.',
    features: [
      'Laminated security glass',
      'P4A rating',
      'Virtually unbreakable',
      'U-value: 1.1 W/m²K'
    ],
    imageUrl: '/placeholder.svg',
    priceModifier: 200
  }
];

// Color options
export const colorOptions: ColorOption[] = [
  {
    id: 'col-white',
    name: 'White',
    hex: '#FFFFFF',
    imageUrl: '/placeholder.svg',
    priceModifier: 0 // Base price
  },
  {
    id: 'col-anthracite',
    name: 'Anthracite Grey',
    hex: '#383E42',
    imageUrl: '/placeholder.svg',
    priceModifier: 50
  },
  {
    id: 'col-black',
    name: 'Jet Black',
    hex: '#1D1D1D',
    imageUrl: '/placeholder.svg',
    priceModifier: 50
  },
  {
    id: 'col-oak',
    name: 'Golden Oak',
    hex: '#D4A76A',
    imageUrl: '/placeholder.svg',
    priceModifier: 100
  },
  {
    id: 'col-walnut',
    name: 'Walnut',
    hex: '#5C4033',
    imageUrl: '/placeholder.svg',
    priceModifier: 100
  },
  {
    id: 'col-custom',
    name: 'Custom RAL Color',
    hex: '#0073CF',
    imageUrl: '/placeholder.svg',
    priceModifier: 150
  }
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
