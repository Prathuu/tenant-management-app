import { ReactQueryProvider } from "@/providers/react-query-provider";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
