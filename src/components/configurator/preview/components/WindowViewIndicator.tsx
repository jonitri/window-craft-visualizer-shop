
interface WindowViewIndicatorProps {
  viewMode: 'front' | 'back';
}

export const WindowViewIndicator = ({ viewMode }: WindowViewIndicatorProps) => {
  const isFrontView = viewMode === 'front';
  
  return (
    <div className="absolute top-2 left-0 right-0 text-center z-20 pointer-events-none">
      <span className="bg-black bg-opacity-70 text-white text-xs font-medium px-3 py-1 rounded-full">
        {isFrontView ? 'Outside View' : 'Inside View'}
      </span>
    </div>
  );
};
