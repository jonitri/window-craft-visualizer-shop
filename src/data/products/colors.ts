

import { ColorOption } from './types';

// Base color options (main frame color) - simplified to 4 basic options
export const baseColorOptions: ColorOption[] = [
  {
    id: 'col-white',
    name: 'White',
    hex: '#FFFFFF',
    imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iI0UwRTBFMCIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPgo=',
    category: 'base',
    priceModifier: 0 // Base price
  },
  {
    id: 'col-anthracite',
    name: 'Anthracite',
    hex: '#2F2F2F',
    imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiMyRjJGMkYiLz4KPC9zdmc+Cg==',
    category: 'base',
    priceModifier: 50
  },
  {
    id: 'col-walnut',
    name: 'Walnut',
    hex: '#5C4033',
    imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM1QzQwMzMiLz4KPC9zdmc+Cg==',
    category: 'base',
    priceModifier: 100
  },
  {
    id: 'col-golden-oak',
    name: 'Golden Oak',
    hex: '#D4A76A',
    imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNENEE3NkEiLz4KPC9zdmc+Cg==',
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
    imageUrl: '/lovable-uploads/3d8f5561-9f28-4e47-a99a-b2679031a021.png',
    category: 'outside',
    priceModifier: 50
  },
  {
    id: 'col-out-light-gray',
    name: 'Light Gray',
    hex: '#D3D3D3',
    imageUrl: '/lovable-uploads/8150f9b2-9b03-4214-ae1c-a99ebb77d561.png',
    category: 'outside',
    priceModifier: 50
  },
  {
    id: 'col-out-silver-gray',
    name: 'Silver Gray',
    hex: '#C0C0C0',
    imageUrl: '/lovable-uploads/fb6731e2-5896-4e70-aa41-220c28e76bf2.png',
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
    imageUrl: '/lovable-uploads/0270dd4a-d926-4dd2-974b-aa4277528e32.png',
    category: 'outside',
    priceModifier: 70
  },
  {
    id: 'col-out-brown',
    name: 'Brown',
    hex: '#964B00',
    imageUrl: '/lovable-uploads/21633a56-b35b-4d1a-80ac-ff88d2c69150.png',
    category: 'outside',
    priceModifier: 70
  },
  {
    id: 'col-out-wine-red',
    name: 'Wine Red',
    hex: '#722F37',
    imageUrl: '/lovable-uploads/72511bcd-1822-4853-b532-3b5af78176ef.png',
    category: 'outside',
    priceModifier: 70
  },
  {
    id: 'col-out-midnight-blue',
    name: 'Midnight Blue',
    hex: '#191970',
    imageUrl: '/lovable-uploads/bc9f8bfd-e1ec-4682-9c53-af9c875a5b72.png',
    category: 'outside',
    priceModifier: 70
  },
  {
    id: 'col-out-black',
    name: 'Black',
    hex: '#000000',
    imageUrl: '/lovable-uploads/1eb26af8-c23e-40bd-ab1e-8ad22c214829.png',
    category: 'outside',
    priceModifier: 70
  },
  {
    id: 'col-out-sage-green',
    name: 'Sage Green',
    hex: '#87A96B',
    imageUrl: '/lovable-uploads/5f65abf4-50de-47c2-a1c5-cfafcc9c352f.png',
    category: 'outside',
    priceModifier: 70
  },
  {
    id: 'col-out-charcoal-gray',
    name: 'Charcoal Gray',
    hex: '#36454F',
    imageUrl: '/lovable-uploads/317cba47-7020-4c2c-be63-0c64da25c06b.png',
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
  },
  // Third batch additions
  {
    id: 'col-out-steel-gray',
    name: 'Steel Gray',
    hex: '#71797E',
    imageUrl: '/lovable-uploads/84ab566b-1acb-4db4-9f24-e9329bb4a864.png',
    category: 'outside',
    priceModifier: 50
  },
  {
    id: 'col-out-bamboo',
    name: 'Bamboo',
    hex: '#E3D2B3',
    imageUrl: '/lovable-uploads/bc92d03b-abca-4645-bd2e-c632b9936d41.png',
    category: 'outside',
    priceModifier: 100
  },
  {
    id: 'col-out-driftwood',
    name: 'Driftwood',
    hex: '#B8B5A8',
    imageUrl: '/lovable-uploads/f96ce50b-35d7-4f24-bdda-819cce24138c.png',
    category: 'outside',
    priceModifier: 100
  },
  {
    id: 'col-out-honey-oak',
    name: 'Honey Oak',
    hex: '#DAA520',
    imageUrl: '/lovable-uploads/131fee56-9cb5-4cca-9d9f-844463f978ed.png',
    category: 'outside',
    priceModifier: 100
  },
  {
    id: 'col-out-tiger-oak',
    name: 'Tiger Oak',
    hex: '#B8860B',
    imageUrl: '/lovable-uploads/a08f536a-11d3-4593-84f8-9f182125793b.png',
    category: 'outside',
    priceModifier: 100
  },
  {
    id: 'col-out-forest-green',
    name: 'Forest Green',
    hex: '#355E3B',
    imageUrl: '/lovable-uploads/aac78fac-c01c-406f-87a3-f2b79ac597ad.png',
    category: 'outside',
    priceModifier: 70
  },
  {
    id: 'col-out-pearl-white',
    name: 'Pearl White',
    hex: '#F8F8F8',
    imageUrl: '/lovable-uploads/16d1f8a9-2d8e-42da-9c71-b172bd396c33.png',
    category: 'outside',
    priceModifier: 50
  },
  {
    id: 'col-out-platinum',
    name: 'Platinum',
    hex: '#E5E4E2',
    imageUrl: '/lovable-uploads/0e80c26b-5c14-48f3-8a0d-9176c22be265.png',
    category: 'outside',
    priceModifier: 50
  },
  {
    id: 'col-out-graphite',
    name: 'Graphite',
    hex: '#2F2F2F',
    imageUrl: '/lovable-uploads/1239e3cc-5804-4364-9aac-7eef09813f74.png',
    category: 'outside',
    priceModifier: 70
  },
  {
    id: 'col-out-arctic-white',
    name: 'Arctic White',
    hex: '#F0F8FF',
    imageUrl: '/lovable-uploads/2e5caafc-5a19-43fa-ae90-50376187840d.png',
    category: 'outside',
    priceModifier: 50
  },
  // Fourth batch additions
  {
    id: 'col-out-brushed-aluminum',
    name: 'Brushed Aluminum',
    hex: '#A8A8A8',
    imageUrl: '/lovable-uploads/f6321221-e6e4-4892-982b-d20cd91b9dd1.png',
    category: 'outside',
    priceModifier: 50
  },
  {
    id: 'col-out-dark-graphite',
    name: 'Dark Graphite',
    hex: '#4A4A4A',
    imageUrl: '/lovable-uploads/09932382-4dfb-4fb3-882a-fb706a5a0490.png',
    category: 'outside',
    priceModifier: 70
  },
  {
    id: 'col-out-stone-gray',
    name: 'Stone Gray',
    hex: '#D6D6D6',
    imageUrl: '/lovable-uploads/4f1ed66d-4a09-4e23-9bf3-739f2806b98c.png',
    category: 'outside',
    priceModifier: 50
  },
  {
    id: 'col-out-slate-gray',
    name: 'Slate Gray',
    hex: '#708090',
    imageUrl: '/lovable-uploads/46873578-77c5-496b-99d3-7edf7bae9bf6.png',
    category: 'outside',
    priceModifier: 50
  },
  {
    id: 'col-out-pewter',
    name: 'Pewter',
    hex: '#8A8A8A',
    imageUrl: '/lovable-uploads/61219fcf-dbf3-4ecb-8194-79d21997d0d3.png',
    category: 'outside',
    priceModifier: 50
  },
  {
    id: 'col-out-gunmetal',
    name: 'Gunmetal',
    hex: '#2C3539',
    imageUrl: '/lovable-uploads/972d0e92-c011-4e2f-9afb-4e36645636a4.png',
    category: 'outside',
    priceModifier: 70
  },
  {
    id: 'col-out-bronze',
    name: 'Bronze',
    hex: '#8C7853',
    imageUrl: '/lovable-uploads/c47c2736-618b-4da2-a766-f2817b91e340.png',
    category: 'outside',
    priceModifier: 70
  },
  {
    id: 'col-out-cedar',
    name: 'Cedar',
    hex: '#A67B5B',
    imageUrl: '/lovable-uploads/8451e074-4b21-4ed1-839a-af0adf7082ad.png',
    category: 'outside',
    priceModifier: 100
  },
  {
    id: 'col-out-birch',
    name: 'Birch',
    hex: '#D4C5B9',
    imageUrl: '/lovable-uploads/da2e0f22-11c7-4ce8-af06-a53d530ad1be.png',
    category: 'outside',
    priceModifier: 100
  },
  {
    id: 'col-out-oak-gray',
    name: 'Oak Gray',
    hex: '#A69B89',
    imageUrl: '/lovable-uploads/08049544-488e-4d1b-adb0-32ebdbddea29.png',
    category: 'outside',
    priceModifier: 100
  },
  // Fifth batch additions (final)
  {
    id: 'col-out-charcoal-metallic',
    name: 'Charcoal Metallic',
    hex: '#36454F',
    imageUrl: '/lovable-uploads/5c2ace64-d790-45b8-b54f-5d9750279d4d.png',
    category: 'outside',
    priceModifier: 70
  },
  {
    id: 'col-out-titanium-gray',
    name: 'Titanium Gray',
    hex: '#878681',
    imageUrl: '/lovable-uploads/7fd1c83c-56df-4041-bbde-ff096e781cc5.png',
    category: 'outside',
    priceModifier: 70
  },
  {
    id: 'col-out-matte-silver',
    name: 'Matte Silver',
    hex: '#BCC6CC',
    imageUrl: '/lovable-uploads/63e25fa1-9d40-4a55-8360-104dc7becb96.png',
    category: 'outside',
    priceModifier: 50
  },
  {
    id: 'col-out-iron-gray',
    name: 'Iron Gray',
    hex: '#3C3C3C',
    imageUrl: '/lovable-uploads/7d67186f-1623-4540-8098-e1a1926be4a4.png',
    category: 'outside',
    priceModifier: 70
  },
  {
    id: 'col-out-earth-brown',
    name: 'Earth Brown',
    hex: '#8B7355',
    imageUrl: '/lovable-uploads/f85cbf8a-445a-4e2d-987d-bbb3c0a35080.png',
    category: 'outside',
    priceModifier: 70
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
    imageUrl: '/lovable-uploads/1eb26af8-c23e-40bd-ab1e-8ad22c214829.png',
    category: 'rubber',
    priceModifier: 0
  },
  {
    id: 'col-rubber-gray',
    name: 'Gray',
    hex: '#808080',
    imageUrl: '/lovable-uploads/317cba47-7020-4c2c-be63-0c64da25c06b.png',
    category: 'rubber',
    priceModifier: 10
  },
  {
    id: 'col-rubber-brown',
    name: 'Brown',
    hex: '#964B00',
    imageUrl: '/lovable-uploads/21633a56-b35b-4d1a-80ac-ff88d2c69150.png',
    category: 'rubber',
    priceModifier: 10
  },
  {
    id: 'col-rubber-white',
    name: 'White',
    hex: '#FFFFFF',
    imageUrl: '/lovable-uploads/3d8f5561-9f28-4e47-a99a-b2679031a021.png',
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
