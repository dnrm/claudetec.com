import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScrambleText from "../scramble-text";
import { openGraph } from "../seo";
import { JoinCta, pages } from "../site";

// One page per nav section (/quienes-somos, /que-hacemos, /eventos); copy lives in site.tsx.
export const dynamicParams = false;

export function generateStaticParams() {
  return pages.map((s) => ({ section: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  const s = pages.find((p) => p.slug === section);
  if (!s) return {};
  const url = `/${s.slug}`;
  return {
    title: s.title,
    description: s.body,
    alternates: { canonical: url },
    openGraph: { ...openGraph, title: s.title, description: s.body, url },
  };
}

export default async function Page({ params }: { params: Promise<{ section: string }> }) {
  const slug = (await params).section;
  const i = pages.findIndex((p) => p.slug === slug);
  if (i < 0) notFound();
  const s = pages[i];

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 pb-24">
      <article className="grid gap-3 pt-12 md:grid-cols-[5fr_7fr] md:gap-12 md:pt-20">
        <div>
          <p className="font-mono text-sm text-accent-ink">{String(i + 1).padStart(2, "0")}</p>
          <h1 className="mt-2 text-4xl md:text-5xl">
            <ScrambleText text={s.title} />
          </h1>
        </div>
        <div className="md:pt-8">
          <p className="max-w-prose text-lg text-foreground/80">{s.body}</p>
          {s.more && (
            <Link
              href={s.more.href}
              className="mt-6 inline-block font-sans font-medium text-accent-ink underline-offset-4 hover:underline"
            >
              {s.more.label} →
            </Link>
          )}
        </div>
      </article>
      <JoinCta />
    </main>
  );
}
