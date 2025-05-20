
import { useState, useEffect } from 'react';
import { windowProfiles, doorProfiles, Profile } from '@/data/products';

export function useProductType(initialType: 'window' | 'door') {
  // State for product type
  const [productType, setProductType] = useState<'window' | 'door'>(initialType);
  
  // Get profiles based on product type
  const availableProfiles = productType === 'window' ? windowProfiles : doorProfiles;

  // Derived profile object
  const [selectedProfile, setSelectedProfile] = useState<string>('');
  const profileObject = availableProfiles.find(p => p.id === selectedProfile) || availableProfiles[0];
  
  // Set a default profile if none is selected
  useEffect(() => {
    if (!selectedProfile && availableProfiles.length > 0) {
      setSelectedProfile(availableProfiles[0].id);
    }
  }, [productType, availableProfiles, selectedProfile]);

  return {
    productType,
    setProductType,
    selectedProfile,
    setSelectedProfile,
    profileObject,
    availableProfiles,
  };
}
