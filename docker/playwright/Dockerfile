FROM mcr.microsoft.com/playwright:v1.55.0-noble

# Set the working directory
WORKDIR /app

# Copy the repo into the image
COPY . .

# Make start-server.sh executable
RUN chmod +x scripts/start-server.sh

# Set up pnpm
RUN npm install -g pnpm
