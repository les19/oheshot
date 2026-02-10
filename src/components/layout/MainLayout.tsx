import React from 'react';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Main Layout Component
 * - Main content width: 1640px (for JSX elements)
 * - Full width: 1920px (for decorative elements)
 */
export const MainLayout: React.FC<MainLayoutProps> = ({ children, className }) => {
  return (
    <div className="w-full min-h-screen bg-black overflow-x-hidden">
      {/* Full width container (1920px) for decorative elements */}
      <div className="w-full max-w-[1920px] mx-auto relative">
        {/* Main content container (1640px) */}
        <div className={cn('max-w-[1640px] mx-auto px-4', className)}>
          {children}
        </div>
      </div>
    </div>
  );
};
