
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { PreviewControls } from './PreviewControls';
import { ProductPreviewInfo } from './components/ProductPreviewInfo';
import { PreviewArea } from './components/PreviewArea';
import { ColorOption } from '@/data/products';
import { WindowType, OpeningDirection } from '@/data/windowTypes';
import { useGlazingHelpers } from './hooks/useGlazingHelpers';
import { useProfileHelpers } from './hooks/useProfileHelpers';
import { useRef } from 'react';

interface ProductPreviewContainerProps {
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
  viewMode: 'front' | 'back';
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onResetRotation: () => void;
  onToggleView: () => void;
}

export const ProductPreviewContainer = ({
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
  viewMode,
  onRotateLeft,
  onRotateRight,
  onResetRotation,
  onToggleView
}: ProductPreviewContainerProps) => {
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
          onToggleView={onToggleView}
          viewMode={viewMode}
        />
        
        <PreviewArea 
          productType={productType}
          width={width}
          height={height}
          selectedWindowType={selectedWindowType}
          selectedOpeningDirection={selectedOpeningDirection}
          baseColorObject={baseColorObject}
          outsideColorObject={outsideColorObject}
          insideColorObject={insideColorObject}
          rubberColorObject={rubberColorObject}
          glazingObject={glazingObject}
          profileObject={profileObject}
          rotationX={rotationX}
          rotationY={rotationY}
          viewMode={viewMode}
          getGlassOpacity={getGlassOpacity}
          getFrameThickness={getFrameThickness}
          previewRef={previewRef}
        />

        <ProductPreviewInfo
          width={width}
          height={height}
          baseColorObject={baseColorObject}
          glazingObject={glazingObject}
          productType={productType}
          windowTypeObject={windowTypeObject}
          selectedWindowType={selectedWindowType}
          openingDirectionObject={openingDirectionObject}
        />
      </CardContent>
    </Card>
  );
};
