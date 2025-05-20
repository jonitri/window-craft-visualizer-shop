
import { CartItem as CartItemComponent } from './CartItem';
import { CartItem as CartItemType } from '@/context/CartContext';

interface CartItemsListProps {
  cart: CartItemType[];
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
}

export const CartItemsList = ({ cart, updateQuantity, removeFromCart }: CartItemsListProps) => {
  return (
    <div className="lg:col-span-2">
      <h2 className="heading-3 mb-6">Cart Items ({cart.length})</h2>

      <div className="space-y-6">
        {cart.map((item) => (
          <CartItemComponent 
            key={item.id}
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
        ))}
      </div>
    </div>
  );
};
