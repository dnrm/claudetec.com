"use client";

import { useEffect, useRef } from "react";

// Cerro de la Silla photo rendered as text: brightness picks a glyph per cell.
const SRC = "/images/campus.webp";
const RAMP = " .'-:/=+<>*X#%▓█"; // light → dark
const SCRAMBLE = "/\\<>=+*#%X";
const FONT_PX = 12;
const LINE_PX = 14;
const RADIUS = 140; // mouse influence, px
const TOP_GAP = 0.3; // fraction of the hero left as empty sky above the photo
const TOP_GAP_MOBILE = 0.45; // below 768px the copy stacks taller, so start the photo lower
const BOTTOM_FROM = 0.45; // darkening starts this fraction of the hero above the bottom edge
const BOTTOM_INK = 0.6; // 0 = photo as-is, 1 = bottom row fully dark

const CLOUD = ".-~"; // thin → thick
const CLOUD_ALPHA = 0.22;
const CLOUD_COVER = 0.66; // noise threshold; lower = more cloud

const hash = (x: number, y: number) => {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
};
// Value noise + 3 octaves, for the drifting clouds.
const smooth = (t: number) => t * t * (3 - 2 * t);
function noise(x: number, y: number) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const u = smooth(x - xi), v = smooth(y - yi);
  const a = hash(xi, yi), b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
const fbm = (x: number, y: number) =>
  (noise(x, y) * 4 + noise(x * 2, y * 2) * 2 + noise(x * 4, y * 4)) / 7;

