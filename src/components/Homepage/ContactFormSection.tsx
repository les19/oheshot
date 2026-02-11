'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui';
import { ParticipantsForm, type ParticipantsFormHandle } from './ParticipantsForm';
import { SponsorForm, type SponsorFormHandle } from './SponsorForm';
import { SuccessModal } from './SuccessModal';

const SUBMIT_URL = '/api/submit-form';

type FormTab = 'participants' | 'sponsors';

interface ContactFormSectionProps {
  className?: string;
}

/**
 * Contact Form Section (wrapper)
 * - Header, toggle tabs, cube background decorations
 * - Delegates form fields/validation to ParticipantsForm & SponsorForm
 * - Handles submission to webhook
 */
export const ContactFormSection: React.FC<ContactFormSectionProps> = ({
  className,
}) => {
  const t = useTranslations('HomePage');
  const [activeTab, setActiveTab] = useState<FormTab>('participants');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const participantsRef = useRef<ParticipantsFormHandle>(null);
  const sponsorRef = useRef<SponsorFormHandle>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formRef =
      activeTab === 'participants' ? participantsRef.current : sponsorRef.current;
    if (!formRef) return;

    const isValid = await formRef.validate();
    if (!isValid) return;

    setIsSubmitting(true);
    try {
      const formData = formRef.getFormData();
      const res = await fetch(SUBMIT_URL, { method: 'POST', body: formData });
      if (res.ok) {
        formRef.reset();
        setShowSuccess(true);
      }
    } catch {
      // silently fail for now
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contacts"
      className={cn(
        'overflow-hidden relative left-1/2 -translate-x-1/2 w-[100vw] max-w-[1920px] min-h-[1545px]',
        className,
      )}
    >
      {/* Cube decorations */}
      <div className="absolute top-[15%] right-[5%] w-full max-w-[636px] h-full pointer-events-none select-none z-0">
        <Image
          src="/images/cube2.svg"
          alt=""
          width={636}
          height={636}
          className="absolute -top-[5%] -right-[10%] w-full h-auto opacity-80"
          aria-hidden="true"
        />
      </div>
      <div className="absolute bottom-[17%] left-[5%] w-full max-w-[678px] h-full pointer-events-none select-none z-0">
        <Image
          src="/images/cube1.svg"
          alt=""
          width={678}
          height={678}
          className="absolute -bottom-[10%] -left-[10%] w-full h-auto opacity-80"
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1640px] mx-auto px-4 py-24 lg:py-32">
        {/* Header */}
        <div className="flex flex-col gap-4 items-center mb-12 text-center">
          <span className="text-xl font-semibold uppercase text-primary-pink font-nkduy">
            {t('contactForm.label')}
          </span>
          <h3 className="text-white text-3xl md:text-5xl font-[900]  uppercase ">
            {t('contactForm.headline')}
          </h3>
        </div>

        {/* Toggle tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex overflow-hidden p-1 border border-divider border-[#232323]">
            <button
              type="button"
              onClick={() => setActiveTab('participants')}
              className={cn(
                'px-8 py-3  font-semibold uppercase transition-all duration-200',
                activeTab === 'participants'
                  ? 'bg-primary-pink text-white'
                  : 'bg-transparent text-white hover:text-primary-pink',
              )}
            >
              {t('contactForm.tabParticipants')}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('sponsors')}
              className={cn(
                'px-8 py-3 font-semibold uppercase transition-all duration-200',
                activeTab === 'sponsors'
                  ? 'bg-primary-pink text-white'
                  : 'bg-transparent text-white hover:text-primary-pink',
              )}
            >
              {t('contactForm.tabSponsors')}
            </button>
          </div>
        </div>

        {/* Form card */}
        <div className="relative max-w-[1640px] mx-auto bg-secondary-dark/70 backdrop-blur-sm px-8 py-10 lg:px-12 lg:py-20">
          <form onSubmit={handleSubmit} noValidate autoComplete="off" className='max-w-[980px] mx-auto'>
            {activeTab === 'participants' ? (
              <ParticipantsForm ref={participantsRef} />
            ) : (
              <SponsorForm ref={sponsorRef} />
            )}

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              className="py-4 w-full text-sm font-semibold uppercase"
            >
              {t('contactForm.submit')}
            </Button>
          </form>
        </div>
      </div>

      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
    </section>
  );
};
