
interface RubberSealsProps {
  children?: React.ReactNode;
}

const RubberSeals = ({ children }: RubberSealsProps) => (
  <div className="rubber-seals">
    <div className="rubber-seal top"></div>
    <div className="rubber-seal bottom"></div>
    <div className="rubber-seal left"></div>
    <div className="rubber-seal right"></div>
    {children}
  </div>
);

interface WindowHandleProps {
  children?: React.ReactNode;
}

const WindowHandle = ({ children }: WindowHandleProps) => (
  <div className="window-handle">
    <div className="handle-base"></div>
    <div className="handle-lever"></div>
    {children}
  </div>
);

interface SashProps {
  className?: string;
  showHandle?: boolean;
  isFixed?: boolean;
}

const Sash = ({ className = '', showHandle = false, isFixed = false }: SashProps) => (
  <div className={`window-sash ${className}`}>
    <div className="sash-front"></div>
    <div className="sash-back"></div>
    <RubberSeals />
    {showHandle && <WindowHandle />}
    {isFixed && <div className="fixed-label">FIXED</div>}
  </div>
);

interface WindowSashProps {
  windowType: string;
}

export const WindowSash = ({ windowType }: WindowSashProps) => {
  switch (windowType) {
    case 'double-leaf':
      return (
        <>
          <Sash className="left-sash" showHandle={true} />
          <Sash className="right-sash" />
        </>
      );
    
    case 'triple-leaf':
      return (
        <>
          <Sash className="left-sash" showHandle={true} />
          <Sash className="center-sash" />
          <Sash className="right-sash" />
        </>
      );
    
    case 'fixed':
      return <Sash className="fixed-sash" isFixed={true} />;
    
    default:
      return <Sash showHandle={true} />;
  }
};
