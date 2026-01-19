# Local Playwright Docker Runner

This folder hosts the shared Playwright runner image and Docker Compose services
used for local E2E and VRT testing.

The `scripts/docker-compose.sh` wrapper picks OS-specific overrides automatically.

The compose setup bind-mounts the repo and uses named volumes for `node_modules`
and `.pnpm-store` so container-built dependencies stay in Linux containers.

## Structure

- `docker/playwright/Dockerfile` - Base image with browsers baked in.
- `docker/docker-compose.yml` - Local services for component and app tests.
- `docker/docker-compose.linux.yml` - Linux-only overrides (host UID/GID).
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
