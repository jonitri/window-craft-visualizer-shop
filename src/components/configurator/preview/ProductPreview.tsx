
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ColorOption } from '@/data/products';
import { WindowType, OpeningDirection } from '@/data/windowTypes';
import { PreviewControls } from './PreviewControls';
import { Simple3DPreview } from './Simple3DPreview';
import { ProductInfo } from './ProductInfo';

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
  viewMode: 'front' | 'back';
  isAutoRotating: boolean;
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onResetRotation: () => void;
  onToggleView: () => void;
  onToggleAutoRotation: () => void;
}

export const ProductPreview = ({
  width,
  height,
  selectedWindowType,
  baseColorObject,
  outsideColorObject,
  insideColorObject,
  rubberColorObject,
  rotationX,
  rotationY,
  viewMode,
  isAutoRotating,
  onRotateLeft,
  onRotateRight,
  onResetRotation,
  onToggleView,
  onToggleAutoRotation
}: ProductPreviewProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Product Preview - 3D Model</CardTitle>
      </CardHeader>
      <CardContent>
        <PreviewControls
          viewMode={viewMode}
          isAutoRotating={isAutoRotating}
          onRotateLeft={onRotateLeft}
          onRotateRight={onRotateRight}
          onResetRotation={onResetRotation}
          onToggleView={onToggleView}
          onToggleAutoRotation={onToggleAutoRotation}
        />
        
        <Simple3DPreview
          width={width}
          height={height}
          selectedWindowType={selectedWindowType}
          baseColorObject={baseColorObject}
          outsideColorObject={outsideColorObject}
          insideColorObject={insideColorObject}
          rubberColorObject={rubberColorObject}
          rotationX={rotationX}
          rotationY={rotationY}
          viewMode={viewMode}
          isAutoRotating={isAutoRotating}
        />

        <ProductInfo
          width={width}
          height={height}
          baseColorObject={baseColorObject}
          outsideColorObject={outsideColorObject}
          insideColorObject={insideColorObject}
        />
      </CardContent>
    </Card>
  );
};
