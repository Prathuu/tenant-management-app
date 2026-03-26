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
        rounded-full
        px-4  
        h-10
        transition-all duration-200

        bg-white/10
        dark:bg-white/5

        border-white/20
        text-foreground
        placeholder:text-muted-foreground

        shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),inset_0_-1px_2px_rgba(0,0,0,0.2)]

        hover:border-[rgb(var(--primary)/0.5)]

        focus-visible:border-[rgb(var(--primary))]
        focus-visible:ring-2
        focus-visible:ring-[rgb(var(--ring))]
        focus-visible:ring-offset-0
        `,
        className,
      )}
      {...props}
    />
  );
}
