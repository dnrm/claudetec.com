import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { openGraph } from "../../seo";
import { posts } from "../posts";

const post = posts.find((p) => p.slug === "ganadores-hackathon-oct-24")!;
const url = `/blog/${post.slug}`;

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: { canonical: url },
  openGraph: {
    ...openGraph,
    type: "article",
    title: post.title,
    description: post.description,
    url,
    images: [{ url: post.image, alt: "Hackathon Claude de ClaudeTec" }],
  },
};

// Project names, summaries and members are optional: fill them in when confirmed.
const podium: {
  place: 1 | 2 | 3;
  team: string;
  project?: string;
  summary?: string;
  members?: string[];
  image: string;
}[] = [
  { place: 1, team: "Ternusians", image: "/images/hackathon/primer-lugar.webp" },
  { place: 2, team: "Hubble AI & Power Rangers", image: "/images/hackathon/segundo-lugar.webp" },
  { place: 3, team: "Ingenium", image: "/images/hackathon/tercer-lugar.webp" },
];

const label = { 1: "1.er lugar", 2: "2.º lugar", 3: "3.er lugar" };
// Desktop podium reads 2 · 1 · 3, with first place raised; mobile stacks 1 · 2 · 3.
const layout = {
  1: "md:order-2 md:-translate-y-8",
  2: "md:order-1",
  3: "md:order-3",
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 pb-24">
      <article>
        <header className="pt-12 md:pt-20">
          <Link href="/blog" className="font-sans text-sm font-medium text-accent-ink underline-offset-4 hover:underline">
            ← Blog
          </Link>
          <h1 className="mt-4 text-4xl md:text-5xl">{post.title}</h1>
          <p className="mt-4 max-w-prose text-lg text-foreground/70">
            Gracias a todos los equipos que participaron. Estos son los tres proyectos que se llevaron el podio.
          </p>
          <Image
            src={post.image}
            alt="Equipo organizador del Hackathon Claude frente a la pantalla del evento"
            width={2000}
            height={1333}
            priority
            sizes="(min-width: 1024px) 976px, 100vw"
            className="mt-10 aspect-[3/2] w-full rounded-2xl object-cover"
          />
        </header>

        <section aria-labelledby="podio" className="mt-20">
          <h2 id="podio" className="flex items-end gap-3 text-2xl md:text-3xl">
            Podio
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative animated webp */}
            <img src="/clawd/confeti/clawd-confeti.webp" alt="" aria-hidden="true" width={50} height={45} loading="lazy" />
          </h2>
          <ol className="mt-16 grid items-end gap-6 md:grid-cols-3">
            {podium.map((p) => (
              <li
                key={p.place}
                className={`flex flex-col overflow-hidden rounded-2xl bg-card ${layout[p.place]} ${p.place === 1 ? "ring-2 ring-accent" : ""}`}
              >
                <Image
                  src={p.image}
                  alt={`${p.team}, ${label[p.place]}`}
                  width={800}
                  height={1200}
                  sizes="(min-width: 768px) 320px, 100vw"
                  className="aspect-[4/5] w-full rounded-t-2xl object-cover"
                />
                <div className="p-6">
                  <p className="flex items-baseline gap-3">
                    <span className={`font-sans text-5xl font-bold ${p.place === 1 ? "text-accent-ink" : "text-foreground/40"}`}>
                      {p.place}
                    </span>
                    <span className="font-sans text-sm font-medium text-foreground/60">
                      {label[p.place]}
                    </span>
                  </p>
                  <h3 className="mt-3 text-xl">{p.team}</h3>
                  {p.project && <p className="font-sans font-medium text-accent-ink">{p.project}</p>}
                  {p.summary && <p className="mt-3 text-foreground/80">{p.summary}</p>}
                  {p.members && p.members.length > 0 && (
                    <p className="mt-3 text-sm text-foreground/60">{p.members.join(" · ")}</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>
      </article>
    </main>
  );
}
