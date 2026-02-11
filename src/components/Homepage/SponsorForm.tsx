'use client';

import React, { useImperativeHandle, forwardRef, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui';
import { cn } from '@/lib/utils';
import {
  SectionHeader,
  inputClass,
  textareaClass,
  sponsorSchema,
  type SponsorFormValues,
} from '../../lib/formUtils';

export interface SponsorFormHandle {
  validate: () => Promise<boolean>;
  getFormData: () => FormData;
  reset: () => void;
}

export const SponsorForm = forwardRef<SponsorFormHandle>((_, ref) => {
  const t = useTranslations('HomePage');
  const schema = useMemo(() => sponsorSchema(t), [t]);

  const {
    register,
    handleSubmit,
    getValues,
    reset: resetForm,
    formState: { errors },
  } = useForm<SponsorFormValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      company: '',
      phone: '',
      email: '',
      description: '',
    },
  });

  useImperativeHandle(ref, () => ({
    async validate() {
      let isValid = false;
      await handleSubmit(
        () => { isValid = true; },
        () => { isValid = false; },
      )();
      return isValid;
    },
    reset() {
      resetForm();
    },
    getFormData() {
      const v = getValues();
      const fd = new FormData();
      fd.append('formType', 'sponsors');
      fd.append('company', v.company);
      fd.append('phone', v.phone);
      fd.append('email', v.email);
      fd.append('description', v.description);
      return fd;
    },
  }));

  return (
    <>
      <SectionHeader
        label={t('contactForm.sponsor.section1')}
        number="01"
      />
      <div className="mb-4">
        <Input
          placeholder={t('contactForm.sponsor.company')}
          maxLength={200}
          {...register('company')}
          error={errors.company?.message}
          className={inputClass}
        />
      </div>
      <div className="grid grid-cols-1 gap-y-0 gap-x-8 mb-4 md:grid-cols-2">
        <Input
          placeholder={t('contactForm.sponsor.phone')}
          maxLength={20}
          {...register('phone')}
          error={errors.phone?.message}
          className={inputClass}
        />
        <Input
          placeholder={t('contactForm.sponsor.email')}
          type="email"
          maxLength={254}
          {...register('email')}
          error={errors.email?.message}
          className={inputClass}
        />
      </div>
      <div className="mb-10">
        <div className="relative w-full pb-5">
          <textarea
            placeholder={t('contactForm.sponsor.description')}
            maxLength={2000}
            {...register('description')}
            rows={5}
            className={cn(
              textareaClass,
              errors.description?.message
                ? 'border-error hover:border-error focus:border-error'
                : ''
            )}
          />
          {errors.description?.message && (
            <p className="absolute bottom-0 left-0 text-xs text-error font-body truncate max-w-full">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>
    </>
  );
});

SponsorForm.displayName = 'SponsorForm';
