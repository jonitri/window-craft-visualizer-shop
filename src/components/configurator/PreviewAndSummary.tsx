
import { ReactNode } from 'react';

interface PreviewAndSummaryProps {
  children: ReactNode;
}

export const PreviewAndSummary = ({ children }: PreviewAndSummaryProps) => {
  return (
    <div className="lg:col-span-4 space-y-6">
      <div className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};
