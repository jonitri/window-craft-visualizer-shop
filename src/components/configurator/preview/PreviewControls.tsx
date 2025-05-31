
import { Button } from '@/components/ui/button';
import { RotateCw, RotateCcw, Play, Pause, SwitchCamera } from 'lucide-react';

interface PreviewControlsProps {
  viewMode: 'front' | 'back';
  isAutoRotating: boolean;
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onResetRotation: () => void;
  onToggleView: () => void;
  onToggleAutoRotation: () => void;
}

export const PreviewControls = ({
  viewMode,
  isAutoRotating,
  onRotateLeft,
  onRotateRight,
  onResetRotation,
  onToggleView,
  onToggleAutoRotation
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
          disabled={isAutoRotating}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onResetRotation}
        >
          Reset
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRotateRight} 
          disabled={isAutoRotating}
        >
          <RotateCw className="h-4 w-4" />
        </Button>
        <Button 
          variant={isAutoRotating ? "default" : "outline"} 
          size="sm" 
          onClick={onToggleAutoRotation}
          className="ml-2"
        >
          {isAutoRotating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {isAutoRotating ? 'Stop' : '360° View'}
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onToggleView}
          className="ml-2"
        >
          <SwitchCamera className="h-4 w-4" />
          {viewMode === 'front' ? 'Show Inside' : 'Show Outside'}
        </Button>
      </div>
    </div>
  );
};
