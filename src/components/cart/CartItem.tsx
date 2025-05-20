
import { Trash, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
}

export const CartItem = ({ item, updateQuantity, removeFromCart }: CartItemProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 bg-secondary rounded-lg p-4">
      <div className="w-full md:w-32 h-32 bg-muted rounded flex items-center justify-center shrink-0">
        {item.type === 'window' ? '🪟' : '🚪'}
      </div>
      
      <div className="flex-1">
        <h3 className="font-bold text-lg">{item.name}</h3>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
          <div className="text-sm text-muted-foreground">Profile:</div>
          <div className="text-sm">{item.profile}</div>
          
          <div className="text-sm text-muted-foreground">Glazing:</div>
          <div className="text-sm">{item.glazing}</div>
          
          <div className="text-sm text-muted-foreground">Colors:</div>
          <div className="text-sm">
            Base: {item.colors.base}, Outside: {item.colors.outside},
            Inside: {item.colors.inside}, Rubber: {item.colors.rubber}
          </div>
          
          <div className="text-sm text-muted-foreground">Dimensions:</div>
          <div className="text-sm">{item.dimensions.width}mm × {item.dimensions.height}mm</div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive"
              onClick={() => removeFromCart(item.id)}
            >
              <Trash className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
