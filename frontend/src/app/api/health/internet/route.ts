import { NextResponse } from "next/server";

export async function GET() {
  let internet = false;
  try {
    await fetch("https://1.1.1.1", {
      method: "HEAD",
      signal: AbortSignal.timeout(3000),
    });
    internet = true;
  } catch {
    internet = false;
  }
  return NextResponse.json({ internet, utc_time: new Date().toISOString() });
}
