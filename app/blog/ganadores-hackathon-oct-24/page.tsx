import type { Metadata } from "next";
import Link from "next/link";
import { openGraph } from "../../seo";

const description = "Primer, segundo y tercer lugar del Hackathon Claude de ClaudeTec.";

export const metadata: Metadata = {
  title: "Ganadores del Hackathon Claude",
  description,
  alternates: { canonical: "/blog/ganadores-hackathon-oct-24" },
  openGraph: {
    ...openGraph,
    type: "article",
    title: "Ganadores del Hackathon Claude",
    description,
    url: "/blog/ganadores-hackathon-oct-24",
  },
};

// Placeholder copy until results are confirmed. To add a photo, set `image`
// to a path in /public (e.g. "/images/hackathon/primer-lugar.webp").
const podium: {
  place: 1 | 2 | 3;
  team: string;
  project: string;
  summary: string;
  members: string[];
  image?: string;
}[] = [
  { place: 1, team: "Equipo por anunciar", project: "Nombre del proyecto", summary: "Descripción breve del proyecto ganador.", members: [] },
  { place: 2, team: "Equipo por anunciar", project: "Nombre del proyecto", summary: "Descripción breve del proyecto.", members: [] },
  { place: 3, team: "Equipo por anunciar", project: "Nombre del proyecto", summary: "Descripción breve del proyecto.", members: [] },
];

const label = { 1: "1.er lugar", 2: "2.º lugar", 3: "3.er lugar" };
// Desktop podium reads 2 · 1 · 3, with first place raised; mobile stacks 1 · 2 · 3.
const layout = {
  1: "md:order-2 md:-translate-y-8",
  2: "md:order-1",
  3: "md:order-3",
};

function Photo({ src, alt, className }: { src?: string; alt: string; className: string }) {
  return src ? (
    // eslint-disable-next-line @next/next/no-img-element -- paths are added by hand later
    <img src={src} alt={alt} className={`${className} object-cover`} />
  ) : (
    <div
      aria-hidden="true"
      className={`${className} grid place-items-center border-2 border-dashed border-foreground/20 font-mono text-sm text-foreground/40`}
    >
      [ foto pendiente ]
    </div>
  );
}

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 pb-24">
      <article>
        <header className="pt-12 md:pt-20">
          <Link href="/" className="font-sans text-sm font-medium text-accent-ink underline-offset-4 hover:underline">
            ← Inicio
          </Link>
          <h1 className="mt-4 text-4xl md:text-5xl">Ganadores del Hackathon Claude</h1>
          <p className="mt-4 max-w-prose text-lg text-foreground/70">
            Gracias a todos los equipos que participaron. Estos son los tres proyectos que se llevaron el podio.
          </p>
          <Photo alt="Foto del Hackathon Claude" className="mt-10 aspect-[16/7] w-full rounded-2xl" />
        </header>

        <section aria-labelledby="podio" className="mt-20">
          <h2 id="podio" className="text-2xl md:text-3xl">Podio</h2>
          <ol className="mt-16 grid items-end gap-6 md:grid-cols-3">
            {podium.map((p) => (
              <li
                key={p.place}
                className={`flex flex-col overflow-hidden rounded-2xl bg-card ${layout[p.place]} ${p.place === 1 ? "ring-2 ring-accent" : ""}`}
              >
                <Photo src={p.image} alt={`${p.team}, ${label[p.place]}`} className="aspect-[4/3] w-full rounded-t-2xl" />
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
                  <p className="font-sans font-medium text-accent-ink">{p.project}</p>
                  <p className="mt-3 text-foreground/80">{p.summary}</p>
                  {p.members.length > 0 && (
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
