
export const useProfileHelpers = () => {
  // Helper function to get frame thickness based on profile
  const getFrameThickness = (profileId: string) => {
    if (profileId.includes('bluEvolution')) {
      return 24; // Premium profiles have thicker frames
    } else if (profileId.includes('evolutionDrive')) {
      return 20; // Mid-range profiles
    } else {
      return 16; // Standard profiles
    }
  };

  return { getFrameThickness };
};
