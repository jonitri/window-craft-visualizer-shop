
import { ColorOption } from '@/data/products';

export interface WindowModelProps {
  width: number;
  height: number;
  baseColorObject: ColorOption;
  outsideColorObject: ColorOption;
  insideColorObject: ColorOption;
  textureRef: React.MutableRefObject<THREE.Texture | null>;
  windowType?: 'single-leaf' | 'double-leaf' | 'triple-leaf' | 'fixed';
}
