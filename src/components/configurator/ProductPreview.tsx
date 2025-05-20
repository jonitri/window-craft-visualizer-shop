
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
        return 0.9; // Double glazing (standard)
    }
  };

  // Update the getOpeningDirectionIcon function to use triangle-like indicators
  const getOpeningDirectionIcon = (direction: string) => {
    switch(direction) {
      case 'left':
        return (
          <div className="w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-primary border-b-8 border-b-transparent" />
        );
      case 'right':
        return (
          <div className="w-0 h-0 border-t-8 border-t-transparent border-l-8 border-l-primary border-b-8 border-b-transparent" />
        );
      case 'top-left':
        return (
          <div className="w-0 h-0 border-r-8 border-r-transparent border-l-8 border-l-transparent border-b-8 border-b-primary transform rotate-180" />
        );
      case 'top-right':
        return (
          <div className="w-0 h-0 border-r-8 border-r-transparent border-l-8 border-l-transparent border-b-8 border-b-primary transform rotate-180" />
        );
      default:
        return null;
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
          style={{ perspective: '1000px', height: '450px', overflow: 'hidden' }}
        >
          {productType === 'window' ? (
            // Window visualization with improved 3D appearance
            <div 
              ref={previewRef}
              className="relative shadow-lg transition-transform duration-500"
              style={{
                width: `${Math.min(70, (width / height) * 55)}%`,
                height: `${Math.min(70, (height / width) * 55)}%`,
                maxWidth: '70%',
                maxHeight: '70%',
                transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Window frame with depth */}
              <div 
                className="absolute inset-0 z-10 transform-gpu"
                style={{ 
                  backgroundColor: baseColorObject.hex,
                  backfaceVisibility: 'hidden',
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 0 15px rgba(0,0,0,0.2)',
                }}
              ></div>
              
              {/* Side panels to create depth - left side */}
              <div 
                className="absolute left-0 top-0 bottom-0 z-20 transform-gpu"
                style={{ 
                  width: '20px',
                  backgroundColor: baseColorObject.hex,
                  transform: 'rotateY(-90deg) translateZ(-10px)',
                  transformOrigin: 'left',
                  backfaceVisibility: 'hidden',
                }}
              ></div>
              
              {/* Side panels to create depth - right side */}
              <div 
                className="absolute right-0 top-0 bottom-0 z-20 transform-gpu"
                style={{ 
                  width: '20px',
                  backgroundColor: baseColorObject.hex,
                  transform: 'rotateY(90deg) translateZ(-10px)',
                  transformOrigin: 'right',
                  backfaceVisibility: 'hidden',
                }}
              ></div>
              
              {/* Side panels to create depth - top side */}
              <div 
                className="absolute left-0 right-0 top-0 z-20 transform-gpu"
                style={{ 
                  height: '20px',
                  backgroundColor: baseColorObject.hex,
                  transform: 'rotateX(90deg) translateZ(-10px)',
                  transformOrigin: 'top',
                  backfaceVisibility: 'hidden',
                }}
              ></div>
              
              {/* Side panels to create depth - bottom side */}
              <div 
                className="absolute left-0 right-0 bottom-0 z-20 transform-gpu"
                style={{ 
                  height: '20px',
                  backgroundColor: baseColorObject.hex,
                  transform: 'rotateX(-90deg) translateZ(-10px)',
                  transformOrigin: 'bottom',
                  backfaceVisibility: 'hidden',
                }}
              ></div>
              
              {/* Outside frame color */}
              <div 
                className="absolute inset-0 z-30 transform-gpu"
                style={{ 
                  backgroundColor: outsideColorObject.hex, 
                  transform: 'rotateY(0deg) translateZ(1px)',
                  backfaceVisibility: 'hidden',
                }}
              >
                {/* Frame internal borders for realistic appearance */}
                <div className="absolute inset-[8%] border-8 border-solid" style={{ borderColor: outsideColorObject.hex }}></div>
              </div>

              {/* Inside frame color */}
              <div 
                className="absolute inset-0 z-30 transform-gpu"
                style={{ 
                  backgroundColor: insideColorObject.hex, 
                  transform: 'rotateY(180deg) translateZ(1px)',
                  backfaceVisibility: 'hidden',
                }}
              >
                {/* Frame internal borders for realistic appearance */}
                <div className="absolute inset-[8%] border-8 border-solid" style={{ borderColor: insideColorObject.hex }}></div>
              </div>
              
              {/* Render window based on type - with improved visuals */}
              {selectedWindowType === 'single-leaf' && (
                <div 
                  className="absolute inset-[12%] flex items-center justify-center overflow-hidden z-40 transform-gpu border-4"
                  style={{ 
                    backgroundColor: 'rgba(220, 230, 240, ' + getGlassOpacity() + ')',
                    boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15)',
                    borderRadius: '1px',
                    transform: 'translateZ(2px)',
                    borderColor: outsideColorObject.hex,
                  }}
                >
                  {/* Opening direction indicator - centered */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute">
                      {getOpeningDirectionIcon(selectedOpeningDirection)}
                    </div>
                  </div>
                  
                  {/* Visualize glazing layers */}
                  {glazingObject.id === 'glz-double' && (
                    <div className="absolute inset-0 border-r border-white opacity-30"></div>
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

                  {profileObject && (
                    <div className="text-xs text-center text-gray-600 font-medium opacity-70">
                      {profileObject.name}
                    </div>
                  )}
                </div>
              )}
              
              {selectedWindowType === 'double-leaf' && (
                <>
                  {/* Left leaf - with frame */}
                  <div 
                    className="absolute top-[12%] bottom-[12%] left-[12%] right-[51%] flex items-center justify-center overflow-hidden z-40 transform-gpu border-4"
                    style={{ 
                      backgroundColor: 'rgba(220, 230, 240, ' + getGlassOpacity() + ')',
                      boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15)',
                      borderRadius: '1px',
                      transform: 'translateZ(2px)',
                      borderColor: outsideColorObject.hex,
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute">
                        {selectedOpeningDirection === 'left' || selectedOpeningDirection === 'top-left' ? 
                          getOpeningDirectionIcon(selectedOpeningDirection) : null}
                      </div>
                    </div>
                  </div>
                  
                  {/* Right leaf - with frame */}
                  <div 
                    className="absolute top-[12%] bottom-[12%] left-[51%] right-[12%] flex items-center justify-center overflow-hidden z-40 transform-gpu border-4"
                    style={{ 
                      backgroundColor: 'rgba(220, 230, 240, ' + getGlassOpacity() + ')',
                      boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15)',
                      borderRadius: '1px',
                      transform: 'translateZ(2px)',
                      borderColor: outsideColorObject.hex,
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute">
                        {selectedOpeningDirection === 'right' || selectedOpeningDirection === 'top-right' ? 
                          getOpeningDirectionIcon(selectedOpeningDirection) : null}
                      </div>
                    </div>
                  </div>
                  
                  {/* Central divider */}
                  <div 
                    className="absolute left-[50%] top-[12%] bottom-[12%] w-[2%] z-50 transform-gpu" 
                    style={{ 
                      backgroundColor: outsideColorObject.hex, 
                      transform: 'translateX(-50%) translateZ(2px)',
                    }} 
                  />
                </>
              )}
              
              {selectedWindowType === 'triple-leaf' && (
                <>
                  {/* Left leaf */}
                  <div 
                    className="absolute top-[12%] bottom-[12%] left-[12%] right-[67%] flex items-center justify-center overflow-hidden z-40 transform-gpu border-4"
                    style={{ 
                      backgroundColor: 'rgba(220, 230, 240, ' + getGlassOpacity() + ')',
                      boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15)',
                      borderRadius: '1px',
                      transform: 'translateZ(2px)',
                      borderColor: outsideColorObject.hex,
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute">
                        {selectedOpeningDirection === 'left' || selectedOpeningDirection === 'top-left' ? 
                          getOpeningDirectionIcon(selectedOpeningDirection) : null}
                      </div>
                    </div>
                  </div>
                  
                  {/* Middle leaf */}
                  <div 
                    className="absolute top-[12%] bottom-[12%] left-[35%] right-[35%] flex items-center justify-center overflow-hidden z-40 transform-gpu border-4"
                    style={{ 
                      backgroundColor: 'rgba(220, 230, 240, ' + getGlassOpacity() + ')',
                      boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15)',
                      borderRadius: '1px',
                      transform: 'translateZ(2px)',
                      borderColor: outsideColorObject.hex,
                    }}
                  />
                  
                  {/* Right leaf */}
                  <div 
                    className="absolute top-[12%] bottom-[12%] left-[67%] right-[12%] flex items-center justify-center overflow-hidden z-40 transform-gpu border-4"
                    style={{ 
                      backgroundColor: 'rgba(220, 230, 240, ' + getGlassOpacity() + ')',
                      boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15)',
                      borderRadius: '1px',
                      transform: 'translateZ(2px)',
                      borderColor: outsideColorObject.hex,
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute">
                        {selectedOpeningDirection === 'right' || selectedOpeningDirection === 'top-right' ? 
                          getOpeningDirectionIcon(selectedOpeningDirection) : null}
                      </div>
                    </div>
                  </div>
                  
                  {/* Left divider */}
                  <div 
                    className="absolute left-[34%] top-[12%] bottom-[12%] w-[2%] z-50 transform-gpu" 
                    style={{ 
                      backgroundColor: outsideColorObject.hex, 
                      transform: 'translateX(-50%) translateZ(2px)',
                    }} 
                  />
                  
                  {/* Right divider */}
                  <div 
                    className="absolute left-[66%] top-[12%] bottom-[12%] w-[2%] z-50 transform-gpu" 
                    style={{ 
                      backgroundColor: outsideColorObject.hex, 
                      transform: 'translateX(-50%) translateZ(2px)',
                    }} 
                  />
                </>
              )}
              
              {selectedWindowType === 'fixed' && (
                <div 
                  className="absolute inset-[12%] flex items-center justify-center overflow-hidden z-40 transform-gpu border-4"
                  style={{ 
                    backgroundColor: 'rgba(220, 230, 240, ' + getGlassOpacity() + ')',
                    boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15)',
                    borderRadius: '1px',
                    transform: 'translateZ(2px)',
                    borderColor: outsideColorObject.hex,
                  }}
                >
                  <div className="text-sm font-medium opacity-70">Fixed</div>
                  
                  {/* Visualize glazing layers */}
                  {glazingObject.id === 'glz-double' && (
                    <div className="absolute inset-0 border-r border-white opacity-30"></div>
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

                  {profileObject && (
                    <div className="text-xs text-center text-gray-600 font-medium opacity-70">
                      {profileObject.name}
                    </div>
                  )}
                </div>
              )}

              {/* Rubber seals */}
              <div 
                className="absolute inset-[10%] rounded-sm pointer-events-none z-60 transform-gpu"
                style={{ 
                  border: `2px solid ${rubberColorObject.hex}`,
                  opacity: 0.9,
                  transform: 'translateZ(3px)',
                }}
              ></div>
            </div>
          ) : (
            // Door visualization
            <div 
              ref={previewRef}
              className="relative shadow-lg transition-transform duration-500"
              style={{
                width: `${Math.min(60, (width / height) * 45)}%`,
                height: `${Math.min(80, (height / width) * 75)}%`,
                maxWidth: '70%',
                maxHeight: '80%',
                backgroundColor: baseColorObject.hex,
                borderRadius: '2px',
                transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Base frame */}
              <div 
                className="absolute inset-0 z-10 transform-gpu"
                style={{ 
                  backgroundColor: baseColorObject.hex,
                  backfaceVisibility: 'hidden',
                }}
              ></div>
              
              {/* Outside frame color */}
              <div 
                className="absolute inset-0 z-20 transform-gpu"
                style={{ 
                  backgroundColor: outsideColorObject.hex, 
                  transform: 'translateZ(5px)',
                  backfaceVisibility: 'hidden',
                }}
              ></div>

              {/* Inside frame color */}
              <div 
                className="absolute inset-0 z-20 transform-gpu"
                style={{ 
                  backgroundColor: insideColorObject.hex, 
                  transform: 'rotateY(180deg) translateZ(5px)',
                  backfaceVisibility: 'hidden',
                }}
              ></div>
              
              {/* Door handle - front */}
              <div 
                className="absolute right-[20%] top-[50%] w-[15px] h-[30px] bg-gray-400 rounded-sm shadow-md z-40 transform-gpu"
                style={{ 
                  transform: 'translateY(-50%) translateZ(6px)',
                }}
              />
              
              {/* Door handle - back */}
              <div 
                className="absolute left-[20%] top-[50%] w-[15px] h-[30px] bg-gray-400 rounded-sm shadow-md z-40 transform-gpu"
                style={{ 
                  transform: 'translateY(-50%) rotateY(180deg) translateZ(6px)',
                }}
              />
              
              {/* Door glass panel */}
              {profileObject && (profileObject.id !== 'evolutionDrive-60') && (
                <div 
                  className="absolute left-[20%] right-[20%] top-[20%] bottom-[50%] flex items-center justify-center z-30 transform-gpu"
                  style={{ 
                    backgroundColor: 'rgba(220, 230, 240, ' + getGlassOpacity() + ')',
                    boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15)',
                    borderRadius: '1px',
                    transform: 'translateZ(6px)',
                  }}
                >
                  {/* Visualize glazing layers */}
                  {glazingObject.id === 'glz-double' && (
                    <div className="absolute inset-0 border-r border-white opacity-30"></div>
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
              
              {/* Premium door has additional lower panel */}
              {profileObject && profileObject.id === 'bluEvolution-92' && (
                <div 
                  className="absolute left-[20%] right-[20%] top-[60%] bottom-[20%] flex items-center justify-center z-30 transform-gpu"
                  style={{ 
                    backgroundColor: 'rgba(220, 230, 240, ' + getGlassOpacity() + ')',
                    boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.15)',
                    borderRadius: '1px',
                    transform: 'translateZ(6px)',
                  }}
                >
                  {/* Visualize glazing layers */}
                  {glazingObject.id === 'glz-double' && (
                    <div className="absolute inset-0 border-r border-white opacity-30"></div>
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

              {/* Rubber seals - front */}
              <div 
                className="absolute inset-[5%] rounded-sm pointer-events-none z-50 transform-gpu"
                style={{ 
                  border: `3px solid ${rubberColorObject.hex}`,
                  opacity: 0.9,
                  transform: 'translateZ(6px)',
                }}
              ></div>

              {/* Rubber seals - back */}
              <div 
                className="absolute inset-[5%] rounded-sm pointer-events-none z-50 transform-gpu"
                style={{ 
                  border: `3px solid ${rubberColorObject.hex}`,
                  opacity: 0.9,
                  transform: 'rotateY(180deg) translateZ(6px)',
                }}
              ></div>

              {profileObject && (
                <div className="absolute bottom-[5%] left-0 right-0 text-xs text-center text-gray-100 font-medium opacity-70 z-60 transform-gpu"
                     style={{ transform: 'translateZ(6px)' }}>
                  {profileObject.name}
                </div>
              )}
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
