import { useSearchParams } from 'react-router-dom';
import { useProductType } from './configurator/useProductType';
import { useWindowConfiguration } from './configurator/useWindowConfiguration';
import { useDimensions } from './configurator/useDimensions';
import { useAppearance } from './configurator/useAppearance';
import { useRotation } from './configurator/useRotation';
import { usePriceCalculation } from './configurator/usePriceCalculation';
import { Profile } from '@/data/products';

export interface ProductConfiguration {
  // State properties
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
  viewMode: 'front' | 'back';
  isAutoRotating: boolean;
  
  // Derived objects and properties
  profileObject: any;
  glazingObject: any;
  baseColorObject: any;
  outsideColorObject: any;
  insideColorObject: any;
  rubberColorObject: any;
  windowTypeObject: any;
  openingDirectionObject: any;
  totalColorModifier: number;
  availableProfiles: Profile[];
  
  // Setters
  setProductType: (type: 'window' | 'door') => void;
  setSelectedWindowType: (type: string) => void;
  setSelectedOpeningDirection: (direction: string) => void;
  setSelectedProfile: (profileId: string) => void;
  setSelectedGlazing: (glazingId: string) => void;
  setSelectedBaseColor: (colorId: string) => void;
  setSelectedOutsideColor: (colorId: string) => void;
  setSelectedInsideColor: (colorId: string) => void;
  setSelectedRubberColor: (colorId: string) => void;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setQuantity: (quantity: number) => void;
  
  // Rotation and view handlers
  handleRotateLeft: () => void;
  handleRotateRight: () => void;
  resetRotation: () => void;
  toggleView: () => void;
  toggleAutoRotation: () => void;
}

export function useProductConfiguration() {
  const [searchParams] = useSearchParams();
  
  // Get initial values from URL if present
  const initialType = searchParams.get('type') === 'door' ? 'door' : 'window';
  const initialProfileId = searchParams.get('profile') || '';
  
  // Use all the smaller hooks
  const productTypeHook = useProductType(initialType as 'window' | 'door');
  const windowConfigHook = useWindowConfiguration();
  const dimensionsHook = useDimensions();
  const appearanceHook = useAppearance();
  const rotationHook = useRotation();
  
  // Calculate the price based on all configurations
  const calculatedPrice = usePriceCalculation(
    productTypeHook.profileObject?.basePrice || 0,
    appearanceHook.glazingObject?.priceMultiplier || 0,
    appearanceHook.totalColorModifier,
    dimensionsHook.width,
    dimensionsHook.height,
    productTypeHook.productType,
    windowConfigHook.windowTypeObject?.leafCount || 1
  );

  // Return the complete configuration object with all properties
  return {
    // From product type hook
    productType: productTypeHook.productType,
    selectedProfile: productTypeHook.selectedProfile,
    profileObject: productTypeHook.profileObject,
    availableProfiles: productTypeHook.availableProfiles,
    setProductType: productTypeHook.setProductType,
    setSelectedProfile: productTypeHook.setSelectedProfile,
    
    // From window configuration hook
    selectedWindowType: windowConfigHook.selectedWindowType,
    selectedOpeningDirection: windowConfigHook.selectedOpeningDirection,
    windowTypeObject: windowConfigHook.windowTypeObject,
    openingDirectionObject: windowConfigHook.openingDirectionObject,
    setSelectedWindowType: windowConfigHook.setSelectedWindowType,
    setSelectedOpeningDirection: windowConfigHook.setSelectedOpeningDirection,
    
    // From dimensions hook
    width: dimensionsHook.width,
    height: dimensionsHook.height,
    quantity: dimensionsHook.quantity,
    setWidth: dimensionsHook.setWidth,
    setHeight: dimensionsHook.setHeight,
    setQuantity: dimensionsHook.setQuantity,
    
    // From appearance hook
    selectedGlazing: appearanceHook.selectedGlazing,
    selectedBaseColor: appearanceHook.selectedBaseColor,
    selectedOutsideColor: appearanceHook.selectedOutsideColor,
    selectedInsideColor: appearanceHook.selectedInsideColor,
    selectedRubberColor: appearanceHook.selectedRubberColor,
    glazingObject: appearanceHook.glazingObject,
    baseColorObject: appearanceHook.baseColorObject,
    outsideColorObject: appearanceHook.outsideColorObject,
    insideColorObject: appearanceHook.insideColorObject,
    rubberColorObject: appearanceHook.rubberColorObject,
    totalColorModifier: appearanceHook.totalColorModifier,
    setSelectedGlazing: appearanceHook.setSelectedGlazing,
    setSelectedBaseColor: appearanceHook.setSelectedBaseColor,
    setSelectedOutsideColor: appearanceHook.setSelectedOutsideColor,
    setSelectedInsideColor: appearanceHook.setSelectedInsideColor,
    setSelectedRubberColor: appearanceHook.setSelectedRubberColor,
    
    // From rotation hook
    rotationX: rotationHook.rotationX,
    rotationY: rotationHook.rotationY,
    viewMode: rotationHook.viewMode,
    isAutoRotating: rotationHook.isAutoRotating,
    handleRotateLeft: rotationHook.handleRotateLeft,
    handleRotateRight: rotationHook.handleRotateRight,
    resetRotation: rotationHook.resetRotation,
    toggleView: rotationHook.toggleView,
    toggleAutoRotation: rotationHook.toggleAutoRotation,
    
    // Price calculation
    calculatedPrice
  };
}
