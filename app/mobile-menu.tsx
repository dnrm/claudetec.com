"use client";

import { useEffect, useState } from "react";

type Link = { label: string; href: string };

const PATTERNS = ["/\\", "+-", "<>"]; // two-char pairs, so a 1ch shift swaps them
const STAGGER_MS = 50;

// Decorative divider: a pair of glyphs repeated across the width that "wipes" in
// on open and keeps alternating (the march keyframe in globals.css) while open.
function AsciiRow({ i }: { i: number }) {
  return (
    <div
      aria-hidden="true"
      style={{ transitionDelay: `${i * STAGGER_MS}ms` }}
      className="overflow-hidden whitespace-nowrap font-mono text-xs leading-none text-accent-ink [clip-path:inset(0_100%_0_0)] transition-[clip-path] duration-500 ease-out group-data-[open]/menu:[clip-path:inset(0)] motion-reduce:transition-none"
    >
      <span
        className={`ascii-march inline-block ${i % 2 ? "[animation-direction:reverse]" : ""}`}
      >
        {PATTERNS[i % PATTERNS.length].repeat(80)}
      </span>
    </div>
  );
}

// Below md the nav links collapse into a menu; md+ renders them inline in page.tsx.
// The panel stays mounted so closing can animate too; `inert` hides it from
// focus and screen readers while closed.
export default function MobileMenu({ links }: { links: Link[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
        className="min-h-11 rounded-full px-4 font-sans text-sm font-medium"
      >
        {open ? "Cerrar" : "Menú"}
      </button>
      <div
        id="mobile-menu"
        inert={!open}
        data-open={open || undefined}
        className="group/menu absolute inset-x-0 top-full grid grid-rows-[0fr] transition-[grid-template-rows,box-shadow] duration-300 ease-out data-[open]:grid-rows-[1fr] data-[open]:shadow-[0_12px_24px_-12px_rgb(21_21_20/0.35)] motion-reduce:transition-none"
      >
        <div className="overflow-hidden">
          <ul className="border-b border-foreground/15 bg-background px-6 pt-3 pb-3 font-sans font-medium">
            {links.map((l, i) => (
              <li key={l.href}>
                <AsciiRow i={i} />
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  style={{ transitionDelay: `${i * STAGGER_MS + 100}ms` }}
                  className="block -translate-x-3 py-3 opacity-0 transition duration-300 group-data-[open]/menu:translate-x-0 group-data-[open]/menu:opacity-100 motion-reduce:transition-none"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <AsciiRow i={links.length} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
