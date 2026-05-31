<p align="center">
  <img src="Assets/SonnazGroup/SonnazGroup_Title.png" alt="Sonnaz Group Logo" width="100%">
</p>

<h1 align="center">SG-WebDevelopment</h1>

<p align="center">
  The Sonnaz Group website, rebuilt as a modern Astro + TypeScript site and packaged as a Docker image.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Astro-BC52EE.svg?style=for-the-badge&logo=astro&logoColor=white" alt="Astro Badge">
  <img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript Badge">
  <img src="https://img.shields.io/badge/SCSS-CC6699.svg?style=for-the-badge&logo=sass&logoColor=white" alt="SCSS Badge">
  <img src="https://img.shields.io/badge/Caddy-1F88C0.svg?style=for-the-badge&logo=caddy&logoColor=white" alt="Caddy Badge">
  <img src="https://img.shields.io/badge/Docker-2496ED.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker Badge">
</p>

## Overview

This repository now contains the v2 Sonnaz Group website. The old PHP include-based website was removed on the v2 redesign branch so the repo can be organized around the new stack from the start.

The site is built with:

- Astro for static-first pages and reusable components.
- TypeScript for typed app/content data.
- SCSS for the main stylesheet.
- Docker for repeatable local and production builds.
- Caddy for serving the static site inside the image and for the planned public reverse proxy on the droplet.
- GitHub Actions for build checks, image publishing, and future staging/production deploys.

The current website shape is a hybrid:

- One main Sonnaz Group landing page with useful sections: apps, downloads, app info, FAQ, privacy, terms, and feedback.
- Dedicated app detail pages for richer screenshots and feature sections.
- Future app domains/subdomains can be routed to the same droplet with Caddy.

