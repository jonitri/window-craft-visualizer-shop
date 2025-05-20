
import { ReactNode } from 'react';

interface ConfigurationOptionsProps {
  children: ReactNode;
}

export const ConfigurationOptions = ({ children }: ConfigurationOptionsProps) => {
  return (
    <div className="lg:col-span-6 space-y-8 overflow-y-auto max-h-[calc(100vh-200px)] pr-2 pb-4">
      {children}
    </div>
  );
};
