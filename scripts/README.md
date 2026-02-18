# Ontario Design System Scripts

This folder serves as a collection of project-wide scripts that provide shared functionality and utilities used throughout the application. By centralizing these scripts, the project ensures consistency, reusability, and easier maintenance across different components and features.

## Docker test runner scripts

These scripts work together to run local Playwright tests in Docker with stable
permissions and reliable argument forwarding.

### `docker-compose.sh`

Wrapper around `docker compose` for this repository.

- Always uses `docker/docker-compose.yml`.
- On Linux, exports host `PUID`/`PGID` for bind-mounted file permissions.
- For `docker compose run`, extracts Playwright arguments and passes them
  through `PLAYWRIGHT_ARGS_B64`.

Why:

- Keeps local commands aligned with the repository setup.
- Avoids permission issues in mounted workspace paths.
- Preserves Playwright arguments with spaces/quotes across shell boundaries.

### `docker-entrypoint.sh`

Entrypoint script used by local Docker Playwright services.

- Reads `PUID`/`PGID` and aligns container user/group IDs with the host.
- Ensures shared dependency paths exist (`node_modules`, `.pnpm-store`).
- Applies ownership and runs the command as a non-root user where possible.

Why:

- Prevents bind-mount ownership conflicts.
- Supports repeatable local runs with shared dependency volumes.
- Mirrors CI-style non-root execution more closely.

### `docker-playwright-runner.sh`

Container-side command runner for Playwright services.

- Decodes `PLAYWRIGHT_ARGS_B64` (null-delimited argument list).
- Appends decoded arguments to the base command.
- Executes the base command unchanged when no forwarded args are provided.

Why:

- Preserves exact Playwright CLI arguments from host to container.
- Keeps argument parsing simple and predictable.

### Docker flow summary

1. Host command runs via `./scripts/docker-compose.sh`.
2. Script captures Playwright arguments and encodes them into `PLAYWRIGHT_ARGS_B64`.
3. `docker compose run` injects `PLAYWRIGHT_ARGS_B64` into the service container.
4. `docker-entrypoint.sh` prepares permissions and launches the requested command.
5. `docker-playwright-runner.sh` decodes arguments and executes Playwright.

## `start-server.sh`

Helper script to build and start the Next.js app from a known working directory.

- Changes directory to `packages/app-nextjs`.
- Runs `pnpm run build`.
- Runs `pnpm run start`.
- Uses `set -e` and `set -x` for fail-fast behaviour and command tracing.

Why:

- Provides a simple, repeatable local start flow for the app.
- Reduces directory/context mistakes when launching production-mode server runs.

## `documentation-helper.ts`

A utility script for processing documentation files in Ontario Design System repositories.

### Features

- Prepend front matter or arbitrary text to a single file (see `--prepend` option)
- Batch process files using a YAML mapping file, prepending front matter and copying to a destination directory

### Usage

#### Single File Mode

Prepend text (e.g., front matter) to a single file:

```
ts-node documentation-helper.ts -f <file> -p "---\ntitle: My Title\n---" -df <destinationFile>
```

- `-f, --file <string>`: File to process
- `-p, --prepend <string>`: Text to prepend
- `-df, --destinationFile <string>`: (Optional) Destination file to write to

#### Batch Mode

Copy all files from an input directory to an output directory, prepending front matter from a YAML mapping file where specified:

```
ts-node documentation-helper.ts -i <inputDir> -o <destinationDir> [-m <mappingFile>]
```

- `-i, --inputDir <string>`: Input directory containing files to process
- `-o, --destinationDir <string>`: Output directory for processed files
- `-m, --mappingFile <string>`: (Optional) YAML mapping file (default: `docs-metadata.yaml`)

##### Example Mapping File (`docs-metadata.yaml`)

```yaml
files:
  framework-integrations/next-js-ssr/readme.md:
    frontmatter: |
      ---
      title: Next.js Server-Side Rendering (SSR)
      ---
  another-section/readme.md:
    frontmatter: |
      ---
      title: Another Section
      ---
```

### Notes

- Only one mode (single file or batch) can be used at a time.
- The script enforces mutually exclusive modes and provides clear error/help output.
- Run with `--help` for all options.
