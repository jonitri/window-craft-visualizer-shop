
import { Button } from '@/components/ui/button';
import { RotateCw, RotateCcw } from 'lucide-react';

interface PreviewControlsProps {
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onResetRotation: () => void;
}

export const PreviewControls = ({
  onRotateLeft,
  onRotateRight,
  onResetRotation
}: PreviewControlsProps) => {
  return (
    <div className="flex mb-4 justify-between items-center">
      <div className="text-sm text-muted-foreground">Use the buttons to rotate the product</div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRotateLeft} 
          className="flex items-center gap-1"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onResetRotation} 
          className="flex items-center gap-1"
        >
          Reset
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRotateRight} 
          className="flex items-center gap-1"
        >
          <RotateCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
