import { cn } from "@/lib/utils";

export function Glass({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-white/10 dark:bg-white/5 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl",
        className,
      )}
      {...props}
    />
  );
}
