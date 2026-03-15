import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { CursorLight } from "@/components/glass/cursor-light";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <CursorLight />

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
