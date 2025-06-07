
import { GlazingOption } from './types';

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
    uValue: 1.1,
    priceMultiplier: 0 // Base price
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
    uValue: 0.7,
    priceMultiplier: 100
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
    uValue: 0.5,
    priceMultiplier: 200
  }
];