The visual direction uses the compact app-landing-page feel of [PlateChaser](https://platechaser.app/) as a loose reference while keeping Sonnaz Group's darker app-preview style and existing assets.

## Decisions

### Same Repo

The v2 rebuild stays in this repo to preserve project history. The old production state was tagged before the rebuild:

```text
pre-v2-php-site
```

That tag is the reference point for the old PHP site if it ever needs to be inspected again.

### Astro Instead of Angular

Angular is excellent for large client-side web apps, but this website is mostly content, screenshots, download links, and static pages. Astro is a better fit because it outputs fast static HTML while still giving component structure.

### TypeScript

App content lives in typed TypeScript data instead of being copied across separate HTML files. This makes the app names, download links, release details, and feature sections easier to update without hunting through page markup.

Main content file:

```text
site/src/data/apps.ts
```

General site content:

```text
site/src/data/siteContent.ts
```

### SCSS

The v2 site uses SCSS because it is familiar, expressive, and supported cleanly by Astro/Vite. The global stylesheet is:

```text
site/src/styles/global.scss
```

### Docker Image Deploys

The deployment unit is intended to be a Docker image, not a copied folder of files. GitHub Actions will build an immutable image for a commit, push it to GitHub Container Registry, and the droplet can run that exact image.

This gives cleaner rollbacks and makes staging/production behavior easier to reason about.

### Caddy

Caddy is used because it keeps HTTPS and reverse proxy configuration simple. In production, one Caddy instance can route many domains and subdomains on one droplet:

```text
sonnazgroup.com              -> production site container
staging.sonnazgroup.com      -> staging site container
daytrack.sonnazgroup.com     -> future app container
daytrack.app                 -> future app container or redirect
```

## Repository Structure

```text
SG-WebDevelopment/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   └── workflows/
│       └── v2-site.yml
├── Assets/
│   ├── DayTracker/
│   ├── DiscountCalculator/
│   ├── Icons/
│   ├── QuickerTipper/
│   └── SonnazGroup/
├── deploy/
│   ├── Caddyfile.example
│   └── compose.server.example.yml
├── docs/
│   └── v2-release-workflow.md
├── site/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── styles/
│   ├── Caddyfile
│   ├── Dockerfile
│   ├── astro.config.mjs
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml
└── README.md
```

## Routes

Main one-page site:

```text
/
```

App detail pages:

```text
/day-tracker
/discount-calculator
/quicker-tipper
```

Generated app routes are also available:

```text
/apps/day-tracker
/apps/discount-calculator
/apps/quicker-tipper
```

Astro also generates:

```text
/404.html
```

## Local Development

Requirements:

- Node.js 22 or compatible current Node runtime.
- npm.
- Docker Desktop if using the Docker workflow locally.

Install dependencies:

```bash
cd site
npm install
```

Start Astro dev server:

```bash
npm run dev
```

Astro local URL:

```text
http://localhost:4321
```

Run a production-style Astro build:

```bash
npm run build
```

That command runs:

```text
astro check
astro build
```

So it verifies TypeScript/Astro diagnostics and then builds the static site.

## Docker

Build the local image from the repo root:

```bash
docker compose build
```

Run it:

```bash
docker compose up -d
```

Local Docker URL:

```text
http://localhost:8081
```

Port `8081` is used because `8080` was already allocated locally during setup.

Check running containers:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs --tail 80
```

Stop the local container:

```bash
docker compose down
```

## Content Editing

### Apps

Edit apps in:

```text
site/src/data/apps.ts
```

Each app includes:

- name
- slug
- status label
- accent color
- summary and description
- logo, preview, and hero images
- feature screenshots
- App Store/TestFlight download links
- app information like version, release date, size, language, and developer
- feedback links

### FAQ, Privacy, Terms, Disclaimer

Edit general content in:

```text
site/src/data/siteContent.ts
```

This file contains:

- FAQ cards
- plain-English privacy cards
- plain-English terms cards
- Apple trademark/download badge disclaimer

The full legal pages from the old PHP site were intentionally replaced with readable sections on the main page. If formal long-form legal pages are needed again later, add them as new Astro pages instead of bringing back the old PHP files.

### Styling

Edit global styles in:

```text
site/src/styles/global.scss
```

The current design keeps:

- dark app-first visuals
- no duplicate visible Sonnaz Group headline under the logo image
- dark feature sections on app pages
- reusable cards for FAQ, policy summaries, downloads, and app info
- 8px card/button radius

## Git Workflow

Planned branch flow:

```text
feature/* -> develop -> main
```

Recommended daily flow:

1. Create a feature branch from `develop`.
2. Build and test locally.
3. Open a PR into `develop`.
4. Merge to `develop` to deploy staging/UAT.
5. Test staging.
6. Open a PR from `develop` into `main`.
7. Merge to `main` to deploy production.

This keeps production stable while still giving a real staging environment.

## GitHub Actions

Workflow file:

```text
.github/workflows/v2-site.yml
```

Triggers:

- Pull requests into `develop` or `main`.
- Pushes to `develop` or `main`.
- Manual workflow dispatch.

Jobs:

- `check`: installs `site/` dependencies and runs `npm run build`.
- `image`: builds and pushes a Docker image to GitHub Container Registry on push/manual runs.
- `deploy`: guarded behind a repo variable so server deployment can be enabled later.

Image naming:

```text
ghcr.io/<owner>/sonnazgroup-site:<commit-sha>
ghcr.io/<owner>/sonnazgroup-site:<branch-name>
```

Examples:

```text
ghcr.io/kmschang/sonnazgroup-site:develop
ghcr.io/kmschang/sonnazgroup-site:main
ghcr.io/kmschang/sonnazgroup-site:<sha>
```

## Deployment Configuration

Deployment is currently guarded by this GitHub repository variable:

```text
V2_DEPLOY_ENABLED=true
```

Leave it unset or set to anything other than `true` until the droplet deploy script is ready.

Required GitHub Actions secrets for deploy:

```text
SSH_HOST
SSH_PORT
SSH_USER
SSH_PRIVATE_KEY
V2_DEPLOY_SCRIPT_PATH
```

The deploy job calls the server script like this:

```text
<V2_DEPLOY_SCRIPT_PATH> <image-ref> <environment>
```

Example:

```text
/srv/sonnaz/deploy-site.sh ghcr.io/kmschang/sonnazgroup-site:<sha> staging
```

The environment value will be:

```text
staging
production
```

depending on whether the push came from `develop` or `main`.

## Server Shape

Example server files:

```text
deploy/Caddyfile.example
deploy/compose.server.example.yml
```

The intended server setup is:

```text
Docker Compose on one DigitalOcean droplet
  caddy
  sonnaz-site-prod
  sonnaz-site-staging
```

Caddy routes:

```text
sonnazgroup.com, www.sonnazgroup.com
  -> sonnaz-site-prod:80

staging.sonnazgroup.com
  -> basic auth
  -> sonnaz-site-staging:80
```

Caddy can later route additional app domains or subdomains to other containers without needing a separate droplet for each website.

## What Was Removed

The old PHP website files were removed from the v2 branch:

- `*.php` page wrappers
- `includes/` HTML partials
- old Bootstrap/SCSS output under `scss/`
- old front-end scripts under `js/`
- old root `package.json` and `package-lock.json`
- old artifact packaging script
- old production artifact workflow

The useful content from those files was moved into the Astro data/components where it still belongs.

## Verification

Useful checks before opening a PR:

```bash
cd site
npm run build
```

```bash
docker compose build
docker compose up -d
```

Then inspect:

```text
http://localhost:4321
http://localhost:8081
```

Known dependency audit note:

- Production dependencies currently report zero vulnerabilities with `npm audit --omit=dev`.
- The moderate findings are from dev-only Astro language-server/check tooling.

## Troubleshooting

If Docker says a port is allocated, change the host side of this mapping in `docker-compose.yml`:

```yaml
ports:
  - "8081:80"
```

If Astro tries to write telemetry settings somewhere unexpected, telemetry is already disabled in the npm scripts and Docker build with:

```text
ASTRO_TELEMETRY_DISABLED=1
```

If the GitHub Action builds an image but does not deploy, check:

- `V2_DEPLOY_ENABLED` is set to `true`.
- Deploy secrets exist.
- The server deploy script exists and is executable.
- The deploy user can run Docker Compose on the droplet.
