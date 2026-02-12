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
      className="flex fixed inset-0 z-50 justify-center items-center p-4 md:p-6 lg:p-10"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 backdrop-blur-sm bg-black/70"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-[1440px] h-full max-h-[90vh] md:max-h-[85vh] lg:max-h-[80vh] bg-secondary-dark flex flex-col">
        {/* Header - fixed */}
        <div className="flex justify-between items-start px-4 py-4 md:px-6 md:py-6 lg:px-10 lg:py-10 flex-shrink-0 border-b border-divider">
          <h5 className="text-white text-2xl md:text-3xl lg:text-5xl font-[900] uppercase leading-[1.1]">
            {t('rulesModal.title')}
          </h5>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-2 ml-4 md:ml-6 lg:ml-8 transition-colors text-white/60 hover:text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
          </button>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-6 lg:px-10 lg:py-10">
          {/* Rules: single column on mobile, two columns on tablet+ */}
          <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 md:flex-row md:gap-8 lg:gap-16">
            {/* Left column */}
            <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 md:flex-1">
              {rules.filter((_, i) => i % 2 === 0).map((rule) => (
                <div key={rule.number} className="flex flex-col gap-2 md:gap-3">
                  <span className="text-sm md:text-base font-semibold leading-[0.9] tracking-normal uppercase text-primary-pink font-nkduy">
                    [ &nbsp;{rule.number}&nbsp; ]
                  </span>
                  <p className="text-sm md:text-base font-normal leading-[1.5] text-secondary-gray font-body">
                    {rule.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Single vertical divider */}
            <div className="hidden w-px md:block bg-divider flex-shrink-0" />

            {/* Right column */}
            <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 md:flex-1">
              {rules.filter((_, i) => i % 2 !== 0).map((rule) => (
                <div key={rule.number} className="flex flex-col gap-2 md:gap-3">
                  <span className="text-sm md:text-base font-semibold leading-[0.9] tracking-normal uppercase text-primary-pink font-nkduy">
                    [ &nbsp;{rule.number}&nbsp; ]
                  </span>
                  <p className="text-sm md:text-base font-normal leading-[1.5] text-secondary-gray font-body">
                    {rule.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
