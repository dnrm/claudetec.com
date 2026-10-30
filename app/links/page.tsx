import type { Metadata } from "next";
import Image from "next/image";
import ScrambleText from "../scramble-text";
import { openGraph } from "../seo";
import { sections, socials, type Card } from "./links";

const description = "Talleres, redes y todo lo de ClaudeTec en un solo lugar.";

export const metadata: Metadata = {
  title: "Links",
  description,
  alternates: { canonical: "/links" },
  openGraph: { ...openGraph, title: "Links", description, url: "/links" },
};

const external = (href: string) =>
  /^https?:/.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};

// Staggered entrance; .links-rise only animates when motion is allowed (globals.css).
const rise = (n: number) => ({ animationDelay: `${n * 70}ms` });

function LinkCard({ card, i }: { card: Card; i: number }) {
  return (
    <a
      href={card.href}
      {...external(card.href)}
      className="group flex w-[82%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-card transition-transform hover:-translate-y-1 sm:w-[46%]"
    >
      {card.image ? (
        <Image src={card.image} alt="" width={800} height={533} sizes="(min-width: 640px) 220px, 80vw" className="aspect-[3/2] w-full object-cover" />
      ) : (
        // ASCII cover: the glyph rows march on hover
        <div aria-hidden="true" className="relative aspect-[3/2] overflow-hidden bg-foreground font-mono text-xs leading-tight text-accent">
          {Array.from({ length: 24 }, (_, r) => ["/\\", "<>", "+-"][r % 3]).map((p, r) => (
            <div key={r} className="whitespace-nowrap opacity-40">
              <span className={`inline-block group-hover:[animation:ascii-march_0.8s_steps(2)_infinite] ${r % 2 ? "[animation-direction:reverse]" : ""}`}>
                {p.repeat(60)}
              </span>
            </div>
          ))}
          <span className="absolute inset-0 grid place-items-center text-5xl text-background">
            {String(i + 1).padStart(2, "0")}
          </span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        {card.eyebrow && (
          <p className="font-mono text-xs tracking-wide text-accent-ink uppercase">{card.eyebrow}</p>
        )}
        <h3 className="mt-1 text-xl leading-snug">{card.title}</h3>
        {card.description && <p className="mt-2 text-sm text-foreground/75">{card.description}</p>}
        <p className="mt-auto pt-4 font-mono text-sm text-accent-ink">
          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </p>
      </div>
      {/^https?:/.test(card.href) && <span className="sr-only"> (se abre en otra pestaña)</span>}
    </a>
  );
}

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-xl flex-1 overflow-x-clip px-6 pt-10 pb-8">
      <div className="text-center">
        <div className="links-rise" style={rise(0)}>
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative animated webp */}
          <img src="/clawd/saltando/clawd-saltando.webp" alt="" aria-hidden="true" width={72} height={64} className="mx-auto" />
        </div>
        <h1 style={rise(1)} className="links-rise mt-3 text-4xl">
          <ScrambleText text="ClaudeTec" />
        </h1>
        <p style={rise(2)} className="links-rise mt-2 text-foreground/70">{description}</p>
        <ul style={rise(3)} className="links-rise mt-6 flex justify-center gap-3">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                {...external(s.href)}
                aria-label={`${s.label} (se abre en otra pestaña)`}
                className="inline-flex size-12 items-center justify-center rounded-full border border-foreground/20 transition-colors hover:bg-foreground hover:text-background"
              >
                <s.icon aria-hidden="true" className="size-5" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {sections.map((sec, n) => (
        <section key={sec.title} className="mt-12">
          <div style={rise(4 + n * 2)} className="links-rise flex items-end gap-3">
            <div>
              <h2 className="text-2xl">
                <ScrambleText text={sec.title} />
              </h2>
              {sec.subtitle && <p className="mt-1 text-foreground/70">{sec.subtitle}</p>}
            </div>
            {sec.clawd && (
              // eslint-disable-next-line @next/next/no-img-element -- decorative animated webp
              <img src={`/clawd/${sec.clawd}/clawd-${sec.clawd}.webp`} alt="" aria-hidden="true" width={56} height={50} loading="lazy" className="ml-auto shrink-0" />
            )}
          </div>
          {/* Swipeable row on mobile, bleeds to the screen edge */}
          <div style={rise(5 + n * 2)} className="links-rise -mx-6 mt-5 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2">
            {sec.cards.map((c, i) => (
              <LinkCard key={c.title} card={c} i={i} />
            ))}
          </div>
        </section>
      ))}

      {/* Clawd strolls along an ASCII floor */}
      <div aria-hidden="true" className="mt-16 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative animated webp */}
        <img src="/clawd/caminando/clawd-caminando.webp" alt="" width={42} height={30} loading="lazy" className="links-walk" />
        <p className="font-mono text-xs leading-none whitespace-nowrap text-accent-ink">{"_.-".repeat(80)}</p>
      </div>
    </main>
  );
}
