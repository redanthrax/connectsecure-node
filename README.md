# @redanthrax/n8n-nodes-connectsecure

An n8n community node for integrating with the Connect Secure API.

## Development

This repo uses **pnpm** with a committed lockfile and supply-chain controls in [`pnpm-workspace.yaml`](pnpm-workspace.yaml) (see [SECURITY.md](SECURITY.md)). After clone:

```bash
corepack enable && corepack prepare pnpm@10.19.0 --activate
pnpm install --frozen-lockfile
pnpm run audit:supply-chain
pnpm run build
```

Use **pnpm only** for installs in this repo. With Corepack enabled, `npm install` and `yarn install` are rejected. Do not commit `package-lock.json` or `yarn.lock` (see [SECURITY.md](SECURITY.md)).

### Regenerating actions from the API spec

API operations are generated from [`docs/swagger.yaml`](docs/swagger.yaml):

```bash
pnpm run generate
pnpm run build
```

### Live preview with `n8n-node dev`

```bash
n8n-node dev
```

Requires **Node.js 22.22.3+**.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

```bash
npm install @redanthrax/n8n-nodes-connectsecure
```

## Prerequisites

- Connect Secure V4 instance with API access
- Pod API URL from **Profile → API Documentation** (e.g. `https://pod106.myconnectsecure.com`)
- Tenant name (portal login name, e.g. `acme`)
- Client ID and Client Secret from **Settings → Users → ⋮ → API Key**

## Setup

### Configuring Credentials in n8n

| Field | Example | Notes |
|-------|---------|-------|
| **Base API URL** | `https://pod106.myconnectsecure.com` | From API Documentation in the portal — **not** `portal.myconnectsecure.com` |
| **Tenant** | `acme` | Name you type on the portal login screen |
| **Client ID** | *(from API Key dialog)* | Tied to the user you authorize as |
| **Client Secret** | *(from API Key dialog)* | Shown once when generated |

The node obtains a bearer token via `POST /w/authorize` using a base64-encoded `Client-Auth-Token` header. The encoded string is `{tenant}+{clientId}:{clientSecret}` — the **plus sign is literal** (UTF-8, then base64).

## Supported Operations

Resources are grouped by API area (matching swagger tags): **Company**, **Asset**, **Integration**, **Vulnerabilities**, and 21 other groups. Select a **Resource Group**, then pick the specific **Resource** within that group.

Each resource supports the operations defined in the API (typically Get Many, Get, Create, Update, and Delete where applicable).

**Return All** on list operations paginates through the API automatically using `skip` and `limit`.

### Query filters

On **Get Many**, filter and sort field dropdowns are populated automatically by fetching one sample record from the selected endpoint (`limit=1`). Choose **Build Filters** to pick fields from that list, or **Manual Condition** for a raw SQL-like condition string.

Programmatic helpers: `fieldDiscovery.ts`, `queryHelpers.ts`.

### Custom API Call

Endpoints not covered by a dedicated resource can be called with **Custom API Call**. See [`docs/swagger.yaml`](docs/swagger.yaml) for paths and payloads.

## License

MIT
