import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, helperText, startIcon, endIcon, id, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const inputId = id || `input-${React.useId()}`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-foreground mb-2"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none">
              {startIcon}
            </div>
          )}

          <input
            id={inputId}
            type={type}
            className={cn(
              'input-field px-4 py-3 text-foreground placeholder-muted-foreground rounded-lg',
              startIcon && 'pl-10',
              endIcon && 'pr-10',
              error && 'border-destructive focus:ring-destructive',
              className
            )}
            ref={ref}
            onFocus={(e) => {
              setFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              props.onBlur?.(e);
            }}
            {...props}
          />

          {endIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              {endIcon}
            </div>
          )}
        </div>

        {error && (
          <p className="mt-2 text-sm text-destructive">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p className="mt-2 text-sm text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

export interface InputGroupProps {
  children: React.ReactNode;
  className?: string;
}

const InputGroup = ({ children, className }: InputGroupProps) => {
  return (
    <div className={cn('input-group flex flex-col space-y-4', className)}>
      {children}
    </div>
  );
};

Input.displayName = 'Input';
InputGroup.displayName = 'InputGroup';

export { Input, InputGroup };