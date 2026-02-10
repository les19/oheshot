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
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-semibold text-white">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'w-full rounded-lg bg-dark-gray border px-4 py-3 font-body text-white',
            'placeholder:text-gray-400',
            'transition-all duration-200',
            'focus:outline-none',
            // Default state: light gray border
            'border-gray-400',
            // Hover state: pink border
            'hover:border-vibrant-pink',
            // Focus state: pink border
            'focus:border-vibrant-pink focus:ring-0',
            // Error state: red border
            error && 'border-error',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-error font-body">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
