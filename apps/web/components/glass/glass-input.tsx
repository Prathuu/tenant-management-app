"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface GlassInputProps extends React.ComponentProps<typeof Input> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onEndIconClick?: () => void;
}

export function GlassInput({
  className,
  type,
  startIcon,
  endIcon,
  onEndIconClick,
  ...props
}: GlassInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative w-full group">
      {/* START ICON */}
      {startIcon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-[rgb(var(--primary))] transition-colors">
          {startIcon}
        </div>
      )}

      <Input
        type={inputType}
        className={cn(
          `
          w-full h-10 rounded-full
          px-4
          ${startIcon ? "pl-10" : ""}
          ${endIcon || isPassword ? "pr-10" : ""}

          bg-white/10 dark:bg-white/5
          backdrop-blur-md

          border border-white/20
          text-foreground

          placeholder:text-white/60
          placeholder:font-medium

          transition-all duration-300 ease-out

          hover:border-white/30

          focus-visible:outline-none
          focus-visible:border-[rgb(var(--primary))]
          focus-visible:ring-1
          focus-visible:ring-[rgb(var(--primary)/0.4)]
          focus-visible:bg-white/15 dark:focus-visible:bg-white/10
          `,
          className,
        )}
        {...props}
      />

      {/* END ICON / PASSWORD TOGGLE */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-white/60 hover:text-[rgb(var(--primary))] transition-colors"
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        ) : endIcon ? (
          <button
            type="button"
            onClick={onEndIconClick}
            className="text-white/60 hover:text-[rgb(var(--primary))] transition-colors"
          >
            {endIcon}
          </button>
        ) : null}
      </div>

      {/* FOCUS GLOW SWEEP */}
      <div
        className={`
          pointer-events-none
          absolute inset-0 rounded-full
          opacity-0 group-focus-within:opacity-100
          transition-opacity duration-300
        `}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-[rgb(var(--primary)/0.25)] to-transparent blur-md animate-[shine_1.5s_ease]" />
      </div>
    </div>
  );
}
