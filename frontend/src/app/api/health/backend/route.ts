import { NextResponse } from "next/server";

const IMGPROXY_URL = process.env.IMGPROXY_URL ?? "http://localhost:8080";

export async function GET() {
  try {
    const res = await fetch(`${IMGPROXY_URL}/health`, {
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      return NextResponse.json({
        status: "running",
        utc_time: new Date().toISOString(),
      });
    }
    throw new Error(`imgproxy returned ${res.status}`);
  } catch {
    return NextResponse.json(
      { status: "down", utc_time: new Date().toISOString() },
      { status: 503 }
    );
  }
}
