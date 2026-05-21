import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { OUTPUTS_DIR } from "@/lib/imgproxy";

async function dirSizeMb(dir: string): Promise<number> {
  let total = 0;
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        total += await dirSizeMb(full);
      } else if (e.isFile()) {
        const s = await fs.stat(full).catch(() => null);
        if (s) total += s.size;
      }
    }
  } catch {
    // directory may not exist yet
  }
  return total;
}

export async function GET() {
  const usedBytes = await dirSizeMb(OUTPUTS_DIR);
  const usedMb = Math.round((usedBytes / (1024 * 1024)) * 100) / 100;

  // Use statfs-equivalent via statvfs; fallback to 0 on unsupported platforms
  let availableMb = 0;
  try {
    const stat = await fs.statfs(OUTPUTS_DIR).catch(() => null);
    if (stat) availableMb = Math.round((stat.bfree * stat.bsize) / (1024 * 1024) * 100) / 100;
  } catch {
    availableMb = 0;
  }

  return NextResponse.json({ used_storage_mb: usedMb, available_storage_mb: availableMb });
}
