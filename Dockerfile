# Use the official Bun image (version 1)
FROM oven/bun:1

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy the rest of your source code
COPY . .

# Build the application (if you have a build script; remove if not needed)
RUN bun run build

# Expose the port your app uses (e.g., 3000)
EXPOSE 3000

# Start the app (adjust the command if your start script has a different name)
CMD [ "bun", "run", "dev" ]
