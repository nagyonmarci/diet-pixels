# Frontend

Next.js app for the imgproxy wrapper.

## Scripts

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
```

`NEXT_BUILD_MODE=server` builds the standalone server used by Docker Compose.
In development, API routes are served by Next.js and expect `IMGPROXY_URL` plus
the upload/output directories to point at a reachable imgproxy setup.
