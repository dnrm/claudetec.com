import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ScrambleText from "../scramble-text";
import { openGraph } from "../seo";
import { posts } from "./posts";

const description = "Noticias, resultados y crónicas de los eventos de ClaudeTec.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: { canonical: "/blog" },
  openGraph: { ...openGraph, title: "Blog", description, url: "/blog" },
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 pt-12 pb-24 md:pt-20">
      <h1 className="text-4xl md:text-5xl">
        <ScrambleText text="Blog" />
      </h1>
      <p className="mt-4 max-w-prose text-lg text-foreground/70">{description}</p>

      <ul className="mt-12 border-b border-foreground/15">
        {posts.map((p) => (
          <li key={p.slug} className="border-t border-foreground/15">
            <Link
              href={`/blog/${p.slug}`}
              className="group grid gap-6 py-10 md:grid-cols-[5fr_7fr] md:gap-12"
            >
              <Image
                src={p.image}
                alt=""
                width={2000}
                height={1333}
                sizes="(min-width: 768px) 400px, 100vw"
                className="aspect-[3/2] w-full rounded-2xl object-cover"
              />
              <div className="md:pt-2">
                <h2 className="text-3xl underline-offset-4 group-hover:underline md:text-4xl">{p.title}</h2>
                <p className="mt-3 max-w-prose text-lg text-foreground/80">{p.description}</p>
                <p className="mt-6 font-sans font-medium text-accent-ink">Leer →</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
