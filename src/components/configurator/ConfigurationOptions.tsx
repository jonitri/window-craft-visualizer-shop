
import { ReactNode, useEffect, useRef } from 'react';

interface ConfigurationOptionsProps {
  children: ReactNode;
}

export const ConfigurationOptions = ({ children }: ConfigurationOptionsProps) => {
  const optionsRef = useRef<HTMLDivElement>(null);

  // This effect prevents scrolling to the bottom when options are clicked
  useEffect(() => {
    const handleClickInside = (e: MouseEvent) => {
      // Prevent default only for buttons, selects, and inputs to avoid scrolling
      if (
        e.target instanceof HTMLButtonElement ||
        e.target instanceof HTMLSelectElement ||
        e.target instanceof HTMLInputElement
      ) {
        e.preventDefault();
      }
    };

    const optionsElement = optionsRef.current;
    if (optionsElement) {
      optionsElement.addEventListener('click', handleClickInside);
    }

    return () => {
      if (optionsElement) {
        optionsElement.removeEventListener('click', handleClickInside);
      }
    };
  }, []);

  return (
    <div 
      ref={optionsRef}
      className="lg:col-span-6 space-y-8 overflow-y-auto pb-24"
      style={{ 
        height: 'calc(100vh - 80px)', 
        paddingRight: '1rem',
        position: 'sticky',
        top: '80px'
      }}
    >
      {children}
    </div>
  );
};
