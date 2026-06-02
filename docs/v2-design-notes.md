# V2 Design Notes

These notes document the visual system used by the Astro v2 site. The actual source of truth is still the SCSS and app data, but this gives future-me a quick map.

## App Accent Colors

App accent colors live in `site/src/data/apps.ts` as `accent` values. They are used by cards, feature sections, glows, links, and screenshot hover states.

| App | Hex | RGB | Common RGBA Uses |
| --- | --- | --- | --- |
| Day Tracker | `#ec2f3b` | `236, 47, 59` | `rgba(236, 47, 59, 0.08)`, `rgba(236, 47, 59, 0.10)`, `rgba(236, 47, 59, 0.16)`, `rgba(236, 47, 59, 0.34)`, `rgba(236, 47, 59, 0.45)` |
| Discount Calculator | `#1f8a70` | `31, 138, 112` | `rgba(31, 138, 112, 0.08)`, `rgba(31, 138, 112, 0.10)`, `rgba(31, 138, 112, 0.16)`, `rgba(31, 138, 112, 0.34)` |
| Quicker Tipper | `#3867d6` | `56, 103, 214` | `rgba(56, 103, 214, 0.08)`, `rgba(56, 103, 214, 0.10)`, `rgba(56, 103, 214, 0.16)`, `rgba(56, 103, 214, 0.34)` |

## Shared Colors

The global tokens are in `site/src/styles/global.scss`.

```scss
--color-ink: #111318;
--color-ink-deep: #090b0f;
--color-panel: #191d23;
--color-panel-soft: #222833;
--color-brand: #ec2f3b;
--color-green: #1f8a70;
--color-blue: #3867d6;
--color-line: rgba(255, 255, 255, 0.14);
```

## Interaction Notes

- App cards flip on hover, focus, and tap.
- FAQ cards flip to show the longer answer.
- Pulse rows get subtle movement and a small orbit ring around the status dot.
- Release chips lift subtly on hover; avoid extra visual meters unless they represent real data.
- Privacy and terms cards are hover-only and should not get sticky click behavior.
- App feature screenshots use a three-image hover scrub made from neighboring app screenshots. All three screenshots should be visible at rest, then fan out more on hover.

## Design Guardrails

- Keep app pages dark and glassy; avoid bright screenshot section backgrounds.
- Keep cards at `8px` radius.
- Prefer real app screenshots, icons, and app imagery over abstract illustration.
- Avoid adding demo-only routes once an interaction graduates into the main site.
