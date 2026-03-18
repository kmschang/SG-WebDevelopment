<p align="center">
  <img src="Assets/SonnazGroup/SonnazGroup_Title.png" alt="Sonnaz Group Logo" width="100%">
</p>

<div style="text-align: center;">
<h1 align="center">📌 SG-WebDevelopment</h1>
<p align="center"><code>SG-WebDevelopment</code> is the source repository for the Sonnaz Group website and utility web pages, built with PHP page wrappers, reusable HTML includes, Bootstrap 5, and custom SCSS/JavaScript assets.</p>
</div>

---

<div style="text-align: center; padding-top: 30px">
<p align="center">
<img src="https://img.shields.io/badge/PHP-777BB4.svg?style=for-the-badge&logo=php&logoColor=white" alt="PHP Badge">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript Badge">
<img src="https://img.shields.io/badge/HTML-E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="HTML Badge">
<img src="https://img.shields.io/badge/SCSS-CC6699.svg?style=for-the-badge&logo=sass&logoColor=white" alt="SCSS Badge">
<img src="https://img.shields.io/badge/Bootstrap-7952B3.svg?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap Badge">
<img src="https://img.shields.io/badge/NGINX-009639.svg?style=for-the-badge&logo=nginx&logoColor=white" alt="NGINX Badge">
<img src="https://img.shields.io/badge/Docker-2496ED.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker Badge">
<img src="https://img.shields.io/badge/Markdown-000000.svg?style=for-the-badge&logo=markdown&logoColor=white" alt="Markdown Badge">
</p>
</div>

---

## Overview

This repository contains the website source for Sonnaz Group domains. The project uses PHP files as page entry points and composes each page from reusable HTML include files under `includes/`.

Styling is built from Bootstrap + custom SCSS in `scss/bootstrap.scss`, which compiles to `scss/bootstrap.min.css` used by pages. JavaScript behavior (navbar, scroll helpers, page interactions) lives in `js/`.

## Key pages

- `index.php` (Home)
- `aboutUs.php`
- `press.php`
- `releases.php`
- `FAQ.php`
- `status.php`
- `contact.php`
- `privacy.php`
- `terms.php`
- Utility pages: `dayTracker.php`, `discountCalculator.php`, `quickerTipper.php`, `roadmap.php`, `404.php`

## Repository structure

```text
SG-WebDevelopment/
├── Assets/                      # Images, icons, favicons, and other static assets
├── includes/                    # Reusable HTML partials for each page section
├── js/                          # Front-end scripts (Bootstrap bundle, navbar/custom logic)
├── scss/                        # Bootstrap entry SCSS + custom styles, compiled CSS outputs
├── *.php                        # Page entry points that compose includes/* content
├── index.html                   # Standalone static homepage variant
├── package.json                 # Node dependency metadata (Bootstrap currently tracked)
└── README.md
```

## How pages are composed

Most PHP pages follow this pattern:

1. Include the shared header partial (`includes/SonnazGroup_Header.html`)
2. Include page-specific content partial (`includes/SonnazGroup_*.html`)
3. Include shared footer partial (`includes/SonnazGroup_Footer.html`)
4. Load JavaScript bundles (`js/bootstrap.min.js`, Popper/CDN Bootstrap where present)

This keeps shared layout in one place while preserving simple route-like PHP entry files.

## Local setup (bootstrap)

### Requirements

- PHP-capable local server (Apache, NGINX + PHP-FPM, MAMP, etc.)
- Node.js + npm (for frontend package management and Sass tooling)

### Install dependencies

```bash
npm install
```

> The repository already tracks `bootstrap` in `package.json`.

### Add Sass compiler (if not installed yet)

```bash
npm install --save-dev sass
```

## SCSS -> CSS workflow

The main stylesheet entry is:

- `scss/bootstrap.scss` (imports Bootstrap core + custom SCSS)

Compiled output consumed by pages:

- `scss/bootstrap.min.css`
- `scss/bootstrap.min.css.map`

### One-time compile

```bash
npx sass scss/bootstrap.scss scss/bootstrap.min.css --style=compressed --source-map
```

### Watch mode (auto-recompile on save)

```bash
npx sass --watch scss/bootstrap.scss:scss/bootstrap.min.css --style=compressed --source-map
```

