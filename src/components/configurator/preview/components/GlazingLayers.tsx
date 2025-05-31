
interface GlazingLayersProps {
  glazingId: string;
}

export const GlazingLayers = ({ glazingId }: GlazingLayersProps) => {
  // Determine number of layers based on glazing type
  const getLayerCount = (id: string) => {
    if (id.includes('double')) return 2;
    if (id.includes('triple')) return 3;
    if (id.includes('quad')) return 4;
    return 2; // default to double glazing
  };

  const layerCount = getLayerCount(glazingId);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="flex gap-1">
        {Array.from({ length: layerCount }).map((_, index) => (
          <div
            key={index}
            className="w-1 h-8 bg-gradient-to-b from-blue-100 to-blue-200 opacity-30 rounded-sm"
            style={{
              boxShadow: 'inset 0 1px 2px rgba(59, 130, 246, 0.3)',
            }}
          />
        ))}
      </div>
    </div>
  );
};
