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

        border
        border-[var(--glass-border)]

        rounded-xl
        p-1

        flex w-full
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

        // ✅ ACTIVE STATE → filled glass button
        `
        data-[state=active]:glass-card
        data-[state=active]:glass-reflect

        data-[state=active]:bg-[var(--glass-bg)]
        data-[state=active]:border
        data-[state=active]:border-[var(--glass-border)]

        data-[state=active]:text-foreground
        data-[state=active]:shadow-[0_8px_30px_rgba(0,0,0,0.25)]
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
