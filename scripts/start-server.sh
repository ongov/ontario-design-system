#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Echo each command for easier debugging
set -x

# Go to the app directory
cd "$(dirname "$0")/../packages/app-nextjs"

# Build and start the app
pnpm run build
pnpm run start