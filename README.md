# Chichaven Atelier

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/edelfinon-gif/chichaven-atelier-moda-e-acess-rios-de-alta-convers-o)

A modern full-stack application template built with React and Cloudflare Workers, featuring real-time state management via Durable Objects, a beautiful shadcn/ui frontend, and seamless deployment to the Cloudflare edge.

## Features

- **Full-Stack Architecture**: React frontend with Vite and a Cloudflare Workers backend using Hono
- **Stateful Backend**: Powered by Durable Objects for entities like users, chats, and real-time messaging
- **Modern UI**: Tailwind CSS, shadcn/ui components, theme switching, and smooth animations
- **Type-Safe**: End-to-end TypeScript with shared types between frontend and backend
- **Developer Experience**: Hot reloading, query caching via TanStack React Query, error boundaries, and comprehensive tooling
- **Production Ready**: CORS, logging, client error reporting, and optimized build pipeline

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, React Router, TanStack React Query, Immer
- **UI**: Tailwind CSS, shadcn/ui, Radix UI primitives, Lucide icons, Sonner toasts
- **Backend**: Cloudflare Workers, Hono, Durable Objects (SQLite-backed), Wrangler
- **Tooling**: Bun, ESLint, PostCSS, TypeScript (strict mode with project references)

## Getting Started

### Prerequisites

- Bun (recommended package manager)
- Node.js 18+
- Cloudflare account (for deployment)

### Installation

```bash
bun install
```

This project uses a bootstrap script that runs automatically during install.

### Development

Start the development server:

```bash
bun run dev
```

The app will be available at `http://localhost:3000` (or the port specified by the `PORT` environment variable).

Key development commands:

- `bun run dev` – Start Vite dev server with Workers integration
- `bun run build` – Production build
- `bun run preview` – Preview the production build locally
- `bun run lint` – Run ESLint

## Deployment

Deploy directly to Cloudflare Workers:

```bash
bun run deploy
```

This runs the build and deploys using Wrangler.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/edelfinon-gif/chichaven-atelier-moda-e-acess-rios-de-alta-convers-o)

## Project Structure

- `src/` – React frontend (pages, components, hooks, lib)
- `worker/` – Cloudflare Workers backend (entities, routes, core utilities)
- `shared/` – Shared TypeScript types and mock data
- Configuration files: `wrangler.jsonc`, `vite.config.ts`, `tailwind.config.js`, `tsconfig*.json`

## License

This project is licensed under the MIT License.