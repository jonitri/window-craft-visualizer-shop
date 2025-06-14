
import { ColorOption } from './types';

// Base color options (main frame color)
export const baseColorOptions: ColorOption[] = [
  {
    id: 'col-white',
    name: 'White',
    hex: '#FFFFFF',
    imageUrl: '/lovable-uploads/d7ff0ec9-7d65-4eb6-8888-e69898a021b1.png',
    category: 'base',
    priceModifier: 0 // Base price
  },
  {
    id: 'col-golden-oak',
    name: 'Golden Oak',
    hex: '#D4A76A',
    imageUrl: '/lovable-uploads/483c3723-2717-402e-9ad2-21b22e32ace8.png',
    category: 'base',
    priceModifier: 100
  },
  {
    id: 'col-walnut',
    name: 'Walnut',
    hex: '#5C4033',
    imageUrl: '/lovable-uploads/49d544d5-4ed6-4fd9-a1dc-8f9fbf4b5444.png',
    category: 'base',
    priceModifier: 100
  },
  {
    id: 'col-black',
    name: 'Anthracite Gray',
    hex: '#1D1D1D',
    imageUrl: '/lovable-uploads/1f38d908-afb7-4cb7-8c3b-06c627e7d303.png',
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
    imageUrl: '/lovable-uploads/d7ff0ec9-7d65-4eb6-8888-e69898a021b1.png',
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
    imageUrl: '/lovable-uploads/1f38d908-afb7-4cb7-8c3b-06c627e7d303.png',
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
    imageUrl: '/lovable-uploads/483c3723-2717-402e-9ad2-21b22e32ace8.png',
    category: 'outside',
    priceModifier: 100
  },
  {
    id: 'col-out-winchester-oak',
    name: 'Winchester Oak',
    hex: '#8B4513',
    imageUrl: '/lovable-uploads/a37bc019-52c3-43d7-85cc-e6e2d6d9f999.png',
    category: 'outside',
    priceModifier: 100
  },
  {
    id: 'col-out-dark-oak',
    name: 'Dark Oak',
    hex: '#654321',
    imageUrl: '/lovable-uploads/1355fe44-9b05-4a3e-8921-a82d6d811dfa.png',
    category: 'outside',
    priceModifier: 100
  },
  {
    id: 'col-out-mahogany',
    name: 'Mahogany',
    hex: '#C04000',
    imageUrl: '/lovable-uploads/a25b7a79-2eb0-45e4-b698-4bce2782e348.png',
    category: 'outside',
    priceModifier: 100
  },
  {
    id: 'col-out-teak',
    name: 'Teak',
    hex: '#B8860B',
    imageUrl: '/lovable-uploads/0e13ed2f-07e3-4c12-9ad4-ea4f794442ef.png',
    category: 'outside',
    priceModifier: 100
  },
  {
    id: 'col-out-cherry',
    name: 'Cherry',
    hex: '#8B0000',
    imageUrl: '/lovable-uploads/532b60cd-a691-4555-af93-c502d29fce97.png',
    category: 'outside',
    priceModifier: 100
  },
  {
    id: 'col-out-walnut',
    name: 'Walnut',
    hex: '#5C4033',
    imageUrl: '/lovable-uploads/49d544d5-4ed6-4fd9-a1dc-8f9fbf4b5444.png',
    category: 'outside',
    priceModifier: 100
  },
  {
    id: 'col-out-pine',
    name: 'Pine',
    hex: '#DAA520',
    imageUrl: '/lovable-uploads/f22cb628-ce7a-44ad-94b5-72781c9be319.png',
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
