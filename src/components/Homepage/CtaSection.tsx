'use client';

import React from 'react';
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
        'relative left-1/2 -translate-x-1/2 w-[100vw] max-w-[1920px] aspect-[1920/1080]',
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

      {/* Content layer */}
      <div className="relative w-full max-w-[1640px] mx-auto flex flex-col mt-[5%] h-full">

        <div className="flex relative z-10 flex-col gap-6 items-center w-full">
          <h2 className="text-white lg:text-[170px] font-[900] uppercase leading-[0.9]">
            {t('ctaSection.title1')}
          </h2>
          <h2 className="text-white lg:text-[170px] font-[900] uppercase leading-[0.9]">
            {t('ctaSection.title2')}
          </h2>
          <h2 className="text-white lg:text-[170px] font-[900] uppercase leading-[0.9] flex items-center gap-[3vw]">
            <span>{t('ctaSection.title3start')}</span>
            <span className="inline-block w-[160px]" />
            <span>{t('ctaSection.title3end')}</span>
          </h2>
        </div>

        <div className="absolute left-[9%] top-[30%] w-full max-w-[836px] z-20 pointer-events-none select-none">
          <Image
            src="/images/slap.png"
            alt="ONESHOT figure"
            width={836}
            height={692}
            className="object-contain w-full h-full"
            priority
          />
        </div>

        {/* Right-side info block */}
        <div className="absolute right-[5%] bottom-[15%] z-30 flex flex-col items-start gap-4 max-w-[480px]">
          <span className="text-xl font-semibold tracking-widest leading-4 uppercase text-primary-pink font-nkduy">
            {t('ctaSection.label')}
          </span>
          <p className="text-2xl font-semibold leading-normal text-white/80">
            {t('ctaSection.description')}
          </p>
          <Button variant="primary" className="px-6 py-3 mt-[15%] text-base font-semibold">
            {t('cta.join')}
          </Button>
        </div>
      </div>
    </section>
  );
};
