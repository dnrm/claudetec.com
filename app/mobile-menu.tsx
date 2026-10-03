"use client";

import { useEffect, useState } from "react";

type Link = { label: string; href: string };

// Below md the nav links collapse into a menu; md+ renders them inline in page.tsx.
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
      {open && (
        <ul
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-b border-foreground/15 bg-background px-6 pb-3 font-sans font-medium"
        >
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
