
import { ReactNode } from 'react';

interface ConfigurationOptionsProps {
  children: ReactNode;
}

export const ConfigurationOptions = ({ children }: ConfigurationOptionsProps) => {
  return (
    <div className="lg:col-span-6 space-y-8">
      {children}
    </div>
  );
};
