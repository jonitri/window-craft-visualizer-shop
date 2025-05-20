
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { openingDirections } from '@/data/windowTypes';

interface OpeningDirectionSelectorProps {
  selectedOpeningDirection: string;
  onOpeningDirectionChange: (direction: string) => void;
}

export const OpeningDirectionSelector = ({ 
  selectedOpeningDirection, 
  onOpeningDirectionChange 
}: OpeningDirectionSelectorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>3. Select Opening Direction</CardTitle>
        <CardDescription>Choose how your window will open</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {openingDirections.map((direction) => (
            <Label
              key={direction.id}
              htmlFor={direction.id}
              className={`flex flex-col h-full rounded-md border-2 p-4 cursor-pointer ${
                selectedOpeningDirection === direction.id ? 'border-primary' : 'border-border'
              }`}
            >
              <input
                type="radio"
                id={direction.id}
                name="openingDirection"
                value={direction.id}
                checked={selectedOpeningDirection === direction.id}
                onChange={() => onOpeningDirectionChange(direction.id)}
                className="sr-only"
              />
              <div className="text-2xl mb-2 text-center">{direction.icon}</div>
              <div className="font-medium">{direction.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{direction.description}</div>
            </Label>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
