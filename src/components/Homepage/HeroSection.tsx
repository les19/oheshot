'use client';

import React from 'react';
import Image from 'next/image';
import { MoveDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface HeroSectionProps {
  className?: string;
}

/**
 * Hero Section Component
 * - Left column: Main headline, scroll indicator, subtitle
 * - Center: Large pink ring graphic with X's
 * - Right column: Two paragraphs, icons at bottom
 * - Bottom: Large "ONE SHOT" wordmark
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const t = useTranslations('HomePage');

  return (
    <div className={cn('flex relative flex-col w-full', className)}>
      {/* Main Content Area */}
      <div className="w-full max-w-[1640px] mx-auto  relative min-h-[1000px]">
        {/* Grid Layout */}
        <div className="flex gap-4 h-full">
          {/* Left Column */}
          <div className=" z-20 max-w-[23%] flex flex-col justify-between items-start h-full min-h-[500px] mt-15">
            <h2 className="text-lg font-bold text-white lg:text-2xl">
              {t('heroSection.subtext')}
            </h2>
            <div className="flex justify-center items-center w-full">
              <MoveDown className="w-6 h-6 lg:w-8 lg:h-8 text-primary-pink" strokeWidth={2} />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-bold tracking-wide text-white uppercase lg:text-base font-nkduy">
                {t('title')}
              </p>
              <p className="text-sm font-bold tracking-wide text-white uppercase lg:text-base font-nkduy">
                {t('heroSection.subtitle')}
              </p>
              <p className="text-white text-sm lg:text-base font-bold font-nkduy uppercase tracking-wide pl-[110px] ">
                {t('heroSection.subtitle2')}
              </p>
            </div>
          </div>

          {/* Center Column - Graphic */}
          <div className="relative w-full z-1">
            <Image
              src="/images/hero-icon.svg"
              alt="Hero Icon"
              width={600}
              height={600}
              className="w-full h-auto"
              priority
            />
            <div
              className="z-10 absolute top-[323.99px] left-1/2 w-full max-w-[953.08px] aspect-[953/272] -translate-x-1/2 rotate-[351.5deg] rounded-full"
              style={{
                background: 'linear-gradient(to right, #E7E0E0 0%, #E0A9AD 0%, #DD004D, #000000)',
                filter: 'blur(250px)',
              }}
            />
            {/* for now like that, then will see */}
            {/* <Image
              src="/images/Ellipse.png"
              alt="Ellipse background"
              width={953}
              height={272}
              className="absolute md:top-[324px] top-[100px] left-1/2 -translate-x-1/2 rotate-[351.5deg] z-0 scale-300 md:scale-200 "
              style={{
                width: '953.08px',
                height: '272.23px',
              }}
            /> */}
          </div>

          {/* Right Column */}
          <div className="z-20 max-w-[20%] flex flex-col justify-between items-start h-full min-h-[500px] mt-15">
            <div className="flex flex-col gap-3">
              <p className="text-base leading-relaxed text-white lg:text-md font-body">
                {t('heroSection.subtext2')}
              </p>
              <p className="text-base leading-relaxed text-white lg:text-md font-body">
                {t('heroSection.subtext3')}
              </p>
            </div>

            {/* Icons */}
            <div className="flex gap-4 items-center">
              <Image
                src="/icons/logoP.svg"
                alt="Cross icon"
                width={23}
                height={23}
                className="w-6 h-6 lg:w-8 lg:h-8"
              />
              <Image
                src="/icons/cross.svg"
                alt="Cross icon"
                width={23}
                height={23}
                className="w-6 h-6 lg:w-8 lg:h-8"
              />
              <span className="flex justify-center items-center w-8 h-8 font-bold text-black rounded-full font-nkduy text-md bg-primary-pink">
                1
              </span>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-[80px] z-10 pointer-events-none ">
          <div className="mx-auto w-full max-w-[1860px] translate-y-[18%] flex items-end justify-start">
            <Image
              src="/images/one.png"
              alt="ONE"
              width={800}
              height={400}
              className="w-[50%] h-auto object-contain object-left-bottom"
              priority
            />
            <Image
              src="/images/shot.png"
              alt="SHOT"
              width={800}
              height={400}
              className="w-[50%] h-auto object-contain object-left-bottom"
              priority
            />
          </div>
        </div>
      </div>
    </div >
  );
};
