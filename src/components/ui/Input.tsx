import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

/**
 * Text Input component matching UI kit:
 * - Default: Dark gray background, light gray border
 * - Hover: Pink border, white text with caret
 * - Filled: Dark gray background with white text
 * - Error: Red border with error message below
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, type = 'text', ...props }, ref) => {
    return (
      <div className="relative w-full pb-5">
        {label && (
          <label className="mb-2 block text-sm font-semibold text-white">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'w-full rounded-lg bg-dark-gray border px-4 py-3 font-body text-white',
            'placeholder:text-secondary-gray',
            'transition-all duration-200',
            'focus:outline-none focus:ring-0',
            error
              ? 'border-error hover:border-error focus:border-error'
              : 'border-divider hover:border-primary-pink focus:border-primary-pink',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="absolute bottom-0 left-0 text-xs text-error font-body truncate max-w-full">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
