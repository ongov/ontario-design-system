#!/usr/bin/env bash
#
# What this script is:
# - The dev container's postCreateCommand, run once after the container is
#   created (and the workspace is mounted) but before you start coding.
#
# What it does:
# - Installs the exact Node.js version pinned in this repo's ".nvmrc" using
#   nvm (provided by the "node" dev container feature) and makes it the
#   default for future shells.
# - Enables corepack and activates the exact pnpm version pinned in this
#   repo's package.json "packageManager" field.
# - Installs workspace dependencies with pnpm.
# - Installs Playwright's browsers (and their OS-level dependencies via
#   --with-deps, which needs the "vscode" user's passwordless sudo) using the
#   exact Playwright version already pinned in the component library's
#   package.json, so e2e/vrt tests can run natively in this container.
#
# Why we use it:
# - Keeps ".nvmrc" and package.json as the single source of truth for
#   tool versions, instead of duplicating version numbers in
#   devcontainer.json.
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/.."

# Docker creates named-volume mount points as root:root when they don't
# already exist inside the image/bind mount, even when the parent directory
# is owned by a non-root user. That leaves node_modules, the pnpm store, and
# the Playwright cache unwritable by "vscode" on a fresh volume. Reclaim them
# once here (cheap/idempotent on subsequent runs since ownership persists in
# the volume after the first fix).
sudo mkdir -p node_modules .pnpm-store /home/vscode/.cache/ms-playwright
sudo chown -R "$(id -u):$(id -g)" node_modules .pnpm-store /home/vscode/.cache

# postCreateCommand runs as a non-interactive, non-login shell, so nvm must be
# sourced manually before it can be used (see the "node" feature's docs).
# shellcheck disable=SC1091
. "$NVM_DIR/nvm.sh"

NODE_VERSION="$(cat .nvmrc)"
echo "Installing Node.js ${NODE_VERSION} (from .nvmrc)..."
nvm install "$NODE_VERSION"
nvm alias default "$NODE_VERSION"

echo "Enabling corepack and activating pnpm (from package.json 'packageManager')..."
corepack enable
PNPM_VERSION="$(node -p "require('./package.json').packageManager.split('@')[1]")"
corepack prepare "pnpm@${PNPM_VERSION}" --activate

echo "Installing workspace dependencies..."
pnpm install

echo "Installing Playwright browsers and OS dependencies..."
pnpm --filter @ongov/ontario-design-system-component-library exec playwright install --with-deps

echo "Dev container setup complete."
