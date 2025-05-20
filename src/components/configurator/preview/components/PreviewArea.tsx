
import { useRef, RefObject } from 'react';
import { WindowPreview } from '../WindowPreview';
import { DoorPreview } from '../DoorPreview';
import { ColorOption } from '@/data/products';

interface PreviewAreaProps {
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
  rotationX: number;
  rotationY: number;
  getGlassOpacity: (glazingId: string) => number;
  getFrameThickness: (profileId: string) => number;
  previewRef: RefObject<HTMLDivElement>;
}

export const PreviewArea = ({
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
  rotationX,
  rotationY,
  getGlassOpacity,
  getFrameThickness,
  previewRef
}: PreviewAreaProps) => {
  return (
    <div 
      className="bg-secondary rounded-lg p-8 flex items-center justify-center relative"
      style={{ 
        perspective: '2000px', 
        height: '450px', 
        overflow: 'hidden',
        background: 'linear-gradient(to bottom, #e0e8f0, #c0d0e0)'
      }}
    >
      {productType === 'window' ? (
        <WindowPreview 
          ref={previewRef}
          width={width}
          height={height}
          baseColorObject={baseColorObject}
          outsideColorObject={outsideColorObject}
          insideColorObject={insideColorObject}
          rubberColorObject={rubberColorObject}
          glazingObject={glazingObject}
          profileObject={profileObject}
          selectedWindowType={selectedWindowType}
          selectedOpeningDirection={selectedOpeningDirection}
          rotationX={rotationX}
          rotationY={rotationY}
          frameThickness={getFrameThickness(profileObject.id)}
          glassOpacity={getGlassOpacity(glazingObject.id)}
        />
      ) : (
        <DoorPreview 
          ref={previewRef}
          width={width}
          height={height}
          baseColorObject={baseColorObject}
          outsideColorObject={outsideColorObject}
          insideColorObject={insideColorObject}
          rubberColorObject={rubberColorObject}
          glazingObject={glazingObject}
          profileObject={profileObject}
          rotationX={rotationX}
          rotationY={rotationY}
          glassOpacity={getGlassOpacity(glazingObject.id)}
        />
      )}
    </div>
  );
};
