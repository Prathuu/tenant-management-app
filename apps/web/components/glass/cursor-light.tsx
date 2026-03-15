"use client";

import { useEffect } from "react";

export function CursorLight() {
  useEffect(() => {
    function move(e: MouseEvent) {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);

      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    }

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return <div className="cursor-light-layer" />;
}
