# Use the official Bun image (version 1)
FROM oven/bun:1

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy the rest of your source code
COPY . .

# Generate Prisma client
RUN bunx prisma generate

# Expose the port your app uses (e.g., 3000)
EXPOSE 3000

# Start the app in development mode
CMD [ "bun", "run", "dev" ]
