
import { ColorOption } from '@/data/products';
import { SingleLeafWindow } from '../window-types/SingleLeafWindow';
import { DoubleLeafWindow } from '../window-types/DoubleLeafWindow';
import { TripleLeafWindow } from '../window-types/TripleLeafWindow';
import { FixedWindow } from '../window-types/FixedWindow';

interface WindowContentProps {
  selectedWindowType: string;
  frameThickness: number;
  glazingObject: { id: string; name: string };
  glassOpacity: number;
  rubberColorObject: ColorOption;
  outsideColorObject: ColorOption;
  insideColorObject: ColorOption;
  profileObject: { id: string; name: string };
  selectedOpeningDirection: string;
  viewMode: 'front' | 'back';
}

export const WindowContent = ({
  selectedWindowType,
  frameThickness,
  glazingObject,
  glassOpacity,
  rubberColorObject,
  outsideColorObject,
  insideColorObject,
  profileObject,
  selectedOpeningDirection,
  viewMode
}: WindowContentProps) => {
  switch (selectedWindowType) {
    case 'single-leaf':
      return (
        <SingleLeafWindow 
          frameThickness={frameThickness}
          glazingObject={glazingObject}
          glassOpacity={glassOpacity}
          rubberColorObject={rubberColorObject}
          insideColorObject={insideColorObject}
          profileObject={profileObject}
          selectedOpeningDirection={selectedOpeningDirection}
          viewMode={viewMode}
        />
      );
    
    case 'double-leaf':
      return (
        <DoubleLeafWindow 
          frameThickness={frameThickness}
          glazingObject={glazingObject}
          glassOpacity={glassOpacity}
          rubberColorObject={rubberColorObject}
          outsideColorObject={outsideColorObject}
          insideColorObject={insideColorObject}
          profileObject={profileObject}
          selectedOpeningDirection={selectedOpeningDirection}
          viewMode={viewMode}
        />
      );
    
    case 'triple-leaf':
      return (
        <TripleLeafWindow 
          frameThickness={frameThickness}
          glazingObject={glazingObject}
          glassOpacity={glassOpacity}
          rubberColorObject={rubberColorObject}
          outsideColorObject={outsideColorObject}
          insideColorObject={insideColorObject}
          profileObject={profileObject}
          selectedOpeningDirection={selectedOpeningDirection}
          viewMode={viewMode}
        />
      );
    
    case 'fixed':
    default:
      return (
        <FixedWindow 
          frameThickness={frameThickness}
          glazingObject={glazingObject}
          glassOpacity={glassOpacity}
          rubberColorObject={rubberColorObject}
          insideColorObject={insideColorObject}
          profileObject={profileObject}
          viewMode={viewMode}
        />
      );
  }
};
