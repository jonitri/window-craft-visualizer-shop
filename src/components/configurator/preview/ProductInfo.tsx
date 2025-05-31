
import { ColorOption } from '@/data/products';

interface ProductInfoProps {
  width: number;
  height: number;
  baseColorObject: ColorOption;
  outsideColorObject: ColorOption;
  insideColorObject: ColorOption;
}

export const ProductInfo = ({
  width,
  height,
  baseColorObject,
  outsideColorObject,
  insideColorObject
}: ProductInfoProps) => {
  return (
    <div className="mt-4 p-4 bg-muted rounded-lg">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div>
          <span className="font-medium">Dimensions:</span>
          <br />
          {width} × {height} mm
        </div>
        <div>
          <span className="font-medium">Base Color:</span>
          <br />
          <div className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded border"
              style={{ backgroundColor: baseColorObject.hex }}
            />
            {baseColorObject.name}
          </div>
        </div>
        <div>
          <span className="font-medium">Outside Color:</span>
          <br />
          <div className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded border"
              style={{ backgroundColor: outsideColorObject.hex }}
            />
            {outsideColorObject.name}
          </div>
        </div>
        <div>
          <span className="font-medium">Inside Color:</span>
          <br />
          <div className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded border"
              style={{ backgroundColor: insideColorObject.hex }}
            />
            {insideColorObject.name}
          </div>
        </div>
      </div>
    </div>
  );
};
