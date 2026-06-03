# syntax=docker/dockerfile:1

FROM node:22-alpine AS build

WORKDIR /workspace/site
ARG PUBLIC_DEPLOY_ENV=local
ENV ASTRO_TELEMETRY_DISABLED=1
ENV PUBLIC_DEPLOY_ENV=${PUBLIC_DEPLOY_ENV}

COPY site/package*.json ./
# Cache npm downloads and node_modules between builds (BuildKit cache mounts)
RUN --mount=type=cache,id=npm,target=/root/.npm \
	--mount=type=cache,id=node-modules,target=/workspace/site/node_modules \
	NODE_ENV=development npm ci --prefer-offline --no-audit --no-fund

COPY site/ ./
COPY Assets/ ../Assets/
# Cache build artifacts, tool caches, and node_modules to speed subsequent builds
RUN --mount=type=cache,id=build-cache,target=/workspace/site/.cache \
	--mount=type=cache,id=imagemin,target=/root/.cache \
	--mount=type=cache,id=sharp-cache,target=/root/.cache/sharp \
	--mount=type=cache,id=node-modules,target=/workspace/site/node_modules \
	npm run build

FROM caddy:2-alpine AS runtime

COPY site/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /workspace/site/dist/ /srv/
