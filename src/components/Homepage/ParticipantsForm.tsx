'use client';

import React, { useImperativeHandle, forwardRef, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Input, FileUpload } from '@/components/ui';
import { cn } from '@/lib/utils';
import {
  SectionHeader,
  inputClass,
  textareaClass,
  participantSchema,
  ALLOWED_FILE_EXTENSIONS,
  type ParticipantFormValues,
} from '../../lib/formUtils';

export interface ParticipantsFormHandle {
  validate: () => Promise<boolean>;
  getFormData: () => FormData;
  reset: () => void;
}

export const ParticipantsForm = forwardRef<ParticipantsFormHandle>(
  (_, ref) => {
    const t = useTranslations('HomePage');
    const schema = useMemo(() => participantSchema(t), [t]);

    const {
      register,
      handleSubmit,
      getValues,
      setValue,
      reset: resetForm,
      formState: { errors },
    } = useForm<ParticipantFormValues>({
      resolver: zodResolver(schema),
      mode: 'onSubmit',
      reValidateMode: 'onChange',
      defaultValues: {
        name: '',
        location: '',
        phone: '',
        email: '',
        social: '',
        height: '',
        weight: '',
        skills: '',
        about: '',
        resume: null,
        medical: null,
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
        fd.append('formType', 'participants');
        fd.append('name', v.name);
        fd.append('location', v.location);
        fd.append('phone', v.phone);
        fd.append('email', v.email);
        fd.append('social', v.social ?? '');
        fd.append('height', v.height);
        fd.append('weight', v.weight);
        fd.append('skills', v.skills);
        fd.append('about', v.about);
        if (v.resume) fd.append('resume', v.resume);
        if (v.medical) fd.append('medical', v.medical);
        return fd;
      },
    }));

    return (
      <>
        {/* Section 01: Contact Info */}
        <SectionHeader
          label={t('contactForm.participant.section1')}
          number="01"
        />
        <div className="grid grid-cols-1 gap-y-4 gap-x-8 mb-8 md:grid-cols-2">
          <Input
            placeholder={t('contactForm.participant.name')}
            maxLength={100}
            {...register('name')}
            error={errors.name?.message}
            className={inputClass}
          />
          <Input
            placeholder={t('contactForm.participant.location')}
            maxLength={200}
            {...register('location')}
            error={errors.location?.message}
            className={inputClass}
          />
          <Input
            placeholder={t('contactForm.participant.phone')}
            maxLength={20}
            {...register('phone')}
            error={errors.phone?.message}
            className={inputClass}
          />
          <Input
            placeholder={t('contactForm.participant.email')}
            type="email"
            maxLength={254}
            {...register('email')}
            error={errors.email?.message}
            className={inputClass}
          />
        </div>
        <div className="mb-10">
          <Input
            placeholder={t('contactForm.participant.social')}
            maxLength={300}
            {...register('social')}
            className={inputClass}
          />
        </div>

        {/* Section 02: Personal Info */}
        <SectionHeader
          label={t('contactForm.participant.section2')}
          number="02"
        />
        <div className="grid grid-cols-1 gap-y-0 gap-x-8 mb-4 md:grid-cols-2">
          <Input
            placeholder={t('contactForm.participant.height')}
            maxLength={4}
            {...register('height')}
            error={errors.height?.message}
            className={inputClass}
          />
          <Input
            placeholder={t('contactForm.participant.weight')}
            maxLength={4}
            {...register('weight')}
            error={errors.weight?.message}
            className={inputClass}
          />
        </div>
        <div className="mb-4">
          <Input
            placeholder={t('contactForm.participant.skills')}
            maxLength={500}
            {...register('skills')}
            error={errors.skills?.message}
            className={inputClass}
          />
        </div>
        <div className="mb-10">
          <div className="relative pb-5 w-full">
            <textarea
              placeholder={t('contactForm.participant.about')}
              maxLength={2000}
              {...register('about')}
              rows={4}
              className={cn(
                textareaClass,
                errors.about?.message
                  ? 'border-error hover:border-error focus:border-error'
                  : ''
              )}
            />
            {errors.about?.message && (
              <p className="absolute bottom-0 left-0 max-w-full text-xs truncate text-error font-body">
                {errors.about.message}
              </p>
            )}
          </div>
        </div>

        {/* Section 03: Documents */}
        <SectionHeader
          label={t('contactForm.participant.section3')}
          number="03"
        />
        <div className="grid grid-cols-1 gap-y-4 gap-x-8 mb-10 md:grid-cols-2">
          <FileUpload
            placeholder={t('contactForm.participant.resume')}
            onFileSelect={(file) => setValue('resume', file, { shouldValidate: true })}
            accept={ALLOWED_FILE_EXTENSIONS}
            error={errors.resume?.message}
            className={cn(inputClass, 'flex gap-3 items-center cursor-pointer')}
          />
          <FileUpload
            placeholder={t('contactForm.participant.medical')}
            onFileSelect={(file) => setValue('medical', file, { shouldValidate: true })}
            accept={ALLOWED_FILE_EXTENSIONS}
            error={errors.medical?.message}
            className={cn(inputClass, 'flex gap-3 items-center cursor-pointer')}
          />
        </div>
      </>
    );
  },
);

ParticipantsForm.displayName = 'ParticipantsForm';
