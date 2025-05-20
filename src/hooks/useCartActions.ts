
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import { ProductConfiguration } from './useProductConfiguration';

export const useCartActions = () => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (config: ProductConfiguration) => {
    const {
      productType,
      profileObject,
      windowTypeObject,
      openingDirectionObject,
      glazingObject,
      baseColorObject,
      outsideColorObject,
      insideColorObject,
      rubberColorObject,
      width,
      height,
      quantity,
      calculatedPrice
    } = config;

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

  return { handleAddToCart };
};
