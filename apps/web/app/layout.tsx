import { ReactQueryProvider } from "@/providers/react-query-provider";
import { ReactNode } from "react";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={cn("font-sans", geist.variable)}>
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
