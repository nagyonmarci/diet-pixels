# syntax=docker/dockerfile:1.7

# 1) Stage: FRONTEND BUILD (with Node)
############################################################
# Use the build platform for this stage so that the Node
# build tools run on the build host.
FROM node:26 AS frontend-build

WORKDIR /app
# Copy the frontend code into this stage
COPY frontend/ ./frontend

WORKDIR /app/frontend

# Install dependencies and build the static site.
RUN npm i pnpm -g
RUN CI=true pnpm install --frozen-lockfile
RUN pnpm run build

# The built static files are in /app/frontend/out/

############################################################
# 2) Stage: PYTHON DEPENDENCY BUILD
############################################################
FROM python:3.11-slim-bookworm AS python-deps

RUN set -eux; \
    apt-get update -o Acquire::Retries=5 -o Acquire::http::Timeout=30 && \
    apt-get install -y --no-install-recommends \
    build-essential \
    python3-dev \
    libjpeg-dev libpng-dev libtiff-dev libwebp-dev libopenjp2-7-dev \
    libimagequant-dev libheif-dev liblcms2-dev \
    libfreetype6-dev libharfbuzz-dev libfribidi-dev \
    libxcb1-dev zlib1g-dev libgif-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /build
COPY requirements.txt /build/
RUN pip wheel --no-cache-dir --wheel-dir /wheels -r requirements.txt

############################################################
# 3) Stage: FINAL PYTHON IMAGE
############################################################
FROM python:3.11-slim-bookworm


# Metadata labels
LABEL org.opencontainers.image.authors="Karim Zouine <mails.karimzouine@gmail.com>"
LABEL org.opencontainers.image.vendor="Karim Zouine"
LABEL org.opencontainers.image.title="imgcompress - High Performance Image Compression & Background Removal"
LABEL org.opencontainers.image.description="Self-hosted, privacy-first tool for image compression, conversion (HEIC/WebP/PDF), and background removal using local AI. Supports 70+ formats."
LABEL org.opencontainers.image.url="https://github.com/karimz1/imgcompress"
LABEL org.opencontainers.image.source="https://github.com/karimz1/imgcompress"
LABEL org.opencontainers.image.documentation="https://github.com/karimz1/imgcompress"
LABEL org.opencontainers.image.licenses="GPL-3.0-or-later"

# Install runtime system dependencies required for full Pillow image format support
# 
# This layer installs libraries that enable reading/writing many image formats:
#   - libjpeg, libpng, libtiff, libwebp, libopenjp2: common raster formats (JPEG, PNG, TIFF, WebP, JPEG2000)
#   - libimagequant: high-quality PNG quantization
#   - libheif: enables HEIF / HEIC / AVIF image decoding
#   - ghostscript: enables reading vector formats like .EPS, .PS, and .PDF
#   - liblcms2, libfreetype, libharfbuzz, libfribidi: color management + advanced text rendering
#   - libxcb, zlib, libgif: core compression and GIF/X11 support
#
# Together, these libraries ensure Pillow (PIL) can handle nearly every major image type used in production.
# But I haven't tested all in CI, yet.
RUN set -eux; \
    apt-get update -o Acquire::Retries=5 -o Acquire::http::Timeout=30 && \
    apt-get install -y --no-install-recommends \
    libjpeg62-turbo libpng16-16 libtiff6 libwebp7 libwebpdemux2 libwebpmux3 libopenjp2-7 \
    libimagequant0 libheif1 liblcms2-2 \
    libfreetype6 libharfbuzz0b libfribidi0 \
    libxcb1 zlib1g libgif7 ghostscript \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory.
WORKDIR /container

# Copy requirements and setup files first to leverage layer caching for dependencies
COPY requirements.txt /container/
COPY setup.py /container/
RUN --mount=type=bind,from=python-deps,source=/wheels,target=/wheels,readonly \
    pip install --no-cache-dir --no-index --find-links=/wheels -r requirements.txt

# Copy backend code and other necessary files
COPY backend/ /container/backend
COPY entrypoint.sh /container/entrypoint.sh
RUN chmod +x /container/entrypoint.sh

# Install the package itself (fast)
RUN pip install --no-cache-dir .

# Pre-download rembg model so background removal doesn't fetch at runtime.
ENV U2NET_HOME=/container/.u2net
RUN python - <<'PY'
import json
from rembg import new_session
with open("backend/image_converter/config/rembg.json", "r", encoding="utf-8") as f:
    model_name = json.load(f).get("model_name", "u2net")
new_session(model_name)
print(f"rembg model cached: {model_name}")
PY

# Create the directory where the static frontend will be placed.
RUN mkdir -p /container/backend/image_converter/presentation/web/static_site

# Copy the built frontend static site from the previous stage.
COPY --from=frontend-build /app/frontend/out/. /container/backend/image_converter/presentation/web/static_site


EXPOSE 5000

ENTRYPOINT ["/container/entrypoint.sh"]
