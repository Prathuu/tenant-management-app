"use client";

import { useEffect } from "react";

export function CursorLight() {
  useEffect(() => {
    const move = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        document.documentElement.style.setProperty(
          "--mouse-x",
          `${e.clientX}px`,
        );
        document.documentElement.style.setProperty(
          "--mouse-y",
          `${e.clientY}px`,
        );
      });
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return <div className="cursor-light-layer" />;
}
