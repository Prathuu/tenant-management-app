import { ThemeProvider } from "@/providers/theme-provider";
import { CursorLight } from "@/components/glass/cursor-light";
import "./globals.css";
import { ReactQueryProvider } from "@/providers/react-query-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ReactQueryProvider>
          <ThemeProvider>
            <CursorLight />

            {children}
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
