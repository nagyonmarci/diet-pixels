import { NextResponse } from "next/server";

// imgproxy supports these input formats via libvips
const SUPPORTED_FORMATS = [
  ".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif", ".tiff", ".tif",
  ".bmp", ".ico", ".heic", ".heif", ".svg", ".jp2", ".jpx", ".j2k",
  ".jxl", ".exr", ".fits", ".fit", ".fts", ".hdr", ".pbm", ".pgm",
  ".ppm", ".pnm", ".xbm", ".xpm",
];

export async function GET() {
  return NextResponse.json({ supported_formats: SUPPORTED_FORMATS });
}
