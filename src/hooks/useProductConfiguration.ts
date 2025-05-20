
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  windowProfiles, 
  doorProfiles, 
  glazingOptions, 
  baseColorOptions,
  outsideColorOptions,
  insideColorOptions,
  rubberColorOptions,
  calculatePrice
} from '@/data/products';
import { windowTypes, openingDirections } from '@/data/windowTypes';

export interface ProductConfiguration {
  productType: 'window' | 'door';
  selectedWindowType: string;
  selectedOpeningDirection: string;
  selectedProfile: string;
  selectedGlazing: string;
  selectedBaseColor: string;
  selectedOutsideColor: string;
  selectedInsideColor: string;
  selectedRubberColor: string;
  width: number;
  height: number;
  quantity: number;
  calculatedPrice: number;
  rotationX: number;
  rotationY: number;
  profileObject: any;
  glazingObject: any;
  baseColorObject: any;
  outsideColorObject: any;
  insideColorObject: any;
  rubberColorObject: any;
  windowTypeObject: any;
  openingDirectionObject: any;
  totalColorModifier: number;
}

export function useProductConfiguration() {
  const [searchParams] = useSearchParams();
  
  // Get initial values from URL if present
  const initialType = searchParams.get('type') === 'door' ? 'door' : 'window';
  const initialProfileId = searchParams.get('profile') || '';
  
  // State for configuration
  const [productType, setProductType] = useState<'window' | 'door'>(initialType as 'window' | 'door');
  const [selectedWindowType, setSelectedWindowType] = useState<string>('single-leaf');
  const [selectedOpeningDirection, setSelectedOpeningDirection] = useState<string>('left');
  const [selectedProfile, setSelectedProfile] = useState<string>(initialProfileId);
  const [selectedGlazing, setSelectedGlazing] = useState<string>('glz-double');
  const [selectedBaseColor, setSelectedBaseColor] = useState<string>('col-white');
  const [selectedOutsideColor, setSelectedOutsideColor] = useState<string>('col-out-white');
  const [selectedInsideColor, setSelectedInsideColor] = useState<string>('col-in-white');
  const [selectedRubberColor, setSelectedRubberColor] = useState<string>('col-rubber-black');
  const [width, setWidth] = useState<number>(1000); // Default 1000mm
  const [height, setHeight] = useState<number>(1200); // Default 1200mm
  const [quantity, setQuantity] = useState<number>(1);
  const [calculatedPrice, setCalculatedPrice] = useState<number>(0);
  const [rotationX, setRotationX] = useState<number>(0);
  const [rotationY, setRotationY] = useState<number>(0);
  
  // Get profiles based on product type
  const availableProfiles = productType === 'window' ? windowProfiles : doorProfiles;
  
  // Find the selected profile, glazing and color objects
  const profileObject = availableProfiles.find(p => p.id === selectedProfile) || availableProfiles[0];
  const glazingObject = glazingOptions.find(g => g.id === selectedGlazing) || glazingOptions[0];
  const baseColorObject = baseColorOptions.find(c => c.id === selectedBaseColor) || baseColorOptions[0];
  const outsideColorObject = outsideColorOptions.find(c => c.id === selectedOutsideColor) || outsideColorOptions[0];
  const insideColorObject = insideColorOptions.find(c => c.id === selectedInsideColor) || insideColorOptions[0];
  const rubberColorObject = rubberColorOptions.find(c => c.id === selectedRubberColor) || rubberColorOptions[0];
  const windowTypeObject = windowTypes.find(w => w.id === selectedWindowType) || windowTypes[0];
  const openingDirectionObject = openingDirections.find(o => o.id === selectedOpeningDirection) || openingDirections[0];

  // Combined color price modifier
  const totalColorModifier = baseColorObject.priceModifier + outsideColorObject.priceModifier + 
                           insideColorObject.priceModifier + rubberColorObject.priceModifier;
  
  // Update calculated price whenever options change
  useEffect(() => {
    if (profileObject) {
      // Add 10% to price for each additional leaf for windows
      let leafMultiplier = 1;
      if (productType === 'window' && windowTypeObject) {
        leafMultiplier = 1 + ((windowTypeObject.leafCount - 1) * 0.1);
      }
      
      const price = calculatePrice(
        profileObject.basePrice * leafMultiplier,
        glazingObject.priceModifier,
        totalColorModifier,
        width,
        height
      );
      setCalculatedPrice(price);
    }
  }, [
    selectedProfile, selectedGlazing, selectedWindowType,
    selectedBaseColor, selectedOutsideColor, selectedInsideColor, selectedRubberColor,
    width, height, profileObject, glazingObject, totalColorModifier, productType, windowTypeObject
  ]);
  
  // Set a default profile if none is selected
  useEffect(() => {
    if (!selectedProfile && availableProfiles.length > 0) {
      setSelectedProfile(availableProfiles[0].id);
    }
  }, [productType, availableProfiles, selectedProfile]);

  // Handle rotation
  const handleRotateLeft = () => {
    setRotationY((prev) => prev - 30);
  };

  const handleRotateRight = () => {
    setRotationY((prev) => prev + 30);
  };

  const resetRotation = () => {
    setRotationX(0);
    setRotationY(0);
  };

  return {
    // All state variables
    productType,
    selectedWindowType,
    selectedOpeningDirection,
    selectedProfile,
    selectedGlazing,
    selectedBaseColor,
    selectedOutsideColor,
    selectedInsideColor,
    selectedRubberColor,
    width,
    height,
    quantity,
    calculatedPrice,
    rotationX,
    rotationY,
    
    // Derived objects
    availableProfiles,
    profileObject,
    glazingObject,
    baseColorObject,
    outsideColorObject,
    insideColorObject,
    rubberColorObject,
    windowTypeObject,
    openingDirectionObject,
    totalColorModifier,
    
    // Setters
    setProductType,
    setSelectedWindowType,
    setSelectedOpeningDirection,
    setSelectedProfile,
    setSelectedGlazing,
    setSelectedBaseColor,
    setSelectedOutsideColor,
    setSelectedInsideColor,
    setSelectedRubberColor,
    setWidth,
    setHeight,
    setQuantity,
    
    // Rotation handlers
    handleRotateLeft,
    handleRotateRight,
    resetRotation
  };
}
