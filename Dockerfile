#Stage 1: Install dependencies and build the app
FROM node:20-alpine AS builder

#Set the working directory in the container
WORKDIR /app

#Copy the package.json and package-lock.json files
COPY package*.json ./

#Install dependencies
RUN npm install

#Copy the rest of the application code
COPY . .

#Build the application
RUN npm run build

#Stage 2: Create a small image for production
FROM node:20-alpine AS runner

#Set environment variables
ENV NODE_ENV=production

#Set the working directory in the container
WORKDIR /app

#Copy the necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/build ./build
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/public ./public
COPY --from=builder /app/next ./next
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/next-env.d.ts ./next-env.d.ts
COPY --from=builder /app/postcss.config.mjs ./postcss.config.mjs
COPY --from=builder /app/tailwind.config.ts ./tailwind.config.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json

#Expose the port the app runs on
EXPOSE 3000

#Start the application
CMD ["node", "build/server.js"]


