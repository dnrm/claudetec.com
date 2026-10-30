import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./mobile-menu";
import Spinner from "./spinner";

// Unconfirmed copy (see PRODUCT.md): "Qué hacemos" activities and "todas las carreras".
export const sections = [
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

// "/#id" so the links also work from other routes (e.g. /blog/...).
const navLinks = [
  ...sections.map((s) => ({ label: s.title, href: `/#${s.id}` })),
  { label: "Mesa directiva", href: "/#mesa" },
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

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-foreground/10 bg-background">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-2 font-sans text-[15px] font-medium md:py-3">
        <Link href="/" aria-label="ClaudeTec">
          {/* eslint-disable-next-line @next/next/no-img-element -- SVG logo, no optimization needed */}
          <img
            src="/brand/logo/claudetec/claudetec-fondo-claro.svg"
            alt="ClaudeTec"
            width={140}
            height={21}
          />
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 hover:bg-foreground/5"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://www.instagram.com/claude.tec"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 rounded-lg bg-foreground px-4 py-2.5 text-background transition-colors hover:bg-accent hover:text-foreground"
          >
            Síguenos
            <span className="sr-only">
              {" "}
              en Instagram (se abre en otra pestaña)
            </span>
          </a>
        </div>
        <MobileMenu links={navLinks} />
      </nav>
    </header>
  );
}

export function Footer() {
  return (
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
        <FooterLinks title="Explora" links={navLinks} />
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
    </footer>
  );
}
