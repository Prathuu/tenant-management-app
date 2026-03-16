"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";

export { DropdownMenu as GlassDropdownMenu };
export { DropdownMenuTrigger as GlassDropdownMenuTrigger };

export function GlassDropdownMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      className={cn(
        `
        glass-card
        glass-reflect
        backdrop-blur-xl
        bg-[var(--glass-bg)]

        border
        border-[var(--glass-border)]

        rounded-xl
        p-2
        min-w-[180px]

        shadow-[0_10px_40px_rgba(0,0,0,0.25)]
        `,
        className,
      )}
      {...props}
    />
  );
}

export function GlassDropdownMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuItem>) {
  return (
    <DropdownMenuItem
      className={cn(
        `
        rounded-lg
        px-3
        py-2
        text-sm
        cursor-pointer

        transition-colors

        hover:bg-[rgb(var(--primary)/0.12)]
        focus:bg-[rgb(var(--primary)/0.12)]

        data-[highlighted]:bg-[rgb(var(--primary)/0.12)]
        `,
        className,
      )}
      {...props}
    />
  );
}

export { DropdownMenuSeparator as GlassDropdownMenuSeparator };
