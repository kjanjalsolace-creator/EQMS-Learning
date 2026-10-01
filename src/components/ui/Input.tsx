import { forwardRef } from 'react';
import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = '', id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2)}`;
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-heading mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`input-base ${error ? 'border-error focus:border-error focus:ring-error/10' : ''} ${className}`}
          {...props}
        />
        {error && <p className="text-sm text-error mt-1">{error}</p>}
        {hint && !error && <p className="text-sm text-muted mt-1">{hint}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  children: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, children, className = '', id, ...props }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).slice(2)}`;
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-heading mb-1.5">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`input-base appearance-none bg-no-repeat ${error ? 'border-error' : ''} ${className}`}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%238a8a9a' d='M6 8L0 0h12z'/%3E%3C/svg%3E\")",
            backgroundPosition: 'right 1rem center',
            backgroundSize: '12px',
            paddingRight: '2.5rem',
          }}
          {...props}
        >
          {children}
        </select>
        {error && <p className="text-sm text-error mt-1">{error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const textareaId = id || `textarea-${Math.random().toString(36).slice(2)}`;
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-heading mb-1.5">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`input-base resize-none ${error ? 'border-error' : ''} ${className}`}
          {...props}
        />
        {error && <p className="text-sm text-error mt-1">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
