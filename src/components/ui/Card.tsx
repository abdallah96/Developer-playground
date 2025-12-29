"use client";

import { forwardRef, memo, HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type CardVariant = "default" | "elevated" | "outline" | "gradient";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  header?: ReactNode;
  footer?: ReactNode;
  hoverable?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const variantStyles: Record<CardVariant, string> = {
  default: "glass",
  elevated: "glass shadow-xl shadow-black/20",
  outline: "border-2 border-midnight-400/30 bg-transparent",
  gradient:
    "bg-gradient-to-br from-midnight-800/50 to-midnight-900/50 border border-midnight-700/30",
};

const paddingStyles: Record<NonNullable<CardProps["padding"]>, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "default",
      header,
      footer,
      hoverable = false,
      padding = "md",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "rounded-2xl transition-all duration-300",
          variantStyles[variant],
          hoverable && "hover:scale-[1.02] hover:shadow-2xl hover:shadow-midnight-500/10 cursor-pointer card-shine overflow-hidden",
          className
        )}
        {...props}
      >
        {header && (
          <div className="px-6 py-4 border-b border-white/5">{header}</div>
        )}
        <div className={paddingStyles[padding]}>{children}</div>
        {footer && (
          <div className="px-6 py-4 border-t border-white/5 bg-white/[0.02]">
            {footer}
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = "Card";

export default memo(Card);

