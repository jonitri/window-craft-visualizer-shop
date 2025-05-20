
// Define all shared types for product data

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
