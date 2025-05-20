
interface OpeningDirectionIconProps {
  direction: string;
}

export const OpeningDirectionIcon = ({ direction }: OpeningDirectionIconProps) => {
  switch(direction) {
    case 'left':
      return (
        <div className="w-6 h-6 flex items-center justify-center">
          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-r-[10px] border-r-primary border-b-[6px] border-b-transparent" />
        </div>
      );
    case 'right':
      return (
        <div className="w-6 h-6 flex items-center justify-center">
          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-primary border-b-[6px] border-b-transparent" />
        </div>
      );
    case 'top-left':
      return (
        <div className="w-6 h-6 flex items-center justify-center">
          <div className="w-0 h-0 border-r-[6px] border-r-transparent border-l-[6px] border-l-transparent border-b-[10px] border-b-primary transform rotate-[225deg]" />
        </div>
      );
    case 'top-right':
      return (
        <div className="w-6 h-6 flex items-center justify-center">
          <div className="w-0 h-0 border-r-[6px] border-r-transparent border-l-[6px] border-l-transparent border-b-[10px] border-b-primary transform rotate-[135deg]" />
        </div>
      );
    default:
      return null;
  }
};
