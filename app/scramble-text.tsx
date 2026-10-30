"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "/\\<>=+*#%X"; // same set the hero mountain scrambles with
const RADIUS = 48; // px from the pointer
const STEP_MS = 60; // how often scrambled letters reshuffle

// Letters near the pointer flicker through ASCII glyphs. Each letter keeps its own
// width (the real letter just goes transparent and the glyph sits on top), so the
// line never reflows. Screen readers get the plain text.
export default function ScrambleText({
  text,
  glyphClassName = "text-accent-ink", // use text-accent on dark backgrounds
}: {
  text: string;
  glyphClassName?: string;
}) {
  const root = useRef<HTMLSpanElement>(null);
  const s = useRef({ x: 0, y: 0, raf: 0, last: 0 });
  useEffect(() => () => cancelAnimationFrame(s.current.raf), []);

  const paint = (hotAt: (el: HTMLElement) => boolean) => {
    root.current!.querySelectorAll<HTMLElement>("[data-l]").forEach((el) => {
      const hot = hotAt(el);
      if (hot) el.dataset.hot = "";
      else delete el.dataset.hot;
      el.lastElementChild!.textContent = hot ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)] : "";
    });
  };

  // Rects are read every step (titles are short), so scrolling while hovered stays accurate.
  const frame = (now: number) => {
    s.current.raf = requestAnimationFrame(frame);
    if (now - s.current.last < STEP_MS) return;
    s.current.last = now;
    paint((el) => {
      const r = el.getBoundingClientRect();
      return Math.hypot(r.left + r.width / 2 - s.current.x, r.top + r.height / 2 - s.current.y) < RADIUS;
    });
  };

  return (
    <>
      <span className="sr-only">{text}</span>
      <span
        ref={root}
        aria-hidden="true"
        onPointerEnter={() => {
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
          cancelAnimationFrame(s.current.raf);
          s.current.raf = requestAnimationFrame(frame);
        }}
        onPointerMove={(e) => {
          s.current.x = e.clientX;
          s.current.y = e.clientY;
        }}
        onPointerLeave={() => {
          cancelAnimationFrame(s.current.raf);
          paint(() => false);
        }}
      >
        {text.split(" ").map((word, w) => (
          <span key={w}>
            {w > 0 && " "}
            {/* nowrap per word so lines only break between words */}
            <span className="inline-block whitespace-nowrap">
              {[...word].map((ch, i) => (
                <span key={i} data-l="" className="group/l relative inline-block">
                  <span className="group-data-[hot]/l:opacity-0">{ch}</span>
                  <span className={`absolute inset-0 grid place-items-center font-mono font-normal ${glyphClassName}`} />
                </span>
              ))}
            </span>
          </span>
        ))}
      </span>
    </>
  );
}
