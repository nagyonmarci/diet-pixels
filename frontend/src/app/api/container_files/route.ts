import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { OUTPUTS_DIR } from "@/lib/imgproxy";

export async function GET() {
  const files: { name: string; size_mb: number; folder: string }[] = [];
  let totalSizeMb = 0;

  try {
    const sessions = await fs.readdir(OUTPUTS_DIR, { withFileTypes: true });
    for (const session of sessions) {
      if (!session.isDirectory()) continue;
      const sessionPath = path.join(OUTPUTS_DIR, session.name);
      const sessionFiles = await fs.readdir(sessionPath);
      for (const fname of sessionFiles) {
        const fpath = path.join(sessionPath, fname);
        const stat = await fs.stat(fpath).catch(() => null);
        if (!stat?.isFile()) continue;
        const sizeMb = Math.round((stat.size / (1024 * 1024)) * 100) / 100;
        files.push({ name: fname, size_mb: sizeMb, folder: sessionPath });
        totalSizeMb += sizeMb;
      }
    }
  } catch {
    // outputs dir may not exist yet
  }

  return NextResponse.json({
    files,
    total_size_mb: Math.round(totalSizeMb * 100) / 100,
  });
}
