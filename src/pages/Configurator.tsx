
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  windowProfiles, 
  doorProfiles, 
  glazingOptions, 
  baseColorOptions,
  outsideColorOptions,
  insideColorOptions,
  rubberColorOptions,
  calculatePrice,
  type Profile,
  type ColorOption,
} from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import { Palette, Square, Droplet } from 'lucide-react';

const Configurator = () => {
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();
  
  // Get initial values from URL if present
  const initialType = searchParams.get('type') === 'door' ? 'door' : 'window';
  const initialProfileId = searchParams.get('profile') || '';
  
  // State for configuration
  const [productType, setProductType] = useState<'window' | 'door'>(initialType as 'window' | 'door');
  const [selectedProfile, setSelectedProfile] = useState<string>(initialProfileId);
  const [selectedGlazing, setSelectedGlazing] = useState<string>('glz-double');
  const [selectedBaseColor, setSelectedBaseColor] = useState<string>('col-white');
  const [selectedOutsideColor, setSelectedOutsideColor] = useState<string>('col-out-white');
  const [selectedInsideColor, setSelectedInsideColor] = useState<string>('col-in-white');
  const [selectedRubberColor, setSelectedRubberColor] = useState<string>('col-rubber-black');
  const [width, setWidth] = useState<number>(1000); // Default 1000mm
  const [height, setHeight] = useState<number>(1200); // Default 1200mm
  const [quantity, setQuantity] = useState<number>(1);
  const [calculatedPrice, setCalculatedPrice] = useState<number>(0);
  
  // Get profiles based on product type
  const availableProfiles = productType === 'window' ? windowProfiles : doorProfiles;
  
  // Find the selected profile, glazing and color objects
  const profileObject = availableProfiles.find(p => p.id === selectedProfile) || availableProfiles[0];
  const glazingObject = glazingOptions.find(g => g.id === selectedGlazing) || glazingOptions[0];
  const baseColorObject = baseColorOptions.find(c => c.id === selectedBaseColor) || baseColorOptions[0];
  const outsideColorObject = outsideColorOptions.find(c => c.id === selectedOutsideColor) || outsideColorOptions[0];
  const insideColorObject = insideColorOptions.find(c => c.id === selectedInsideColor) || insideColorOptions[0];
  const rubberColorObject = rubberColorOptions.find(c => c.id === selectedRubberColor) || rubberColorOptions[0];

  // Combined color price modifier
  const totalColorModifier = baseColorObject.priceModifier + outsideColorObject.priceModifier + 
                            insideColorObject.priceModifier + rubberColorObject.priceModifier;
  
  // Update calculated price whenever options change
  useEffect(() => {
    if (profileObject) {
      const price = calculatePrice(
        profileObject.basePrice,
        glazingObject.priceModifier,
        totalColorModifier,
        width,
        height
      );
      setCalculatedPrice(price);
    }
  }, [
    selectedProfile, selectedGlazing, 
    selectedBaseColor, selectedOutsideColor, selectedInsideColor, selectedRubberColor,
    width, height, profileObject, glazingObject, totalColorModifier
  ]);
  
  // Set a default profile if none is selected
  useEffect(() => {
    if (!selectedProfile && availableProfiles.length > 0) {
      setSelectedProfile(availableProfiles[0].id);
    }
  }, [productType, availableProfiles, selectedProfile]);

  // Handle add to cart
  const handleAddToCart = () => {
    const item = {
      id: `${Date.now()}`,
      type: productType,
      name: `${profileObject.name} ${productType === 'window' ? 'Window' : 'Door'}`,
      profile: profileObject.name,
      glazing: glazingObject.name,
      colors: {
        base: baseColorObject.name,
        outside: outsideColorObject.name,
        inside: insideColorObject.name,
        rubber: rubberColorObject.name,
      },
      dimensions: {
        width,
        height,
      },
      quantity,
      price: calculatedPrice,
      imageUrl: profileObject.imageUrl,
    };
    
    addToCart(item);
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  // Calculate aspect ratio based on dimensions
  const aspectRatio = height / width;
  
  // Helper function to get glass opacity based on glazing
  const getGlassOpacity = () => {
    switch (selectedGlazing) {
      case 'glz-triple':
        return 0.7; // Triple glazing is less transparent
      case 'glz-quad':
        return 0.6; // 4 glazing is even less transparent
      default:
        return 0.9; // Double glazing (standard)
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-secondary">
        <div className="container-custom section-padding">
          <h1 className="heading-1 text-center mb-6">Product Configurator</h1>
          <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto">
            Design your perfect window or door. Customize every detail to match your home and preferences.
          </p>
        </div>
      </section>

      {/* Configurator Section */}
      <section className="container-custom section-padding">
        <div className="grid lg:grid-cols-10 gap-8">
          {/* Configuration Options */}
          <div className="lg:col-span-6 space-y-8">
            {/* Product Type Selection */}
            <Card>
              <CardHeader>
                <CardTitle>1. Choose Product Type</CardTitle>
                <CardDescription>Select whether you need a window or a door</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  defaultValue={productType} 
                  onValueChange={(value) => setProductType(value as 'window' | 'door')}
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

            {/* Profile Selection */}
            <Card>
              <CardHeader>
                <CardTitle>2. Select Profile</CardTitle>
                <CardDescription>Choose a profile based on your requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {availableProfiles.map((profile) => (
                    <Label
                      key={profile.id}
                      htmlFor={profile.id}
                      className={`flex flex-col h-full rounded-md border-2 overflow-hidden cursor-pointer ${
                        selectedProfile === profile.id ? 'border-primary' : 'border-border'
                      }`}
                    >
                      <input
                        type="radio"
                        id={profile.id}
                        name="profile"
                        value={profile.id}
                        checked={selectedProfile === profile.id}
                        onChange={() => setSelectedProfile(profile.id)}
                        className="sr-only"
                      />
                      <div className="h-32 bg-muted flex items-center justify-center">
                        <img
                          src={profile.imageUrl}
                          alt={profile.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-3 flex flex-col flex-1">
                        <h4 className="font-medium">{profile.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{profile.description}</p>
                      </div>
                    </Label>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Glass Options */}
            <Card>
              <CardHeader>
                <CardTitle>3. Choose Glazing</CardTitle>
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
                        onChange={() => setSelectedGlazing(glazing.id)}
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
            
            {/* Color Selection */}
            <Card>
              <CardHeader>
                <CardTitle>4. Select Colors</CardTitle>
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
                            onChange={() => setSelectedBaseColor(color.id)}
                            className="sr-only"
                          />
                          <div 
                            className="w-12 h-12 rounded-full mb-2 border border-border" 
                            style={{ backgroundColor: color.hex }}
                          />
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
                            onChange={() => setSelectedOutsideColor(color.id)}
                            className="sr-only"
                          />
                          <div 
                            className="w-12 h-12 rounded-full mb-2 border border-border" 
                            style={{ backgroundColor: color.hex }}
                          />
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
                            onChange={() => setSelectedInsideColor(color.id)}
                            className="sr-only"
                          />
                          <div 
                            className="w-12 h-12 rounded-full mb-2 border border-border" 
                            style={{ backgroundColor: color.hex }}
                          />
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
                            onChange={() => setSelectedRubberColor(color.id)}
                            className="sr-only"
                          />
                          <div 
                            className="w-12 h-12 rounded-full mb-2 border border-border" 
                            style={{ backgroundColor: color.hex }}
                          />
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
            
            {/* Dimensions */}
            <Card>
              <CardHeader>
                <CardTitle>5. Set Dimensions</CardTitle>
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
                      onValueChange={(value) => setWidth(value[0])}
                    />
                    <Input
                      type="number"
                      value={width}
                      onChange={(e) => {
                        const min = productType === 'window' ? 400 : 800;
                        const max = productType === 'window' ? 2500 : 1200;
                        const value = Number(e.target.value);
                        if (value >= min && value <= max) {
                          setWidth(value);
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
                      onValueChange={(value) => setHeight(value[0])}
                    />
                    <Input
                      type="number"
                      value={height}
                      onChange={(e) => {
                        const min = productType === 'window' ? 400 : 1800;
                        const max = productType === 'window' ? 2500 : 2400;
                        const value = Number(e.target.value);
                        if (value >= min && value <= max) {
                          setHeight(value);
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
            
            {/* Quantity */}
            <Card>
              <CardHeader>
                <CardTitle>6. Quantity</CardTitle>
                <CardDescription>How many of this configured product do you need?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <div className="w-16 text-center font-medium text-lg">{quantity}</div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Preview and Summary */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-24">
              {/* Product Preview */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Product Preview</CardTitle>
                  <CardDescription>Visualization of your configuration</CardDescription>
                </CardHeader>
                <CardContent>
                  <div 
                    className="bg-secondary rounded-lg p-4 flex items-center justify-center"
                    style={{
                      aspectRatio: productType === 'window' ? '4/3' : '2/4',
                      minHeight: '450px',
                    }}
                  >
                    {productType === 'window' ? (
                      // Window visualization
                      <div 
                        className="relative shadow-lg"
                        style={{
                          width: `${Math.min(90, (width / height) * 75)}%`,
                          height: `${Math.min(90, (height / width) * 75)}%`,
                          maxWidth: '90%',
                          maxHeight: '90%',
                          backgroundColor: baseColorObject.hex,
                          borderRadius: '2px',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {/* Outside frame color */}
                        <div 
                          className="absolute inset-0 z-10"
                          style={{ backgroundColor: outsideColorObject.hex }}
                        ></div>
                        
                        {/* Glass area */}
                        <div 
                          className="absolute inset-[10%] flex items-center justify-center overflow-hidden z-20"
                          style={{ 
                            backgroundColor: 'rgba(220, 230, 240, ' + getGlassOpacity() + ')',
                            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15)',
                            borderRadius: '1px',
                          }}
                        >
                          {/* Visualize glazing layers */}
                          {selectedGlazing === 'glz-double' && (
                            <div className="absolute inset-0 border-r border-white opacity-30"></div>
                          )}
                          
                          {selectedGlazing === 'glz-triple' && (
                            <>
                              <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '33%'}}></div>
                              <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '66%'}}></div>
                            </>
                          )}
                          
                          {selectedGlazing === 'glz-quad' && (
                            <>
                              <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '25%'}}></div>
                              <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '50%'}}></div>
                              <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '75%'}}></div>
                            </>
                          )}

                          {profileObject && (
                            <div className="text-xs text-center text-gray-600 font-medium opacity-70">
                              {profileObject.name}
                            </div>
                          )}
                        </div>

                        {/* Window frame divisions based on profile type */}
                        {profileObject && (profileObject.id === 'bluEvolution-92' || profileObject.id === 'evolutionDrive-Plus') && (
                          <>
                            <div className="absolute left-[50%] top-[10%] bottom-[10%] w-[3px] z-30" 
                                 style={{ backgroundColor: outsideColorObject.hex, transform: 'translateX(-50%)' }} />
                          </>
                        )}
                        
                        {profileObject && (profileObject.id === 'greenEvolution-free' || profileObject.id === 'evolutionDrive-HST') && (
                          <>
                            <div className="absolute left-[33%] top-[10%] bottom-[10%] w-[3px] z-30" 
                                 style={{ backgroundColor: outsideColorObject.hex, transform: 'translateX(-50%)' }} />
                            <div className="absolute left-[67%] top-[10%] bottom-[10%] w-[3px] z-30" 
                                 style={{ backgroundColor: outsideColorObject.hex, transform: 'translateX(-50%)' }} />
                          </>
                        )}
                        
                        {/* Rubber seals */}
                        <div 
                          className="absolute inset-[8%] rounded-sm pointer-events-none z-15"
                          style={{ 
                            border: `2px solid ${rubberColorObject.hex}`,
                            opacity: 0.7
                          }}
                        ></div>
                      </div>
                    ) : (
                      // Door visualization
                      <div 
                        className="relative shadow-lg"
                        style={{
                          width: `${Math.min(70, (width / height) * 50)}%`,
                          height: `${Math.min(90, (height / width) * 80)}%`,
                          maxWidth: '70%',
                          maxHeight: '90%',
                          backgroundColor: baseColorObject.hex,
                          borderRadius: '2px',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <div 
                          className="absolute inset-0 flex items-center justify-center z-10"
                          style={{ 
                            backgroundColor: outsideColorObject.hex,
                          }}
                        >
                          {/* Door handle */}
                          <div 
                            className="absolute right-[20%] top-[50%] w-[15px] h-[30px] bg-gray-400 rounded-sm shadow-md z-40"
                            style={{ transform: 'translateY(-50%)' }}
                          />
                          
                          {/* Door glass panel */}
                          {profileObject && (profileObject.id !== 'evolutionDrive-60') && (
                            <div 
                              className="absolute left-[20%] right-[20%] top-[20%] bottom-[50%] flex items-center justify-center z-20"
                              style={{ 
                                backgroundColor: 'rgba(220, 230, 240, ' + getGlassOpacity() + ')',
                                boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15)',
                                borderRadius: '1px',
                              }}
                            >
                              {/* Visualize glazing layers */}
                              {selectedGlazing === 'glz-double' && (
                                <div className="absolute inset-0 border-r border-white opacity-30"></div>
                              )}
                              
                              {selectedGlazing === 'glz-triple' && (
                                <>
                                  <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '33%'}}></div>
                                  <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '66%'}}></div>
                                </>
                              )}
                              
                              {selectedGlazing === 'glz-quad' && (
                                <>
                                  <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '25%'}}></div>
                                  <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '50%'}}></div>
                                  <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '75%'}}></div>
                                </>
                              )}
                            </div>
                          )}
                          
                          {/* Premium door has additional lower panel */}
                          {profileObject && profileObject.id === 'bluEvolution-92' && (
                            <div 
                              className="absolute left-[20%] right-[20%] top-[60%] bottom-[20%] flex items-center justify-center z-20"
                              style={{ 
                                backgroundColor: 'rgba(220, 230, 240, ' + getGlassOpacity() + ')',
                                boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15)',
                                borderRadius: '1px',
                              }}
                            >
                              {/* Visualize glazing layers */}
                              {selectedGlazing === 'glz-double' && (
                                <div className="absolute inset-0 border-r border-white opacity-30"></div>
                              )}
                              
                              {selectedGlazing === 'glz-triple' && (
                                <>
                                  <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '33%'}}></div>
                                  <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '66%'}}></div>
                                </>
                              )}
                              
                              {selectedGlazing === 'glz-quad' && (
                                <>
                                  <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '25%'}}></div>
                                  <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '50%'}}></div>
                                  <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '75%'}}></div>
                                </>
                              )}
                            </div>
                          )}

                          {/* Rubber seals */}
                          <div 
                            className="absolute inset-[5%] rounded-sm pointer-events-none z-15"
                            style={{ 
                              border: `3px solid ${rubberColorObject.hex}`,
                              opacity: 0.8
                            }}
                          ></div>

                          {profileObject && (
                            <div className="absolute bottom-[5%] left-0 right-0 text-xs text-center text-gray-100 font-medium opacity-70 z-30">
                              {profileObject.name}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 text-sm text-center text-muted-foreground">
                    <div>
                      <span className="font-medium">{width}mm × {height}mm</span>
                    </div>
                    <div className="mt-1">
                      {baseColorObject.name} / {glazingObject.name}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Product Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Summary</CardTitle>
                  <CardDescription>Review your configuration</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-sm text-muted-foreground">Product Type:</div>
                    <div className="text-sm font-medium">{productType === 'window' ? 'Window' : 'Door'}</div>
                    
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
                  <Button className="w-full" onClick={handleAddToCart}>Add to Cart</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Configurator;
