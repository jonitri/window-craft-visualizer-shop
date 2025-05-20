
import { useState } from 'react';
import { CartItem as CartItemType } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Trash2 } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}

export const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  const [quantity, setQuantity] = useState(item.quantity);
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    onUpdateQuantity(item.id, newQuantity);
  };
  
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Product Image */}
          <div className="w-full md:w-32 h-32 bg-secondary rounded-md overflow-hidden flex-shrink-0">
            <img 
              src={item.imageUrl || '/placeholder.svg'} 
              alt={item.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Product Details */}
          <div className="flex-1">
            <h3 className="font-medium text-lg">{item.name}</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-1 mt-2 text-sm">
              <div className="text-muted-foreground">Type:</div>
              <div className="md:col-span-2">{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</div>
              
              <div className="text-muted-foreground">Profile:</div>
              <div className="md:col-span-2">{item.profile}</div>
              
              {item.windowType && (
                <>
                  <div className="text-muted-foreground">Window Type:</div>
                  <div className="md:col-span-2">{item.windowType}</div>
                </>
              )}
              
              {item.openingDirection && (
                <>
                  <div className="text-muted-foreground">Opening:</div>
                  <div className="md:col-span-2">{item.openingDirection}</div>
                </>
              )}
              
              <div className="text-muted-foreground">Glazing:</div>
              <div className="md:col-span-2">{item.glazing}</div>
              
              <div className="text-muted-foreground">Colors:</div>
              <div className="md:col-span-2">
                <div className="flex flex-wrap gap-1">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary">
                    Base: {item.colors.base}
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary">
                    Outside: {item.colors.outside}
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary">
                    Inside: {item.colors.inside}
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary">
                    Rubber: {item.colors.rubber}
                  </span>
                </div>
              </div>
              
              <div className="text-muted-foreground">Dimensions:</div>
              <div className="md:col-span-2">{item.dimensions.width}mm × {item.dimensions.height}mm</div>
            </div>
          </div>
          
          {/* Price and Actions */}
          <div className="flex flex-row md:flex-col justify-between items-end md:items-end gap-4 md:gap-2 md:w-40">
            <div className="font-medium text-right">
              ${(item.price * item.quantity).toFixed(2)}
              {item.quantity > 1 && (
                <div className="text-xs text-muted-foreground">
                  ${item.price.toFixed(2)} each
                </div>
              )}
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-r-none"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <div className="h-8 px-3 flex items-center justify-center border-y border-input bg-transparent">
                  {quantity}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-l-none"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  +
                </Button>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-destructive hover:text-destructive hover:bg-destructive/10" 
                onClick={() => onRemove(item.id)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Remove
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
