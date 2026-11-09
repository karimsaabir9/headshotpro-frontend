# HeadshotPro — Frontend

Web app for **HeadshotPro**, an AI headshot generator. Users sign up, buy
credits, upload a photo, and generate professional headshots in multiple
styles. Built with **Next.js 16 (App Router) + React 19 + TypeScript**.

## Features

- Marketing **landing page** with pricing and style showcase
- **Auth** — register, email verification, resend verification, login
  (httpOnly cookie sessions, token refresh via the proxy middleware)
- **User dashboard** — buy credits (Stripe), upload photos, generate and view
  headshots
- **Admin dashboard** — manage users (roles, credits, delete) and view orders
- Light/dark theme, toast notifications, and React Query data fetching

## Tech stack

Next.js 16 (Turbopack) · React 19 · TypeScript · Tailwind CSS ·
shadcn/ui (Base UI) · TanStack React Query · Axios · React Hook Form + Zod ·
next-themes · sonner · lucide-react

## Prerequisites

- [Bun](https://bun.com) (or Node 20+)
- The [HeadshotPro backend](https://github.com/karimsaabir9/headshotpro-backend)
  running locally (defaults to `http://localhost:8000`)

## Environment variables

Create a `.env` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

## Getting started

```bash
bun install   # install dependencies
bun run dev   # start the dev server (http://localhost:3000)
```

Other scripts:

```bash
bun run build # production build
bun run start # run the production build
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/
  page.tsx            # landing page
  auth/               # login, register, resend-verification, verify-email
  dashboard/
    user/             # credits, headshots
    admin/            # users, orders
  verify-payment/     # Stripe return page
components/ui/         # shadcn/ui (Base UI) components
lib/
  api/                # axios client (withCredentials, refresh interceptor)
  services/           # auth, payment, headshot, admin services
  hooks/              # React Query hooks
  query/              # React Query provider
proxy.ts              # route protection middleware (Next.js 16 proxy)
```

## Notes

- `proxy.ts` (Next.js 16's renamed middleware) guards `/dashboard` and `/auth`
  routes and refreshes expired access tokens.
- The axios client sends cookies (`withCredentials`) and transparently retries
  once after refreshing the session on a 401.
