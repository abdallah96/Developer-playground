"use client";

import { forwardRef, memo, InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type InputSize = "sm" | "md" | "lg";
type InputVariant = "default" | "filled" | "outline";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  inputSize?: InputSize;
  variant?: InputVariant;
  fullWidth?: boolean;
}

const sizeStyles: Record<InputSize, { input: string; icon: string }> = {
  sm: { input: "py-1.5 text-sm", icon: "w-4 h-4" },
  md: { input: "py-2.5 text-sm", icon: "w-5 h-5" },
  lg: { input: "py-3.5 text-base", icon: "w-5 h-5" },
};

const variantStyles: Record<InputVariant, string> = {
  default: "bg-white/5 border-white/10 focus:border-midnight-400",
  filled: "bg-white/10 border-transparent focus:border-midnight-400",
  outline: "bg-transparent border-midnight-400/50 focus:border-midnight-400",
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      inputSize = "md",
      variant = "default",
      fullWidth = false,
      disabled,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;
    const hasError = !!error;

    return (
      <div className={clsx("flex flex-col gap-1.5", fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-midnight-200"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div
              className={clsx(
                "absolute left-3 top-1/2 -translate-y-1/2 text-midnight-400",
                sizeStyles[inputSize].icon
              )}
            >
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={clsx(
              "w-full rounded-xl border px-4 transition-all duration-200",
              "placeholder:text-midnight-500",
              "focus:outline-none focus:ring-2 focus:ring-midnight-400/20",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              variantStyles[variant],
              sizeStyles[inputSize].input,
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              hasError && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div
              className={clsx(
                "absolute right-3 top-1/2 -translate-y-1/2 text-midnight-400",
                sizeStyles[inputSize].icon
              )}
            >
              {rightIcon}
            </div>
          )}
        </div>

        {(helperText || error) && (
          <p
            className={clsx(
              "text-xs",
              hasError ? "text-red-400" : "text-midnight-400"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default memo(Input);

