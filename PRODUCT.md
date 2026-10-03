# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Tec de Monterrey (campus Monterrey) students curious about AI, who usually arrive from Instagram or word of mouth and decide whether to follow, join, or attend an event. A second, equally weighted audience: attendees and sponsors of the Hackathon Claude (3 October) and its sponsors (Alestra, Aprise, Firehouse Subs, Mr. Brown). Spanish-speaking; mostly on phones.

## Product Purpose
The public website of ClaudeTec, an independent student group at Tec de Monterrey (LiFE Grupos Estudiantiles) that explores and learns AI with Claude. It recruits members and promotes events, including the Hackathon Claude. Success: visitors follow the group, join, or show up to an event.

## Capabilities and Constraints
- Single-page Next.js site (app router, Tailwind), Spanish (`lang="es"`).
- Required on the page: "*Somos un grupo estudiantil independiente del Tec de Monterrey. No estamos asociados a Anthropic."
- Official Claude/Anthropic logos and Clawd must not be used (they imply an official site). They are quarantined in `_anthropic-no-publicar/`.
- The LiFE logo is mandatory in group material and always smaller than the ClaudeTec logo.
- The TechWeek logo is only 680 px; do not upscale it.
- Undecided: group description and mission, activity list, event dates and places, how to join (form or email). Current copy for these is placeholder (TODO).

## Brand Commitments
- ClaudeTec logo variants in `public/brand/logo/claudetec/`: `fondo-claro` is primary; never deform or recolor; not over busy photos.
- Typography from the brand kit: Lora for paragraphs, a grotesk (currently Cabinet Grotesk, medium) for headings, UI and labels.
- One accent only, orange `#d97757`; background `#f2ebe3`, cards `#e4dacd`, text `#151514`, light text `#f2ebe3` on black elements. Light mode only. Text that needs orange uses `--accent-ink` `#a8482a`, a darkened shade of the same hue, because `#d97757` is only 2.6:1 on the background.

## Evidence on Hand
- Real: board photo (`public/images/team.webp (original 3240px PNG in assets-originales/)`, gestión 2026–2027), Instagram @claude.tec, Hackathon Claude on 3 October with its sponsors.
- Brand assets in `public/brand/` and `public/images/` (photos, illustrations, icons). Photo permission: Expedition FEMSA photos cleared on 2026-09-17; other third-party photos need permission first.
- Absent, do not fabricate: member names and roles, testimonials, attendance figures, sponsor terms, event details beyond the date.

## Product Principles
- Student-run and independent: never imply Anthropic or Tec endorsement.
- Both audiences get a clear next step: follow/join, or attend the hackathon.
- Real content over filler; mark unknowns instead of inventing them.
- Mobile first; fast, light pages.
