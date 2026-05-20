import { NextResponse } from "next/server";

const VERIFIED_FORMATS = [
  ".heic", ".heif", ".png", ".jpg", ".jpeg",
  ".ico", ".avif", ".webp", ".gif", ".tiff", ".bmp",
];

export async function GET() {
  return NextResponse.json({ verified_formats: VERIFIED_FORMATS });
}
