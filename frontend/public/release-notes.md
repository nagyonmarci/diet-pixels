## v0.1.0 — 2026-05-21
- Split the imgproxy wrapper into a standalone app.
- Keep only the Next.js frontend/API wrapper in this repository.
- Use `darthsim/imgproxy:latest` as the Go-based image processing backend.
- Build the frontend image as `karimz1/imgcompress-imgproxy-wrapper-frontend:latest`.
- Remove unrelated image-processing code, background-removal workflow, document-output workflow, heavyweight sample files, old integration tests, and legacy Docker image build paths.
- Support image conversion, resizing, quality-based compression, and target-size compression through imgproxy.
