
import { ReactNode } from 'react';

interface PreviewAndSummaryProps {
  children: ReactNode;
}

export const PreviewAndSummary = ({ children }: PreviewAndSummaryProps) => {
  return (
    <div className="lg:col-span-4 space-y-6">
      <div>
        {children}
      </div>
    </div>
  );
};
