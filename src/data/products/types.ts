export interface Profile {
  id: string;
  name: string;
  description: string;
  features: string[];
  imageUrl: string;
  images?: string[];
  basePrice: number;
}

export interface WindowType {
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
  features?: string[];
  imageUrl?: string;
  uValue: number;
  priceMultiplier: number;
}

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  imageUrl?: string;
  category: 'standard' | 'premium' | 'special' | 'base' | 'outside' | 'inside' | 'rubber';
  priceModifier: number;
}

export interface Configuration {
  productType: 'window' | 'door';
  profile: Profile;
  windowType?: WindowType;
  dimensions: {
    width: number;
    height: number;
  };
  glazing: GlazingOption;
  exteriorColor: ColorOption;
  interiorColor: ColorOption;
  openingDirection?: string;
  quantity: number;
}

export interface CartItem extends Configuration {
  id: string;
  totalPrice: number;
  createdAt: Date;
}
