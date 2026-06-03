# Image Rendering Guide

This site keeps the original high-resolution app artwork in `Assets/` and lets Astro generate smaller browser-friendly files during the build. That means you should not need to maintain separate PNG, WebP, and AVIF copies by hand.

## The Short Version

Use this workflow for normal app screenshots, logos, hero images, and preview images:

1. Put the best source image in `Assets/AppName/` or another existing `Assets/` folder.
2. Import it without `?url`.
3. Render it with `ResponsivePicture.astro`.
4. Run `cd site && npm run build`.

Astro will generate responsive AVIF, WebP, and PNG output files in:

```text
site/dist/_astro/
```

Those generated files are build output. Do not edit them and do not commit them.

## Source Images

Keep the source image as the highest-quality version you reasonably have. PNG is fine, especially for app screenshots, transparent logos, and crisp UI images.

The source file does not get sent directly to users when it is rendered through `ResponsivePicture.astro`. The browser gets one of Astro's generated versions instead, usually AVIF or WebP in a smaller size.

## Import Pattern

For images that should be optimized, import them like this:

```ts
import appHero from "../../../Assets/DayTracker/DayTracker_Hero.png";
```

Do not add `?url` for these images:

```ts
import appHero from "../../../Assets/DayTracker/DayTracker_Hero.png?url";
```

The `?url` version gives Astro a plain file URL, which is useful for a few static cases but skips the responsive image pipeline.

## Rendering Pattern

Use:

```astro
---
import ResponsivePicture from "../components/ResponsivePicture.astro";
import heroImage from "../../../Assets/DayTracker/DayTracker_Hero.png";
---

<ResponsivePicture
  src={heroImage}
  alt="Day Tracker calendar screen"
  imageClass="hero-image"
  widths={[960, 1280, 1600, 1920]}
  sizes="100vw"
  priority
  fit="cover"
/>
```

`ResponsivePicture.astro` currently outputs:

- AVIF sources
- WebP sources
- PNG fallback images

This gives modern browsers small files while still keeping a fallback for older browsers.

## Widths And Aspect Ratio

You do not need to calculate new heights. Pick useful widths and Astro keeps the original aspect ratio automatically.

Good rule of thumb:

- use the displayed width
- add a 1.5x or 2x version for retina screens
- avoid making many more sizes than the layout can actually use

Examples:

| Use | Widths | Sizes |
| --- | --- | --- |
| Header logo | `[38, 76, 114]` | `"38px"` |
| Product logo | `[86, 172, 258]` | `"86px"` |
| App card preview | `[360, 540, 720, 960]` | `"(max-width: 760px) 86vw, 360px"` |
| Feature screenshot | `[360, 540, 720, 960]` | `"(max-width: 700px) 58vw, 340px"` |
| Full-width hero | `[960, 1280, 1600, 1920]` | `"100vw"` |
| Brand title image | `[640, 960, 1280, 1728, 2304]` | `"min(860px, 92vw)"` |

The `sizes` value tells the browser how large the image will be in the layout. The browser then picks the best generated file from `widths`.

The Sonnaz Group title image is intentionally much wider than a normal logo. Keep it on its custom wide settings so it does not get visually shrunk into a traditional logo slot.

## When To Still Use `?url`

Use `?url` for files that should be treated as a plain static asset instead of responsive content.

Current examples:

```text
site/src/components/DownloadLink.astro
site/src/layouts/BaseLayout.astro
```

Those handle app-store badges, TestFlight badge artwork, and the favicon. They are small, fixed assets, so responsive generation is not as important there.

## Adding A New App Image

1. Add the source image:

```text
Assets/NewApp/NewApp_Page1.png
```

2. Import it in the data file:

```ts
import newAppPage1 from "../../../Assets/NewApp/NewApp_Page1.png";
```

3. Add it to the app data:

```ts
features: [
  {
    title: "Fast lookup",
    description: "Find what you need without digging around.",
    image: newAppPage1
  }
]
```

4. If the image is rendered by an existing app component, that is usually enough. If you create a new component, render it with `ResponsivePicture.astro`.

5. Build the site:

```bash
cd site
npm run build
```

6. Check the generated assets if you are curious:

```bash
du -sh dist/_astro
find dist/_astro -type f | sort | head
```

## Quality Notes

The default quality is set to `high` inside `ResponsivePicture.astro`. That should keep UI screenshots crisp while still shrinking the files a lot.

If a specific image ever looks too compressed, pass a different `quality` value at the call site instead of replacing the whole pipeline. Start by trying the next higher quality for that one image only.

## Press Kits

Press kits still use the source files under `Assets/`. The generated AVIF/WebP files are only for the website pages.

That means:

- website pages can load fast
- press kits still contain the original source assets
- changing a file in `Assets/` updates both the website image output and the next generated press kit zip

## What Not To Do

Do not keep a second hand-maintained folder of AVIF copies unless there is a very specific reason.

Do not manually edit files in `site/dist/_astro/`.

Do not use one giant source image everywhere without widths and sizes. The build can optimize it, but the browser needs `sizes` to choose the right generated file.
