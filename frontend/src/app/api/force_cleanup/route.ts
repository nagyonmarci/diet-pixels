import { NextResponse } from "next/server";
import fs from "fs/promises";
import { OUTPUTS_DIR, UPLOADS_DIR } from "@/lib/imgproxy";

export async function POST() {
  try {
    await fs.rm(OUTPUTS_DIR, { recursive: true, force: true });
    await fs.rm(UPLOADS_DIR, { recursive: true, force: true });
    await fs.mkdir(OUTPUTS_DIR, { recursive: true });
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
    return NextResponse.json({ status: "ok", message: "Forced cleanup completed." });
  } catch (err) {
    return NextResponse.json(
      { error: "Forced cleanup failed", message: String(err) },
      { status: 500 }
    );
  }
}