export default function AsciiMountain({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const css = getComputedStyle(document.documentElement);
    const ink = css.getPropertyValue("--foreground").trim() || "#151514";
    const accent = css.getPropertyValue("--accent").trim() || "#d97757";
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const img = new Image();
    img.src = SRC;

    let w = 0, h = 0, cw = 7, cols = 0, rows = 0;
    let dark = new Float32Array(0); // 0 = paper, 1 = ink, one per cell

    // Sample the photo at one pixel per cell, then stretch contrast. The photo starts
    // TOP_GAP down (blank sky above, so the peaks clear the hero copy) and covers the
    // rest, anchored at its top edge so the peaks never get cropped.
    const sample = () => {
      if (!img.complete || !img.naturalWidth || !cols) return;
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const o = off.getContext("2d", { willReadFrequently: true })!;
      o.fillStyle = "#fff";
      o.fillRect(0, 0, cols, rows);
      const top = Math.round(rows * (w < 768 ? TOP_GAP_MOBILE : TOP_GAP));
      const scale = Math.max(w / img.naturalWidth, (h - top * LINE_PX) / img.naturalHeight);
      const sw = w / scale, sh = (h - top * LINE_PX) / scale;
      o.drawImage(img, (img.naturalWidth - sw) / 2, 0, sw, sh, 0, top, cols, rows - top);
      const px = o.getImageData(0, 0, cols, rows).data;
      dark = new Float32Array(cols * rows);
      let lo = 1, hi = 0;
      for (let i = 0; i < dark.length; i++) {
        // HSV value, not luminance: blue sky reads as paper, foliage and shadows as ink.
        dark[i] = 1 - Math.max(px[i * 4], px[i * 4 + 1], px[i * 4 + 2]) / 255;
        lo = Math.min(lo, dark[i]);
        hi = Math.max(hi, dark[i]);
      }
      for (let i = 0; i < dark.length; i++) {
        const d = Math.max(0, ((dark[i] - lo) / (hi - lo || 1) - 0.12) / 0.88) ** 1.1;
        // Ground the scene: ramp toward ink over the lowest BOTTOM_FROM of the hero.
        const b = Math.max(0, (Math.floor(i / cols) / rows - (1 - BOTTOM_FROM)) / BOTTOM_FROM);
        dark[i] = d > 0 ? d + (1 - d) * BOTTOM_INK * b * b : 0;
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${FONT_PX}px ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textBaseline = "top";
      cw = ctx.measureText("M").width;
      cols = Math.ceil(w / cw);
      rows = Math.ceil(h / LINE_PX);
      sample();
    };

    // Target and smoothed mouse, in px; off-canvas = far away.
    const target = { x: -1e4, y: -1e4 };
    const mouse = { x: -1e4, y: -1e4 };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      target.x = e.clientX - r.left;
      target.y = e.clientY - r.top;
    };
    const onLeave = () => {
      target.x = target.y = -1e4;
    };

    const draw = (t: number) => {
      // Snap instead of lerping from far away, so the effect doesn't sweep in from a corner.
      const k = Math.abs(target.x - mouse.x) < w ? 0.12 : 1;
      mouse.x += (target.x - mouse.x) * k;
      mouse.y += (target.y - mouse.y) * k;

      ctx.clearRect(0, 0, w, h);
      if (dark.length !== cols * rows) return;
      const tick = Math.floor(t * 8);
      const accentCells: [string, number, number][] = [];
      const cloudCells: [string, number, number][] = [];
      const skyRows = rows * ((w < 768 ? TOP_GAP_MOBILE : TOP_GAP) + 0.25);
      ctx.fillStyle = ink;
      ctx.globalAlpha = 0.85;

      for (let r = 0; r < rows; r++) {
        const y = r * LINE_PX;
        for (let c = 0; c < cols; c++) {
          const x = c * cw;
          const dist = Math.hypot(x - mouse.x, y - mouse.y);
          const hot = dist < RADIUS ? 1 - dist / RADIUS : 0;

          // Lens: near the cursor, sample closer to it so the photo bulges.
          let sc = c, sr = r;
          if (hot) {
            const pull = 1 - hot * 0.35;
            sc = Math.round((mouse.x + (x - mouse.x) * pull) / cw);
            sr = Math.round((mouse.y + (y - mouse.y) * pull) / LINE_PX);
            sc = Math.min(cols - 1, Math.max(0, sc));
            sr = Math.min(rows - 1, Math.max(0, sr));
          }
          let idx = Math.floor(dark[sr * cols + sc] * (RAMP.length - 1) + 0.5);
          // Shimmer: a few cells per frame step one glyph up or down.
          const s = hash(c + tick * 0.37, r);
          if (idx > 0 && s < 0.015) idx += s < 0.0075 ? 1 : -1; // leave empty sky empty
          idx = Math.min(RAMP.length - 1, Math.max(0, idx));

          if (hot > 0.25 && hash(c + tick, r) < hot * 0.7) {
            accentCells.push([SCRAMBLE[Math.floor(hash(r, c + tick) * SCRAMBLE.length)], x, y]);
          } else if (idx > 0) {
            ctx.fillText(RAMP[idx], x, y);
          } else if (r < skyRows) {
            // Clouds only in empty sky: wide, flat noise drifting slowly to the right.
            const n = fbm(c * 0.035 - t * 0.02, r * 0.2) - CLOUD_COVER;
            if (n > 0) cloudCells.push([CLOUD[Math.min(CLOUD.length - 1, Math.floor(n * 12))], x, y]);
          }
        }
      }

      ctx.globalAlpha = CLOUD_ALPHA;
      for (const [ch, x, y] of cloudCells) ctx.fillText(ch, x, y);

      ctx.fillStyle = accent;
      ctx.globalAlpha = 1;
      for (const [ch, x, y] of accentCells) ctx.fillText(ch, x, y);

      // Erase toward where the hero copy sits (left on desktop, top on mobile) so it stays readable.
      const wide = w >= 768;
      const g = wide ? ctx.createLinearGradient(0, 0, w * 0.55, 0) : ctx.createLinearGradient(0, h * 0.1, 0, h * 0.6);
      g.addColorStop(0, "rgba(0,0,0,0.9)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
    };

    let raf = 0, last = 0, visible = true;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden || now - last < 33) return;
      last = now;
      draw(now / 1000);
    };
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    const ro = new ResizeObserver(() => {
      resize();
      if (still) draw(0);
    });
    img.onload = () => {
      sample();
      if (still) draw(0);
    };
    resize();
    ro.observe(canvas);

    if (still) return () => ro.disconnect();

    // ponytail: redraws every cell at ~30fps; cache the untouched glyphs to an offscreen canvas if it shows up in profiles.
    io.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
