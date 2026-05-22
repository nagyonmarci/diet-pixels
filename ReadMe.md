<div align="center">
  <img src="frontend/public/dietpixels-icon.png" width="96" alt="" />
  <h1>DietPixels</h1>
</div>

<p align="center">
  Small self-hosted image compression UI backed by the official Go-based
  <a href="https://github.com/imgproxy/imgproxy"><code>darthsim/imgproxy</code></a> Docker image.
</p>

<p align="center">
  <img src="docs/screenshots/main.png" alt="DietPixels main screen" width="780">
</p>

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

## Security & CI/CD

[![CI](https://github.com/nagyonmarci/diet-pixels/actions/workflows/ci.yml/badge.svg)](https://github.com/nagyonmarci/diet-pixels/actions/workflows/ci.yml)
[![Publish](https://github.com/nagyonmarci/diet-pixels/actions/workflows/publish.yml/badge.svg)](https://github.com/nagyonmarci/diet-pixels/actions/workflows/publish.yml)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/nagyonmarci/diet-pixels/badge)](https://securityscorecards.dev/viewer/?uri=github.com/nagyonmarci/diet-pixels)
[![License: GPL v3](https://img.shields.io/badge/license-GPL--3.0--or--later-blue.svg)](LICENSE)

The project ships a multi-layered DevSecOps pipeline that covers the full
software supply chain: from the first line of source code all the way to a
signed, attested container image in the registry.

### Workflows overview

| Workflow | File | Trigger | Purpose |
| --- | --- | --- | --- |
| **CI** | `ci.yml` | push / PR → `main` | 9 parallel quality and security gates |
| **Publish** | `publish.yml` | CI success on `main` / `v*.*.*` tag | Multi-arch build, GHCR push, Cosign sign, smoke test |
| **Release** | `release.yml` | `v*.*.*` tag | Create GitHub Release with auto-generated notes |
| **Dependabot Auto-merge** | `dependabot-automerge.yml` | Dependabot PRs | Auto-merge patch/minor dependency updates |
| **OpenSSF Scorecard** | `scorecard.yml` | push / weekly (Mon 01:30 UTC) | Supply chain security posture score |

---

### CI pipeline

Every push to `main` and every pull request targeting `main` runs the full CI
suite. Jobs are arranged in two layers: gate jobs that must pass before
downstream work begins, and independent jobs that run in parallel.

```
secrets-scan ──┬── type-check ──── bundle-size
               │               └── build-and-scan (+ lint-dockerfile)
               ├── lint-dockerfile
               ├── dependency-audit
               ├── codeql
               ├── semgrep
               └── license-check
```

| Job | Tool | What it checks |
| --- | --- | --- |
| **Secrets Scan** | [gitleaks](https://github.com/gitleaks/gitleaks) | Hardcoded credentials, API keys, and tokens in the full git history (`fetch-depth: 0`) |
| **Lint Dockerfile** | [hadolint](https://github.com/hadolint/hadolint) | Dockerfile best practices; fails on `warning` or higher |
| **Type Check** | TypeScript `tsc` + ESLint | Static type errors and lint rules across the Next.js codebase |
| **Dependency Audit** | `pnpm audit` | Known CVEs at `HIGH` or `CRITICAL` severity in npm dependencies |
| **CodeQL SAST** | [GitHub CodeQL](https://codeql.github.com/) | JavaScript/TypeScript vulnerability patterns; results uploaded to the Security tab as SARIF |
| **Semgrep SAST** | [Semgrep](https://semgrep.dev/) | Next.js, React, TypeScript, and security-audit rule packs; SARIF uploaded to Security tab |
| **License Compliance** | `pnpm licenses list` | Every production dependency must use a GPL-3.0-compatible license (MIT, Apache-2.0, BSD, ISC, etc.); unlisted licenses fail the build |
| **Bundle Size** | [size-limit](https://github.com/ai/size-limit) | Brotli-compressed JS bundle must stay ≤ 500 kB across all chunks |
| **Docker Build & Trivy Scan** | [Trivy](https://github.com/aquasecurity/trivy) | Builds the production Docker image and scans OS packages and library dependencies for `CRITICAL`/`HIGH` CVEs; ignores vulnerabilities without a fix; results uploaded to Security tab as SARIF |

---

### CD pipeline (`publish.yml`)

Triggered automatically when CI completes successfully on `main`, or when a
`v*.*.*` tag is pushed directly.

**Steps:**

1. **Login** — authenticates to GitHub Container Registry (`ghcr.io`) using
   `GITHUB_TOKEN`; no long-lived credentials stored anywhere.

2. **Metadata** — `docker/metadata-action` generates OCI labels and a
   deterministic set of image tags:

   | Pattern | Example |
   | --- | --- |
   | Branch ref | `main` |
   | Semver (full) | `1.2.3` |
   | Semver (major.minor) | `1.2` |
   | Short SHA | `sha-a1b2c3d` |

3. **Multi-arch build & push** — `docker/build-push-action` builds for
   `linux/amd64` and `linux/arm64` using QEMU and Buildx, with GitHub Actions
   cache for fast incremental builds. SLSA provenance and an SBOM are attached
   to the image manifest.

4. **Keyless image signing** — [Cosign](https://docs.sigstore.dev/cosign/overview/)
   signs the image digest using a short-lived OIDC token issued by GitHub
   Actions. No private key is stored anywhere; the signature is verifiable
   against the Sigstore transparency log.

5. **Smoke test** — a follow-up job pulls the freshly pushed image by its exact
   digest (preventing TOCTOU), starts a container, and polls `GET /api/health`
   with a 30-second timeout. The workflow fails if the container does not
   respond before the deadline, catching broken builds before anyone pulls the
   image.

---

### Releasing

Create and push a semver tag to trigger both the **Publish** and **Release**
workflows simultaneously:

```bash
git tag v1.2.3
git push origin v1.2.3
```

- **Publish** builds and signs the container image, tags it `1.2.3` and `1.2`.
- **Release** creates a GitHub Release with auto-generated notes from commits
  since the previous tag.

---

### Dependency management

[`.github/dependabot.yml`](.github/dependabot.yml) configures automated
dependency updates across three ecosystems, all scheduled for Monday 06:00 UTC:

| Ecosystem | Directory | Grouping / exceptions |
| --- | --- | --- |
| **npm** | `/frontend` | `@radix-ui/*` bumped as a single PR; `next`, `react`, `react-dom` major updates blocked |
| **Docker** | `/` | All base image updates |
| **GitHub Actions** | `/` | All action updates grouped into one PR |

Patch and minor Dependabot PRs are auto-merged (squash) by
`dependabot-automerge.yml` once CI passes. Major version bumps always require
manual review.

---

### Security posture

| Principle | Implementation |
| --- | --- |
| **Least privilege** | Every workflow sets `permissions: {}` at the top level; each job declares only the minimum scopes it actually needs |
| **SHA-pinned actions** | Every `uses:` line is locked to a full commit SHA — never a mutable tag — to prevent supply chain substitution attacks |
| **SARIF centralisation** | CodeQL, Semgrep, and Trivy all upload SARIF to the GitHub Security tab, giving a single pane of glass for vulnerability triage |
| **Keyless signing** | Cosign uses a GitHub Actions OIDC token (ephemeral, audience-scoped); the signature is anchored in the Sigstore Rekor transparency log |
| **SBOM & provenance** | Every pushed image carries an SBOM and SLSA provenance attestation, enabling downstream consumers to verify the build origin |
| **OpenSSF Scorecard** | Runs on every push to `main` and weekly; the badge reflects the current score |

### Verifying a released image

```bash
cosign verify \
  --certificate-identity-regexp "https://github.com/nagyonmarci/diet-pixels/.*" \
  --certificate-oidc-issuer "https://token.actions.githubusercontent.com" \
  ghcr.io/nagyonmarci/dietpixels-frontend:<tag>
```
