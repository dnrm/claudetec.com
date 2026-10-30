"use client";

import { MotionConfig, motion, useReducedMotion, type Variants } from "motion/react";
import AsciiMountain from "./ascii-mountain";

const ease = [0.22, 1, 0.36, 1] as const;
const TAGLINE = "Comunidad estudiantil de IA · Tec de Monterrey, campus Monterrey";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease } },
};
const words: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};
const word: Variants = {
  hidden: { opacity: 0, y: "0.4em" },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      {/* Fills the viewport below the sticky header (~4rem); mountains take the lower part. */}
      <section className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden">
        <AsciiMountain className="absolute inset-0 -z-10 h-full w-full [mask-image:linear-gradient(to_bottom,#000_85%,transparent)]" />
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto w-full max-w-5xl px-6 pt-16 md:pt-28"
        >
          <motion.h1 variants={rise}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo/claudetec/claudetec-fondo-claro.svg"
              alt="ClaudeTec"
              width={480}
              height={72}
              className="h-auto w-[78%] max-w-md md:w-full"
            />
          </motion.h1>
          <motion.p
            variants={words}
            aria-label={TAGLINE}
            className="mt-4 max-w-md text-balance text-lg text-foreground/70"
          >
            {TAGLINE.split(" ").map((w, i) => (
              <motion.span key={i} variants={word} aria-hidden="true" className="inline-block whitespace-pre">
                {w}{" "}
              </motion.span>
            ))}
            <motion.span
              aria-hidden="true"
              className="inline-block font-mono text-accent-ink"
              animate={reduce ? undefined : { opacity: [1, 1, 0, 0] }}
              transition={{ duration: 1.1, repeat: Infinity, times: [0, 0.5, 0.5, 1], delay: 1.4 }}
            >
              ▍
            </motion.span>
          </motion.p>
          <motion.div variants={rise} className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="https://chat.whatsapp.com/GGU9hBPTmjWFPSA6fvAyqD?s=cl&p=i&mlu=4&ilr=4&iam=2"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-7 py-4 font-sans text-lg font-medium text-background shadow-[0_8px_24px_-8px_rgb(21_21_20/0.5)] transition-colors hover:bg-accent hover:text-foreground sm:w-auto"
            >
              Únete a la comunidad
              <span aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                ↗
              </span>
              <span className="sr-only"> en WhatsApp (se abre en otra pestaña)</span>
            </motion.a>
            {/* Secondary: a text link, so it never competes with the filled button */}
            <a
              href="https://www.instagram.com/claude.tec"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 self-center py-3 font-sans font-medium text-foreground/80 transition-colors hover:text-foreground sm:self-auto"
            >
              <span className="underline decoration-foreground/30 underline-offset-[6px] transition-colors group-hover:decoration-foreground">
                Síguenos en Instagram
              </span>
              <span aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                ↗
              </span>
              <span className="sr-only"> (se abre en otra pestaña)</span>
            </a>
          </motion.div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
