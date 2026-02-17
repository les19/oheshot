'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface HeroCoin3DProps {
  className?: string;
  size?: 'mobile' | 'tablet' | 'desktop';
}

/**
 * 3D Animated Coin Component
 * Creates a rotating 3D coin effect using CSS transforms
 */
export const HeroCoin3D: React.FC<HeroCoin3DProps> = ({ className, size = 'desktop' }) => {
  const sizeClasses = {
    mobile: 'w-[300px] h-[300px]',
    tablet: 'w-[530px] h-[530px]',
    desktop: 'w-full max-w-[600px] h-auto aspect-square',
  };

  return (
    <div className={cn('coin-scene', sizeClasses[size], className)}>
      <div className="coin-3d">
        <div className="coin-face coin-face-front" />
        <div className="coin-face coin-face-back" />
      </div>
    </div>
  );
};
