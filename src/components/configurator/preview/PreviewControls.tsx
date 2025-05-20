
import { Button } from '@/components/ui/button';
import { RotateCw, RotateCcw, SwitchCamera } from 'lucide-react';

interface PreviewControlsProps {
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onResetRotation: () => void;
  onToggleView: () => void;
  viewMode: 'front' | 'back';
}

export const PreviewControls = ({
  onRotateLeft,
  onRotateRight,
  onResetRotation,
  onToggleView,
  viewMode
}: PreviewControlsProps) => {
  return (
    <div className="flex mb-4 justify-between items-center">
      <div className="text-sm text-muted-foreground">
        {viewMode === 'front' ? 'Outside view' : 'Inside view'} - Use buttons to rotate or switch views
      </div>
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
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onToggleView} 
          className="flex items-center gap-1 ml-2"
        >
          <SwitchCamera className="h-4 w-4" />
          {viewMode === 'front' ? 'Show Inside' : 'Show Outside'}
        </Button>
      </div>
    </div>
  );
};
