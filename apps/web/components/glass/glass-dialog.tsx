"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";

export { Dialog as GlassDialog };
export { DialogTrigger as GlassDialogTrigger };

export function GlassDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof DialogContent>) {
  return (
    <DialogContent
      className={cn(
        `
        glass-card
        glass-reflect

        backdrop-blur-xl
        bg-[var(--glass-bg)]

        border
        border-[var(--glass-border)]

        rounded-2xl
        p-6

        shadow-[0_20px_60px_rgba(0,0,0,0.35)]
        `,
        className,
      )}
      {...props}
    />
  );
}

export { DialogHeader as GlassDialogHeader };
export { DialogTitle as GlassDialogTitle };
export { DialogDescription as GlassDialogDescription };
export { DialogFooter as GlassDialogFooter };
