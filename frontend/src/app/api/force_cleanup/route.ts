import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { OUTPUTS_DIR, UPLOADS_DIR } from "@/lib/imgproxy";

async function emptyDirectory(dir: string) {
  await fs.mkdir(dir, { recursive: true });
  const entries = await fs.readdir(dir, { withFileTypes: true });

  await Promise.all(
    entries.map((entry) =>
      fs.rm(path.join(dir, entry.name), { recursive: true, force: true })
    )
  );
}

export async function POST() {
  try {
    await emptyDirectory(OUTPUTS_DIR);
    await emptyDirectory(UPLOADS_DIR);
    return NextResponse.json({ status: "ok", message: "Forced cleanup completed." });
  } catch (err) {
    return NextResponse.json(
      { error: "Forced cleanup failed", message: String(err) },
      { status: 500 }
    );
  }
}
