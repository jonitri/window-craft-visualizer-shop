
import { Button } from '@/components/ui/button';

export const EmptyCart = () => {
  return (
    <div className="text-center py-12">
      <h2 className="heading-3 mb-4">Your cart is empty</h2>
      <p className="text-muted-foreground mb-8">
        You haven't added any products to your cart yet.
      </p>
      <Button asChild>
        <a href="/configurator">Start Configuring</a>
      </Button>
    </div>
  );
};
