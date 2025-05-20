
import { Button } from '@/components/ui/button';
import { CartItem } from '@/context/CartContext';

interface CartSummaryProps {
  cart: CartItem[];
  getTotalPrice: () => number;
  clearCart: () => void;
}

export const CartSummary = ({ cart, getTotalPrice, clearCart }: CartSummaryProps) => {
  if (cart.length === 0) return null;
  
  return (
    <div className="flex justify-between mt-6">
      <Button variant="outline" onClick={clearCart}>
        Clear Cart
      </Button>
      <div className="text-xl font-bold">
        Total: ${getTotalPrice().toFixed(2)}
      </div>
    </div>
  );
};
