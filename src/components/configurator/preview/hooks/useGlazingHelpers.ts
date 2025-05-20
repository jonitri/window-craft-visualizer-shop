
export const useGlazingHelpers = () => {
  // Helper function to get glass opacity based on glazing
  const getGlassOpacity = (glazingId: string) => {
    switch (glazingId) {
      case 'glz-triple':
        return 0.7; // Triple glazing is less transparent
      case 'glz-quad':
        return 0.6; // 4 glazing is even less transparent
      default:
        return 0.85; // Double glazing (standard)
    }
  };

  return { getGlassOpacity };
};
