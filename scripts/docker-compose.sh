#!/usr/bin/env bash

set -euo pipefail

root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
compose_files=("$root_dir/docker/docker-compose.yml")

case "$(uname -s)" in
  Linux*)
    compose_files+=("$root_dir/docker/docker-compose.linux.yml")
    export UID="${UID:-$(id -u)}"
    export GID="${GID:-$(id -g)}"
    ;;
  Darwin*)
    ;;
  *)
    ;;
esac

args=()
for file in "${compose_files[@]}"; do
  args+=("-f" "$file")
done

exec docker compose "${args[@]}" "$@"
