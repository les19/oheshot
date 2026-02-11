'use client';

import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
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

  // Close on Escape key
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

  return (
    <div
      className="flex fixed inset-0 z-50 justify-center items-center px-4"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-sm bg-black/70"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-[540px] bg-secondary-dark px-10 py-14 flex flex-col items-center text-center">
        <h4 className="text-white text-3xl md:text-4xl font-[900] uppercase mb-4">
          {t('successModal.title')}
        </h4>
        <p className="text-secondary-gray text-base font-body leading-relaxed mb-10 max-w-[400px]">
          {t('successModal.text')}
        </p>
        <Button
          variant="primary"
          onClick={onClose}
          className="px-12 py-4 text-sm font-semibold uppercase"
        >
          {t('successModal.button')}
        </Button>
      </div>
    </div>
  );
};
