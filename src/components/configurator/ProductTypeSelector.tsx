
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface ProductTypeSelectorProps {
  productType: 'window' | 'door';
  onProductTypeChange: (value: 'window' | 'door') => void;
}

export const ProductTypeSelector = ({ productType, onProductTypeChange }: ProductTypeSelectorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>1. Choose Product Type</CardTitle>
        <CardDescription>Select whether you need a window or a door</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup 
          defaultValue={productType} 
          onValueChange={(value) => onProductTypeChange(value as 'window' | 'door')}
          className="grid grid-cols-2 gap-4"
        >
          <Label
            htmlFor="window"
            className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer ${
              productType === 'window' ? 'border-primary' : 'border-border'
            }`}
          >
            <RadioGroupItem value="window" id="window" className="sr-only" />
            <span className="text-4xl mb-2">🪟</span>
            <span className="text-center font-medium">Window</span>
          </Label>
          <Label
            htmlFor="door"
            className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer ${
              productType === 'door' ? 'border-primary' : 'border-border'
            }`}
          >
            <RadioGroupItem value="door" id="door" className="sr-only" />
            <span className="text-4xl mb-2">🚪</span>
            <span className="text-center font-medium">Door</span>
          </Label>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};
