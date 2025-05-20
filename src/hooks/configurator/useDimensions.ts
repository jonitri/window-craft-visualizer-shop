
import { useState } from 'react';

export function useDimensions() {
  const [width, setWidth] = useState<number>(1000); // Default 1000mm
  const [height, setHeight] = useState<number>(1200); // Default 1200mm
  const [quantity, setQuantity] = useState<number>(1);

  return {
    width,
    setWidth,
    height,
    setHeight,
    quantity,
    setQuantity
  };
}
