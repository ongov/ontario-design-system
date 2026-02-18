#!/usr/bin/env sh

# What this script is:
# - A small command runner used inside Playwright test containers.
#
# What it does:
# - Decodes `PLAYWRIGHT_ARGS_B64` (null-delimited) when present.
# - Appends decoded args to the base test command and executes it.
# - Falls back to running the base command unchanged when no extra args exist.
#
# Why we use it:
# - Preserves exact Playwright args from the host CLI, including spaces.
# - Keeps argument handling simple in Compose and package scripts.

set -e
set -x

if [ -n "${PLAYWRIGHT_ARGS_B64:-}" ]; then
  printf '%s' "$PLAYWRIGHT_ARGS_B64" | base64 -d | xargs -0 -- "$@"
else
  exec "$@"
fi
