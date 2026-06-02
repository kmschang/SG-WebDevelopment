<p align="center">
  <img src="Assets/SonnazGroup/SonnazGroup_Title.png" alt="Sonnaz Group Logo" width="100%">
</p>

<h1 align="center">SG-WebDevelopment</h1>

<p align="center">
  Sonnaz Group website v2: Astro + TypeScript + SCSS, packaged with Docker and served through Caddy.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Astro-BC52EE.svg?style=for-the-badge&logo=astro&logoColor=white" alt="Astro Badge">
  <img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript Badge">
  <img src="https://img.shields.io/badge/SCSS-CC6699.svg?style=for-the-badge&logo=sass&logoColor=white" alt="SCSS Badge">
  <img src="https://img.shields.io/badge/Caddy-1F88C0.svg?style=for-the-badge&logo=caddy&logoColor=white" alt="Caddy Badge">
  <img src="https://img.shields.io/badge/Docker-2496ED.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker Badge">
</p>

## Overview

This repo is the v2 Sonnaz Group website. The old PHP include-based site was removed from this branch after the useful content was moved into Astro data files and components.

The site is designed as:

- one main homepage for apps, FAQ, privacy and terms, status, roadmap, releases, press kits, and feedback
- dedicated app pages for richer screenshots, downloads, app information, release notes, and press kits
- a Docker image that can run locally, on staging, or in production
- one droplet that can serve multiple domains and subdomains through Caddy

## Stack

- Astro: static-first website framework.
- TypeScript: typed app/content data.
- SCSS: global styling and interaction states.
- Docker: repeatable build/runtime unit.
- Caddy: static file server in the site image and reverse proxy on the droplet.
- GitHub Actions: checks, Docker image builds, GHCR pushes, and deploy hooks.
- GitHub Container Registry: stores versioned Docker images.

## Important Decision Notes

### Same repo

The v2 site stays in this repo to preserve history. The old PHP production baseline was tagged before the rebuild:

```text
pre-v2-php-site
```

### Astro instead of Angular

Angular is great for full applications, but this website is mostly content, screenshots, downloads, and static pages. Astro gives reusable components without shipping a large client-side app.

### Docker image deploys

Deployments are image-based. GitHub Actions builds the exact website into a Docker image, pushes it to GHCR, and the server pulls/runs that image.

That means:

- local builds can match server builds
- staging and production can run different image tags
- rollback means switching back to an older image tag
- the server does not need to build the website unless you choose to

## Repository Layout

```text
SG-WebDevelopment/
├── .github/workflows/site-ci-cd.yml
├── Assets/
├── deploy/
│   ├── Caddyfile.example
│   ├── compose.server.example.yml
│   └── deploy-site.example.sh
├── docs/
│   ├── v2-design-notes.md
│   └── v2-release-workflow.md
├── site/
│   ├── public/
│   ├── scripts/build-press-kits.mjs
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── styles/global.scss
│   ├── Caddyfile
│   ├── Dockerfile
│   ├── astro.config.mjs
│   ├── package.json
│   └── tsconfig.json
├── docker-compose.yml
└── README.md
```

## Environments

| Environment | Branch/Image | URL style | Purpose |
| --- | --- | --- | --- |
| Local Astro | local files | `http://localhost:4321` | Fast development with hot reload |
| Local Docker | `sonnazgroup/site:local` | `http://localhost:8080` | Test the production-style container |
| Staging/UAT | `ghcr.io/...:develop` | `staging.sonnazgroup.com` | Test in the real server environment before users see it |
| Production | `ghcr.io/...:main` | `sonnazgroup.com` | Public site |

Using one droplet for staging and production is fine for this site. Caddy routes requests by hostname, so production and staging can run as separate containers on the same machine:

```text
sonnazgroup.com         -> sonnaz-site-prod
staging.sonnazgroup.com -> sonnaz-site-staging
```

For a static site, this is a good setup. If future apps use databases, background jobs, or user accounts, staging should use separate environment variables, volumes, and databases so test data never touches production data.

Protect staging with:

- Caddy basic auth
- `noindex` headers or meta tags if needed
- separate staging image/container

## Local Development

Fresh local machine checklist:

1. Install Git.
2. Install Node.js 22 or newer, which includes npm.
3. Clone this repo.
4. Install site dependencies.
5. Run the dev server or Docker preview.

