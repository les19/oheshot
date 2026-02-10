'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  className?: string;
}

/**
 * Hero Section Component
 * - Hero icon SVG
 * - Styled ellipse figure with gradient and blur effect underneath
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      <div className="relative flex flex-col items-center">
        {/* Hero Icon */}
        <div className="relative z-1">
          <Image
            src="/images/hero-icon.svg"
            alt="Hero Icon"
            width={600}
            height={600}
            className="w-full h-auto"
            priority
          />
        </div>
        {/* <div
          className="z-10 absolute top-[323.99px] left-1/2 w-full max-w-[953.08px] aspect-[953/272] -translate-x-1/2 rotate-[351.5deg] rounded-full"
          style={{
            background: 'linear-gradient(to right, #E7E0E0 0%, #E0A9AD 0%, #DD004D, #000000)',
            filter: 'blur(250px)',
          }}
        /> */}
        {/* for now like that, then will see */}
        <Image
          src="/images/Ellipse.png"
          alt="Ellipse background"
          width={953}
          height={272}
          className="absolute md:top-[324px] top-[100px] left-1/2 -translate-x-1/2 rotate-[351.5deg] z-0 scale-300 md:scale-200 "
          style={{
            width: '953.08px',
            height: '272.23px',
          }}
        />
      </div>
    </div>
  );
};
