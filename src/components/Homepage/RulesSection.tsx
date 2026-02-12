'use client';

import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui';
import { RulesModal } from './RulesModal';

interface RulesSectionProps {
  className?: string;
}

/**
 * Rules Section Component
 * - 1640×415 background image card (rules.png with 3D red cubes)
 * - Centered label, headline, and CTA button overlaid
 * - Opens RulesModal on button click
 */
export const RulesSection: React.FC<RulesSectionProps> = ({ className }) => {
  const t = useTranslations('HomePage');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <>
      <style>{`
        .rules-section-bg {
          background-image: url(/images/mobile-rules.png);
          height: 276px;
        }
        @media (min-width: 768px) {
          .rules-section-bg {
            background-image: url(/images/tablet-rules.png);
            height: 341px;
          }
        }
        @media (min-width: 1024px) {
          .rules-section-bg {
            background-image: url(/images/rules.png);
            height: 397px;
          }
        }
      `}</style>
      <section
        id="rules"
        className={cn('relative py-12 md:py-20 lg:py-40 w-full', className)}
      >
        <div className="relative w-full mx-auto bg-cover bg-center bg-no-repeat rules-section-bg">
          <div className="flex absolute inset-0 z-10 justify-center items-center px-4 md:px-10 lg:px-16 py-8 md:py-14 lg:py-20">
            <div className="flex flex-col gap-8 md:gap-10 lg:gap-10 items-center text-center w-full max-w-[900px]">
              <span className="text-sm md:text-base lg:text-xl font-semibold tracking-widest uppercase text-primary-pink font-nkduy">
                {t('rulesSection.label')}
              </span>

              <h3 className="text-white text-xl md:text-3xl lg:text-4xl font-[900] uppercase leading-[1.1] md:leading-[1.1] lg:leading-[1.1] px-2 md:px-10 lg:px-0">
                {t('rulesSection.headline')}
              </h3>

              <Button
                variant="primary"
                className="px-6 py-3 md:px-8 md:py-4 lg:px-6 lg:py-3 mt-0 md:mt-0 lg:mt-4 text-sm md:text-base lg:text-base font-semibold w-full md:w-auto"
                onClick={openModal}
              >
                {t('rulesSection.button')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <RulesModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};
