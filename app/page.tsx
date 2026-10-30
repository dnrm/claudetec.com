import Image from "next/image";
import Link from "next/link";
import Hero from "./hero";
import { getMembers, study } from "./mesa/members";
import ScrambleText from "./scramble-text";
import { sections } from "./site";

const info = sections.filter((s) => s.id !== "join");
const join = sections.find((s) => s.id === "join")!;

// Order and copy live in content/mesa/*.md (from the public/mesa-directiva/ slides).
const board = getMembers();

export default function Home() {
  return (
    <>
      <Hero />

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 pt-16 md:pt-24">
        {/* Numbered rows: index + title left, body right; "Únete" closes as the call to action. */}
        <div className="border-b border-foreground/15">
          {info.map((s, i) => (
            <section
              key={s.id}
              id={s.id}
              className="grid scroll-mt-20 gap-3 border-t border-foreground/15 py-10 md:grid-cols-[5fr_7fr] md:gap-12 md:py-14"
            >
              <div>
                <p className="font-mono text-sm text-accent-ink">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-2 text-3xl md:text-4xl">
                  <ScrambleText text={s.title} />
                </h2>
              </div>
              <p className="max-w-prose text-lg text-foreground/80 md:pt-7">{s.body}</p>
            </section>
          ))}
        </div>

        <section
          id={join.id}
          className="mt-16 scroll-mt-20 rounded-2xl bg-foreground p-8 text-background md:mt-24 md:flex md:items-end md:justify-between md:gap-12 md:p-12"
        >
          <div>
            <h2 className="text-3xl md:text-5xl">
              <ScrambleText text={join.title} glyphClassName="text-accent" />
            </h2>
            <p className="mt-4 max-w-prose text-lg text-background/80">{join.body}</p>
          </div>
          <a
            href="https://www.instagram.com/claude.tec"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-8 inline-flex shrink-0 items-center gap-2 rounded-full bg-background px-5 py-3 font-sans font-medium text-foreground transition-colors hover:bg-accent md:mt-0"
          >
            Escríbenos en Instagram
            <span aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              ↗
            </span>
            <span className="sr-only"> (se abre en otra pestaña)</span>
          </a>
        </section>

        <section id="mesa" className="mt-24 mb-32 scroll-mt-20">
          <p className="font-sans text-sm font-medium text-accent-ink">
            Gestión 2026–2027
          </p>
          <h2 className="mt-1 text-3xl font-medium md:text-4xl">
            <ScrambleText text="Mesa directiva" />
          </h2>
          <Image
            src="/images/team.webp"
            alt="Mesa directiva de ClaudeTec, gestión 2026–2027"
            width={2000}
            height={889}
            sizes="(min-width: 1024px) 976px, 100vw"
            className="mt-8 h-auto w-full rounded-2xl"
          />
          {/* 4 + 3 on desktop, centered so the last row never leaves a lone card */}
          <ul className="mt-10 flex flex-wrap justify-center gap-6">
            {board.map((m) => (
              <li
                key={m.slug}
                className="group relative flex w-full flex-col overflow-hidden rounded-2xl bg-card sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4.5rem)/4)]"
              >
                <Image
                  src={m.image}
                  alt={m.name}
                  width={720}
                  height={545}
                  sizes="(min-width: 1024px) 230px, (min-width: 640px) 50vw, 100vw"
                  className="aspect-[4/3] w-full object-cover object-top"
                />
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg">
                    {/* after: stretches the link over the whole card */}
                    <Link
                      href={`/mesa/${m.slug}`}
                      className="underline-offset-4 after:absolute after:inset-0 group-hover:underline"
                    >
                      {m.name}
                    </Link>
                  </h3>
                  <p className="font-sans font-medium text-accent-ink">{m.role}</p>
                  <p className="mt-1 text-sm text-foreground/60">{study(m)}</p>
                  <p className="mt-4 text-foreground/80">{m.bio[0]}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
