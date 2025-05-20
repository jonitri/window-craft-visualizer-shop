
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import { EmptyCart } from '@/components/cart/EmptyCart';
import { CartItemsList } from '@/components/cart/CartItemsList';
import { CartSummary } from '@/components/cart/CartSummary';
import { OrderForm } from '@/components/cart/OrderForm';

// Form values type from the OrderForm component
type FormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
};

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add some products to your cart first.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Prepare order data
    const orderData = {
      customer: data,
      products: cart,
      totalPrice: getTotalPrice(),
    };
    
    // Log the order data (would be sent to the backend in a real app)
    console.log('Order data:', orderData);
    
    // Simulate sending email
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Order submitted successfully",
        description: "Thank you! We've received your order and will contact you soon.",
      });
      clearCart();
    }, 1500);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-secondary">
        <div className="container-custom section-padding">
          <h1 className="heading-1 text-center mb-6">Your Cart</h1>
          <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto">
            Review your configured products and submit your order request.
          </p>
        </div>
      </div>

      {/* Cart Content */}
      <section className="container-custom section-padding">
        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <CartItemsList 
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
            
            <CartSummary 
              cart={cart}
              getTotalPrice={getTotalPrice}
              clearCart={clearCart}
            />
            
            {/* Order Form */}
            <div>
              <OrderForm 
                onSubmitOrder={onSubmit}
                isSubmitting={isSubmitting}
                cartIsEmpty={cart.length === 0}
              />
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Cart;