### Optional npm scripts to add

If you want this as `npm` commands, add these scripts in `package.json`:

```json
{
  "scripts": {
    "sass:build": "sass scss/bootstrap.scss scss/bootstrap.min.css --style=compressed --source-map",
    "sass:watch": "sass --watch scss/bootstrap.scss:scss/bootstrap.min.css --style=compressed --source-map"
  }
}
```

Then run:

```bash
npm run sass:build
npm run sass:watch
```

## Development notes

- Core theme colors and Bootstrap overrides are set in `scss/bootstrap.scss`.
- Project-specific styles live in `scss/custom.scss`.
- Keep compiled CSS in sync after SCSS changes before deploying.
- `npm test` is currently a placeholder script and does not run automated tests yet.

## Deployment context

Sonnaz Group is hosted on an internal server stack using NGINX and containerized services. This repository provides the website content and frontend assets deployed in that environment.

## Option C deployment artifact flow (production)

This repository is the source-of-truth for website content. Production deploys are artifact-based:

1. Commit and push to `main`
2. GitHub Actions packages this repo as `dist/site-<sha>.tar.gz`
3. Workflow uploads artifact + checksum to server
4. Server deploy script unpacks to a versioned release folder
5. Server switches the `current` symlink to that release
6. Docker compose refreshes services and health-checks the site

This means production no longer relies on `git pull` inside a nested web repo on the server.

### Files added for this flow

- `.github/workflows/deploy-production-artifact.yml`  
  CI/CD pipeline that builds and deploys release artifacts.

- `scripts/create-release-artifact.sh`  
  Local/CI helper that packages the repo and generates a checksum file.

### Create an artifact locally (optional)

You can validate artifact creation before pushing:

```bash
bash scripts/create-release-artifact.sh
ls -lh dist/
```

Or use a custom release id:

```bash
bash scripts/create-release-artifact.sh my-test-release
```

## GitHub Actions secrets required

Add these in `SG-WebDevelopment` repository settings -> **Secrets and variables** -> **Actions**:

- `SSH_HOST`  
  Server hostname or IP.

- `SSH_USER`  
  Deploy user on server.

- `SSH_PRIVATE_KEY`  
  Private key matching a public key in `~/.ssh/authorized_keys` for `SSH_USER`.

- `SSH_PORT`  
  SSH port (usually `22`).

- `DEPLOY_SCRIPT_PATH`  
  Absolute path to server deploy script from nginx repo, example:  
  `/opt/sonnaz/Servers/nginx/scripts/deploy-artifact.sh`

- `RELEASES_ROOT`  
  Release root directory, example:  
  `/srv/sonnaz`

- `HEALTHCHECK_URL`  
  URL used to validate deploy success, example:  
  `https://sonnazgroup.com`

- `KEEP_RELEASES`  
  Number of old releases to retain, example:  
  `5`

## Required one-time server setup

The deploy script and release layout live in the `nginx` repository. Follow the nginx README "Option C" setup section to:

1. Pull nginx repo changes on server
2. Create `/srv/sonnaz/releases` and `/srv/sonnaz/current`
3. Point `nginx/data` symlink to `/srv/sonnaz/current`
4. Ensure deploy user can run docker compose
5. Verify deploy script path used by `DEPLOY_SCRIPT_PATH`

## Day-to-day release workflow

1. Make website changes in this repository (`SG-WebDevelopment`)
2. Validate locally (`docker compose` in nginx local stack)
3. Push to `main`
4. Watch workflow run
5. If it fails, inspect logs and server deploy script output

## Troubleshooting

- Workflow cannot SSH:
  - Check `SSH_HOST`, `SSH_PORT`, `SSH_USER`
  - Verify private key/public key pair
  - Confirm server firewall allows inbound SSH

- Upload step fails:
  - Ensure `/tmp/sonnaz-artifacts` is writable by `SSH_USER`
  - Confirm enough disk space on server

- Deploy script not found:
  - Verify `DEPLOY_SCRIPT_PATH` points to the server path where nginx repo was pulled
  - Confirm script is executable (`chmod +x`)

- Health check fails after switch:
  - Check nginx/php container logs
  - Validate `HEALTHCHECK_URL`
  - Confirm compose files and cert paths are valid
  - Roll back by repointing `current` to prior release (see nginx README)
