import { useRef } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCw, RotateCcw } from 'lucide-react';
import { ColorOption } from '@/data/products';
import { WindowType, OpeningDirection } from '@/data/windowTypes';

interface ProductPreviewProps {
  productType: 'window' | 'door';
  width: number;
  height: number;
  selectedWindowType: string;
  selectedOpeningDirection: string;
  baseColorObject: ColorOption;
  outsideColorObject: ColorOption;
  insideColorObject: ColorOption;
  rubberColorObject: ColorOption;
  glazingObject: { id: string; name: string };
  profileObject: { id: string; name: string };
  windowTypeObject: WindowType | undefined;
  openingDirectionObject: OpeningDirection | undefined;
  rotationX: number;
  rotationY: number;
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onResetRotation: () => void;
}

export const ProductPreview = ({
  productType,
  width,
  height,
  selectedWindowType,
  selectedOpeningDirection,
  baseColorObject,
  outsideColorObject,
  insideColorObject,
  rubberColorObject,
  glazingObject,
  profileObject,
  windowTypeObject,
  openingDirectionObject,
  rotationX,
  rotationY,
  onRotateLeft,
  onRotateRight,
  onResetRotation
}: ProductPreviewProps) => {
  const previewRef = useRef<HTMLDivElement>(null);

  // Helper function to get glass opacity based on glazing
  const getGlassOpacity = () => {
    switch (glazingObject.id) {
      case 'glz-triple':
        return 0.7; // Triple glazing is less transparent
      case 'glz-quad':
        return 0.6; // 4 glazing is even less transparent
      default:
        return 0.85; // Double glazing (standard)
    }
  };
  
  // Helper function to get frame thickness based on profile
  const getFrameThickness = () => {
    if (profileObject.id.includes('bluEvolution')) {
      return 24; // Premium profiles have thicker frames
    } else if (profileObject.id.includes('evolutionDrive')) {
      return 20; // Mid-range profiles
    } else {
      return 16; // Standard profiles
    }
  };

  // Update the getOpeningDirectionIcon function to use arrow indicators
  const getOpeningDirectionIcon = (direction: string) => {
    switch(direction) {
      case 'left':
        return (
          <div className="w-6 h-6 flex items-center justify-center">
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-r-[10px] border-r-primary border-b-[6px] border-b-transparent" />
          </div>
        );
      case 'right':
        return (
          <div className="w-6 h-6 flex items-center justify-center">
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-primary border-b-[6px] border-b-transparent" />
          </div>
        );
      case 'top-left':
        return (
          <div className="w-6 h-6 flex items-center justify-center">
            <div className="w-0 h-0 border-r-[6px] border-r-transparent border-l-[6px] border-l-transparent border-b-[10px] border-b-primary transform rotate-[225deg]" />
          </div>
        );
      case 'top-right':
        return (
          <div className="w-6 h-6 flex items-center justify-center">
            <div className="w-0 h-0 border-r-[6px] border-r-transparent border-l-[6px] border-l-transparent border-b-[10px] border-b-primary transform rotate-[135deg]" />
          </div>
        );
      default:
        return null;
    }
  };

  const frameThickness = getFrameThickness();
  
  // Calculate handle position based on window type
  const getHandlePosition = (isRightSide: boolean) => {
    if (selectedWindowType === 'double-leaf') {
      return isRightSide ? '20%' : '80%';
    } else {
      return isRightSide ? '30%' : '70%';
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Product Preview</CardTitle>
        <CardDescription>Visualization of your configuration</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex mb-4 justify-between items-center">
          <div className="text-sm text-muted-foreground">Use the buttons to rotate the product</div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onRotateLeft} 
              className="flex items-center gap-1"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onResetRotation} 
              className="flex items-center gap-1"
            >
              Reset
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onRotateRight} 
              className="flex items-center gap-1"
            >
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div 
          className="bg-secondary rounded-lg p-8 flex items-center justify-center relative"
          style={{ 
            perspective: '2000px', 
            height: '450px', 
            overflow: 'hidden',
            background: 'linear-gradient(to bottom, #e0e8f0, #c0d0e0)'
          }}
        >
          {productType === 'window' ? (
            // Window visualization with improved 3D appearance
            <div 
              ref={previewRef}
              className="relative transition-transform duration-500"
              style={{
                width: `${Math.min(70, (width / height) * 55)}%`,
                height: `${Math.min(70, (height / width) * 55)}%`,
                maxWidth: '80%',
                maxHeight: '80%',
                transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
                transformStyle: 'preserve-3d',
                boxShadow: '0px 20px 40px rgba(0,0,0,0.3)',
              }}
            >
              {/* Base frame with depth */}
              <div 
                className="absolute inset-0 rounded-md"
                style={{ 
                  backgroundColor: baseColorObject.hex,
                  transform: 'translateZ(0px)',
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}
              ></div>
              
              {/* Frame sides for depth - larger values for better 3D effect */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-6"
                style={{ 
                  backgroundColor: baseColorObject.hex,
                  transform: 'rotateY(-90deg) translateZ(-3px)',
                  transformOrigin: 'left',
                  borderRight: '1px solid rgba(0,0,0,0.1)',
                }}
              ></div>
              
              <div 
                className="absolute right-0 top-0 bottom-0 w-6"
                style={{ 
                  backgroundColor: baseColorObject.hex,
                  transform: 'rotateY(90deg) translateZ(-3px)',
                  transformOrigin: 'right',
                  borderLeft: '1px solid rgba(0,0,0,0.1)',
                }}
              ></div>
              
              <div 
                className="absolute left-0 right-0 top-0 h-6"
                style={{ 
                  backgroundColor: baseColorObject.hex,
                  transform: 'rotateX(90deg) translateZ(-3px)',
                  transformOrigin: 'top',
                  borderBottom: '1px solid rgba(0,0,0,0.1)',
                }}
              ></div>
              
              <div 
                className="absolute left-0 right-0 bottom-0 h-6"
                style={{ 
                  backgroundColor: baseColorObject.hex,
                  transform: 'rotateX(-90deg) translateZ(-3px)',
                  transformOrigin: 'bottom',
                  borderTop: '1px solid rgba(0,0,0,0.1)',
                }}
              ></div>
              
              {/* Outside frame (front face) */}
              <div 
                className="absolute inset-0 rounded-md"
                style={{ 
                  backgroundColor: outsideColorObject.hex, 
                  transform: 'translateZ(1px)',
                }}
              >
                {/* Frame inner border */}
                <div 
                  className="absolute" 
                  style={{ 
                    inset: `${frameThickness}px`,
                    border: `2px solid ${outsideColorObject.hex}`,
                    borderColor: `${outsideColorObject.hex} rgba(0,0,0,0.2) rgba(0,0,0,0.2) ${outsideColorObject.hex}`,
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)',
                  }}
                ></div>
              </div>

              {/* Inside frame (back face) */}
              <div 
                className="absolute inset-0 rounded-md"
                style={{ 
                  backgroundColor: insideColorObject.hex, 
                  transform: 'rotateY(180deg) translateZ(1px)',
                }}
              >
                {/* Frame inner border */}
                <div 
                  className="absolute" 
                  style={{ 
                    inset: `${frameThickness}px`,
                    border: `2px solid ${insideColorObject.hex}`,
                    borderColor: `${insideColorObject.hex} rgba(0,0,0,0.2) rgba(0,0,0,0.2) ${insideColorObject.hex}`,
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.1)',
                  }}
                ></div>
              </div>
              
              {/* Render window based on type */}
              {selectedWindowType === 'single-leaf' && (
                <>
                  {/* Front glass panel */}
                  <div 
                    className="absolute flex items-center justify-center overflow-hidden"
                    style={{ 
                      inset: `${frameThickness}px`,
                      backgroundColor: 'rgba(220, 230, 240, ' + getGlassOpacity() + ')',
                      boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.3)',
                      borderRadius: '2px',
                      transform: 'translateZ(5px)', // Moved in front of the frame
                      border: `1px solid ${rubberColorObject.hex}`,
                    }}
                  >
                    {/* Opening direction indicator */}
                    <div className="absolute">
                      {selectedOpeningDirection !== 'fixed' && getOpeningDirectionIcon(selectedOpeningDirection)}
                    </div>
                    
                    {/* Glazing layers visualization */}
                    {glazingObject.id === 'glz-double' && (
                      <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '50%'}}></div>
                    )}
                    
                    {glazingObject.id === 'glz-triple' && (
                      <>
                        <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '33%'}}></div>
                        <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '66%'}}></div>
                      </>
                    )}
                    
                    {glazingObject.id === 'glz-quad' && (
                      <>
                        <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '25%'}}></div>
                        <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '50%'}}></div>
                        <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '75%'}}></div>
                      </>
                    )}

                    <div className="text-xs text-center text-gray-600 font-medium opacity-70">
                      {profileObject.name}
                    </div>
                  </div>

                  {/* Back glass panel - with glass opening (no full sash) */}
                  <div 
                    className="absolute overflow-hidden"
                    style={{ 
                      inset: `${frameThickness}px`,
                      backgroundColor: 'rgba(220, 230, 240, ' + getGlassOpacity() + ')',
                      boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.3)',
                      borderRadius: '2px',
                      transform: 'rotateY(180deg) translateZ(5px)',
                      border: `1px solid ${rubberColorObject.hex}`,
                    }}
                  >
                    {/* Inner frame with small bezel */}
                    <div 
                      className="absolute pointer-events-none" 
                      style={{ 
                        inset: '0',
                        border: `8px solid ${insideColorObject.hex}`,
                        borderRadius: '2px',
                      }}
                    ></div>

                    {/* Glazing layers visualization */}
                    {glazingObject.id === 'glz-double' && (
                      <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '50%'}}></div>
                    )}
                    
                    {glazingObject.id === 'glz-triple' && (
                      <>
                        <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '33%'}}></div>
                        <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '66%'}}></div>
                      </>
                    )}
                    
                    {glazingObject.id === 'glz-quad' && (
                      <>
                        <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '25%'}}></div>
                        <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '50%'}}></div>
                        <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '75%'}}></div>
                      </>
                    )}
                  </div>
                </>
              )}
              
              {selectedWindowType === 'double-leaf' && (
                <>
                  {/* Left leaf - front */}
                  <div 
                    className="absolute overflow-hidden"
                    style={{ 
                      top: `${frameThickness}px`,
                      bottom: `${frameThickness}px`,
                      left: `${frameThickness}px`,
                      width: `calc(50% - ${frameThickness * 1.5}px)`,
                      backgroundColor: 'rgba(220, 230, 240, ' + getGlassOpacity() + ')',
                      boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.3)',
                      borderRadius: '2px',
                      transform: 'translateZ(5px)', // Moved in front of the frame
                      border: `1px solid ${rubberColorObject.hex}`,
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      {selectedOpeningDirection === 'left' || selectedOpeningDirection === 'top-left' ? 
                        getOpeningDirectionIcon(selectedOpeningDirection) : null}
                    </div>
                  </div>
                  
                  {/* Left leaf - back (with glass opening) */}
                  <div 
                    className="absolute overflow-hidden"
                    style={{ 
                      top: `${frameThickness}px`,
                      bottom: `${frameThickness}px`,
                      left: `${frameThickness}px`,
                      width: `calc(50% - ${frameThickness * 1.5}px)`,
                      backgroundColor: 'rgba(220, 230, 240, ' + getGlassOpacity() + ')',
                      boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.3)',
                      borderRadius: '2px',
                      transform: 'rotateY(180deg) translateZ(5px)',
                      border: `1px solid ${rubberColorObject.hex}`,
                    }}
                  >
                    {/* Inner frame with small bezel */}
                    <div 
                      className="absolute pointer-events-none" 
                      style={{ 
                        inset: '0',
                        border: `8px solid ${insideColorObject.hex}`,
                        borderRadius: '2px',
                      }}
                    ></div>
                  </div>
                  
                  {/* Right leaf - front */}
                  <div 
                    className="absolute overflow-hidden"
                    style={{ 
                      top: `${frameThickness}px`,
                      bottom: `${frameThickness}px`,
                      right: `${frameThickness}px`,
                      width: `calc(50% - ${frameThickness * 1.5}px)`,
                      backgroundColor: 'rgba(220, 230, 240, ' + getGlassOpacity() + ')',
                      boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.3)',
                      borderRadius: '2px',
                      transform: 'translateZ(5px)', // Moved in front of the frame
                      border: `1px solid ${rubberColorObject.hex}`,
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      {selectedOpeningDirection === 'right' || selectedOpeningDirection === 'top-right' ? 
                        getOpeningDirectionIcon(selectedOpeningDirection) : null}
                    </div>
                  </div>
                  
                  {/* Right leaf - back (with glass opening) */}
                  <div 
                    className="absolute overflow-hidden"
                    style={{ 
                      top: `${frameThickness}px`,
                      bottom: `${frameThickness}px`,
                      right: `${frameThickness}px`,
                      width: `calc(50% - ${frameThickness * 1.5}px)`,
                      backgroundColor: 'rgba(220, 230, 240, ' + getGlassOpacity() + ')',
                      boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.3)',
                      borderRadius: '2px',
                      transform: 'rotateY(180deg) translateZ(5px)',
                      border: `1px solid ${rubberColorObject.hex}`,
                    }}
                  >
                    {/* Inner frame with small bezel */}
                    <div 
                      className="absolute pointer-events-none" 
                      style={{ 
                        inset: '0',
                        border: `8px solid ${insideColorObject.hex}`,
                        borderRadius: '2px',
                      }}
                    ></div>
                  </div>
                  
                  {/* Central divider - front */}
                  <div 
                    className="absolute" 
                    style={{ 
                      left: '50%',
                      top: `${frameThickness}px`,
                      bottom: `${frameThickness}px`,
                      width: `${frameThickness}px`,
                      backgroundColor: outsideColorObject.hex, 
                      transform: 'translateX(-50%) translateZ(5px)',
                      boxShadow: '0 0 5px rgba(0,0,0,0.2)',
                    }} 
                  />
                  
                  {/* Central divider - back */}
                  <div 
                    className="absolute" 
                    style={{ 
                      left: '50%',
                      top: `${frameThickness}px`,
                      bottom: `${frameThickness}px`,
                      width: `${frameThickness}px`,
                      backgroundColor: insideColorObject.hex, 
                      transform: 'translateX(-50%) rotateY(180deg) translateZ(5px)',
                      boxShadow: '0 0 5px rgba(0,0,0,0.2)',
                    }} 
                  />
                </>
              )}
              
              {selectedWindowType === 'triple-leaf' && (
                <>
                  {/* Left leaf - front */}
                  <div 
                    className="absolute overflow-hidden"
                    style={{ 
                      top: `${frameThickness}px`,
                      bottom: `${frameThickness}px`,
                      left: `${frameThickness}px`,
                      width: `calc(33.33% - ${frameThickness * 1.33}px)`,
                      backgroundColor: 'rgba(220, 230, 240, ' + getGlassOpacity() + ')',
                      boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.3)',
                      borderRadius: '2px',
                      transform: 'translateZ(2px)',
                      border: `1px solid ${rubberColorObject.hex}`,
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      {selectedOpeningDirection === 'left' || selectedOpeningDirection === 'top-left' ? 
                        getOpeningDirectionIcon(selectedOpeningDirection) : null}
                    </div>
                  </div>
                  
                  {/* Left leaf - back (with glass opening) */}
                  <div 
                    className="absolute overflow-hidden"
                    style={{ 
                      top: `${frameThickness}px`,
                      bottom: `${frameThickness}px`,
                      left: `${frameThickness}px`,
                      width: `calc(33.33% - ${frameThickness * 1.33}px)`,
                      backgroundColor: insideColorObject.hex,
                      borderRadius: '2px',
                      transform: 'rotateY(180deg) translateZ(2px)',
                      border: `1px solid ${rubberColorObject.hex}`,
                    }}
                  >
                    <div
                      className="absolute"
                      style={{ 
                        inset: '8px',
                        backgroundColor: 'rgba(220, 230, 240, ' + getGlassOpacity() + ')',
                        boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.3)',
                      }}
                    ></div>
                  </div>
                  
                  {/* Middle leaf - front */}
                  <div 
                    className="absolute overflow-hidden"
                    style={{ 
                      top: `${frameThickness}px`,
                      bottom: `${frameThickness}px`,
                      left: `calc(33.33% + ${frameThickness * 0.67}px)`,
                      width: `calc(33.34% - ${frameThickness * 1.34}px)`,
                      backgroundColor: 'rgba(220, 230, 240, ' + getGlassOpacity() + ')',
                      boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.3)',
                      borderRadius: '2px',
                      transform: 'translateZ(2px)',
                      border: `1px solid ${rubberColorObject.hex}`,
                    }}
                  />
                  
                  {/* Middle leaf - back (with glass opening) */}
                  <div 
                    className="absolute overflow-hidden"
                    style={{ 
                      top: `${frameThickness}px`,
                      bottom: `${frameThickness}px`,
                      left: `calc(33.33% + ${frameThickness * 0.67}px)`,
                      width: `calc(33.34% - ${frameThickness * 1.34}px)`,
                      backgroundColor: insideColorObject.hex,
                      borderRadius: '2px',
                      transform: 'rotateY(180deg) translateZ(2px)',
                      border: `1px solid ${rubberColorObject.hex}`,
                    }}
                  >
                    <div
                      className="absolute"
                      style={{ 
                        inset: '8px',
                        backgroundColor: 'rgba(220, 230, 240, ' + getGlassOpacity() + ')',
                        boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.3)',
                      }}
                    ></div>
                  </div>
                  
                  {/* Right leaf - front */}
                  <div 
                    className="absolute overflow-hidden"
                    style={{ 
                      top: `${frameThickness}px`,
                      bottom: `${frameThickness}px`,
                      right: `${frameThickness}px`,
                      width: `calc(33.33% - ${frameThickness * 1.33}px)`,
                      backgroundColor: 'rgba(220, 230, 240, ' + getGlassOpacity() + ')',
                      boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.3)',
                      borderRadius: '2px',
                      transform: 'translateZ(2px)',
                      border: `1px solid ${rubberColorObject.hex}`,
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      {selectedOpeningDirection === 'right' || selectedOpeningDirection === 'top-right' ? 
                        getOpeningDirectionIcon(selectedOpeningDirection) : null}
                    </div>
                  </div>
                  
                  {/* Right leaf - back (with glass opening) */}
                  <div 
                    className="absolute overflow-hidden"
                    style={{ 
                      top: `${frameThickness}px`,
                      bottom: `${frameThickness}px`,
                      right: `${frameThickness}px`,
                      width: `calc(33.33% - ${frameThickness * 1.33}px)`,
                      backgroundColor: insideColorObject.hex,
                      borderRadius: '2px',
                      transform: 'rotateY(180deg) translateZ(2px)',
                      border: `1px solid ${rubberColorObject.hex}`,
                    }}
                  >
                    <div
                      className="absolute"
                      style={{ 
                        inset: '8px',
                        backgroundColor: 'rgba(220, 230, 240, ' + getGlassOpacity() + ')',
                        boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.3)',
                      }}
                    ></div>
                  </div>
                  
                  {/* Dividers - front */}
                  <div 
                    className="absolute" 
                    style={{ 
                      left: '33.33%',
                      top: `${frameThickness}px`,
                      bottom: `${frameThickness}px`,
                      width: `${frameThickness}px`,
                      backgroundColor: outsideColorObject.hex, 
                      transform: 'translateX(-50%) translateZ(2px)',
                      boxShadow: '0 0 5px rgba(0,0,0,0.2)',
                    }} 
                  />
                  
                  <div 
                    className="absolute" 
                    style={{ 
                      left: '66.67%',
                      top: `${frameThickness}px`,
                      bottom: `${frameThickness}px`,
                      width: `${frameThickness}px`,
                      backgroundColor: outsideColorObject.hex, 
                      transform: 'translateX(-50%) translateZ(2px)',
                      boxShadow: '0 0 5px rgba(0,0,0,0.2)',
                    }} 
                  />
                  
                  {/* Dividers - back */}
                  <div 
                    className="absolute" 
                    style={{ 
                      left: '33.33%',
                      top: `${frameThickness}px`,
                      bottom: `${frameThickness}px`,
                      width: `${frameThickness}px`,
                      backgroundColor: insideColorObject.hex, 
                      transform: 'translateX(-50%) rotateY(180deg) translateZ(2px)',
                      boxShadow: '0 0 5px rgba(0,0,0,0.2)',
                    }} 
                  />
                  
                  <div 
                    className="absolute" 
                    style={{ 
                      left: '66.67%',
                      top: `${frameThickness}px`,
                      bottom: `${frameThickness}px`,
                      width: `${frameThickness}px`,
                      backgroundColor: insideColorObject.hex, 
                      transform: 'translateX(-50%) rotateY(180deg) translateZ(2px)',
                      boxShadow: '0 0 5px rgba(0,0,0,0.2)',
                    }} 
                  />
                </>
              )}
              
              {selectedWindowType === 'fixed' && (
                <>
                  {/* Fixed front glass panel */}
                  <div 
                    className="absolute flex items-center justify-center overflow-hidden"
                    style={{ 
                      inset: `${frameThickness}px`,
                      backgroundColor: 'rgba(220, 230, 240, ' + getGlassOpacity() + ')',
                      boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.3)',
                      borderRadius: '2px',
                      transform: 'translateZ(2px)',
                      border: `1px solid ${rubberColorObject.hex}`,
                    }}
                  >
                    <div className="text-sm font-medium opacity-70">Fixed</div>
                    
                    {/* Visualize glazing layers */}
                    {glazingObject.id === 'glz-double' && (
                      <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '50%'}}></div>
                    )}
                    
                    {glazingObject.id === 'glz-triple' && (
                      <>
                        <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '33%'}}></div>
                        <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '66%'}}></div>
                      </>
                    )}
                    
                    {glazingObject.id === 'glz-quad' && (
                      <>
                        <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '25%'}}></div>
                        <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '50%'}}></div>
                        <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '75%'}}></div>
                      </>
                    )}

                    <div className="text-xs text-center text-gray-600 font-medium opacity-70">
                      {profileObject.name}
                    </div>
                  </div>

                  {/* Fixed back glass panel */}
                  <div 
                    className="absolute overflow-hidden"
                    style={{ 
                      inset: `${frameThickness}px`,
                      backgroundColor: 'rgba(220, 230, 240, ' + getGlassOpacity() + ')',
                      boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.3)',
                      borderRadius: '2px',
                      transform: 'rotateY(180deg) translateZ(2px)',
                      border: `1px solid ${rubberColorObject.hex}`,
                    }}
                  />
                </>
              )}

              {/* Add hardware details like handles for opening windows */}
              {selectedWindowType !== 'fixed' && (
                <>
                  {/* Handle for front side */}
                  <div
                    className="absolute z-10"
                    style={{
                      width: '12px',
                      height: '30px',
                      right: getHandlePosition(true),
                      top: '50%',
                      transform: 'translateY(-50%) translateZ(6px)',
                      backgroundColor: '#888',
                      borderRadius: '2px',
                      boxShadow: '0 0 3px rgba(0,0,0,0.3)'
                    }}
                  >
                    <div
                      className="absolute"
                      style={{
                        width: '20px',
                        height: '5px',
                        left: '-4px',
                        top: '12px',
                        backgroundColor: '#777',
                        borderRadius: '1px',
                      }}
                    />
                  </div>

                  {/* Handle for back side */}
                  <div
                    className="absolute z-10"
                    style={{
                      width: '12px',
                      height: '30px',
                      left: getHandlePosition(false),
                      top: '50%',
                      transform: 'translateY(-50%) rotateY(180deg) translateZ(6px)',
                      backgroundColor: '#888',
                      borderRadius: '2px',
                      boxShadow: '0 0 3px rgba(0,0,0,0.3)'
                    }}
                  >
                    <div
                      className="absolute"
                      style={{
                        width: '20px',
                        height: '5px',
                        left: '-4px',
                        top: '12px',
                        backgroundColor: '#777',
                        borderRadius: '1px',
                      }}
                    />
                  </div>
                </>
              )}

              {/* Window silhouette shadow for depth */}
              <div
                className="absolute"
                style={{
                  inset: '-10px',
                  transform: 'translateZ(-5px)',
                  backgroundColor: 'rgba(0,0,0,0.07)',
                  filter: 'blur(10px)',
                  borderRadius: '8px',
                }}
              />
            </div>
          ) : (
            // Door visualization - with enhanced 3D appearance
            <div 
              ref={previewRef}
              className="relative transition-transform duration-500"
              style={{
                width: `${Math.min(60, (width / height) * 45)}%`,
                height: `${Math.min(80, (height / width) * 75)}%`,
                maxWidth: '70%',
                maxHeight: '80%',
                transformStyle: 'preserve-3d',
                transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
                boxShadow: '0px 30px 60px rgba(0,0,0,0.4)',
              }}
            >
              {/* Base frame */}
              <div 
                className="absolute inset-0 rounded-md"
                style={{ 
                  backgroundColor: baseColorObject.hex,
                  transform: 'translateZ(0px)',
                  transformStyle: 'preserve-3d',
                }}
              ></div>
              
              {/* Frame sides for proper depth */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-10"
                style={{ 
                  backgroundColor: baseColorObject.hex,
                  transform: 'rotateY(-90deg) translateZ(0px)',
                  transformOrigin: 'left',
                  borderRight: '1px solid rgba(0,0,0,0.1)',
                }}
              ></div>
              
              <div 
                className="absolute right-0 top-0 bottom-0 w-10"
                style={{ 
                  backgroundColor: baseColorObject.hex,
                  transform: 'rotateY(90deg) translateZ(0px)',
                  transformOrigin: 'right',
                  borderLeft: '1px solid rgba(0,0,0,0.1)',
                }}
              ></div>
              
              <div 
                className="absolute left-0 right-0 top-0 h-10"
                style={{ 
                  backgroundColor: baseColorObject.hex,
                  transform: 'rotateX(90deg) translateZ(0px)',
                  transformOrigin: 'top',
                  borderBottom: '1px solid rgba(0,0,0,0.1)',
                }}
              ></div>
              
              <div 
                className="absolute left-0 right-0 bottom-0 h-10"
                style={{ 
                  backgroundColor: baseColorObject.hex,
                  transform: 'rotateX(-90deg) translateZ(0px)',
                  transformOrigin: 'bottom',
                  borderTop: '1px solid rgba(0,0,0,0.1)',
                }}
              ></div>
              
              {/* Outside surface (front) */}
              <div 
                className="absolute inset-0 rounded-md"
                style={{ 
                  backgroundColor: outsideColorObject.hex, 
                  transform: 'translateZ(5px)',
                  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)',
                }}
              ></div>

              {/* Inside surface (back) */}
              <div 
                className="absolute inset-0 rounded-md"
                style={{ 
                  backgroundColor: insideColorObject.hex, 
                  transform: 'rotateY(180deg) translateZ(5px)',
                  boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)',
                }}
              ></div>
              
              {/* Door handle - front */}
              <div 
                className="absolute z-10"
                style={{ 
                  right: '20%',
                  top: '50%',
                  width: '15px', 
                  height: '60px',
                  backgroundColor: '#999',
                  borderRadius: '3px',
                  boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3), inset 1px 1px 2px rgba(255, 255, 255, 0.5)',
                  transform: 'translateY(-50%) translateZ(6px)',
                }}
              >
                <div
                  className="absolute"
                  style={{
                    width: '25px',
                    height: '10px',
                    left: '-5px',
                    top: '25px',
                    backgroundColor: '#888',
                    borderRadius: '2px',
                    boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)'
                  }}
                />
              </div>
              
              {/* Door handle - back */}
              <div 
                className="absolute z-10"
                style={{ 
                  left: '20%', 
                  top: '50%',
                  width: '15px', 
                  height: '60px',
                  backgroundColor: '#999',
                  borderRadius: '3px',
                  boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3), inset 1px 1px 2px rgba(255, 255, 255, 0.5)',
                  transform: 'translateY(-50%) rotateY(180deg) translateZ(6px)',
                }}
              >
                <div
                  className="absolute"
                  style={{
                    width: '25px',
                    height: '10px',
                    left: '-5px',
                    top: '25px',
                    backgroundColor: '#888',
                    borderRadius: '2px',
                    boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)'
                  }}
                />
              </div>
              
              {/* Door glass panel - front */}
              {profileObject && (profileObject.id !== 'evolutionDrive-60') && (
                <div 
                  className="absolute flex items-center justify-center"
                  style={{ 
                    left: '20%',
                    right: '20%',
                    top: '20%',
                    bottom: '50%',
                    backgroundColor: 'rgba(220, 230, 240, ' + getGlassOpacity() + ')',
                    boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.2), 0 0 20px rgba(255, 255, 255, 0.3)',
                    borderRadius: '2px',
                    transform: 'translateZ(6px)',
                    border: `2px solid ${rubberColorObject.hex}`,
                  }}
                >
                  {/* Glazing layers visualization */}
                  {glazingObject.id === 'glz-double' && (
                    <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '50%'}}></div>
                  )}
                  
                  {glazingObject.id === 'glz-triple' && (
                    <>
                      <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '33%'}}></div>
                      <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '66%'}}></div>
                    </>
                  )}
                  
                  {glazingObject.id === 'glz-quad' && (
                    <>
                      <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '25%'}}></div>
                      <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '50%'}}></div>
                      <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '75%'}}></div>
                    </>
                  )}
                </div>
              )}

              {/* Door glass panel - back */}
              {profileObject && (profileObject.id !== 'evolutionDrive-60') && (
                <div 
                  className="absolute flex items-center justify-center"
                  style={{ 
                    left: '20%',
                    right: '20%',
                    top: '20%',
                    bottom: '50%',
                    backgroundColor: 'rgba(220, 230, 240, ' + getGlassOpacity() + ')',
                    boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.2), 0 0 20px rgba(255, 255, 255, 0.3)',
                    borderRadius: '2px',
                    transform: 'rotateY(180deg) translateZ(6px)',
                    border: `2px solid ${rubberColorObject.hex}`,
                  }}
                >
                  {/* Glazing layers visualization */}
                  {glazingObject.id === 'glz-double' && (
                    <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '50%'}}></div>
                  )}
                </div>
              )}
              
              {/* Premium door has additional lower panel - front */}
              {profileObject && profileObject.id === 'bluEvolution-92' && (
                <div 
                  className="absolute flex items-center justify-center"
                  style={{ 
                    left: '20%',
                    right: '20%',
                    top: '60%',
                    bottom: '20%',
                    backgroundColor: 'rgba(220, 230, 240, ' + getGlassOpacity() + ')',
                    boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.2), 0 0 20px rgba(255, 255, 255, 0.3)',
                    borderRadius: '2px',
                    transform: 'translateZ(6px)',
                    border: `2px solid ${rubberColorObject.hex}`,
                  }}
                >
                  {/* Glazing layers visualization */}
                  {glazingObject.id === 'glz-double' && (
                    <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '50%'}}></div>
                  )}
                </div>
              )}

              {/* Premium door has additional lower panel - back */}
              {profileObject && profileObject.id === 'bluEvolution-92' && (
                <div 
                  className="absolute flex items-center justify-center"
                  style={{ 
                    left: '20%',
                    right: '20%',
                    top: '60%',
                    bottom: '20%',
                    backgroundColor: 'rgba(220, 230, 240, ' + getGlassOpacity() + ')',
                    boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.2), 0 0 20px rgba(255, 255, 255, 0.3)',
                    borderRadius: '2px',
                    transform: 'rotateY(180deg) translateZ(6px)',
                    border: `2px solid ${rubberColorObject.hex}`,
                  }}
                >
                  {/* Glazing layers visualization */}
                  {glazingObject.id === 'glz-double' && (
                    <div className="absolute inset-0 border-r border-white opacity-30" style={{left: '50%'}}></div>
                  )}
                </div>
              )}

              {/* Rubber seals - front */}
              <div 
                className="absolute rounded-sm pointer-events-none"
                style={{ 
                  inset: '5%',
                  border: `3px solid ${rubberColorObject.hex}`,
                  opacity: 0.9,
                  transform: 'translateZ(6px)',
                }}
              ></div>

              {/* Rubber seals - back */}
              <div 
                className="absolute rounded-sm pointer-events-none"
                style={{ 
                  inset: '5%',
                  border: `3px solid ${rubberColorObject.hex}`,
                  opacity: 0.9,
                  transform: 'rotateY(180deg) translateZ(6px)',
                }}
              ></div>
              
              {/* Door hinges - front */}
              <div className="absolute left-[10%] top-[20%] w-[15px] h-[40px] bg-gray-400 rounded-sm" style={{ transform: 'translateZ(6px)', boxShadow: '2px 2px 4px rgba(0,0,0,0.2)' }} />
              <div className="absolute left-[10%] bottom-[20%] w-[15px] h-[40px] bg-gray-400 rounded-sm" style={{ transform: 'translateZ(6px)', boxShadow: '2px 2px 4px rgba(0,0,0,0.2)' }} />
              
              {/* Door hinges - back */}
              <div className="absolute right-[10%] top-[20%] w-[15px] h-[40px] bg-gray-400 rounded-sm" style={{ transform: 'rotateY(180deg) translateZ(6px)', boxShadow: '2px 2px 4px rgba(0,0,0,0.2)' }} />
              <div className="absolute right-[10%] bottom-[20%] w-[15px] h-[40px] bg-gray-400 rounded-sm" style={{ transform: 'rotateY(180deg) translateZ(6px)', boxShadow: '2px 2px 4px rgba(0,0,0,0.2)' }} />

              {profileObject && (
                <div className="absolute bottom-[5%] left-0 right-0 text-xs text-center text-gray-100 font-medium opacity-90 z-20"
                     style={{ transform: 'translateZ(6px)' }}>
                  {profileObject.name}
                </div>
              )}
              
              {/* Door silhouette shadow for depth */}
              <div
                className="absolute"
                style={{
                  inset: '-15px',
                  transform: 'translateZ(-10px)',
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  filter: 'blur(15px)',
                  borderRadius: '10px',
                }}
              />
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
          {productType === 'window' && windowTypeObject && (
            <div className="mt-1">
              {windowTypeObject.name} 
              {selectedWindowType !== 'fixed' && openingDirectionObject && (
                <span> - {openingDirectionObject.name}</span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
