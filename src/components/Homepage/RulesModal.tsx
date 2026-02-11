'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RULES_COUNT = 10;

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  const t = useTranslations('HomePage');

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const rules = Array.from({ length: RULES_COUNT }, (_, i) => ({
    number: String(i + 1).padStart(2, '0'),
    text: t(`rulesModal.rule${i + 1}`),
  }));

  return (
    <div
      className="flex fixed inset-0 z-50 justify-center items-center"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 backdrop-blur-sm bg-black/70"
        onClick={onClose}
      />

      <div
        className={cn(
          'relative z-10 w-full max-w-[1440px]',
          'overflow-y-auto bg-secondary-dark',
          'px-10 py-10 lg:px-10 lg:py-10',
        )}
      >
        <div className="flex justify-between items-start mb-15">
          <h5 className="text-white text-5xl font-[900] uppercase leading-[1.1] mt-5">
            {t('rulesModal.title')}
          </h5>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-2 ml-8 transition-colors text-white/60 hover:text-white"
            aria-label="Close"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* Rules: two columns with a single vertical divider between them */}
        <div className="flex flex-col gap-10 md:flex-row md:gap-16">
          {/* Left column */}
          <div className="flex flex-col gap-10 md:flex-1">
            {rules.filter((_, i) => i % 2 === 0).map((rule) => (
              <div key={rule.number} className="flex flex-col gap-3 max-w-[560px]">
                <span className="text-base font-semibold leading-[0.9] tracking-normal uppercase text-primary-pink font-nkduy">
                  [ &nbsp;{rule.number}&nbsp; ]
                </span>
                <p className="text-base font-normal leading-[1.5] text-secondary-gray font-body">
                  {rule.text}
                </p>
              </div>
            ))}
          </div>

          {/* Single vertical divider */}
          <div className="hidden w-px md:block bg-divider" />

          {/* Right column */}
          <div className="flex flex-col gap-10 md:flex-1">
            {rules.filter((_, i) => i % 2 !== 0).map((rule) => (
              <div key={rule.number} className="flex flex-col gap-3 max-w-[560px]">
                <span className="text-base font-semibold leading-[0.9] tracking-normal uppercase text-primary-pink font-nkduy">
                  [ &nbsp;{rule.number}&nbsp; ]
                </span>
                <p className="text-base font-normal leading-[1.5] text-secondary-gray font-body">
                  {rule.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
