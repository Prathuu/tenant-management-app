import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

type Appearance = "filled" | "outline" | "text";
type IconPosition = "left" | "right";

interface GlassButtonProps extends React.ComponentProps<typeof Button> {
  appearance?: Appearance;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
}

export function GlassButton({
  appearance = "filled",
  className,
  icon,
  iconPosition = "left",
  children,
  ...props
}: GlassButtonProps) {
  const styles = {
    filled: `
      glass
      bg-[rgb(var(--primary))]
      text-white
      hover:brightness-90
      hover:shadow-[0_0_12px_rgb(var(--primary)/0.5)]
    `,

    outline: `
      glass
      border-[rgb(var(--primary))]
      text-[rgb(var(--primary))]
      bg-transparent
      hover:bg-[rgb(var(--primary)/0.1)]
    `,

    text: `
      text-[rgb(var(--primary))]
      bg-transparent
      hover:bg-[rgb(var(--primary)/0.1)]
    `,
  };

  return (
    <Button
      className={cn(
        "cursor-pointer pb-[3px] px-4 rounded-2xl flex items-center gap-2",
        styles[appearance],
        className,
      )}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className="flex items-center justify-center">{icon}</span>
      )}

      {children}

      {icon && iconPosition === "right" && (
        <span className="flex items-center justify-center">{icon}</span>
      )}
    </Button>
  );
}
