
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { windowTypes } from '@/data/windowTypes';

interface WindowTypeSelectorProps {
  selectedWindowType: string;
  onWindowTypeChange: (windowType: string) => void;
}

export const WindowTypeSelector = ({ selectedWindowType, onWindowTypeChange }: WindowTypeSelectorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>2. Select Window Type</CardTitle>
        <CardDescription>Choose the type of window configuration</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {windowTypes.map((type) => (
            <Label
              key={type.id}
              htmlFor={type.id}
              className={`flex flex-col h-full rounded-md border-2 p-4 cursor-pointer ${
                selectedWindowType === type.id ? 'border-primary' : 'border-border'
              }`}
            >
              <input
                type="radio"
                id={type.id}
                name="windowType"
                value={type.id}
                checked={selectedWindowType === type.id}
                onChange={() => onWindowTypeChange(type.id)}
                className="sr-only"
              />
              <div className="flex items-center justify-center mb-3">
                {type.id === 'single-leaf' && (
                  <div className="w-12 h-16 border-2 border-foreground"></div>
                )}
                {type.id === 'double-leaf' && (
                  <div className="flex">
                    <div className="w-8 h-16 border-2 border-foreground mr-1"></div>
                    <div className="w-8 h-16 border-2 border-foreground"></div>
                  </div>
                )}
                {type.id === 'triple-leaf' && (
                  <div className="flex">
                    <div className="w-6 h-16 border-2 border-foreground mr-1"></div>
                    <div className="w-6 h-16 border-2 border-foreground mr-1"></div>
                    <div className="w-6 h-16 border-2 border-foreground"></div>
                  </div>
                )}
                {type.id === 'fixed' && (
                  <div className="w-12 h-16 border-2 border-foreground relative">
                    <div className="absolute inset-0 flex items-center justify-center text-xs">Fixed</div>
                  </div>
                )}
              </div>
              <div className="font-medium">{type.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{type.description}</div>
              {type.id !== 'single-leaf' && type.id !== 'fixed' && (
                <div className="text-xs mt-auto font-medium text-primary">
                  +{((type.leafCount - 1) * 10)}% price
                </div>
              )}
            </Label>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
