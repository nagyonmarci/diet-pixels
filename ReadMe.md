# DietPixels

Small self-hosted image compression UI backed by the official Go-based
[`darthsim/imgproxy`](https://github.com/imgproxy/imgproxy) Docker image.

This repository contains only the Next.js frontend and API wrapper. Image
processing is delegated to `imgproxy`, which runs as a sidecar service in Docker
Compose.

## Attribution

DietPixels is a personal-purpose remix of two excellent projects:

- Karim Zouine's [`imgcompress`](https://github.com/karimz1/imgcompress), which
  inspired the user-facing compression workflow and parts of the frontend
  experience.
- The [`imgproxy`](https://github.com/imgproxy/imgproxy) project, used here as
  the actual Go-based image processing backend through
  `darthsim/imgproxy:latest`.

This project is not an official release of either project. It combines ideas and
runtime pieces from both for a smaller wrapper focused on this specific Docker
Compose setup.

## Services

| Service | Source | Role |
| --- | --- | --- |
| `frontend` | built from `./frontend` | Next.js UI and API wrapper |
| `imgproxy` | `darthsim/imgproxy:latest` | image resize/format/quality processing |

## Run with Docker Compose

```bash
docker compose up --build -d
```

Open:

```text
http://localhost:3000
```

The frontend image is built as:

```text
dietpixels-frontend:latest
```

## Local frontend development

```bash
cd frontend
pnpm install
pnpm dev
```

For real conversions, keep the Compose stack running so the frontend can reach
the `imgproxy` service and shared upload/output volumes.

## Notes

- This wrapper repository does not include its own image-processing backend.
- Target-size compression is handled by the wrapper choosing quality values and
  asking `imgproxy` to render each candidate.
- Uploaded and converted files live in Docker volumes named `uploads` and
  `outputs`.