TypeScript, Sass, Astro, and the press-kit tooling are installed from `site/package.json`; do not install them globally unless you have another reason.

Install dependencies:

```bash
cd site
npm install
```

Start Astro dev server:

```bash
npm run dev
```

Open:

```text
http://localhost:4321
```

Build Astro:

```bash
npm run build
```

The build command:

1. generates press kit zip files
2. runs `astro check`
3. runs `astro build`

You do not need to install TypeScript globally. TypeScript, Astro, Sass, and press-kit tooling live in `site/package.json`.

## Local Docker

From the repo root:

```bash
docker compose build
docker compose up -d
```

Open:

```text
http://localhost:8080
```

Port `8080` maps to port `80` inside the local Caddy container.

Useful Docker commands:

```bash
docker compose ps
docker compose logs --tail 80
docker compose down
```

The Dockerfile installs packages with `npm ci --audit=false --fund=false` so image builds stay quiet and repeatable. Run audits as an explicit local or CI step instead:

```bash
cd site
npm audit --omit=dev
```

## Content Editing

### Apps

Edit:

```text
site/src/data/apps.ts
```

Each app has:

- name and slug
- status label
- accent color
- summary and description
- logos and screenshots
- feature sections
- App Store/TestFlight links
- app information
- feedback links

### FAQ, Privacy, Terms, Disclaimer

Edit:

```text
site/src/data/siteContent.ts
```

### Status, Roadmap, Releases, Press Kits

Edit:

```text
site/src/data/updates.ts
```

#### Adding an App Release

Most release updates happen in one place:

```text
site/src/data/updates.ts
```

Add a new object to `releaseItems`:

```ts
{
  app: "Day Tracker",
  version: "2.0.2.81",
  date: "April 10, 2026",
  bullets: [
    "Short plain-English change",
    "Another useful change",
    "Bug fix or polish note"
  ]
}
```

Rules:

- `app` must exactly match the app name in `site/src/data/apps.ts`.
- `date` should be a real date string that JavaScript can parse, like `April 10, 2026`.
- Releases sort newest-first automatically.
- The homepage shows the newest 3 releases automatically.
- Each app page shows the newest 2 releases for that app automatically.
- The app page `Version` and `Release date` fields use the newest release automatically when one exists.

Only edit `site/src/data/apps.ts` for a release when other app metadata changes, such as app size, download links, availability text, screenshots, or feature copy. You should not need to manually move older releases down or remove them from app pages.

### Accent Colors and Visual Notes

Design notes, app accent hex values, and common RGBA values are documented in:

```text
docs/v2-design-notes.md
```

## Press Kit Automation

Press kits are generated during `npm run build`.

Script:

```text
site/scripts/build-press-kits.mjs
```

Output:

```text
site/public/press-kits/
```

The output folder is git-ignored because it is generated. The Docker build runs the same build script, so the image includes fresh press kit zip files.

Current source folders:

```text
Assets/SonnazGroup
Assets/DayTracker
Assets/DiscountCalculator
Assets/QuickerTipper
```

If you add assets to one of those folders, the next build regenerates the zip. Existing `.zip` files and `.DS_Store` files are excluded so old press kits do not get nested inside new press kits.

To add a new app press kit:

1. Add the app asset folder under `Assets/AppName`.
2. Add a new entry in `site/scripts/build-press-kits.mjs`.
3. Add a matching entry in `site/src/data/updates.ts`.
4. Run `cd site && npm run build`.

## Routes

Homepage:

```text
/
```

App pages:

```text
/day-tracker
/discount-calculator
/quicker-tipper
```

Generated app routes:

```text
/apps/day-tracker
/apps/discount-calculator
/apps/quicker-tipper
```

## Adding a Normal Page

Create a new `.astro` file in:

```text
site/src/pages/
```

Example:

```text
site/src/pages/example.astro
```

That becomes:

```text
/example
```

Use the base layout:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
---

<BaseLayout title="Example | Sonnaz Group" description="Example page.">
  <main>
    <section class="section">
      <p class="eyebrow">Example</p>
      <h1>Example page</h1>
    </section>
  </main>
