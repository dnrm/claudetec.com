// Content for /links. Add a card to any section (or a new section) and it shows up;
// href can be anything: an external URL, a page on this site ("/blog"), mailto:, etc.
// image is optional (a path in public/); without it the card gets an ASCII cover.

import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa6";

export type Card = {
  title: string;
  href: string;
  eyebrow?: string;
  description?: string;
  image?: string;
};

export const socials = [
  { label: "Instagram", icon: FaInstagram, href: "https://www.instagram.com/claude.tec" },
  { label: "LinkedIn", icon: FaLinkedin, href: "#" }, // TODO: LinkedIn URL
  {
    label: "WhatsApp",
    icon: FaWhatsapp,
    href: "https://chat.whatsapp.com/GGU9hBPTmjWFPSA6fvAyqD?s=cl&p=i&mlu=4&ilr=4&iam=2",
  },
];

// clawd: which canonical animation sits next to the heading (public/clawd/<name>/clawd-<name>.webp).
export const sections: {
  title: string;
  subtitle?: string;
  clawd?: "pesas" | "confeti" | "saltando";
  cards: Card[];
}[] = [
  {
    title: "Talleres de Claude Code gratis",
    subtitle: "Da click en el que te quieres registrar",
    clawd: "pesas",
    cards: [
      {
        eyebrow: "Taller 1 de 4",
        title: "Una página web que sí se ve bien",
        description:
          "Aprende los principios de diseño web y publica tu primera página con Claude Code.",
        href: "#", // TODO: Luma URL
      },
      {
        eyebrow: "Taller 2 de 4",
        title: "Login y seguridad básica",
        description: "Que tu página tenga usuarios reales y datos bien guardados.",
        href: "#", // TODO: Luma URL
      },
      {
        eyebrow: "Taller 3 de 4",
        title: "IA y agentes que trabajan por ti",
        description: "Automatiza la logística de tu página con agentes inteligentes.",
        href: "#", // TODO: Luma URL
      },
    ],
  },
  {
    title: "Conoce Claude",
    clawd: "confeti",
    cards: [
      {
        eyebrow: "Video · Anthropic",
        title: "Getting started with Claude.ai",
        href: "#", // TODO: YouTube URL
      },
      {
        eyebrow: "Blog",
        title: "Ganadores del Hackathon Claude",
        image: "/images/hackathon/portada.webp",
        href: "/blog/ganadores-hackathon-oct-24",
      },
    ],
  },
];
