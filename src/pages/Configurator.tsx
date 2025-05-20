
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
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

// Import the components we created
import { ConfiguratorLayout } from '@/components/configurator/ConfiguratorLayout';
import { ConfigurationOptions } from '@/components/configurator/ConfigurationOptions';
import { PreviewAndSummary } from '@/components/configurator/PreviewAndSummary';
import { ProductTypeSelector } from '@/components/configurator/ProductTypeSelector';
import { WindowTypeSelector } from '@/components/configurator/WindowTypeSelector';
import { OpeningDirectionSelector } from '@/components/configurator/OpeningDirectionSelector';
import { ProfileSelector } from '@/components/configurator/ProfileSelector';
import { GlazingSelector } from '@/components/configurator/GlazingSelector';
import { ColorSelector } from '@/components/configurator/ColorSelector';
import { DimensionsSelector } from '@/components/configurator/DimensionsSelector';
import { QuantitySelector } from '@/components/configurator/QuantitySelector';
import { ProductPreview } from '@/components/configurator/ProductPreview';
import { ProductSummary } from '@/components/configurator/ProductSummary';

const Configurator = () => {
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();
  
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

  // Handle add to cart
  const handleAddToCart = () => {
    const item = {
      id: `${Date.now()}`,
      type: productType,
      name: `${profileObject.name} ${productType === 'window' ? 'Window' : 'Door'}`,
      profile: profileObject.name,
      windowType: productType === 'window' ? windowTypeObject.name : undefined,
      openingDirection: productType === 'window' ? openingDirectionObject.name : undefined,
      glazing: glazingObject.name,
      colors: {
        base: baseColorObject.name,
        outside: outsideColorObject.name,
        inside: insideColorObject.name,
        rubber: rubberColorObject.name,
      },
      dimensions: {
        width,
        height,
      },
      quantity,
      price: calculatedPrice,
      imageUrl: profileObject.imageUrl,
    };
    
    addToCart(item);
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  // Handle horizontal rotation (left-right)
  const handleRotateLeft = () => {
    setRotationY((prev) => prev - 30);
  };

  // Handle horizontal rotation (right-left)
  const handleRotateRight = () => {
    setRotationY((prev) => prev + 30);
  };

  // Reset rotation
  const resetRotation = () => {
    setRotationX(0);
    setRotationY(0);
  };

  return (
    <ConfiguratorLayout>
      <ConfigurationOptions>
        <ProductTypeSelector
          productType={productType}
          onProductTypeChange={setProductType}
        />
        
        {productType === 'window' && (
          <WindowTypeSelector
            selectedWindowType={selectedWindowType}
            onWindowTypeChange={setSelectedWindowType}
          />
        )}
        
        {productType === 'window' && selectedWindowType !== 'fixed' && (
          <OpeningDirectionSelector
            selectedOpeningDirection={selectedOpeningDirection}
            onOpeningDirectionChange={setSelectedOpeningDirection}
          />
        )}
        
        <ProfileSelector
          productType={productType}
          availableProfiles={availableProfiles}
          selectedProfile={selectedProfile}
          onProfileChange={setSelectedProfile}
        />
        
        <GlazingSelector
          productType={productType}
          selectedGlazing={selectedGlazing}
          onGlazingChange={setSelectedGlazing}
        />
        
        <ColorSelector
          productType={productType}
          selectedBaseColor={selectedBaseColor}
          selectedOutsideColor={selectedOutsideColor}
          selectedInsideColor={selectedInsideColor}
          selectedRubberColor={selectedRubberColor}
          onBaseColorChange={setSelectedBaseColor}
          onOutsideColorChange={setSelectedOutsideColor}
          onInsideColorChange={setSelectedInsideColor}
          onRubberColorChange={setSelectedRubberColor}
        />
        
        <DimensionsSelector
          productType={productType}
          width={width}
          height={height}
          onWidthChange={setWidth}
          onHeightChange={setHeight}
        />
        
        <QuantitySelector
          productType={productType}
          quantity={quantity}
          onQuantityChange={setQuantity}
        />
      </ConfigurationOptions>
      
      <PreviewAndSummary>
        <ProductPreview
          productType={productType}
          width={width}
          height={height}
          selectedWindowType={selectedWindowType}
          selectedOpeningDirection={selectedOpeningDirection}
          baseColorObject={baseColorObject}
          outsideColorObject={outsideColorObject}
          insideColorObject={insideColorObject}
          rubberColorObject={rubberColorObject}
          glazingObject={glazingObject}
          profileObject={profileObject}
          windowTypeObject={windowTypeObject}
          openingDirectionObject={openingDirectionObject}
          rotationX={rotationX}
          rotationY={rotationY}
          onRotateLeft={handleRotateLeft}
          onRotateRight={handleRotateRight}
          onResetRotation={resetRotation}
        />
        
        <ProductSummary
          productType={productType}
          profileObject={profileObject}
          glazingObject={glazingObject}
          windowTypeObject={windowTypeObject}
          openingDirectionObject={openingDirectionObject}
          baseColorObject={baseColorObject}
          outsideColorObject={outsideColorObject}
          insideColorObject={insideColorObject}
          rubberColorObject={rubberColorObject}
          width={width}
          height={height}
          quantity={quantity}
          calculatedPrice={calculatedPrice}
          onAddToCart={handleAddToCart}
        />
      </PreviewAndSummary>
    </ConfiguratorLayout>
  );
};

export default Configurator;
