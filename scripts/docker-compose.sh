#!/usr/bin/env bash

set -euo pipefail

root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
compose_files=("$root_dir/docker/docker-compose.yml")

case "$(uname -s)" in
  Linux*)
    export PUID="${PUID:-$(id -u)}"
    export PGID="${PGID:-$(id -g)}"
    ;;
  *)
    ;;
esac

args=()
for file in "${compose_files[@]}"; do
  args+=("-f" "$file")
done

exec docker compose "${args[@]}" "$@"
