# Vitalog

A self-hosted personal health ledger with a dashboard, REST API and MCP. Store nutrition, activity, measurements, lab results and attachments in your own PostgreSQL database. Log observations and manage goals through REST or MCP; use the dashboard to review them.

[Documentation](https://www.vitalog.dev) · [Quickstart](https://www.vitalog.dev/quickstart) · [MCP setup](https://www.vitalog.dev/mcp-guide)

## Run locally

Install Docker with Compose, then:

```sh
cp .env.example .env
```

Set `AUTH_KEY` to a secret generated from at least 32 random bytes, choose `POSTGRES_PASSWORD`, and set `ROOT_EMAIL` and `ROOT_PASSWORD` for sign-in. Use a root password of at least 15 characters, different from `AUTH_KEY`.

```sh
docker compose up --build -d --wait
```

Open [the dashboard](http://127.0.0.1:3001/login). The API listens on loopback port 3000. See [Installation](https://www.vitalog.dev/installation) for production setup and [Container releases](https://www.vitalog.dev/releases) for published images.

## Documentation

- [Configuration](https://www.vitalog.dev/configuration) and [operations](https://www.vitalog.dev/operations)
- [Record contracts](https://www.vitalog.dev/records), [goals](https://www.vitalog.dev/goals) and [attachments](https://www.vitalog.dev/attachments)
- [API keys](https://www.vitalog.dev/api-keys) and [MCP OAuth](https://www.vitalog.dev/oauth)
- [OpenAPI](contracts/openapi.json) and [Postman collection](postman/Vitalog.postman_collection.json)

## Development

Use Node.js 24.16 and npm 11.13. With PostgreSQL running and `DATABASE_URL` set in `.env`:

```sh
npm ci
npm run db:migrate
npm run dev
```

Run `npm run dev:web` in a second terminal. `npm run verify` checks the application; `npm run docs:site:check` validates the docs.
