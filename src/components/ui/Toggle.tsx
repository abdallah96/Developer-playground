"use client";

import { memo, useCallback } from "react";
import clsx from "clsx";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeStyles = {
  sm: { track: "w-8 h-4", thumb: "w-3 h-3", translate: "translate-x-4" },
  md: { track: "w-11 h-6", thumb: "w-5 h-5", translate: "translate-x-5" },
  lg: { track: "w-14 h-7", thumb: "w-6 h-6", translate: "translate-x-7" },
};

function Toggle({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  size = "md",
}: ToggleProps) {
  const handleToggle = useCallback(() => {
    if (!disabled) onChange(!checked);
  }, [disabled, checked, onChange]);

  return (
    <label
      className={clsx(
        "inline-flex items-start gap-3",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={handleToggle}
        disabled={disabled}
        className={clsx(
          "relative flex-shrink-0 inline-flex items-center rounded-full transition-colors duration-200",
          sizeStyles[size].track,
          checked ? "bg-midnight-500" : "bg-white/10"
        )}
      >
        <span
          className={clsx(
            "inline-block rounded-full bg-white shadow-sm transform transition-transform duration-200",
            sizeStyles[size].thumb,
            checked ? sizeStyles[size].translate : "translate-x-0.5"
          )}
        />
      </button>

      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span className="text-sm font-medium text-midnight-100">
              {label}
            </span>
          )}
          {description && (
            <span className="text-xs text-midnight-400">{description}</span>
          )}
        </div>
      )}
    </label>
  );
}

export default memo(Toggle);

