#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <image-ref> <staging|production>" >&2
  exit 64
fi

IMAGE_REF="$1"
DEPLOY_ENV="$2"
APP_ROOT="${APP_ROOT:-/srv/sonnaz}"
ENV_FILE="${APP_ROOT}/.env"
COMPOSE_FILE="${APP_ROOT}/compose.server.yml"

mkdir -p "${APP_ROOT}"
touch "${ENV_FILE}"

set_env_value() {
  local key="$1"
  local value="$2"

  if grep -q "^${key}=" "${ENV_FILE}"; then
    sed -i "s|^${key}=.*|${key}=${value}|" "${ENV_FILE}"
  else
    printf "%s=%s\n" "${key}" "${value}" >> "${ENV_FILE}"
  fi
}

case "${DEPLOY_ENV}" in
  staging)
    SERVICE_NAME="sonnaz-site-staging"
    set_env_value "STAGING_SITE_IMAGE" "${IMAGE_REF}"
    ;;
  production)
    SERVICE_NAME="sonnaz-site-prod"
    set_env_value "PROD_SITE_IMAGE" "${IMAGE_REF}"
    ;;
  *)
    echo "Unknown environment: ${DEPLOY_ENV}" >&2
    exit 64
    ;;
esac

cd "${APP_ROOT}"
docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" pull "${SERVICE_NAME}"
docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" up -d "${SERVICE_NAME}" caddy
docker image prune -f
