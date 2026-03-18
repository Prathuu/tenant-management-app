"use client";

import { ReactNode } from "react";

export function ScreenContainer({ children }: { children: ReactNode }) {
  return (
    <div className="px-4 py-4 pb-24 md:pb-6 max-w-7xl mx-auto w-full">
      {children}
    </div>
  );
}
