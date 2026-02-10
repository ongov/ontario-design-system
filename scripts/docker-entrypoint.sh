#!/usr/bin/env sh

# What this script is:
# - The container entrypoint used by local Docker Playwright services.
#
# What it does:
# - Reads `PUID`/`PGID` from the environment.
# - Aligns container user/group IDs with the host when requested.
# - Ensures shared dependency paths (`node_modules`, `.pnpm-store`) exist and
#   are owned by the requested UID/GID.
# - Drops privileges and runs the requested command as a non-root user.
#
# Why we use it:
# - Avoids permission conflicts on bind-mounted workspace files.
# - Lets repeated container runs reuse dependency volumes safely.
# - Mirrors CI's non-root execution model for more reliable local parity.

set -e

PUID="${PUID:-}"
PGID="${PGID:-}"

# Run commands as a specific user, preferring runuser when available.
# Fallback to su for base images/environments that do not provide runuser.
run_as_user() {
  user="$1"
  shift
  if command -v runuser >/dev/null 2>&1; then
    exec runuser -u "$user" -- "$@"
  fi

  cmd="$(printf '%q ' "$@")"
  exec su -s /bin/sh "$user" -c "$cmd"
}

if [ -z "$PUID" ] || [ -z "$PGID" ]; then
  # No host mapping requested; run as the default non-root Playwright user.
  run_as_user pwuser "$@"
fi

target_user="pwuser"

if [ "$PUID" != "0" ]; then
  # Align pwuser (or an existing user) with host UID/GID for bind-mounted permissions.
  if ! getent group "$PGID" >/dev/null 2>&1; then
    # Create the target group only when it does not already exist.
    groupadd -g "$PGID" appgroup
  fi

  # Reuse an existing account if this UID already belongs to another user.
  # This avoids creating duplicate UID mappings inside the container.
  existing_user="$(getent passwd "$PUID" | cut -d: -f1 || true)"
  if [ -n "$existing_user" ] && [ "$existing_user" != "pwuser" ]; then
    target_user="$existing_user"
  else
    if id pwuser >/dev/null 2>&1; then
      current_uid="$(id -u pwuser)"
      current_gid="$(id -g pwuser)"
      if [ "$current_uid" != "$PUID" ] || [ "$current_gid" != "$PGID" ]; then
        # Mutate the built-in pwuser to match host ownership expectations.
        usermod -u "$PUID" -g "$PGID" pwuser
      fi
    else
      # Defensive path: create pwuser if base image does not already include it.
      useradd -u "$PUID" -g "$PGID" -m -s /bin/sh pwuser
    fi
  fi
fi

node_modules_paths="
/app/node_modules
/app/.pnpm-store
/app/packages/app-angular/node_modules
/app/packages/app-nextjs/node_modules
/app/packages/app-react/node_modules
/app/packages/app-web-components-documentation/node_modules
/app/packages/ontario-design-system-component-library/node_modules
/app/packages/ontario-design-system-component-library-angular/node_modules
/app/packages/ontario-design-system-component-library-react/node_modules
/app/packages/ontario-design-system-complete-styles/node_modules
/app/packages/ontario-design-system-design-tokens/node_modules
/app/packages/ontario-design-system-global-styles/node_modules
"

# Ensure node_modules and pnpm store paths exist and are writable.
for path in $node_modules_paths; do
  mkdir -p "$path"
done

# Chown once after directory creation so subsequent installs write as mapped UID/GID.
chown -R "$PUID:$PGID" $node_modules_paths

if [ "$PUID" = "0" ]; then
  # Root requested explicitly; run command directly without dropping privileges.
  exec "$@"
fi

# Drop privileges to the adjusted user for the requested command.
run_as_user "$target_user" "$@"
