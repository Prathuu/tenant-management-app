"use client";

import { useEffect } from "react";

export function CursorLight() {
  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      const x = e.pageX;
      const y = e.pageY;

      document.documentElement.style.setProperty("--mouse-x", `${x}px`);
      document.documentElement.style.setProperty("--mouse-y", `${y}px`);
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return null;
}
