import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface GlassInputProps extends React.ComponentProps<typeof Input> {}

export function GlassInput({ className, ...props }: GlassInputProps) {
  return (
    <Input
      className={cn(
        `
        glass
        w-full
        rounded-2xl
        px-4
        transition-all duration-200

        bg-white/10
        dark:bg-white/5

        border-white/15
        text-foreground
        placeholder:text-muted-foreground

        focus-visible:border-[rgb(var(--primary))]
        focus-visible:ring-2
        focus-visible:ring-[rgb(var(--ring))]
        focus-visible:ring-offset-0

        hover:border-[rgb(var(--primary)/0.5)]
        `,
        className,
      )}
      {...props}
    />
  );
}
