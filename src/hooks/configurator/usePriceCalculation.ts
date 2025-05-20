
import { useEffect, useState } from 'react';
import { calculatePrice } from '@/data/products';

export function usePriceCalculation(
  profileBasePrice: number,
  glazingModifier: number,
  colorModifier: number,
  width: number,
  height: number,
  productType: 'window' | 'door',
  leafCount: number = 1
) {
  const [calculatedPrice, setCalculatedPrice] = useState<number>(0);
  
  useEffect(() => {
    // Add 10% to price for each additional leaf for windows
    let leafMultiplier = 1;
    if (productType === 'window' && leafCount > 1) {
      leafMultiplier = 1 + ((leafCount - 1) * 0.1);
    }
    
    const price = calculatePrice(
      profileBasePrice * leafMultiplier,
      glazingModifier,
      colorModifier,
      width,
      height
    );
    
    setCalculatedPrice(price);
  }, [
    profileBasePrice,
    glazingModifier,
    colorModifier,
    width,
    height,
    productType,
    leafCount
  ]);

  return calculatedPrice;
}
