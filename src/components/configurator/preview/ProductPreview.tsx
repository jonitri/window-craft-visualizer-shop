
import { useRef } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCw, RotateCcw } from 'lucide-react';
import { ColorOption } from '@/data/products';
import { WindowType, OpeningDirection } from '@/data/windowTypes';
import { WindowPreview } from './WindowPreview';
import { DoorPreview } from './DoorPreview';
import { PreviewControls } from './PreviewControls';
import { useGlazingHelpers } from './hooks/useGlazingHelpers';
import { useProfileHelpers } from './hooks/useProfileHelpers';

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
  const { getGlassOpacity } = useGlazingHelpers();
  const { getFrameThickness } = useProfileHelpers();

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Product Preview</CardTitle>
        <CardDescription>Visualization of your configuration</CardDescription>
      </CardHeader>
      <CardContent>
        <PreviewControls 
          onRotateLeft={onRotateLeft}
          onRotateRight={onRotateRight}
          onResetRotation={onResetRotation}
        />
        
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
            <WindowPreview 
              ref={previewRef}
              width={width}
              height={height}
              baseColorObject={baseColorObject}
              outsideColorObject={outsideColorObject}
              insideColorObject={insideColorObject}
              rubberColorObject={rubberColorObject}
              glazingObject={glazingObject}
              profileObject={profileObject}
              selectedWindowType={selectedWindowType}
              selectedOpeningDirection={selectedOpeningDirection}
              rotationX={rotationX}
              rotationY={rotationY}
              frameThickness={getFrameThickness(profileObject.id)}
              glassOpacity={getGlassOpacity(glazingObject.id)}
            />
          ) : (
            <DoorPreview 
              ref={previewRef}
              width={width}
              height={height}
              baseColorObject={baseColorObject}
              outsideColorObject={outsideColorObject}
              insideColorObject={insideColorObject}
              rubberColorObject={rubberColorObject}
              glazingObject={glazingObject}
              profileObject={profileObject}
              rotationX={rotationX}
              rotationY={rotationY}
              glassOpacity={getGlassOpacity(glazingObject.id)}
            />
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
