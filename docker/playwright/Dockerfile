FROM mcr.microsoft.com/playwright:v1.62.0-noble

# The Playwright base image ships an older Node.js. Overwrite it with the version
# declared in .nvmrc so the container stays in sync with the rest of the project.
COPY .nvmrc .nvmrc
RUN NODE_VERSION=$(cat .nvmrc) && \
    ARCH=$(uname -m) && \
    case "$ARCH" in \
      aarch64) NODE_ARCH="linux-arm64" ;; \
      *) NODE_ARCH="linux-x64" ;; \
    esac && \
    curl -fsSL "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-${NODE_ARCH}.tar.gz" \
    | tar -xz -C /usr/local --strip-components=1 && \
    rm .nvmrc

# Set the working directory
WORKDIR /app

# Set up pnpm
RUN npm install -g pnpm
