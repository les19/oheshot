import React, { useState, useRef } from 'react';
import { Paperclip, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FileUploadProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  onFileSelect?: (file: File | null) => void;
  label?: string;
  accept?: string;
  placeholder?: string;
  error?: string;
  maxSize?: number;
  onClientError?: (msg: string) => void;
}

/**
 * File Upload component matching UI kit:
 * - Default: Dark gray background, light gray border, "Додати резюме" text with paperclip icon
 * - Hover: Pink border and pink text/icon
 * - Loading: Spinning icon with "Loading" text
 * - Attached: File name displayed with remove button (X icon)
 */
const DEFAULT_MAX_SIZE = 3 * 1024 * 1024; // 3 MB

export const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  ({ className, onFileSelect, label, accept, placeholder, error, maxSize, onClientError, ...props }, ref) => {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [clientError, setClientError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const limit = maxSize ?? DEFAULT_MAX_SIZE;

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (!selectedFile) return;

      // Client-side size check
      if (selectedFile.size > limit) {
        const msg = `File too large (max ${Math.round(limit / 1024 / 1024)}MB)`;
        setClientError(msg);
        onClientError?.(msg);
        if (inputRef.current) inputRef.current.value = '';
        return;
      }

      // Client-side extension check
      const ext = selectedFile.name.split('.').pop()?.toLowerCase() ?? '';
      const safeExtensions = accept
        ? accept.split(',').map((s) => s.trim().replace('.', '').toLowerCase())
        : [];
      if (safeExtensions.length > 0 && !safeExtensions.includes(ext)) {
        const msg = `Unsupported file type (.${ext})`;
        setClientError(msg);
        onClientError?.(msg);
        if (inputRef.current) inputRef.current.value = '';
        return;
      }

      setClientError(null);
      setIsLoading(true);
      setTimeout(() => {
        setFile(selectedFile);
        setIsLoading(false);
        onFileSelect?.(selectedFile);
      }, 500);
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
      <div className="relative w-full pb-5">
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
            (error || clientError)
              ? 'border-error text-gray-400'
              : 'border-gray-400 text-gray-400 hover:border-vibrant-pink hover:text-vibrant-pink',
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
                className="ml-auto h-6 w-6 flex items-center justify-center rounded bg-dark-gray hover:bg-dark-gray/80 text-white transition-colors"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <Paperclip className="h-5 w-5" />
              <span className="font-body">{placeholder ?? 'Upload file'}</span>
            </>
          )}
        </div>
        {(clientError || error) && (
          <p className="absolute bottom-0 left-0 text-xs text-error font-body truncate max-w-full">
            {clientError || error}
          </p>
        )}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';
