"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  memo,
  ReactNode,
} from "react";
import clsx from "clsx";

interface DropdownOption {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  error?: string;
  fullWidth?: boolean;
}

function Dropdown({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  disabled = false,
  error,
  fullWidth = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const handleSelect = useCallback(
    (optionValue: string) => {
      onChange?.(optionValue);
      setIsOpen(false);
    },
    [onChange]
  );

  const toggleDropdown = useCallback(() => {
    if (!disabled) setIsOpen((prev) => !prev);
  }, [disabled]);

  return (
    <div
      ref={dropdownRef}
      className={clsx("relative flex flex-col gap-1.5", fullWidth && "w-full")}
    >
      {label && (
        <span className="text-sm font-medium text-midnight-200">{label}</span>
      )}

      <button
        type="button"
        onClick={toggleDropdown}
        disabled={disabled}
        className={clsx(
          "flex items-center justify-between gap-2 w-full px-4 py-2.5 rounded-xl",
          "bg-white/5 border border-white/10 transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-midnight-400/20 focus:border-midnight-400",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          isOpen && "border-midnight-400 ring-2 ring-midnight-400/20",
          error && "border-red-500"
        )}
      >
        <span
          className={clsx(
            "text-sm truncate",
            selectedOption ? "text-white" : "text-midnight-500"
          )}
        >
          {selectedOption ? (
            <span className="flex items-center gap-2">
              {selectedOption.icon}
              {selectedOption.label}
            </span>
          ) : (
            placeholder
          )}
        </span>

        <svg
          className={clsx(
            "w-4 h-4 text-midnight-400 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 py-2 rounded-xl bg-[rgb(41,45,137)] border border-white/10 shadow-2xl z-[9999] animate-slide-down">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              disabled={option.disabled}
              className={clsx(
                "flex items-center gap-2 w-full px-4 py-2.5 text-sm text-left transition-colors",
                "hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed",
                option.value === value
                  ? "text-midnight-300 bg-white/5"
                  : "text-midnight-200"
              )}
            >
              {option.icon}
              {option.label}
              {option.value === value && (
                <svg
                  className="w-4 h-4 ml-auto text-midnight-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

export default memo(Dropdown);

