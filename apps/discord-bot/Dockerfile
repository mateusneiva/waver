FROM node:22-bookworm-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app
RUN npm add -g turbo
COPY . .
RUN turbo prune --scope=discord-bot --docker

FROM base AS installer
RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ && rm -rf /var/lib/apt/lists/*
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN corepack enable
ENV YOUTUBE_DL_SKIP_PYTHON_CHECK=1
RUN pnpm install --frozen-lockfile
RUN pnpm add mediaplex --filter discord-bot

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN pnpm dlx turbo run build --filter=discord-bot

FROM base AS runner
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends ffmpeg && rm -rf /var/lib/apt/lists/*

RUN groupadd --system --gid 1001 discordjs
RUN useradd --system --uid 1001 --gid discordjs discordjs
USER discordjs
COPY --from=installer --chown=discordjs:discordjs /app .

CMD node apps/discord-bot/dist/main.js