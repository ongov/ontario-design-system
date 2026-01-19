# Local Playwright Docker Runner

This folder hosts the shared Playwright runner image and Docker Compose services
used for local E2E and VRT testing.

The `scripts/docker-compose.sh` wrapper runs Docker Compose with the repo-local
file.

The compose setup bind-mounts the repo. It uses an entrypoint that aligns
container UID/GID with your host (`PUID`/`PGID`) and fixes ownership of
`node_modules`/`.pnpm-store` before dropping privileges.

## Structure

- `docker/playwright/Dockerfile` - Base image with browsers baked in.
- `docker/docker-compose.yml` - Local services for component and app tests.
- `docker/.dockerignore` - Build ignore list (symlinked at repo root).

## Common Commands

Build the Playwright runner image:

```bash
./scripts/docker-compose.sh build app-vrt-runner
```

Run component library E2E tests:

```bash
./scripts/docker-compose.sh run --rm stencil-e2e-runner
```

Run Next.js E2E tests:

```bash
./scripts/docker-compose.sh run --rm app-e2e-runner
```

Run Next.js VRT tests:

```bash
./scripts/docker-compose.sh run --rm app-vrt-runner
```

Package scripts are also available:

```bash
pnpm --filter @ongov/ontario-design-system-component-library run test:e2e:docker
pnpm --filter app-nextjs run test:e2e:docker
pnpm --filter app-nextjs run test:vrt:docker
```

## Cleaning Volumes

Remove all unused volumes:

```bash
docker volume prune
```

Remove the volumes created by this setup:

```bash
docker volume rm \
  node_modules_root pnpm_store \
  node_modules_app_angular node_modules_app_nextjs node_modules_app_react \
  node_modules_app_web_components_documentation \
  node_modules_component_library node_modules_component_library_angular node_modules_component_library_react \
  node_modules_complete_styles node_modules_design_tokens node_modules_global_styles
```
