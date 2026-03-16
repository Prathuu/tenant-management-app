import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Appearance = "filled" | "outline" | "text";

interface GlassButtonProps extends React.ComponentProps<typeof Button> {
  appearance?: Appearance;
}

export function GlassButton({
  appearance = "filled",
  className,
  ...props
}: GlassButtonProps) {
  const styles = {
    filled: `
    glass
    bg-[rgb(var(--primary))]
    text-white
    hover:brightness-85
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
        "cursor-pointer pb-0.75 px-4 rounded-2xl",
        styles[appearance],
        className,
      )}
      {...props}
    />
  );
}
