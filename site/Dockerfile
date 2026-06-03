# syntax=docker/dockerfile:1

FROM node:22-alpine AS build

WORKDIR /workspace/site
ARG PUBLIC_DEPLOY_ENV=local
ENV ASTRO_TELEMETRY_DISABLED=1
ENV PUBLIC_DEPLOY_ENV=${PUBLIC_DEPLOY_ENV}

COPY site/package*.json ./
RUN npm ci --audit=false --fund=false

COPY site/ ./
COPY Assets/ ../Assets/
RUN npm run build

FROM caddy:2-alpine AS runtime

COPY site/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /workspace/site/dist/ /srv/
