
import { ColorOption } from '@/data/products';

export const calculateWindowDimensions = (width: number, height: number) => {
  const aspectRatio = width / height;
  const windowWidth = aspectRatio > 1 ? 300 : 200;
  const windowHeight = windowWidth / aspectRatio;
  return { windowWidth, windowHeight };
};

export const createContainerStyle = (
  windowWidth: number,
  windowHeight: number,
  baseColorObject: ColorOption,
  outsideColorObject: ColorOption,
  insideColorObject: ColorOption,
  rubberColorObject: ColorOption,
  rotationX: number,
  finalRotationY: number
): React.CSSProperties => ({
  '--window-width': `${windowWidth}px`,
  '--window-height': `${windowHeight}px`,
  '--base-color': baseColorObject.hex,
  '--outside-color': outsideColorObject.hex,
  '--inside-color': insideColorObject.hex,
  '--rubber-color': rubberColorObject.hex,
  '--rotation-x': `${rotationX}deg`,
  '--rotation-y': `${finalRotationY}deg`,
} as React.CSSProperties);
