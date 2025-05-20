
import { useState } from 'react';
import { 
  glazingOptions, 
  baseColorOptions,
  outsideColorOptions,
  insideColorOptions,
  rubberColorOptions
} from '@/data/products';

export function useAppearance() {
  // State for appearance options
  const [selectedGlazing, setSelectedGlazing] = useState<string>('glz-double');
  const [selectedBaseColor, setSelectedBaseColor] = useState<string>('col-white');
  const [selectedOutsideColor, setSelectedOutsideColor] = useState<string>('col-out-white');
  const [selectedInsideColor, setSelectedInsideColor] = useState<string>('col-in-white');
  const [selectedRubberColor, setSelectedRubberColor] = useState<string>('col-rubber-black');

  // Find objects for each selected option
  const glazingObject = glazingOptions.find(g => g.id === selectedGlazing) || glazingOptions[0];
  const baseColorObject = baseColorOptions.find(c => c.id === selectedBaseColor) || baseColorOptions[0];
  const outsideColorObject = outsideColorOptions.find(c => c.id === selectedOutsideColor) || outsideColorOptions[0];
  const insideColorObject = insideColorOptions.find(c => c.id === selectedInsideColor) || insideColorOptions[0];
  const rubberColorObject = rubberColorOptions.find(c => c.id === selectedRubberColor) || rubberColorOptions[0];

  // Combined color price modifier
  const totalColorModifier = baseColorObject.priceModifier + outsideColorObject.priceModifier + 
                           insideColorObject.priceModifier + rubberColorObject.priceModifier;

  return {
    selectedGlazing,
    setSelectedGlazing,
    selectedBaseColor,
    setSelectedBaseColor,
    selectedOutsideColor,
    setSelectedOutsideColor,
    selectedInsideColor,
    setSelectedInsideColor,
    selectedRubberColor,
    setSelectedRubberColor,
    glazingObject,
    baseColorObject,
    outsideColorObject,
    insideColorObject,
    rubberColorObject,
    totalColorModifier
  };
}
