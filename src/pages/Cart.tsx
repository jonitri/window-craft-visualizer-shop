
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Trash, Plus, Minus } from 'lucide-react';

// Form schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(5, { message: 'Please enter a valid phone number' }),
  address: z.string().min(5, { message: 'Please enter your full address' }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      notes: '',
    },
  });

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
      form.reset();
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
          <div className="text-center py-12">
            <h2 className="heading-3 mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              You haven't added any products to your cart yet.
            </p>
            <Button asChild>
              <a href="/configurator">Start Configuring</a>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <h2 className="heading-3 mb-6">Cart Items ({cart.length})</h2>

              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex flex-col md:flex-row gap-4 bg-secondary rounded-lg p-4">
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
                ))}
              </div>
              
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={clearCart}>
                  Clear Cart
                </Button>
                <div className="text-xl font-bold">
                  Total: ${getTotalPrice().toFixed(2)}
                </div>
              </div>
            </div>
            
            {/* Order Form */}
            <div>
              <h2 className="heading-3 mb-6">Your Information</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="(123) 456-7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Delivery Address</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter your full address"
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any special requests or information"
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={isSubmitting || cart.length === 0} className="w-full">
                    {isSubmitting ? 'Processing...' : 'Submit Order Request'}
                  </Button>
                </form>
              </Form>
              
              <div className="mt-6 bg-muted p-4 rounded-lg text-sm text-muted-foreground">
                <p>
                  By submitting this form, you agree to be contacted by our team regarding your order.
                  We'll provide you with a detailed quote and discuss installation options.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Cart;
