
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { glazingOptions } from '@/data/products';

interface GlazingSelectorProps {
  productType: 'window' | 'door';
  selectedGlazing: string;
  onGlazingChange: (glazingId: string) => void;
}

export const GlazingSelector = ({ 
  productType, 
  selectedGlazing, 
  onGlazingChange 
}: GlazingSelectorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{productType === 'window' ? '5' : '3'}. Choose Glazing</CardTitle>
        <CardDescription>Select the type of glass for your product</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {glazingOptions.map((glazing) => (
            <Label
              key={glazing.id}
              htmlFor={glazing.id}
              className={`flex flex-col h-full rounded-md border-2 p-4 cursor-pointer ${
                selectedGlazing === glazing.id ? 'border-primary' : 'border-border'
              }`}
            >
              <input
                type="radio"
                id={glazing.id}
                name="glazing"
                value={glazing.id}
                checked={selectedGlazing === glazing.id}
                onChange={() => onGlazingChange(glazing.id)}
                className="sr-only"
              />
              <div className="font-medium mb-1">{glazing.name}</div>
              <div className="text-xs text-muted-foreground mb-2">{glazing.description}</div>
              <div className="text-xs mt-auto">
                {glazing.priceModifier > 0 ? `+$${glazing.priceModifier}` : 'Included'}
              </div>
            </Label>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
