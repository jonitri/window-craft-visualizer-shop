
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WindowType, OpeningDirection } from '@/data/windowTypes';
import { ColorOption } from '@/data/products';

interface ProductSummaryProps {
  productType: 'window' | 'door';
  profileObject: { name: string };
  glazingObject: { name: string };
  windowTypeObject: WindowType | undefined;
  openingDirectionObject: OpeningDirection | undefined;
  baseColorObject: ColorOption;
  outsideColorObject: ColorOption;
  insideColorObject: ColorOption;
  rubberColorObject: ColorOption;
  width: number;
  height: number;
  quantity: number;
  calculatedPrice: number;
  onAddToCart: () => void;
}

export const ProductSummary = ({
  productType,
  profileObject,
  glazingObject,
  windowTypeObject,
  openingDirectionObject,
  baseColorObject,
  outsideColorObject,
  insideColorObject,
  rubberColorObject,
  width,
  height,
  quantity,
  calculatedPrice,
  onAddToCart
}: ProductSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
        <CardDescription>Review your configuration</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-sm text-muted-foreground">Product Type:</div>
          <div className="text-sm font-medium">{productType === 'window' ? 'Window' : 'Door'}</div>
          
          {productType === 'window' && windowTypeObject && (
            <>
              <div className="text-sm text-muted-foreground">Window Type:</div>
              <div className="text-sm font-medium">{windowTypeObject.name}</div>
              
              {windowTypeObject.id !== 'fixed' && openingDirectionObject && (
                <>
                  <div className="text-sm text-muted-foreground">Opening Direction:</div>
                  <div className="text-sm font-medium">{openingDirectionObject.name}</div>
                </>
              )}
            </>
          )}
          
          <div className="text-sm text-muted-foreground">Profile:</div>
          <div className="text-sm font-medium">{profileObject.name}</div>
          
          <div className="text-sm text-muted-foreground">Glazing:</div>
          <div className="text-sm font-medium">{glazingObject.name}</div>
          
          <div className="text-sm text-muted-foreground">Base Color:</div>
          <div className="text-sm font-medium flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{backgroundColor: baseColorObject.hex}}></span>
            {baseColorObject.name}
          </div>
          
          <div className="text-sm text-muted-foreground">Outside Color:</div>
          <div className="text-sm font-medium flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{backgroundColor: outsideColorObject.hex}}></span>
            {outsideColorObject.name}
          </div>
          
          <div className="text-sm text-muted-foreground">Inside Color:</div>
          <div className="text-sm font-medium flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{backgroundColor: insideColorObject.hex}}></span>
            {insideColorObject.name}
          </div>
          
          <div className="text-sm text-muted-foreground">Rubber Seals:</div>
          <div className="text-sm font-medium flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{backgroundColor: rubberColorObject.hex}}></span>
            {rubberColorObject.name}
          </div>
          
          <div className="text-sm text-muted-foreground">Dimensions:</div>
          <div className="text-sm font-medium">{width}mm × {height}mm</div>
          
          <div className="text-sm text-muted-foreground">Quantity:</div>
          <div className="text-sm font-medium">{quantity}</div>
        </div>
        
        <div className="pt-4 border-t border-border">
          <div className="flex justify-between items-center">
            <div className="font-semibold">Price per unit:</div>
            <div className="font-semibold">${calculatedPrice.toFixed(2)}</div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="font-bold text-lg">Total Price:</div>
            <div className="font-bold text-lg">${(calculatedPrice * quantity).toFixed(2)}</div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={onAddToCart}>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
};
