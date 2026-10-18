# Container releases

Run Vitalog as three containers: PostgreSQL, the API and the web app. Keep PostgreSQL private and give the API and web app separate HTTPS origins. Installation-specific manifests are maintained outside this application repository.

## Use a release

Download `vitalog-images.json` from a published GitHub release. It records immutable API and web image digests. Keep both services on the same release version; select `linux/amd64` or `linux/arm64` to match the host. Do not use mutable `latest` tags.

```sh
export VITALOG_IMAGE=ghcr.io/praveen-thirumurugan/vitalog-api@sha256:<api-digest>
export VITALOG_WEB_IMAGE=ghcr.io/praveen-thirumurugan/vitalog-web@sha256:<web-digest>
docker compose up --detach --no-build --wait
```

Older releases remain available under `ghcr.io/avgeek-oss/vitalog-api` and `ghcr.io/avgeek-oss/vitalog-web`. Use the exact image references recorded in the selected release rather than changing registry paths manually.

Set the required credentials and origins in the runtime environment. See [Installation](installation.mdx) and [Configuration](configuration.mdx). Back up PostgreSQL and private attachment storage before upgrading. Preserve `AUTH_KEY` and other saved credentials unless deliberately rotating them.

## Publish a release

Update the API and web package versions together and merge after CI passes. Create a `vX.Y.Z` tag at that main commit, then dispatch **Publish release images** with the tag as `release_tag`.

The workflow builds both architectures, verifies public pulls and source metadata, and tests the exact images against disposable PostgreSQL installations before publication. The release remains draft until the checks pass. A published release cannot be overwritten.

## Verify containers locally

`npm run test:container` checks the Compose installation. `npm run test:runtime` applies `compose.runtime.yaml` to verify constrained CPU/memory settings, private database networking, and authenticated readiness through database failure and recovery. CI also checks the production builders within their memory budgets.
