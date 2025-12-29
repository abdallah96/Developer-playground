"use client";

import { memo, HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info";
type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  icon?: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-midnight-500/20 text-midnight-300 border-midnight-500/30",
  success: "bg-jade-500/20 text-jade-300 border-jade-500/30",
  warning: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  error: "bg-red-500/20 text-red-300 border-red-500/30",
  info: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-midnight-400",
  success: "bg-jade-400",
  warning: "bg-amber-400",
  error: "bg-red-400",
  info: "bg-sky-400",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-xs",
  lg: "px-3 py-1.5 text-sm",
};

function Badge({
  variant = "default",
  size = "md",
  dot = false,
  icon,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border font-medium",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={clsx("w-1.5 h-1.5 rounded-full", dotColors[variant])}
        />
      )}
      {icon}
      {children}
    </span>
  );
}

export default memo(Badge);

