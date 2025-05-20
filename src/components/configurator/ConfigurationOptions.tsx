
import { ReactNode } from 'react';

interface ConfigurationOptionsProps {
  children: ReactNode;
}

export const ConfigurationOptions = ({ children }: ConfigurationOptionsProps) => {
  return (
    <div className="lg:col-span-6">
      <div className="space-y-6 pb-12">
        {children}
      </div>
    </div>
  );
};