</BaseLayout>
```

## Adding a New App

1. Add assets:

```text
Assets/NewApp/
```

Recommended minimum files:

```text
NewApp_Logo.png
NewApp_AppPreview.png
NewApp_Hero.png
NewApp_Page1.png
NewApp_Page2.png
```

2. Add imports and an app object in:

```text
site/src/data/apps.ts
```

3. Add release/press/status content in:

```text
site/src/data/updates.ts
```

4. Add press-kit generation in:

```text
site/scripts/build-press-kits.mjs
```

5. Optional: add a friendly top-level route:

```text
site/src/pages/new-app.astro
```

Use the same pattern as the existing app pages.

6. Run:

```bash
cd site
npm run build
```

## Domain Strategy

One droplet can serve many domains and subdomains. DNS points the names to the droplet. Caddy decides which container gets the request based on the hostname.

Examples:

```text
sonnazgroup.com
sonnazgroup.app
sonnazgroup.net
sonnazgroup.pro

staging.sonnazgroup.com
staging.sonnazgroup.app
staging.sonnazgroup.net
staging.sonnazgroup.pro

daytrack.app
www.daytrack.app
staging.daytrack.app

daytrack.sonnazgroup.com
staging.daytrack.sonnazgroup.com
```

### Porkbun DNS Pattern

In Porkbun, DNS records have a type, host, answer/value, TTL, and optional notes. Porkbun documents that the host field is blank for the root domain, while subdomains use the subdomain name. A records point to IPv4 addresses. CNAME records point a non-root hostname to a fully qualified domain name and cannot use a blank host.

Use this pattern for each apex/root domain:

| Domain | Type | Host | Answer |
| --- | --- | --- | --- |
| `sonnazgroup.com` | A | blank | droplet IPv4 |
| `sonnazgroup.app` | A | blank | droplet IPv4 |
| `daytrack.app` | A | blank | droplet IPv4 |

Use this pattern for subdomains:

| Name | Type | Host | Answer |
| --- | --- | --- | --- |
| `www.sonnazgroup.com` | CNAME | `www` | `sonnazgroup.com` |
| `staging.sonnazgroup.com` | CNAME | `staging` | `sonnazgroup.com` |
| `daytrack.sonnazgroup.com` | CNAME | `daytrack` | `sonnazgroup.com` |
| `staging.daytrack.sonnazgroup.com` | CNAME | `staging.daytrack` | `sonnazgroup.com` |
| `www.daytrack.app` | CNAME | `www` | `daytrack.app` |
| `staging.daytrack.app` | CNAME | `staging` | `daytrack.app` |

If you prefer, subdomains can also use A records directly to the droplet IPv4. CNAME is easier to maintain because if the droplet IP changes, you update fewer records.

### Caddy Domain Routing

Production examples:

```caddy
sonnazgroup.com, www.sonnazgroup.com, sonnazgroup.app, www.sonnazgroup.app {
  reverse_proxy sonnaz-site-prod:80
}

daytrack.app, www.daytrack.app, daytrack.sonnazgroup.com {
  reverse_proxy daytrack-prod:3000
}
```

Staging examples:

```caddy
staging.sonnazgroup.com, staging.sonnazgroup.app {
  basicauth {
    uat-user HASHED_PASSWORD
  }

  reverse_proxy sonnaz-site-staging:80
}

