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
      <div className="w-full max-w-[1640px] mx-auto px-0 md:px-10 md:pt-24 pt-0 ">
        {/* Top area: headline + description */}
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-20">
          {/* Left — label + headline */}
          <div className="flex flex-col gap-6 lg:max-w-[65%] z-10">
            <h2 className="text-xl font-semibold tracking-widest uppercase text-primary-pink font-nkduy">
              {t('aboutSection.label')}
            </h2>
            <h5 className="text-white text-[28px] md:text-[40px] lg:text-5xl leading-[1.1] uppercase font-[900] max-w-[850px]">
              {t('aboutSection.headline')}
            </h5>
          </div>

          {/* Right — description */}
          <div className="flex items-start lg:items-end lg:ml-auto max-w-full md:max-w-[364px] lg:max-w-[320px]">
            <p className="text-sm leading-[1.5] text-[#888] font-body lg:text-base">
              {t('aboutSection.description')}
            </p>
          </div>
        </div>

        {/* Bottom items */}
        <div className="md:relative hidden md:block md:mt-10 mt-0 min-h-[100px] ">
          {/* Pink gradient spot — reused from HeroSection */}
          <div
            className="scale-60 pointer-events-none absolute bottom-10 left-1/2 w-full max-w-[953.08px] aspect-[953/272] -translate-x-1/2 translate-y-1/3 rounded-full"
            style={{
              background:
                'linear-gradient(to right, #E7E0E0 0%, #E0A9AD 0%, #DD004D, #000000)',
              filter: 'blur(300px)',
            }}
          />
        </div>

        {/* Three items — stacked on mobile/tablet, horizontal with dividers on desktop */}
        <div className="flex relative z-10 flex-col gap-6 md:gap-8 justify-between items-start mt-10 lg:flex-row lg:gap-0">
          {/* Item 01 */}
          <div className="flex flex-col gap-4 md:gap-6 lg:w-[32%] lg:border-r lg:border-white/10 lg:pr-12">
            <span className="text-base font-semibold tracking-widest text-primary-pink font-nkduy">
              [ &nbsp;01&nbsp; ]
            </span>
            <p className="text-xl font-semibold leading-[1.1] text-white lg:text-2xl lg:leading-relaxed">
              {t('aboutSection.item1')}
            </p>
          </div>

          {/* Item 02 */}
          <div className="flex flex-col gap-4 md:gap-6 lg:w-[31%] lg:border-r lg:border-white/10 lg:px-12">
            <span className="text-base font-semibold tracking-widest text-primary-pink font-nkduy">
              [ &nbsp;02&nbsp; ]
            </span>
            <p className="text-xl font-semibold leading-[1.1] text-white lg:text-2xl lg:leading-relaxed">
              {t('aboutSection.item2')}
            </p>
          </div>

          {/* Item 03 */}
          <div className="flex flex-col gap-4 md:gap-6 lg:w-[24%] lg:pl-12">
            <span className="text-base font-semibold tracking-widest text-primary-pink font-nkduy">
              [ &nbsp;03&nbsp; ]
            </span>
            <p className="text-xl font-semibold leading-[1.1] text-white lg:text-2xl lg:leading-relaxed">
              {t('aboutSection.item3')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
