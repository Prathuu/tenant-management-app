"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { cn } from "@/lib/utils";

/**
 * Root (no changes)
 */
export { Tabs as GlassTabs };

/**
 * List → glass container
 */
export function GlassTabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsList>) {
  return (
    <TabsList
      className={cn(
        `
        glass-panel

        backdrop-blur-xl
        bg-[var(--glass-bg)]

        border border-[var(--glass-border)]
        rounded-xl p-1

        flex flex-row w-full
        items-center

        gap-1
        `,
        className,
      )}
      {...props}
    />
  );
}

/**
 * Trigger → glass button when active
 */
export function GlassTabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsTrigger>) {
  return (
    <TabsTrigger
      className={cn(
        `
        relative flex-1
        px-4 py-2
        text-sm font-medium
        rounded-lg
            
        transition-all duration-200
            
        text-muted-foreground
        hover:text-foreground
            
        active:scale-[0.98]
        `,
        `
        data-[state=active]:bg-[var(--accent)]
        data-[state=active]:text-[var(--accent-foreground)]
            
        data-[state=active]:shadow-[0_6px_20px_rgba(0,0,0,0.3)]
        `,

        className,
      )}
      {...props}
    />
  );
}

/**
 * Content (minimal styling)
 */
export function GlassTabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsContent>) {
  return (
    <TabsContent className={cn("mt-4 outline-none", className)} {...props} />
  );
}
