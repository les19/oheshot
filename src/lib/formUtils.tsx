import { z } from 'zod';


/* ── Shared input classes matching UI kit ── */
export const inputClass =
  'rounded-none border border-divider bg-dark-gray px-4 py-3 text-sm md:text-base text-white placeholder:text-secondary-gray transition-all duration-200 hover:border-primary-pink focus:border-primary-pink focus:outline-none focus:ring-0';

export const textareaClass =
  'w-full rounded-none border border-divider bg-dark-gray px-4 py-3 text-sm md:text-base font-body text-white placeholder:text-secondary-gray transition-all duration-200 hover:border-primary-pink focus:border-primary-pink focus:outline-none focus:ring-0 resize-none';

/* ── Security helpers ── */

const DANGEROUS_PATTERNS = [
  /<script[\s>]/i,
  /javascript\s*:/i,
  /on\w+\s*=/i,
  /<\s*\/?\s*(iframe|object|embed|form|link|meta|style)\b/i,
  /\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|EXEC)\s+/i,
  /&#?\w+;/,            // HTML entities
  /%3C|%3E|%22|%27/i,   // URL-encoded <, >, ", '
];

function isSafe(value: string): boolean {
  return !DANGEROUS_PATTERNS.some((p) => p.test(value));
}

/* ── File constants ── */

export const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3 MB

export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'application/rtf',
];

export const ALLOWED_FILE_EXTENSIONS = '.pdf,.doc,.docx,.txt,.rtf';

function isAllowedFile(file: File): boolean {
  if (file.size > MAX_FILE_SIZE) return false;
  const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
  const safeExtensions = ['pdf', 'doc', 'docx', 'txt', 'rtf'];
  return safeExtensions.includes(ext) || ALLOWED_FILE_TYPES.includes(file.type);
}

/* ── Zod schemas ── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TranslateFn = (key: string, values?: any) => string;

/** Reusable safe‑string builder with min / max + XSS check */
const safeString = (
  t: TranslateFn,
  min: number,
  max: number,
  opts?: { required?: boolean },
) => {
  const required = opts?.required ?? true;
  let s = z.string();
  if (required) s = s.min(1, t('contactForm.validation.required'));
  if (min > 1) s = s.min(min, t('contactForm.validation.minLength', { min }));
  s = s.max(max, t('contactForm.validation.maxLength', { max }));
  return s.refine(isSafe, t('contactForm.validation.dangerousContent'));
};

const fileField = (t: TranslateFn) =>
  z
    .any()
    .refine((f) => f instanceof File, t('contactForm.validation.fileRequired'))
    .refine(
      (f) => !(f instanceof File) || f.size <= MAX_FILE_SIZE,
      t('contactForm.validation.fileTooLarge', { max: '3' }),
    )
    .refine(
      (f) => !(f instanceof File) || isAllowedFile(f),
      t('contactForm.validation.invalidFileType'),
    );

export const participantSchema = (t: TranslateFn) =>
  z.object({
    name:     safeString(t, 2, 100),
    location: safeString(t, 1, 200),
    phone: z
      .string()
      .min(1, t('contactForm.validation.required'))
      .max(20, t('contactForm.validation.maxLength', { max: 20 }))
      .regex(/^\+?\d[\d\s()-]{7,}$/, t('contactForm.validation.invalidPhone')),
    email: z
      .string()
      .min(1, t('contactForm.validation.required'))
      .max(254, t('contactForm.validation.maxLength', { max: 254 }))
      .email(t('contactForm.validation.invalidEmail')),
    social: safeString(t, 0, 500, { required: false }).optional().or(z.literal('')),
    height: z
      .string()
      .min(1, t('contactForm.validation.required'))
      .max(4, t('contactForm.validation.maxLength', { max: 4 }))
      .regex(/^\d+$/, t('contactForm.validation.numericOnly')),
    weight: z
      .string()
      .min(1, t('contactForm.validation.required'))
      .max(4, t('contactForm.validation.maxLength', { max: 4 }))
      .regex(/^\d+$/, t('contactForm.validation.numericOnly')),
    skills:  safeString(t, 1, 500),
    about:   safeString(t, 10, 2000),
    resume:  fileField(t),
    medical: fileField(t),
  });

export const sponsorSchema = (t: TranslateFn) =>
  z.object({
    company: safeString(t, 1, 200),
    phone: z
      .string()
      .min(1, t('contactForm.validation.required'))
      .max(20, t('contactForm.validation.maxLength', { max: 20 }))
      .regex(/^\+?\d[\d\s()-]{7,}$/, t('contactForm.validation.invalidPhone')),
    email: z
      .string()
      .min(1, t('contactForm.validation.required'))
      .max(254, t('contactForm.validation.maxLength', { max: 254 }))
      .email(t('contactForm.validation.invalidEmail')),
    description: safeString(t, 10, 2000),
  });

export interface ParticipantFormValues {
  name: string;
  location: string;
  phone: string;
  email: string;
  social?: string;
  height: string;
  weight: string;
  skills: string;
  about: string;
  resume: File | null;
  medical: File | null;
}

export interface SponsorFormValues {
  company: string;
  phone: string;
  email: string;
  description: string;
}

/* ── Reusable section header ── */
export const SectionHeader: React.FC<{ label: string; number: string }> = ({
  label,
  number,
}) => (
  <div className="flex justify-between items-center mb-4 md:mb-5 lg:mb-6">
    <span className="text-base md:text-lg lg:text-xl font-semibold uppercase text-primary-pink font-nkduy">
      {label}
    </span>
    <span className="text-sm md:text-base font-semibold uppercase text-primary-pink font-nkduy">
      [ &nbsp;{number}&nbsp; ]
    </span>
  </div>
);
