import Image from "next/image";
import Link from "next/link";
import { getMembers, study } from "./members";

// Team photo + member cards, shared by the home section and /mesa.
// Order and copy live in content/mesa/*.md (from the public/mesa-directiva/ slides).
export default function Board() {
  return (
    <>
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
        {getMembers().map((m) => (
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
    </>
  );
}
