# Local Playwright Docker Runner

This folder hosts the shared Playwright runner image and Docker Compose services
used for local E2E and VRT testing.

## Structure

- `docker/playwright/Dockerfile` - Base image with browsers baked in.
- `docker/docker-compose.yml` - Local services for component and app tests.
- `docker/.dockerignore` - Build ignore list (symlinked at repo root).

## Common Commands

Build the Playwright runner image:

```bash
docker compose -f docker/docker-compose.yml build app-vrt-runner
```

Run component library E2E tests:

```bash
docker compose -f docker/docker-compose.yml run --rm stencil-e2e-runner
```

Run Next.js E2E tests:

```bash
docker compose -f docker/docker-compose.yml run --rm app-e2e-runner
```

Run Next.js VRT tests:

```bash
docker compose -f docker/docker-compose.yml run --rm app-vrt-runner
```

Package scripts are also available:

```bash
pnpm --filter @ongov/ontario-design-system-component-library run test:e2e:docker
pnpm --filter app-nextjs run test:e2e:docker
pnpm --filter app-nextjs run test:vrt:docker
```
