import { ThemeProvider } from "@/providers/theme-provider";
import { CursorLight } from "@/components/glass/cursor-light";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />

        {/* Dynamic theme colors (system-based fallback) */}
        <meta
          name="theme-color"
          content="#0f0f0f"
          media="(prefers-color-scheme: dark)"
        />
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />

        {/* Mobile / PWA behavior */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        {/* Viewport */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </head>

      <body>
        <ReactQueryProvider>
          <ThemeProvider>
            <Toaster
              position="top-right"
              richColors
              expand
              toastOptions={{
                className:
                  "bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-xl",
              }}
            />
            <CursorLight />
            {children}
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
