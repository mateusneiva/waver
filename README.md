# Waver Monorepo

Monorepo com duas aplicacoes:

- `apps/web`: site em Next.js.
- `apps/discord-bot`: bot de musica para Discord.

## Requisitos

- Node.js 20+
- pnpm 8+
- Docker + Docker Compose (opcional para deploy containerizado)

## Setup local

1. Instale dependencias:

```bash
pnpm install
```

2. Configure variaveis de ambiente:

```bash
cp apps/web/.env.example apps/web/.env
cp apps/discord-bot/.env.example apps/discord-bot/.env
```

3. Preencha os valores reais nos arquivos `.env`.

## Desenvolvimento

```bash
pnpm dev
```

## Checks de producao

```bash
pnpm lint
pnpm build
```

## Executar em producao (sem Docker)

Web:

```bash
pnpm --filter web build
pnpm --filter web start
```

Discord bot:

```bash
pnpm --filter discord-bot build
pnpm --filter discord-bot start
```

## Executar em producao (Docker Compose)

```bash
docker compose build
docker compose up -d
```

Para acompanhar logs:

```bash
docker compose logs -f web
docker compose logs -f discord-bot
```
