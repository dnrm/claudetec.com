// Content for /links. Add a card to any section (or a new section) and it shows up;
// href can be anything: an external URL, a page on this site ("/blog"), mailto:, etc.
// image is optional (a path in public/); without it the card gets an ASCII cover.

import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa6";

export type Card = {
  title: string;
  href?: string; // omit for a non-clickable placeholder card
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
// video: a YouTube video id, embedded above the cards.
export const sections: {
  title: string;
  subtitle?: string;
  clawd?: "pesas" | "confeti" | "saltando";
  video?: string;
  cards: Card[];
}[] = [
  {
    title: "Conoce Claude",
    clawd: "confeti",
    video: "0vZ_UVLhSQQ",
    cards: [],
  },
  {
    title: "Talleres y cursos",
    clawd: "pesas",
    cards: [{ title: "Próximamente", description: "Estamos preparando los siguientes talleres." }],
  },
  {
    title: "Blog",
    cards: [
      {
        eyebrow: "Blog",
        title: "Ganadores del Hackathon Claude",
        image: "/images/hackathon/portada.webp",
        href: "/blog/ganadores-hackathon-oct-24",
      },
    ],
  },
];
