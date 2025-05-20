
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Profile } from '@/data/products';

interface ProfileSelectorProps {
  productType: 'window' | 'door';
  availableProfiles: Profile[];
  selectedProfile: string;
  onProfileChange: (profileId: string) => void;
}

export const ProfileSelector = ({ 
  productType, 
  availableProfiles, 
  selectedProfile, 
  onProfileChange 
}: ProfileSelectorProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{productType === 'window' ? '4' : '2'}. Select Profile</CardTitle>
        <CardDescription>Choose a profile based on your requirements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {availableProfiles.map((profile) => (
            <Label
              key={profile.id}
              htmlFor={profile.id}
              className={`flex flex-col h-full rounded-md border-2 overflow-hidden cursor-pointer ${
                selectedProfile === profile.id ? 'border-primary' : 'border-border'
              }`}
            >
              <input
                type="radio"
                id={profile.id}
                name="profile"
                value={profile.id}
                checked={selectedProfile === profile.id}
                onChange={() => onProfileChange(profile.id)}
                className="sr-only"
              />
              <div className="h-32 bg-muted flex items-center justify-center">
                <img
                  src={profile.imageUrl}
                  alt={profile.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-3 flex flex-col flex-1">
                <h4 className="font-medium">{profile.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{profile.description}</p>
              </div>
            </Label>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
