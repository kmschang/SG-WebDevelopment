#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
DIST_DIR="${REPO_ROOT}/dist"

if [[ $# -gt 0 ]]; then
  RELEASE_ID="$1"
else
  RELEASE_ID="$(git -C "${REPO_ROOT}" rev-parse --short HEAD 2>/dev/null || date +%Y%m%d%H%M%S)"
fi

ARTIFACT_NAME="site-${RELEASE_ID}.tar.gz"
ARTIFACT_PATH="${DIST_DIR}/${ARTIFACT_NAME}"
CHECKSUM_PATH="${ARTIFACT_PATH}.sha256"

mkdir -p "${DIST_DIR}"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "${TMP_DIR}"' EXIT

rsync -a --delete \
  --exclude='.git' \
  --exclude='.github' \
  --exclude='.idea' \
  --exclude='.DS_Store' \
  --exclude='node_modules' \
  --exclude='dist' \
  "${REPO_ROOT}/" "${TMP_DIR}/site/"

tar -czf "${ARTIFACT_PATH}" -C "${TMP_DIR}/site" .

if command -v sha256sum >/dev/null 2>&1; then
  (
    cd "${DIST_DIR}"
    sha256sum "${ARTIFACT_NAME}" > "${ARTIFACT_NAME}.sha256"
  )
else
  (
    cd "${DIST_DIR}"
    shasum -a 256 "${ARTIFACT_NAME}" > "${ARTIFACT_NAME}.sha256"
  )
fi

echo "Artifact: ${ARTIFACT_PATH}"
echo "Checksum: ${CHECKSUM_PATH}"
