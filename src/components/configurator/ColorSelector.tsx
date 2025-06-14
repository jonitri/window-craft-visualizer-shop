
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Palette, Square, Droplet } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { 
  baseColorOptions,
  outsideColorOptions,
  insideColorOptions,
  rubberColorOptions
} from '@/data/products';

interface ColorSelectorProps {
  productType: 'window' | 'door';
  selectedBaseColor: string;
  selectedOutsideColor: string;
  selectedInsideColor: string;
  selectedRubberColor: string;
  onBaseColorChange: (colorId: string) => void;
  onOutsideColorChange: (colorId: string) => void;
  onInsideColorChange: (colorId: string) => void;
  onRubberColorChange: (colorId: string) => void;
}

export const ColorSelector = ({ 
  productType,
  selectedBaseColor,
  selectedOutsideColor,
  selectedInsideColor,
  selectedRubberColor,
  onBaseColorChange,
  onOutsideColorChange,
  onInsideColorChange,
  onRubberColorChange
}: ColorSelectorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{productType === 'window' ? '6' : '4'}. Select Colors</CardTitle>
        <CardDescription>Choose colors for different parts of your product</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="base" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="base" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Base Color</span>
            </TabsTrigger>
            <TabsTrigger value="outside" className="flex items-center gap-2">
              <Square className="h-4 w-4" />
              <span className="hidden sm:inline">Outside</span>
            </TabsTrigger>
            <TabsTrigger value="inside" className="flex items-center gap-2">
              <Square className="h-4 w-4" />
              <span className="hidden sm:inline">Inside</span>
            </TabsTrigger>
            <TabsTrigger value="rubber" className="flex items-center gap-2">
              <Droplet className="h-4 w-4" />
              <span className="hidden sm:inline">Rubber Seal</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Base Color Options */}
          <TabsContent value="base" className="mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {baseColorOptions.map((color) => (
                <Label
                  key={color.id}
                  htmlFor={color.id}
                  className={`flex flex-col items-center rounded-md border-2 p-3 cursor-pointer ${
                    selectedBaseColor === color.id ? 'border-primary' : 'border-border'
                  }`}
                >
                  <input
                    type="radio"
                    id={color.id}
                    name="baseColor"
                    value={color.id}
                    checked={selectedBaseColor === color.id}
                    onChange={() => onBaseColorChange(color.id)}
                    className="sr-only"
                  />
                  <div className="w-12 h-12 rounded-full mb-2 border border-border overflow-hidden">
                    <Image 
                      src={color.imageUrl || '/placeholder.svg'} 
                      alt={color.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-xs font-medium text-center">{color.name}</div>
                  <div className="text-xs text-muted-foreground mt-1 text-center">
                    {color.priceModifier > 0 ? `+$${color.priceModifier}` : 'Included'}
                  </div>
                </Label>
              ))}
            </div>
          </TabsContent>
          
          {/* Outside Color Options */}
          <TabsContent value="outside" className="mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {outsideColorOptions.map((color) => (
                <Label
                  key={color.id}
                  htmlFor={color.id}
                  className={`flex flex-col items-center rounded-md border-2 p-3 cursor-pointer ${
                    selectedOutsideColor === color.id ? 'border-primary' : 'border-border'
                  }`}
                >
                  <input
                    type="radio"
                    id={color.id}
                    name="outsideColor"
                    value={color.id}
                    checked={selectedOutsideColor === color.id}
                    onChange={() => onOutsideColorChange(color.id)}
                    className="sr-only"
                  />
                  <div className="w-12 h-12 rounded-full mb-2 border border-border overflow-hidden">
                    <Image 
                      src={color.imageUrl || '/placeholder.svg'} 
                      alt={color.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-xs font-medium text-center">{color.name}</div>
                  <div className="text-xs text-muted-foreground mt-1 text-center">
                    {color.priceModifier > 0 ? `+$${color.priceModifier}` : 'Included'}
                  </div>
                </Label>
              ))}
            </div>
          </TabsContent>
          
          {/* Inside Color Options */}
          <TabsContent value="inside" className="mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {insideColorOptions.map((color) => (
                <Label
                  key={color.id}
                  htmlFor={color.id}
                  className={`flex flex-col items-center rounded-md border-2 p-3 cursor-pointer ${
                    selectedInsideColor === color.id ? 'border-primary' : 'border-border'
                  }`}
                >
                  <input
                    type="radio"
                    id={color.id}
                    name="insideColor"
                    value={color.id}
                    checked={selectedInsideColor === color.id}
                    onChange={() => onInsideColorChange(color.id)}
                    className="sr-only"
                  />
                  <div className="w-12 h-12 rounded-full mb-2 border border-border overflow-hidden">
                    <Image 
                      src={color.imageUrl || '/placeholder.svg'} 
                      alt={color.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-xs font-medium text-center">{color.name}</div>
                  <div className="text-xs text-muted-foreground mt-1 text-center">
                    {color.priceModifier > 0 ? `+$${color.priceModifier}` : 'Included'}
                  </div>
                </Label>
              ))}
            </div>
          </TabsContent>
          
          {/* Rubber Seal Color Options */}
          <TabsContent value="rubber" className="mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {rubberColorOptions.map((color) => (
                <Label
                  key={color.id}
                  htmlFor={color.id}
                  className={`flex flex-col items-center rounded-md border-2 p-3 cursor-pointer ${
                    selectedRubberColor === color.id ? 'border-primary' : 'border-border'
                  }`}
                >
                  <input
                    type="radio"
                    id={color.id}
                    name="rubberColor"
                    value={color.id}
                    checked={selectedRubberColor === color.id}
                    onChange={() => onRubberColorChange(color.id)}
                    className="sr-only"
                  />
                  <div className="w-12 h-12 rounded-full mb-2 border border-border overflow-hidden">
                    <Image 
                      src={color.imageUrl || '/placeholder.svg'} 
                      alt={color.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-xs font-medium text-center">{color.name}</div>
                  <div className="text-xs text-muted-foreground mt-1 text-center">
                    {color.priceModifier > 0 ? `+$${color.priceModifier}` : 'Included'}
                  </div>
                </Label>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
