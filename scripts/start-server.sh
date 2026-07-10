#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Echo each command for easier debugging
set -x

# Go to the app directory
cd "$(dirname "$0")/../packages/app-nextjs"

# Build the app, unless it was already built upstream (e.g. by the build-apps CI job)
if [ "$SKIP_APP_BUILD" != "true" ]; then
	pnpm run build
fi

# Start the app
pnpm run start
