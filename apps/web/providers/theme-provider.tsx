"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect } from "react";
import { initPalette } from "@/lib/theme/init-palette";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initPalette();
  }, []);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
