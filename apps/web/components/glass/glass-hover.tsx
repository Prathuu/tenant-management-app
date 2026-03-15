"use client";

import { useRef } from "react";

export function useGlassHover() {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 20;
    const rotateY = (x - centerX) / 20;

    el.style.transform = `
      perspective(800px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-4px)
    `;
  }

  function reset() {
    const el = ref.current;
    if (!el) return;

    el.style.transform = `
      perspective(800px)
      rotateX(0deg)
      rotateY(0deg)
      translateY(0px)
    `;
  }

  return { ref, handleMove, reset };
}