staging.daytrack.app, staging.daytrack.sonnazgroup.com {
  basicauth {
    uat-user HASHED_PASSWORD
  }

  reverse_proxy daytrack-staging:3000
}
```

This is how you get “the same URL but with `staging.` before it.”

## Git Workflow

Recommended branch flow:

```text
feature/* -> develop -> main
```

Daily flow:

1. Create a feature branch from `develop`.
2. Work locally.
3. Run `npm run build`.
4. Run `docker compose build`.
5. Open PR into `develop`.
6. Merge to `develop`.
7. GitHub Actions builds/pushes the `develop` image and deploys staging if deploy is enabled.
8. Test on staging.
9. Open PR from `develop` into `main`.
10. Merge to `main`.
11. GitHub Actions builds/pushes the `main` image and deploys production if deploy is enabled.

## GitHub Actions

Workflow:

```text
.github/workflows/site-ci-cd.yml
```

Triggers:

- PR to `develop` or `main`
- push to `develop` or `main`
- manual workflow dispatch

Jobs:

- `check`: install dependencies and run `npm run build`
- `image`: build/push Docker image to GHCR
- `deploy`: SSH into the droplet and run the deploy script when enabled

Image tags:

```text
ghcr.io/<owner>/sonnazgroup-site:<commit-sha>
ghcr.io/<owner>/sonnazgroup-site:develop
ghcr.io/<owner>/sonnazgroup-site:main
```

Build environment marker:

- `develop` images build with `PUBLIC_DEPLOY_ENV=staging`.
- `main` images build with `PUBLIC_DEPLOY_ENV=production`.
- The staging build shows a subtle red viewport outline and `Staging` marker so you can tell UAT from production without changing page layout.

The workflow uses `GITHUB_TOKEN` to publish images to GHCR. GitHub documents that `GITHUB_TOKEN` can publish packages associated with the workflow repository.

## GitHub Setup

In GitHub, go to:

```text
Repo -> Settings -> Secrets and variables -> Actions
```

Add repository secrets:

```text
SSH_HOST
SSH_PORT
SSH_USER
SSH_PRIVATE_KEY
V2_DEPLOY_SCRIPT_PATH
```

Add repository variable:

```text
V2_DEPLOY_ENABLED=true
```

Leave `V2_DEPLOY_ENABLED` unset or not equal to `true` until the server is ready.

Recommended GitHub environments:

```text
staging
production
```

In:

```text
Repo -> Settings -> Environments
```

Use the `production` environment for optional required reviewers before production deploys. Staging can deploy automatically.

## Server Assumption

These server instructions assume Ubuntu on a DigitalOcean droplet.

The production server does not need Node/npm/TypeScript if GitHub Actions builds the image. The server only needs Docker, Compose, Caddy config, and permission to pull images. Node/npm are only needed on the server if you choose to build the site there manually.

For this repo, TypeScript is not installed globally. It is a project dependency in `site/package.json`, so `npm ci` or `npm install` brings it in when you are working locally or doing a manual build.

## Fresh Ubuntu Server Setup

1. Update the server:

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install -y ca-certificates curl git ufw
```

2. Install Docker Engine from Docker's official apt repository. Docker recommends setting up the apt repository for first-time installs on a new host.

```bash
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

3. Create a deploy user:

```bash
sudo adduser --disabled-password --gecos "" deploy
sudo usermod -aG docker deploy
sudo mkdir -p /srv/sonnaz
sudo chown deploy:deploy /srv/sonnaz
```

4. Configure firewall:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

5. Log in as deploy:

```bash
sudo su - deploy
```

6. Create `/srv/sonnaz` files:

```bash
cd /srv/sonnaz
```

Copy these repo files to the server:

```text
deploy/Caddyfile.example             -> /srv/sonnaz/Caddyfile
deploy/compose.server.example.yml    -> /srv/sonnaz/compose.server.yml
deploy/deploy-site.example.sh        -> /srv/sonnaz/deploy-site.sh
```

You can copy these files manually, use `scp`, or clone the repo to the server and copy from the clone. For the normal GitHub Actions + GHCR flow, the server does not need the whole repo after these deploy files are in place.

Optional repo clone pattern:

```bash
git clone https://github.com/YOUR_GITHUB_USER/SG-WebDevelopment.git /srv/sonnaz/repo
cp /srv/sonnaz/repo/deploy/Caddyfile.example /srv/sonnaz/Caddyfile
cp /srv/sonnaz/repo/deploy/compose.server.example.yml /srv/sonnaz/compose.server.yml
cp /srv/sonnaz/repo/deploy/deploy-site.example.sh /srv/sonnaz/deploy-site.sh
```

Make deploy script executable:

```bash
chmod +x /srv/sonnaz/deploy-site.sh
```

7. Create `/srv/sonnaz/.env`:

```bash
touch /srv/sonnaz/.env
```

After the first GitHub image exists, it will contain values like:

```text
PROD_SITE_IMAGE=ghcr.io/kmschang/sonnazgroup-site:main
STAGING_SITE_IMAGE=ghcr.io/kmschang/sonnazgroup-site:develop
```

The example compose file has harmless placeholder defaults so staging and production can be deployed one at a time on a fresh server. Once both images exist, keep both values in `.env` so restarting the stack brings back the exact staging and production images you expect.

8. Log in to GHCR from the server if the image is private:

```bash
echo YOUR_GITHUB_PAT | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin
```

Use a classic PAT with `read:packages` for pulling private images. If the package is public, anonymous pulls may work, but logging in is still a good private-repo habit.

9. Start after images are available:

```bash
/srv/sonnaz/deploy-site.sh ghcr.io/kmschang/sonnazgroup-site:develop staging
/srv/sonnaz/deploy-site.sh ghcr.io/kmschang/sonnazgroup-site:main production
```

### Optional Manual Server Build

This is not the recommended deploy path, but it is useful to know. If you ever want to build the site directly on an Ubuntu server instead of pulling the GHCR image, install Node.js 22 or newer and npm, then run:

```bash
cd /srv/sonnaz/repo/site
npm ci
npm run build
```

You still do not need a global TypeScript install. The local `typescript` package runs through the project scripts.

## SSH Deploy Key Setup

Create a deploy key pair on your local machine:

```bash
ssh-keygen -t ed25519 -C "github-actions-sonnaz-deploy"
```

Copy the public key to the server deploy user:

```bash
ssh-copy-id deploy@YOUR_SERVER_IP
```

Put the private key contents into GitHub:

```text
SSH_PRIVATE_KEY
```

Use:

```text
SSH_USER=deploy
SSH_HOST=<droplet-ip-or-hostname>
SSH_PORT=22
V2_DEPLOY_SCRIPT_PATH=/srv/sonnaz/deploy-site.sh
```

## Deployment Flow in Detail

### Local

You edit files, run:

```bash
cd site
npm run build
```

Then test the container:

```bash
docker compose build
docker compose up -d
```

### Pull Request

When you open a PR into `develop` or `main`, GitHub Actions runs `check`. This catches TypeScript, Astro, and build problems before merging.

### Merge to Develop

When `develop` receives a push:

1. GitHub Actions runs the build check.
2. GitHub Actions builds a Docker image.
3. The image is pushed to GHCR with the commit SHA and `develop` tags.
4. If `V2_DEPLOY_ENABLED=true`, the deploy job SSHes into the droplet.
5. The server deploy script updates `STAGING_SITE_IMAGE`.
6. Docker Compose pulls the new staging image.
7. Caddy routes `staging.*` hostnames to the staging container.

### UAT/Staging

You test:

```text
staging.sonnazgroup.com
staging.sonnazgroup.app
staging.<app-domain>
```

This tests the real DNS, TLS, Caddy, container, and static site image before production.

### Merge to Main

When `main` receives a push:

1. GitHub Actions builds and pushes the production image.
2. The deploy job SSHes into the droplet.
3. The server deploy script updates `PROD_SITE_IMAGE`.
4. Docker Compose pulls the new production image.
5. Caddy routes public hostnames to production.

Production changes only happen when `main` changes.

## Moving to a New Server

Because the site is Docker/GitHub-based, moving servers should be straightforward:

1. Create a new Ubuntu droplet.
2. Install Docker and firewall rules.
3. Copy `/srv/sonnaz/Caddyfile`, `/srv/sonnaz/compose.server.yml`, `/srv/sonnaz/deploy-site.sh`, and `/srv/sonnaz/.env`.
4. Run `docker login ghcr.io`.
5. Run the deploy script for staging and production.
6. Change Porkbun DNS A records to the new droplet IP.
7. Wait for DNS propagation.
8. Verify staging and production.

Caddy will request fresh certificates on the new server when DNS points there and ports 80/443 are open.

## Asset Recommendations

Good new assets to add:

- Homepage hero: `2400x1350` or `2880x1620`, dark enough for white text.
- App hero background per app: `2400x1350`, showing real screenshots or device compositions.
- App icon: `1024x1024` PNG with transparency if possible.
- App card preview: around `1600x1200` or larger transparent PNG.
- Feature screenshots: native iPhone screenshot resolution, keep originals crisp.
- Open Graph image per site/app: `1200x630`.
- App Store-style promo strip: `2400x900`.
- Optional short demo video: `1920x1080` MP4/WebM plus a poster image.
- Press kit content: logo, icon, hero image, screenshots, short app description, and app metadata.

Prefer real product screenshots over abstract backgrounds. The current design benefits most from clean device compositions and high-resolution transparent app previews.

## Useful References

- GitHub Actions secrets: https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets
- GitHub Container Registry: https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry
- Docker Engine on Ubuntu: https://docs.docker.com/engine/install/ubuntu/
- Porkbun DNS records: https://kb.porkbun.com/article/231-how-to-add-dns-records-on-porkbun
