
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';

interface DimensionsSelectorProps {
  productType: 'window' | 'door';
  width: number;
  height: number;
  onWidthChange: (width: number) => void;
  onHeightChange: (height: number) => void;
}

export const DimensionsSelector = ({ 
  productType, 
  width, 
  height, 
  onWidthChange, 
  onHeightChange 
}: DimensionsSelectorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{productType === 'window' ? '7' : '5'}. Set Dimensions</CardTitle>
        <CardDescription>Specify the size of your product (in millimeters)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label htmlFor="width">Width: {width}mm</Label>
              <div className="text-sm text-muted-foreground">
                {productType === 'window' ? '400mm - 2500mm' : '800mm - 1200mm'}
              </div>
            </div>
            <Slider
              id="width"
              min={productType === 'window' ? 400 : 800}
              max={productType === 'window' ? 2500 : 1200}
              step={10}
              value={[width]}
              onValueChange={(value) => onWidthChange(value[0])}
            />
            <Input
              type="number"
              value={width}
              onChange={(e) => {
                const min = productType === 'window' ? 400 : 800;
                const max = productType === 'window' ? 2500 : 1200;
                const value = Number(e.target.value);
                if (value >= min && value <= max) {
                  onWidthChange(value);
                }
              }}
              min={productType === 'window' ? 400 : 800}
              max={productType === 'window' ? 2500 : 1200}
              className="mt-2"
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label htmlFor="height">Height: {height}mm</Label>
              <div className="text-sm text-muted-foreground">
                {productType === 'window' ? '400mm - 2500mm' : '1800mm - 2400mm'}
              </div>
            </div>
            <Slider
              id="height"
              min={productType === 'window' ? 400 : 1800}
              max={productType === 'window' ? 2500 : 2400}
              step={10}
              value={[height]}
              onValueChange={(value) => onHeightChange(value[0])}
            />
            <Input
              type="number"
              value={height}
              onChange={(e) => {
                const min = productType === 'window' ? 400 : 1800;
                const max = productType === 'window' ? 2500 : 2400;
                const value = Number(e.target.value);
                if (value >= min && value <= max) {
                  onHeightChange(value);
                }
              }}
              min={productType === 'window' ? 400 : 1800}
              max={productType === 'window' ? 2500 : 2400}
              className="mt-2"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
