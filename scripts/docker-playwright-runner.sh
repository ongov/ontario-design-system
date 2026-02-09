#!/usr/bin/env sh

set -e
set -x

if [ -n "${PLAYWRIGHT_ARGS_B64:-}" ]; then
  printf '%s' "$PLAYWRIGHT_ARGS_B64" | base64 -d | xargs -0 -- "$@"
else
  exec "$@"
fi
