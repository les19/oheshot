'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui';

interface RulesSectionProps {
  className?: string;
}

/**
 * Rules Section Component
 * - 1640×415 background image card (rules.png with 3D red cubes)
 * - Centered label, headline, and CTA button overlaid
 */
export const RulesSection: React.FC<RulesSectionProps> = ({ className }) => {
  const t = useTranslations('HomePage');

  return (
    <section
      id="rules"
      className={cn('relative w-full', className)}
    >
      <div className="relative w-full mx-auto aspect-[1640/415]">
        <Image
          src="/images/rules.png"
          alt=""
          fill
          sizes="(min-width: 1640px) 1640px, 100vw"
          className="object-cover object-center pointer-events-none select-none"
          aria-hidden="true"
        />

        <div className="flex absolute inset-0 z-10 justify-center items-center px-4">
          <div className="flex flex-col gap-6 items-center text-center">
            <span className="text-xl font-semibold uppercase text-primary-pink font-nkduy">
              {t('rulesSection.label')}
            </span>

            <h3 className="text-white text-4xl font-[900] uppercase max-w-[900px]">
              {t('rulesSection.headline')}
            </h3>

            <Button variant="primary" className="px-6 py-3 mt-4 font-semibold">
              {t('rulesSection.button')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
