import Image from "next/image";
import MobileMenu from "./mobile-menu";
import Spinner from "./spinner";

// ponytail: single static page. Split into routes/components when content grows.
// Unconfirmed copy (see PRODUCT.md): "Qué hacemos" activities and "todas las carreras".
const sections = [
  {
    id: "about",
    title: "Quiénes somos",
    body: "Somos un grupo estudiantil independiente del Tec de Monterrey que explora y aprende IA con Claude.",
  },
  {
    id: "activities",
    title: "Qué hacemos",
    body: "Talleres, charlas y proyectos con Claude y herramientas de IA.",
  },
  {
    id: "events",
    title: "Próximos eventos",
    body: "Hackathon Claude: 3 de octubre. Horario, lugar y próximos eventos, primero en nuestro Instagram, @claude.tec.",
  },
  {
    id: "join",
    title: "Únete",
    body: "Abierto a estudiantes de todas las carreras. Para unirte, escríbenos en Instagram: @claude.tec.",
  },
];

function FooterLinks({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <nav aria-label={title}>
      <h3 className="text-base">{title}</h3>
      <ul className="mt-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="inline-block py-3 underline-offset-4 hover:text-accent-ink hover:underline md:py-1.5"
              {...(l.external && {
                target: "_blank",
                rel: "noopener noreferrer",
              })}
            >
              {l.label}
              {l.external && (
                <span className="sr-only"> (se abre en otra pestaña)</span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Home() {
  return (
    <>
      <header className="sticky top-0 border-b border-foreground/15 bg-background/90 backdrop-blur">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-2 font-sans text-sm font-medium md:py-3">
          <a href="#" aria-label="ClaudeTec">
            {/* eslint-disable-next-line @next/next/no-img-element -- SVG logo, no optimization needed */}
            <img
              src="/brand/logo/claudetec/claudetec-fondo-claro.svg"
              alt="ClaudeTec"
              width={140}
              height={21}
            />
          </a>
          <div className="hidden gap-2 md:flex">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-2 py-2 underline-offset-4 hover:text-accent-ink hover:underline"
              >
                {s.title}
              </a>
            ))}
          </div>
          <MobileMenu
            links={sections.map((s) => ({ label: s.title, href: `#${s.id}` }))}
          />
        </nav>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6">
        <section className="grid items-center gap-10 py-12 md:grid-cols-2 md:py-24">
          <div>
            <h1>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/logo/claudetec/claudetec-fondo-claro.svg"
                alt="ClaudeTec"
                width={480}
                height={72}
                className="h-auto w-full max-w-md"
              />
            </h1>
            <p className="mt-4 text-balance text-lg text-foreground/70">
              Comunidad estudiantil de IA · Tec de Monterrey, campus Monterrey
            </p>
            <a
              href="https://www.instagram.com/claude.tec"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full bg-foreground px-5 font-sans font-medium py-3 text-background transition-colors hover:bg-accent hover:text-foreground"
            >
              Síguenos en Instagram
              <span className="sr-only"> (se abre en otra pestaña)</span>
            </a>
          </div>
          <Image
            src="/images/team.webp"
            alt="Mesa directiva de ClaudeTec, gestión 2026–2027"
            width={2000}
            height={889}
            priority
            sizes="(min-width: 1024px) 480px, (min-width: 768px) 50vw, 100vw"
            className="h-auto w-full rounded-2xl"
          />
        </section>

        {sections.map((s) => (
          <section
            key={s.id}
            id={s.id}
            className="mb-6 scroll-mt-20 rounded-2xl bg-card p-6 md:p-8"
          >
            <h2 className="text-2xl font-medium text-accent-ink">{s.title}</h2>
            <p className="mt-3 max-w-prose text-foreground/80">{s.body}</p>
          </section>
        ))}
      </main>

      <footer className="mt-12 border-t border-foreground/15">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-12 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo/claudetec/claudetec-fondo-claro.svg"
              alt="ClaudeTec"
              width={140}
              height={21}
              loading="lazy"
            />
            {/* LiFE siempre más chico que el logo de ClaudeTec */}
            <Image
              src="/brand/logo/life/life-fondo-claro-color.png"
              alt="LiFE Grupos Estudiantiles"
              width={110}
              height={18}
              className="mt-5"
            />
            <p className="mt-5 text-sm text-foreground/70">
              *Somos un grupo estudiantil independiente del Tec de Monterrey. No
              estamos asociados a Anthropic.
            </p>
            <p className="mt-2 text-sm text-foreground/70">
              © {new Date().getFullYear()} ClaudeTec
            </p>
            <Spinner className="mt-4 font-mono text-sm text-accent-ink" />
          </div>
          <FooterLinks
            title="Explora"
            links={sections.map((s) => ({ label: s.title, href: `#${s.id}` }))}
          />
          <FooterLinks
            title="Síguenos"
            links={[
              {
                label: "Instagram",
                href: "https://www.instagram.com/claude.tec",
                external: true,
              },
            ]}
          />
        </div>
        {/* Marca de agua decorativa: logo a todo el ancho, recortado desde arriba */}
        <div
          aria-hidden="true"
          className="relative aspect-[10/1] w-full overflow-hidden opacity-20"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo/claudetec/claudetec-fondo-claro.svg"
            alt=""
            loading="lazy"
            className="absolute left-0 top-0 h-auto w-full"
          />
        </div>
      </footer>
    </>
  );
}
