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
 * Desktop (lg+):
 *   - Three-column layout: left headline/subtitle, center graphic, right descriptions/icons
 *   - Bottom: Large "ONE SHOT" wordmark
 * Tablet/Mobile (<lg):
 *   - Top row: headline (left) + descriptions (right) side by side
 *   - Center: hero graphic (530px on md, smaller on mobile)
 *   - Bottom row: subtitle text (left) + icons (right)
 *   - Bottom: wordmark
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const t = useTranslations('HomePage');

  return (
    <div className={cn('flex relative flex-col w-full', className)}>
      <div className="w-full max-w-[1640px] mx-auto relative min-h-[650px] md:min-h-[850px] lg:min-h-[1000px]">

        {/* ===== Tablet & Mobile Layout (below lg) ===== */}
        <div className="lg:hidden flex flex-col">
          {/* Top text row: stacked on mobile, side-by-side on tablet */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-16 px-0 md:px-10 mt-6 md:mt-12">
            {/* Left: Bold headline */}
            <div className="w-full md:flex-1 md:max-w-[307px]">
              <h2 className="text-xl font-semibold text-white leading-[1.1]">
                {t('heroSection.subtext')}
              </h2>
            </div>
            {/* Right: Description texts */}
            <div className="w-full md:flex-1 md:max-w-[291px] flex flex-col gap-3">
              <p className="text-sm leading-[1.1] text-light-grayish-pink font-body">
                {t('heroSection.subtext2')}
              </p>
              <p className="text-sm leading-[1.1] text-light-grayish-pink font-body">
                {t('heroSection.subtext3')}
              </p>
            </div>
          </div>

          {/* Center Graphic */}
          <div className="relative w-full flex justify-center mt-4 md:mt-10">
            <Image
              src="/images/hero-icon.svg"
              alt="Hero Icon"
              width={530}
              height={530}
              className="w-[300px] h-[300px] md:w-[530px] md:h-[530px] relative z-10"
              priority
            />
            {/* Ellipse blur glow */}
            <div
              className="z-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-8.5deg] rounded-full w-[130%] md:w-[90%] max-w-[683px] aspect-[393/201] md:aspect-[683/228] blur-[170px] md:blur-[200px]"
              style={{
                background: 'linear-gradient(to right, #E7E0E0 0%, #E0A9AD 0%, #DD004D, #000000)',
              }}
            />
          </div>

          {/* Bottom bar: subtitle text (centered on mobile, left+icons on tablet) */}
          <div className="flex flex-col md:flex-row items-center md:justify-between md:items-end px-4 md:px-10 mt-6 md:mt-10 relative z-10">
            <div className="flex flex-col gap-1 items-center md:items-start">
              <p className="text-sm font-bold tracking-wide text-white uppercase font-nkduy text-center md:text-left">
                {t('title')}
              </p>
              <p className="text-sm font-bold tracking-wide text-white uppercase font-nkduy text-center md:text-left">
                {t('heroSection.subtitle')}
              </p>
              <p className="text-white text-sm font-bold font-nkduy uppercase tracking-wide text-center md:text-left md:pl-[110px]">
                {t('heroSection.subtitle2')}
              </p>
            </div>
            {/* Icons — tablet only */}
            <div className="hidden md:flex gap-3 items-center">
              <Image
                src="/icons/logoP.svg"
                alt="Logo icon"
                width={23}
                height={23}
                className="w-6 h-6"
              />
              <Image
                src="/icons/cross.svg"
                alt="Cross icon"
                width={23}
                height={23}
                className="w-6 h-6"
              />
              <span className="flex justify-center items-center w-6 h-6 font-bold text-black rounded-full font-nkduy text-xs bg-primary-pink">
                1
              </span>
            </div>
          </div>
        </div>

        {/* ===== Desktop Layout (lg+) ===== */}
        <div className="hidden lg:flex gap-4 h-full">
          {/* Left Column */}
          <div className="z-20 max-w-[23%] flex flex-col justify-between items-start h-full min-h-[500px] mt-15">
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

        {/* ONE SHOT Wordmark — visible on all sizes */}
        <div className="xl:absolute bottom-[30px] md:bottom-[50px] lg:bottom-[80px] left-1/2 xl:-translate-x-1/2 xl:w-[100vw] max-w-[1920px] px-0 xl:px-8 z-10 pointer-events-none">
          <div className="w-full xl:translate-y-[18%] flex items-end justify-start">
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
    </div>
  );
};
