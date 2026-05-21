## v0.1.0 — 2026-05-21
- Rename the standalone wrapper to DietPixels.
- Keep only the Next.js frontend/API wrapper in this repository.
- Use `darthsim/imgproxy:latest` as the Go-based image processing backend.
- Build the frontend image as `dietpixels-frontend:latest`.
- Add explicit attribution for Karim Zouine's imgcompress and the imgproxy project.
- Remove unrelated image-processing code, background-removal workflow, document-output workflow, heavyweight sample files, old integration tests, and legacy Docker image build paths.
- Support image conversion, resizing, quality-based compression, and target-size compression through imgproxy.
