"use client";

import { useEffect, useState } from "react";

// Frame order of the Claude Code spinner; played forward then backward so the glyph looks like it spins.
export const SPINNER_SYMBOLS = ["·", "✢", "✳", "✶", "✻", "✽"];

export const SPINNER_VERBS =
  `Accomplishing Actioning Actualizing Architecting Baking Beaming Beboppin' Befuddling Billowing Blanching Bloviating Boogieing Boondoggling Booping Bootstrapping Brewing Bunning Burrowing Calculating Canoodling Caramelizing Cascading Catapulting Cerebrating Channeling Channelling Choreographing Churning Clauding Coalescing Cogitating Combobulating Composing Computing Concocting Considering Contemplating Cooking Crafting Creating Crunching Crystallizing Cultivating Deciphering Deliberating Determining Dilly-dallying Discombobulating Doing Doodling Drizzling Ebbing Effecting Elucidating Embellishing Enchanting Envisioning Evaporating Fermenting Fiddle-faddling Finagling Flambéing Flibbertigibbeting Flowing Flummoxing Fluttering Forging Forming Frolicking Frosting Gallivanting Galloping Garnishing Generating Gesticulating Germinating Gitifying Grooving Gusting Harmonizing Hashing Hatching Herding Honking Hullaballooing Hyperspacing Ideating Imagining Improvising Incubating Inferring Infusing Ionizing Jitterbugging Julienning Kneading Leavening Levitating Lollygagging Manifesting Marinating Meandering Metamorphosing Misting Moonwalking Moseying Mulling Mustering Musing Nebulizing Nesting Newspapering Noodling Nucleating Orbiting Orchestrating Osmosing Perambulating Percolating Perusing Philosophising Photosynthesizing Pollinating Pondering Pontificating Pouncing Precipitating Prestidigitating Processing Proofing Propagating Puttering Puzzling Quantumizing Razzle-dazzling Razzmatazzing Recombobulating Reticulating Roosting Ruminating Sautéing Scampering Schlepping Scurrying Seasoning Shenaniganing Shimmying Simmering Skedaddling Sketching Slithering Smooshing Sock-hopping Spelunking Spinning Sprouting Stewing Sublimating Swirling Swooping Symbioting Synthesizing Tempering Thinking Thundering Tinkering Tomfoolering Topsy-turvying Transfiguring Transmuting Twisting Undulating Unfurling Unravelling Vibing Waddling Wandering Warping Whatchamacalliting Whirlpooling Whirring Whisking Wibbling Working Wrangling Zesting Zigzagging`.split(
    " ",
  );

const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];

type SpinnerProps = {
  /** Verbs to rotate through; one per full 0→3 dots cycle. */
  verbs?: string[];
  /** Glyph frames, advanced on every tick (ping-pong). */
  symbols?: string[];
  /** Verb shown first (and on the server render). */
  initialVerb?: string;
  /** Milliseconds per tick; each tick adds a dot and advances the glyph. */
  interval?: number;
  className?: string;
};

// First render is deterministic so server and client HTML match; randomness starts after mount.
export default function Spinner({
  verbs = SPINNER_VERBS,
  symbols = SPINNER_SYMBOLS,
  initialVerb = "Discombobulating",
  interval = 450,
  className = "font-mono text-sm text-accent-ink",
}: SpinnerProps) {
  const [{ tick, verb }, set] = useState({ tick: 0, verb: initialVerb });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(
      () =>
        set((p) => {
          if (document.hidden) return p; // pause in background tabs
          const next = p.tick + 1;
          return { tick: next, verb: next % 4 === 0 ? pick(verbs) : p.verb };
        }),
      interval,
    );
    return () => clearInterval(id);
  }, [verbs, interval]);

  // ping-pong over the frames: 0 1 2 3 4 5 4 3 2 1 …
  const n = symbols.length;
  const i = tick % (2 * n - 2 || 1);
  const symbol = symbols[i < n ? i : 2 * n - 2 - i];

  return (
    <p aria-hidden="true" className={className}>
      {symbol} {verb}
      {".".repeat(tick % 4)}
    </p>
  );
}
