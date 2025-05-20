
import { WindowType, OpeningDirection } from '@/data/windowTypes';
import { ColorOption } from '@/data/products';

interface ProductPreviewInfoProps {
  width: number;
  height: number;
  baseColorObject: ColorOption;
  glazingObject: { id: string; name: string };
  productType: 'window' | 'door';
  windowTypeObject: WindowType | undefined;
  selectedWindowType: string;
  openingDirectionObject: OpeningDirection | undefined;
}

export const ProductPreviewInfo = ({
  width,
  height,
  baseColorObject,
  glazingObject,
  productType,
  windowTypeObject,
  selectedWindowType,
  openingDirectionObject
}: ProductPreviewInfoProps) => {
  return (
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
  );
};
