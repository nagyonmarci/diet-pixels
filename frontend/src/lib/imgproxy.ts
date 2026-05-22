import path from "path";

const IMGPROXY_URL = process.env.IMGPROXY_URL ?? "http://localhost:8082";

export const UPLOADS_DIR =
  process.env.IMGPROXY_UPLOADS_DIR ?? "/tmp/imgproxy_uploads";
export const OUTPUTS_DIR =
  process.env.IMGPROXY_OUTPUTS_DIR ?? "/tmp/imgproxy_outputs";

const FORMAT_EXTENSIONS: Record<string, string> = {
  jpeg: ".jpg",
  png: ".png",
  avif: ".avif",
  ico: ".ico",
  webp: ".webp",
  gif: ".gif",
  tiff: ".tiff",
};

export function getExtension(format: string): string {
  return FORMAT_EXTENSIONS[format] ?? `.${format}`;
}

export function formatFromContentType(contentType: string): string {
  if (contentType.includes("avif")) return "avif";
  if (contentType.includes("webp")) return "webp";
  if (contentType.includes("png")) return "png";
  if (contentType.includes("gif")) return "gif";
  if (contentType.includes("tiff")) return "tiff";
  return "jpeg";
}

export async function callImgproxy(
  filename: string,
  format: string,
  quality: number,
  width?: number,
  blur?: number,
  sharpen?: number,
  resizeMode: string = "fit",
  gravity?: string
): Promise<{ buffer: Buffer; contentType: string }> {
  const parts: string[] = [];
  if (width && width > 0) {
    if (gravity) parts.push(`gravity:${gravity}`);
    parts.push(`resize:${resizeMode}:${width}:0`);
  }
  if (blur && blur > 0) parts.push(`blur:${blur}`);
  if (sharpen && sharpen > 0) parts.push(`sharpen:${sharpen}`);
  parts.push(`quality:${quality}`);
  parts.push(`format:${format}`);

  const processingOptions = parts.join("/");
  const url = `${IMGPROXY_URL}/unsafe/${processingOptions}/plain/local:///${filename}`;

  const headers: HeadersInit =
    format === "auto"
      ? { Accept: "image/avif,image/webp,image/jpeg,*/*" }
      : {};

  const res = await fetch(url, { headers });
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`imgproxy error ${res.status}: ${text}`);
  }
  const contentType = res.headers.get("content-type") ?? "image/jpeg";
  return { buffer: Buffer.from(await res.arrayBuffer()), contentType };
}

export async function compressToTargetSize(
  filename: string,
  format: string,
  targetBytes: number,
  width?: number,
  sourceWidth?: number
): Promise<Buffer> {
  const selectedWidth = width && width > 0 ? width : undefined;

  const findBestQuality = async (candidateWidth?: number) => {
    let lo = 1,
      hi = 100;
    let best: Buffer | null = null;

    while (lo <= hi) {
      const q = Math.floor((lo + hi) / 2);
      const { buffer } = await callImgproxy(filename, format, q, candidateWidth);
      if (buffer.length <= targetBytes) {
        best = buffer;
        lo = q + 1;
      } else {
        hi = q - 1;
      }
    }

    return best;
  };

  const bestAtRequestedDimensions = await findBestQuality(selectedWidth);
  if (bestAtRequestedDimensions) return bestAtRequestedDimensions;

  const maxWidth = selectedWidth ?? sourceWidth;
  if (!maxWidth || maxWidth <= 1) {
    throw new Error("Unable to reach target size with quality adjustment alone.");
  }

  let widthLo = 1;
  let widthHi = maxWidth;
  let bestWidth: number | null = null;

  while (widthLo <= widthHi) {
    const candidateWidth = Math.floor((widthLo + widthHi) / 2);
    const { buffer } = await callImgproxy(filename, format, 1, candidateWidth);
    if (buffer.length <= targetBytes) {
      bestWidth = candidateWidth;
      widthLo = candidateWidth + 1;
    } else {
      widthHi = candidateWidth - 1;
    }
  }

  const best = bestWidth ? await findBestQuality(bestWidth) : null;

  if (!best) {
    throw new Error("Unable to reach target size, even at the smallest generated dimensions.");
  }

  return best;
}

export function buildOutputName(originalName: string, format: string): string {
  const stem = path.basename(originalName, path.extname(originalName));
  const safeStem = stem.replace(/[^a-zA-Z0-9_.-]/g, "_");
  return `${safeStem}${getExtension(format)}`;
}
