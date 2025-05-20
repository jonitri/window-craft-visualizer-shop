
import React from 'react';
import { ProductConfiguration } from '@/hooks/useProductConfiguration';
import { useCartActions } from '@/hooks/useCartActions';

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
import { ProductPreview } from '@/components/configurator/preview/ProductPreview';
import { ProductSummary } from '@/components/configurator/ProductSummary';

interface ConfiguratorContentProps {
  config: ProductConfiguration;
}

export const ConfiguratorContent: React.FC<ConfiguratorContentProps> = ({ config }) => {
  const { handleAddToCart } = useCartActions();
  
  return (
    <ConfiguratorLayout>
      <ConfigurationOptions>
        <ProductTypeSelector
          productType={config.productType}
          onProductTypeChange={config.setProductType}
        />
        
        {config.productType === 'window' && (
          <WindowTypeSelector
            selectedWindowType={config.selectedWindowType}
            onWindowTypeChange={config.setSelectedWindowType}
          />
        )}
        
        {config.productType === 'window' && config.selectedWindowType !== 'fixed' && (
          <OpeningDirectionSelector
            selectedOpeningDirection={config.selectedOpeningDirection}
            onOpeningDirectionChange={config.setSelectedOpeningDirection}
          />
        )}
        
        <ProfileSelector
          productType={config.productType}
          availableProfiles={config.availableProfiles}
          selectedProfile={config.selectedProfile}
          onProfileChange={config.setSelectedProfile}
        />
        
        <GlazingSelector
          productType={config.productType}
          selectedGlazing={config.selectedGlazing}
          onGlazingChange={config.setSelectedGlazing}
        />
        
        <ColorSelector
          productType={config.productType}
          selectedBaseColor={config.selectedBaseColor}
          selectedOutsideColor={config.selectedOutsideColor}
          selectedInsideColor={config.selectedInsideColor}
          selectedRubberColor={config.selectedRubberColor}
          onBaseColorChange={config.setSelectedBaseColor}
          onOutsideColorChange={config.setSelectedOutsideColor}
          onInsideColorChange={config.setSelectedInsideColor}
          onRubberColorChange={config.setSelectedRubberColor}
        />
        
        <DimensionsSelector
          productType={config.productType}
          width={config.width}
          height={config.height}
          onWidthChange={config.setWidth}
          onHeightChange={config.setHeight}
        />
        
        <QuantitySelector
          productType={config.productType}
          quantity={config.quantity}
          onQuantityChange={config.setQuantity}
        />
      </ConfigurationOptions>
      
      <PreviewAndSummary>
        <ProductPreview
          productType={config.productType}
          width={config.width}
          height={config.height}
          selectedWindowType={config.selectedWindowType}
          selectedOpeningDirection={config.selectedOpeningDirection}
          baseColorObject={config.baseColorObject}
          outsideColorObject={config.outsideColorObject}
          insideColorObject={config.insideColorObject}
          rubberColorObject={config.rubberColorObject}
          glazingObject={config.glazingObject}
          profileObject={config.profileObject}
          windowTypeObject={config.windowTypeObject}
          openingDirectionObject={config.openingDirectionObject}
          rotationX={config.rotationX}
          rotationY={config.rotationY}
          onRotateLeft={config.handleRotateLeft}
          onRotateRight={config.handleRotateRight}
          onResetRotation={config.resetRotation}
        />
        
        <ProductSummary
          productType={config.productType}
          profileObject={config.profileObject}
          glazingObject={config.glazingObject}
          windowTypeObject={config.windowTypeObject}
          openingDirectionObject={config.openingDirectionObject}
          baseColorObject={config.baseColorObject}
          outsideColorObject={config.outsideColorObject}
          insideColorObject={config.insideColorObject}
          rubberColorObject={config.rubberColorObject}
          width={config.width}
          height={config.height}
          quantity={config.quantity}
          calculatedPrice={config.calculatedPrice}
          onAddToCart={() => handleAddToCart(config)}
        />
      </PreviewAndSummary>
    </ConfiguratorLayout>
  );
};
