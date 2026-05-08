# Stage 1: dependencies
FROM node:20-alpine AS dependencies
WORKDIR /app

# Copy packages files and install dependencies
COPY package.json package-lock.json* ./

RUN npm ci



# Stage 2: builder 
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependencies install output from the dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy source code
COPY . .

# generate Prisma client
# RUN npx prisma generate
RUN npm run prisma:generate 

# Build typscript
RUN npm run build

# Stage 3: runner : production image
FROM node:20-alpine AS runner
WORKDIR /app

# Create a non-root user for security and restricted privileges 
RUN addgroup --system --gid 1002 nodejs
RUN adduser --system --uid 1002 expressjs


# Copy the build output
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY package.json ./

# Switch to non-root user
USER expressjs


# Cloud Run sets the PORT environment variable
ENV NODE_ENV=production
EXPOSE 3000
ENV PORT=3000

#rest environment in .env.development

#Start the application
CMD ["node", "dist/src/server.js"]


# build
# docker build -t tourid_backend_images .

# run container
# docker run --name tourid-be-container -p 3000:3000 --env-file .env.development tourid_backend_images
