
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuantitySelectorProps {
  productType: 'window' | 'door';
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export const QuantitySelector = ({ 
  productType, 
  quantity, 
  onQuantityChange 
}: QuantitySelectorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{productType === 'window' ? '8' : '6'}. Quantity</CardTitle>
        <CardDescription>How many of this configured product do you need?</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            -
          </Button>
          <div className="w-16 text-center font-medium text-lg">{quantity}</div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onQuantityChange(quantity + 1)}
          >
            +
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
