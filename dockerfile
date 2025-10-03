#FROM node:20-alpine
#WORKDIR /app
#COPY package*.json ./
#RUN npm install
#COPY . .
#EXPOSE 3000
#CMD ["npm","run" ,"dev"]
# docker run -p 3000:3000 -v "/$(pwd):/app" -v /app/node_modules next-img


# ------- 1. deps stage : installer node_modules -------
FROM node:22-alpine AS deps
# check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
RUN apk add --no-cache libc6-compat
WORKDIR /app
# copy ONLY lock files → docker layer cache hit if no version change
COPY package.json package-lock.json* ./
RUN npm ci --only=production && npm cache clean --force

# ------- 2. builder stage : build the app -------
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
# install ALL deps (incl. dev) for build
RUN npm ci && npm cache clean --force
COPY . .
# enable stand-alone output (smallest image)
ENV NEXT_OUTPUT_STANDALONE=true
RUN npm run build

# ------- 3. runner stage : production image -------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# copy stand-alone bundle
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# set correct ownership
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]