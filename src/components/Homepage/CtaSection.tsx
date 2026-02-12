'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui';

interface CtaSectionProps {
  className?: string;
}

/**
 * CTA Section Component
 * - Full-width hero-style call to action
 * - Aim/crosshair background image
 * - 3D figure (slap) overlapping the title
 * - Three-line bold headline with figure breaking the third line
 * - Right-side label, description, and CTA button
 */
export const CtaSection: React.FC<CtaSectionProps> = ({ className }) => {
  const t = useTranslations('HomePage');

  return (
    <section
      className={cn(
        'relative left-1/2 -translate-x-1/2 w-[100vw] max-w-[1920px]',
        'md:aspect-[1920/1080]', // Aspect ratio only on tablet+
        className,
      )}
    >
      <Image
        src="/images/aim-bg.png"
        alt=""
        fill
        sizes="(min-width: 1920px) 1920px, 100vw"
        className="object-cover object-center z-0 pointer-events-none select-none"
        aria-hidden="true"
        priority
      />

      {/* Content container */}
      <div className="relative w-full max-w-[1640px] mx-auto py-8 px-4 md:py-16 lg:px-0 lg:py-0 lg:flex lg:flex-col lg:mt-[5%] lg:h-full">
        {/* Headlines */}
        <div className="text-white flex relative z-10 flex-col gap-2 2xl:gap-6 items-center items-center mb-0 w-full">
          <h2 className="text-[44px] md:text-[90px] lg:text-[140px] 2xl:text-[170px] font-[900] uppercase leading-[0.9] text-center md:text-left lg:text-center">
            {t('ctaSection.title1')}
          </h2>
          <h2 className="text-[44px] md:text-[90px] lg:text-[140px] 2xl:text-[170px] font-[900] uppercase leading-[0.9] text-center md:text-left lg:text-center">
            {t('ctaSection.title2')}
          </h2>
          <h2 className="text-[44px] md:text-[90px] lg:text-[140px] 2xl:text-[170px] font-[900] uppercase leading-[0.9] text-center flex lg:items-center lg:gap-10">
            <span>{t('ctaSection.title3start')}</span>
            <span className="hidden md:inline-block w-[140px] 2xl:w-[160px]" />
            <span>{t('ctaSection.title3end')}</span>
          </h2>
        </div>

        {/* Slap image */}
        <div className="relative -ml-10 md:-ml-0 md:-mt-23 lg:mt-0 w-full flex justify-center md:justify-start lg:absolute lg:left-[4%] xl:left-[10%] 2xl:left-[9%] lg:top-[35%] xl:top-[30%] 2xl:top-[30%] my-0 z-20 pointer-events-none select-none">
          <div className="w-full max-w-[300px] md:max-w-[480px] lg:max-w-[500px] xl:max-w-[720px] 2xl:max-w-[836px]">
            <Image
              src="/images/slap.png"
              alt="ONESHOT figure"
              width={836}
              height={692}
              className="object-contain w-full h-auto lg:h-full"
              priority
            />
          </div>
        </div>

        {/* Info block */}
        <div className="flex flex-col items-start gap-5 md:gap-6 lg:gap-4 mt-6 md:mt-8 lg:mt-0 lg:absolute md:ml-6 lg:ml-0 lg:right-[3%] xl:right-[5%] 2xl:right-[5%] lg:bottom-[10%] xl:bottom-0 2xl:bottom-[15%] z-30 max-w-[438px] 2xl:max-w-[480px]">
          <span className="text-sm md:text-base lg:text-xl font-semibold tracking-widest leading-4 uppercase text-primary-pink font-nkduy">
            {t('ctaSection.label')}
          </span>
          <p className="text-xl lg:text-2xl leading-[1.1] text-white/80 font-semibold">
            {t('ctaSection.description')}
          </p>
          <Link href="#contacts" className="w-full md:w-auto lg:w-auto mt-2 lg:mt-[15%]">
            <Button variant="primary" className="px-6 py-4 md:px-8 md:py-4 lg:px-6 lg:py-3 text-sm md:text-base lg:text-base font-semibold w-full md:w-auto lg:w-auto">
              {t('cta.join')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
