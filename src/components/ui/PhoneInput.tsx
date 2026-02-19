'use client';

import React, { useRef, useEffect } from 'react';
import IMask from 'imask';
import { Input, type InputProps } from './Input';

export interface PhoneInputProps extends Omit<InputProps, 'type'> {
  mask?: string;
}

interface IMaskInstance {
  destroy(): void;
  unmaskedValue: string;
  updateValue(): void;
}

/**
 * Phone Input component with imask integration
 * Applies phone number masking to the input field
 */
export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ mask = '+{38} (000) 000 00 00', ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const maskRef = useRef<IMaskInstance | null>(null);

    // Combine refs: support both forwarded ref and internal ref
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    useEffect(() => {
      if (!inputRef.current) return;

      const input = inputRef.current;

      // Handle paste events to extract digits and format properly
      const handlePaste = (e: ClipboardEvent) => {
        e.preventDefault();
        const pastedText = e.clipboardData?.getData('text') || '';
        // Extract only digits from pasted text
        const digits = pastedText.replace(/\D/g, '');
        
        if (digits && maskRef.current) {
          // Set the unmasked value (digits only)
          maskRef.current.unmaskedValue = digits;
          // Update the input
          maskRef.current.updateValue();
        }
      };

      // Initialize imask
      maskRef.current = IMask(input, {
        mask: mask,
        lazy: false, // Show mask immediately
        overwrite: true, // Allow overwriting when typing/pasting
      });

      // Add paste event listener
      input.addEventListener('paste', handlePaste);

      return () => {
        input.removeEventListener('paste', handlePaste);
        if (maskRef.current) {
          maskRef.current.destroy();
        }
      };
    }, [mask]);

    return <Input {...props} ref={inputRef} type="tel" />;
  }
);

PhoneInput.displayName = 'PhoneInput';
