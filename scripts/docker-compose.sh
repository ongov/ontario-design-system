#!/usr/bin/env bash

# What this script is:
# - A thin wrapper around `docker compose` for this repository.
#
# What it does:
# - Always uses the repo-local compose file.
# - On Linux, passes host UID/GID (`PUID`/`PGID`) so mounted files are writable.
# - For `docker compose run`, captures Playwright CLI args and forwards them
#   through `PLAYWRIGHT_ARGS_B64` to avoid quoting and spacing issues.
#
# Why we use it:
# - Keeps local commands and CI-like container execution consistent.
# - Prevents permission friction with bind mounts.
# - Makes Playwright argument forwarding predictable from package scripts.

set -euo pipefail

# Resolve repo root from this script location so calls work from any cwd.
root_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
compose_files=("$root_dir/docker/docker-compose.yml")

case "$(uname -s)" in
  Linux*)
    # Forward host UID/GID for bind mounts; entrypoint uses these to fix ownership.
    export PUID="${PUID:-$(id -u)}"
    export PGID="${PGID:-$(id -g)}"
    ;;
  *)
    # Non-Linux hosts (for example Docker Desktop) do not need explicit UID/GID mapping.
    ;;
esac

compose_args=()
for file in "${compose_files[@]}"; do
  compose_args+=("-f" "$file")
done

cmd_args=("$@")
playwright_args=()
is_run=false

# Optional knob for build output style (plain/tty/auto) when the command is `build`.
if [[ -n "${ODS_DOCKER_COMPOSE_PROGRESS:-}" ]]; then
  for i in "${!cmd_args[@]}"; do
    if [[ "${cmd_args[$i]}" == "build" ]]; then
      cmd_args=(
        "${cmd_args[@]:0:$((i + 1))}"
        "--progress=${ODS_DOCKER_COMPOSE_PROGRESS}"
        "${cmd_args[@]:$((i + 1))}"
      )
      break
    fi
  done
fi

# Determine whether this invocation targets a runnable service.
# We only parse/strip Playwright args when "run" is present to avoid
# changing behavior for build/config/etc.
for arg in "${cmd_args[@]}"; do
  if [[ "$arg" == "run" ]]; then
    is_run=true
    break
  fi
done

if [[ "$is_run" == true ]]; then
  # First, look for an explicit delimiter to avoid ambiguity.
  # Example: ./scripts/docker-compose.sh run --rm app-e2e-runner --playwright-args --grep=accordion
  for i in "${!cmd_args[@]}"; do
    if [[ "${cmd_args[$i]}" == "--playwright-args" ]]; then
      playwright_args=("${cmd_args[@]:$((i + 1))}")
      cmd_args=("${cmd_args[@]:0:$i}")
      break
    fi
  done

  if [[ "${#playwright_args[@]}" -eq 0 ]]; then
    # Fall back to the conventional "--" separator for args intended for Playwright.
    # Example: ./scripts/docker-compose.sh run --rm app-e2e-runner -- --grep=accordion
    for i in "${!cmd_args[@]}"; do
      if [[ "${cmd_args[$i]}" == "--" ]]; then
        playwright_args=("${cmd_args[@]:$((i + 1))}")
        cmd_args=("${cmd_args[@]:0:$i}")
        break
      fi
    done
  fi

  if [[ "${#playwright_args[@]}" -gt 0 ]]; then
    # Normalise accidental duplicate separator usage (`-- --grep=...`).
    if [[ "${playwright_args[0]}" == "--" ]]; then
      playwright_args=("${playwright_args[@]:1}")
    fi
    # Encode args so we can reconstruct them inside the container without
    # losing spaces or quoting.
    playwright_args_b64="$(printf '%s\0' "${playwright_args[@]}" | base64 | tr -d '\n')"
    for i in "${!cmd_args[@]}"; do
      if [[ "${cmd_args[$i]}" == "run" ]]; then
        # Inject PLAYWRIGHT_ARGS_B64 immediately after the "run" subcommand.
        # This keeps docker compose parsing stable while forwarding args.
        cmd_args=(
          "${cmd_args[@]:0:$((i + 1))}"
          "-e"
          "PLAYWRIGHT_ARGS_B64=${playwright_args_b64}"
          "${cmd_args[@]:$((i + 1))}"
        )
        break
      fi
    done
  fi
fi

# Replace current shell process so exit code/signals come directly from docker compose.
exec docker compose "${compose_args[@]}" "${cmd_args[@]}"
