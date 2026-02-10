'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface AboutSectionProps {
  className?: string;
}

/**
 * About Section Component
 * - "About Us" label + large headline on the left
 * - Description paragraph on the right
 * - Three numbered items at the bottom
 * - Pink gradient spot (reused from HeroSection)
 */
export const AboutSection: React.FC<AboutSectionProps> = ({ className }) => {
  const t = useTranslations('HomePage');

  return (
    <section
      id="about"
      className={cn('relative w-full', className)}
    >
      <div className="w-full max-w-[1640px] mx-auto px-4 py-24 lg:py-32">
        {/* Top area: headline + description */}
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-20">
          {/* Left — label + headline */}
          <div className="flex flex-col gap-6 lg:max-w-[65%] z-10">
            <h2 className="text-xl font-semibold tracking-widest uppercase text-primary-pink font-nkduy">
              {t('aboutSection.label')}
            </h2>
            <h5 className="text-white text-3xl md:text-5xl lg:text-5xl  leading-[1.05] uppercase font-[900] max-w-[850px]">
              {t('aboutSection.headline')}
            </h5>
          </div>

          {/* Right — description */}
          <div className="flex items-start lg:items-end  lg:ml-auto max-w-[320px]">
            <p className="text-sm leading-relaxed text-white/70 font-body lg:text-base">
              {t('aboutSection.description')}
            </p>
          </div>
        </div>

        {/* Bottom items */}
        <div className="relative mt-10 min-h-[100px]">
          {/* Pink gradient spot — reused from HeroSection */}
          <div
            className="scale-80 pointer-events-none absolute bottom-0 left-1/2 w-full max-w-[953.08px] aspect-[953/272] -translate-x-1/2 translate-y-1/3 rounded-full"
            style={{
              background:
                'linear-gradient(to right, #E7E0E0 0%, #E0A9AD 0%, #DD004D, #000000)',
              filter: 'blur(300px)',
            }}
          />
        </div>

        {/* Three columns with dividers between them */}
        <div className="flex relative z-10 flex-col gap-8 justify-between items-start mt-10 md:flex-row lg:gap-0">
          {/* Item 01 */}
          <div className="flex flex-col gap-6 md:w-[32%] md:border-r md:border-white/10 md:pr-8 lg:pr-12">
            <span className="text-base font-semibold tracking-widest text-primary-pink font-nkduy">
              [ &nbsp;01&nbsp; ]
            </span>
            <p className="text-sm font-semibold leading-relaxed text-white lg:text-2xl">
              {t('aboutSection.item1')}
            </p>
          </div>

          {/* Item 02 */}
          <div className="flex flex-col gap-6 md:w-[31%] md:border-r md:border-white/10 md:px-8 lg:px-12">
            <span className="text-base font-semibold tracking-widest text-primary-pink font-nkduy">
              [ &nbsp;02&nbsp; ]
            </span>
            <p className="text-sm font-semibold leading-relaxed text-white lg:text-2xl">
              {t('aboutSection.item2')}
            </p>
          </div>

          {/* Item 03 */}
          <div className="flex flex-col gap-6 md:w-[24%] md:pl-8 lg:pl-12">
            <span className="text-base font-semibold tracking-widest text-primary-pink font-nkduy">
              [ &nbsp;03&nbsp; ]
            </span>
            <p className="text-sm font-semibold leading-relaxed text-white lg:text-2xl">
              {t('aboutSection.item3')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
