# V2 Release Workflow

The v2 website is the active implementation on this branch. The legacy PHP site was removed from the branch after the useful content was moved into Astro data and components.

## Branch flow

```text
feature/* -> develop -> main
```

- `feature/*`: local work and pull request checks.
- `develop`: staging/UAT branch.
- `main`: production branch.

The intended deploy flow is:

```text
feature branch
  npm run build
  docker compose build

PR to develop
  GitHub Actions checks Astro and builds the Docker image

merge to develop
  image is pushed to GHCR
  staging deploy can run when enabled

PR from develop to main
  final review before production

merge to main
  image is pushed to GHCR
  production deploy can run when enabled
```

## Local commands

From the repo root:

```bash
cd site
npm install
npm run dev
npm run build
```

For the local Docker image:

```bash
docker compose build
docker compose up
```

The local Docker site is served at:

```text
http://localhost:8081
```

Docker Desktop or another local Docker daemon must be running before Docker commands will work.

## GitHub Actions

The v2 workflow lives at:

```text
.github/workflows/v2-site.yml
```

It currently:

- checks Astro/TypeScript builds on PRs to `develop` and `main`
- builds and pushes a Docker image on pushes to `develop` and `main`
- leaves droplet deployment disabled until the server-side deploy script is ready

Deployment is guarded by this repository variable:

```text
V2_DEPLOY_ENABLED=true
```

When enabled, the workflow expects:

```text
SSH_HOST
SSH_PORT
SSH_USER
SSH_PRIVATE_KEY
V2_DEPLOY_SCRIPT_PATH
```

The deploy script will receive:

```text
<image-ref> <environment>
```

Example:

```text
ghcr.io/kmschang/sonnazgroup-site:<sha> staging
```

## Server shape

The example Caddy/Docker Compose server files are in `deploy/`:

```text
deploy/Caddyfile.example
deploy/compose.server.example.yml
```

The intended server layout is:

```text
public Caddy
  sonnazgroup.com -> production site container
  staging.sonnazgroup.com -> staging site container with basic auth

site containers
  immutable images from GHCR
```
