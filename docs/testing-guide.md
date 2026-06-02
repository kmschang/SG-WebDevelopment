# Testing Guide

Use this file when you want the shortest path to "where do I test this and what should happen?"

## Quick Environment Map

| Environment | URL | What it tests | Access |
| --- | --- | --- | --- |
| Local Astro | `http://localhost:4321` | Fast local development with hot reload | No login |
| Local Docker | `http://localhost:8080` | The production-style container on your machine | No login |
| Staging/UAT | `https://staging.sonnazgroup.com/` | Real DNS, TLS, Caddy, Docker, and the `develop` image | Basic auth |
| Production | `https://sonnazgroup.com/` | Public website using the `main` image | Public |

## Staging Login

Current staging/UAT access:

```text
URL: https://staging.sonnazgroup.com/
Username: uat-user
Password: testing1212
```

This is a shared staging-only password, not a production secret. If the repo becomes public, the password gets shared too widely, or staging needs to be locked down harder, rotate it.

To rotate the password on the server:

```bash
docker run --rm caddy:2-alpine caddy hash-password --plaintext "NEW_PASSWORD"
```

Then update the `basicauth` hash in:

```text
/srv/sonnaz/Caddyfile
```

Reload Caddy:

```bash
cd /srv/sonnaz
docker compose --env-file .env -f compose.server.yml restart caddy
```

## Local Astro

Use this while editing the site. It is the fastest loop.

From the repo root:

```bash
cd site
npm install
npm run dev
```

Open:

```text
http://localhost:4321
```

Stop it with `Control+C` in the terminal.

Run a full local build check:

```bash
cd site
npm run build
```

That command:

1. rebuilds press kit zip files
2. runs Astro and TypeScript checks
3. builds the static site

## Local Docker

Use this when you want to test the container that is closer to the server setup.

From the repo root:

```bash
docker compose build
docker compose up -d
```

Open:

```text
http://localhost:8080
```

Useful commands:

```bash
docker compose ps
docker compose logs --tail 80
docker compose down
```

If Docker says it cannot connect to the Docker API, start Docker Desktop and try again.

## Staging Build Marker

The `develop` image builds with:

```text
PUBLIC_DEPLOY_ENV=staging
```

That adds a subtle red viewport outline and a `Staging` pill in the bottom-right corner. It does not take up layout space and does not block clicks.

Production builds do not show this marker.

## Normal Release Workflow

Use this for ordinary changes:

```text
feature branch -> develop -> main
```

### 1. Work Locally

Create or use a feature branch:

```bash
git checkout develop
git pull
git checkout -b feature/my-change
```

Make changes, then test:

```bash
cd site
npm run build
```

Optional container check:

```bash
cd ..
docker compose build
docker compose up -d
```

### 2. PR Into Develop

Push the feature branch and open a PR:

```text
feature/my-change -> develop
```

GitHub Actions runs `Site CI/CD` and checks the build.

On PRs, only the check job runs. The image and deploy jobs are expected to skip.

### 3. Merge To Develop

After the PR passes, merge it into `develop`.

On push to `develop`, GitHub Actions should run:

```text
check -> image -> deploy
```

The deployed staging image uses the `develop` branch image.

Test:

```text
https://staging.sonnazgroup.com/
```

With:

```text
uat-user / testing1212
```

Command-line smoke test:

```bash
curl -I -u 'uat-user:testing1212' https://staging.sonnazgroup.com/
```

Good result:

```text
HTTP/2 200
```

### 4. PR Develop Into Main

When staging looks good, open a PR:

```text
develop -> main
```

Merge it after the check passes.

On push to `main`, GitHub Actions should run:

```text
check -> image -> deploy
```

The production image uses the `main` branch image.

Test:

```bash
curl -I https://sonnazgroup.com/
curl -I https://www.sonnazgroup.com/
```

Good result:

```text
HTTP/2 200
```

## Manual Workflow Rerun

If GitHub skipped deploy because a variable was missing, fix the variable first:

```text
Repo -> Settings -> Secrets and variables -> Actions -> Variables
Name: V2_DEPLOY_ENABLED
Value: true
```

Then rerun:

```text
Repo -> Actions -> Site CI/CD -> latest run -> Re-run all jobs
```

If the skipped job cannot be rerun, use:

```text
Repo -> Actions -> Site CI/CD -> Run workflow
```

Choose:

```text
develop for staging
main for production
```

## Server Checks

Run these on the droplet if staging or production does not look right:

```bash
cd /srv/sonnaz
docker compose --env-file .env -f compose.server.yml ps
docker compose --env-file .env -f compose.server.yml logs --tail=100 caddy
```

Check ports:

```bash
ss -ltnp | grep ':80\|:443'
```

Caddy/Docker should own both ports.

Check DNS:

```bash
dig +short staging.sonnazgroup.com
dig +short sonnazgroup.com
```

Both should return the droplet IP.

Bypass DNS from the command line:

```bash
curl -I --resolve staging.sonnazgroup.com:443:162.243.97.82 -u 'uat-user:testing1212' https://staging.sonnazgroup.com/
```

That is useful when the server works but a Wi-Fi network or device still has stale DNS.

## Common "Is This Normal?" Notes

- PRs run checks only. Image and deploy jobs skip on PRs.
- Pushes to `develop` build and deploy staging when `V2_DEPLOY_ENABLED=true`.
- Pushes to `main` build and deploy production when `V2_DEPLOY_ENABLED=true`.
- If staging returns `HTTP/2 401`, that means basic auth is working.
- If staging returns `HTTP/2 200` with `-u 'uat-user:testing1212'`, the site is working.
- If DNS works on cellular but not Wi-Fi, the Wi-Fi DNS cache probably has not caught up yet.
- Do not change branches on the server for normal deploys. The server should pull Docker images from GHCR.
