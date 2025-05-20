
import { useState } from 'react';
import { windowTypes, openingDirections } from '@/data/windowTypes';

export function useWindowConfiguration() {
  const [selectedWindowType, setSelectedWindowType] = useState<string>('single-leaf');
  const [selectedOpeningDirection, setSelectedOpeningDirection] = useState<string>('left');
  
  // Find window type and opening direction objects
  const windowTypeObject = windowTypes.find(w => w.id === selectedWindowType) || windowTypes[0];
  const openingDirectionObject = openingDirections.find(o => o.id === selectedOpeningDirection) || openingDirections[0];

  return {
    selectedWindowType,
    setSelectedWindowType,
    selectedOpeningDirection,
    setSelectedOpeningDirection,
    windowTypeObject,
    openingDirectionObject,
  };
}
