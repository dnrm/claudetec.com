import Link from "next/link";
import Hero from "./hero";
import Board from "./mesa/board";
import ScrambleText from "./scramble-text";
import { JoinCta, pages } from "./site";

export default function Home() {
  return (
    <>
      <Hero />

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 pt-16 md:pt-24">
        {/* Numbered rows: index + title left, body right; "Únete" closes as the call to action. */}
        <div className="border-b border-foreground/15">
          {pages.map((s, i) => (
            <section
              key={s.slug}
              className="grid gap-3 border-t border-foreground/15 py-10 md:grid-cols-[5fr_7fr] md:gap-12 md:py-14"
            >
              <div>
                <p className="font-mono text-sm text-accent-ink">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-2 text-3xl md:text-4xl">
                  <Link href={`/${s.slug}`} className="underline-offset-4 hover:underline">
                    <ScrambleText text={s.title} />
                  </Link>
                </h2>
              </div>
              <p className="max-w-prose text-lg text-foreground/80 md:pt-7">{s.body}</p>
            </section>
          ))}
        </div>

        <JoinCta />

        <section className="mt-24 mb-32">
          <p className="font-sans text-sm font-medium text-accent-ink">
            Gestión 2026–2027
          </p>
          <h2 className="mt-1 text-3xl font-medium md:text-4xl">
            <Link href="/mesa" className="underline-offset-4 hover:underline">
              <ScrambleText text="Mesa directiva" />
            </Link>
          </h2>
          <Board />
        </section>
      </main>
    </>
  );
}
