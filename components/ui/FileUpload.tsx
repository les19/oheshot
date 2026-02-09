import React, { useState, useRef } from 'react';
import { Paperclip, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FileUploadProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  onFileSelect?: (file: File | null) => void;
  label?: string;
  accept?: string;
}

/**
 * File Upload component matching UI kit:
 * - Default: Dark gray background, light gray border, "Додати резюме" text with paperclip icon
 * - Hover: Pink border and pink text/icon
 * - Loading: Spinning icon with "Loading" text
 * - Attached: File name displayed with remove button (X icon)
 */
export const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  ({ className, onFileSelect, label, accept, ...props }, ref) => {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        setIsLoading(true);
        // Simulate file processing
        setTimeout(() => {
          setFile(selectedFile);
          setIsLoading(false);
          onFileSelect?.(selectedFile);
        }, 1000);
      }
    };

    const handleRemove = () => {
      setFile(null);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      onFileSelect?.(null);
    };

    const handleClick = () => {
      inputRef.current?.click();
    };

    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-semibold text-white">
            {label}
          </label>
        )}
        <div
          onClick={handleClick}
          className={cn(
            'w-full rounded-lg bg-dark-gray border px-4 py-3',
            'cursor-pointer transition-all duration-200',
            'flex items-center gap-3',
            'focus-within:outline-none focus-within:ring-0',
            // Default state: light gray border
            'border-gray-400 text-gray-400',
            // Hover state: pink border and text
            'hover:border-vibrant-pink hover:text-vibrant-pink',
            className
          )}
        >
          <input
            ref={(node) => {
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
              inputRef.current = node;
            }}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
            {...props}
          />
          
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin text-white" />
              <span className="font-body text-white">Loading</span>
            </>
          ) : file ? (
            <>
              <Paperclip className="h-5 w-5 text-white" />
              <span className="font-body text-white flex-1">{file.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
                className="ml-auto h-6 w-6 flex items-center justify-center rounded bg-dark-gray hover:bg-[#1A1A1A] text-white transition-colors"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <Paperclip className="h-5 w-5" />
              <span className="font-body">Додати резюме</span>
            </>
          )}
        </div>
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';
