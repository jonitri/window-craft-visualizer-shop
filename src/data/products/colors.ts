
import { ColorOption } from './types';

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
