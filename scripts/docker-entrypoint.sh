#!/usr/bin/env sh

set -e

PUID="${PUID:-}"
PGID="${PGID:-}"

# If no UID/GID provided, skip ownership fixes and just run as pwuser.
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
  run_as_user pwuser "$@"
fi

target_user="pwuser"

if [ "$PUID" != "0" ]; then
  # Align pwuser (or an existing user) with host UID/GID for bind-mounted permissions.
  if ! getent group "$PGID" >/dev/null 2>&1; then
    groupadd -g "$PGID" appgroup
  fi

  existing_user="$(getent passwd "$PUID" | cut -d: -f1 || true)"
  if [ -n "$existing_user" ] && [ "$existing_user" != "pwuser" ]; then
    target_user="$existing_user"
  else
    if id pwuser >/dev/null 2>&1; then
      current_uid="$(id -u pwuser)"
      current_gid="$(id -g pwuser)"
      if [ "$current_uid" != "$PUID" ] || [ "$current_gid" != "$PGID" ]; then
        usermod -u "$PUID" -g "$PGID" pwuser
      fi
    else
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

chown -R "$PUID:$PGID" $node_modules_paths

if [ "$PUID" = "0" ]; then
  exec "$@"
fi

# Drop privileges to the adjusted user for the requested command.
run_as_user "$target_user" "$@"
