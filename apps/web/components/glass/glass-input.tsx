import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface GlassInputProps extends React.ComponentProps<typeof Input> {}

export function GlassInput({ className, ...props }: GlassInputProps) {
  return (
    <Input
      className={cn(
        `
        w-full
        h-10
        px-4
        rounded-full

        bg-white/10 dark:bg-white/5
        backdrop-blur-md

        border border-white/20
        text-foreground

        placeholder:text-white/60
        placeholder:font-medium

        transition-all duration-200 ease-out

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
  );
}
