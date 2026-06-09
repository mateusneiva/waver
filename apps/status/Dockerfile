FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat

WORKDIR /app
RUN npm add -g turbo
COPY . .
RUN turbo prune --scope=status --docker

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN pnpm dlx turbo run build --filter=status
 
FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 status
RUN adduser --system --uid 1001 status
USER status
COPY --from=installer --chown=status:status /app . 

CMD ["node", "apps/status/dist/index.js"]