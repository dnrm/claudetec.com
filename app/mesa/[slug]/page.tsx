import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { openGraph } from "../../seo";
import { getMember, getMembers, study } from "../members";

export const dynamicParams = false;

export function generateStaticParams() {
  return getMembers().map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const m = getMember((await params).slug);
  if (!m) return {};
  const title = `${m.name}, ${m.role}`;
  const url = `/mesa/${m.slug}`;
  return {
    title,
    description: m.bio[0],
    alternates: { canonical: url },
    openGraph: {
      ...openGraph,
      type: "profile",
      title,
      description: m.bio[0],
      url,
      ...(m.image && { images: [{ url: m.image, alt: m.name }] }),
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const m = getMember((await params).slug);
  if (!m) notFound();

  // Empty contact fields in the .md are simply not shown.
  const contacts = [
    { label: "LinkedIn", href: m.linkedin },
    { label: "Sitio web", href: m.website },
    { label: "Correo", href: m.email && `mailto:${m.email}` },
  ].filter((c) => c.href);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 pb-24">
      <article className="pt-12 md:pt-20">
        <Link href="/#mesa" className="font-sans text-sm font-medium text-accent-ink underline-offset-4 hover:underline">
          ← Mesa directiva
        </Link>
        <div className="mt-8 grid gap-10 md:grid-cols-[5fr_7fr] md:gap-12">
          <Image
            src={m.image}
            alt={m.name}
            width={720}
            height={545}
            priority
            sizes="(min-width: 1024px) 400px, (min-width: 768px) 40vw, 100vw"
            className="aspect-[4/3] w-full rounded-2xl object-cover object-top"
          />
          <div>
            <h1 className="text-4xl md:text-5xl">{m.name}</h1>
            <p className="mt-2 font-sans text-lg font-medium text-accent-ink">{m.role}</p>
            <p className="mt-1 text-foreground/60">{study(m)}</p>

            <div className="mt-8 max-w-prose space-y-4 text-lg text-foreground/80">
              {m.bio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {m.interests.length > 0 && (
              <section className="mt-10">
                <h2 className="text-xl">Intereses</h2>
                <ul className="mt-3 flex flex-wrap gap-2 font-sans text-sm">
                  {m.interests.map((i) => (
                    <li key={i} className="rounded-full bg-card px-3 py-1.5">
                      {i}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {contacts.length > 0 && (
              <section className="mt-10">
                <h2 className="text-xl">Contacto</h2>
                <ul className="mt-2 flex flex-wrap gap-x-6 font-sans font-medium">
                  {contacts.map((c) => (
                    <li key={c.label}>
                      <a
                        href={c.href}
                        {...(!c.href.startsWith("mailto:") && { target: "_blank", rel: "noopener noreferrer" })}
                        className="inline-block py-2 underline-offset-4 hover:text-accent-ink hover:underline"
                      >
                        {c.label}
                        {!c.href.startsWith("mailto:") && <span className="sr-only"> (se abre en otra pestaña)</span>}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </article>
    </main>
  );
}
