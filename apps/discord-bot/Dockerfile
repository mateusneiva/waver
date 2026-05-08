FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app
RUN npm add -g turbo
COPY . .
RUN turbo prune --scope=discord-bot --docker

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN corepack enable
ENV YOUTUBE_DL_SKIP_PYTHON_CHECK=1
RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN pnpm dlx turbo run build --filter=discord-bot
 
FROM base AS runner
WORKDIR /app

RUN apk update && apk add --no-cache ffmpeg

# Don't run production as root
RUN addgroup --system --gid 1001 discordjs
RUN adduser --system --uid 1001 discordjs
USER discordjs
COPY --from=installer --chown=discordjs:discordjs /app . 

CMD node apps/discord-bot/dist/main.js