import type { Metadata } from "next";
import { openGraph } from "../seo";
import ScrambleText from "../scramble-text";
import Board from "./board";

const description = "Mesa directiva de ClaudeTec, gestión 2026–2027.";

export const metadata: Metadata = {
  title: "Mesa directiva",
  description,
  alternates: { canonical: "/mesa" },
  openGraph: { ...openGraph, title: "Mesa directiva", description, url: "/mesa" },
};

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 pt-12 pb-24 md:pt-20">
      <p className="font-sans text-sm font-medium text-accent-ink">Gestión 2026–2027</p>
      <h1 className="mt-1 flex items-end gap-3 text-4xl md:text-5xl">
        <ScrambleText text="Mesa directiva" />
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative animated webp */}
        <img src="/clawd/pesas/clawd-pesas.webp" alt="" aria-hidden="true" width={58} height={45} />
      </h1>
      <Board />
    </main>
  );
}
