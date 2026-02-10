import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
  isLoading?: boolean;
  children: React.ReactNode;
}

/**
 * Button component with three variants matching UI kit:
 * - primary: Solid vibrant pink button with white text (СТАТИ УЧАСНИКОМ)
 * - secondary: Circular dark gray button with pink border and icon
 * - text: Text-only button that turns pink on hover (ПРО НАС)
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      className,
      children,
      isLoading,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed font-semibold';

    const variants = {
      primary: cn(
        'px-6 py-3 bg-primary-pink text-white',
        'hover:bg-primary-pink-hover hover:border hover:border-primary-pink-hover',
        'active:bg-primary-pink-active active:border active:border-primary-pink-active',
        'border border-transparent',
        baseClasses
      ),
      secondary: cn(
        'w-10 h-10 bg-dark-gray border border-primary-pink',
        'flex items-center justify-center p-0',
        'hover:bg-[#1A1A1A] hover:border-primary-pink-hover',
        'active:bg-[#0F0F0F] active:border-primary-pink-active',
        baseClasses
      ),
      text: cn(
        'px-0 py-2 text-white bg-transparent border-none',
        'hover:text-primary-pink-hover',
        'active:text-primary-pink-active active:border active:border-dashed active:border-primary-pink-active active:px-2 active:py-1',
        baseClasses
      ),
    };

    return (
      <button
        ref={ref}
        className={cn(variants[variant], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            {children}
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
