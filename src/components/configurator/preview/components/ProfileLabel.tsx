
interface ProfileLabelProps {
  profileName: string;
  position?: 'top' | 'bottom';
}

export const ProfileLabel = ({ 
  profileName,
  position = 'bottom'
}: ProfileLabelProps) => {
  return (
    <div 
      className={`absolute ${position}-[5%] left-0 right-0 text-xs text-center text-gray-100 font-medium opacity-90 z-20`}
      style={{ transform: 'translateZ(6px)' }}
    >
      {profileName}
    </div>
  );
};
