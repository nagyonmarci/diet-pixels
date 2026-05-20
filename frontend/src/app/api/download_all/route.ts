import { NextRequest, NextResponse } from "next/server";
import path from "path";
import AdmZip from "adm-zip";
import fs from "fs/promises";
import { OUTPUTS_DIR } from "@/lib/imgproxy";

export async function GET(request: NextRequest) {
  const folder = request.nextUrl.searchParams.get("folder");
  if (!folder) {
    return NextResponse.json({ error: "folder param required" }, { status: 400 });
  }

  const resolved = path.resolve(folder);
  if (!resolved.startsWith(path.resolve(OUTPUTS_DIR))) {
    return NextResponse.json({ error: "Invalid folder path" }, { status: 400 });
  }

  let entries: string[];
  try {
    entries = await fs.readdir(resolved);
  } catch {
    return NextResponse.json({ error: "Folder not found" }, { status: 404 });
  }

  const zip = new AdmZip();
  for (const name of entries) {
    const filePath = path.join(resolved, name);
    const stat = await fs.stat(filePath).catch(() => null);
    if (stat?.isFile()) {
      zip.addLocalFile(filePath);
    }
  }

  const zipBuffer = zip.toBuffer();
  const sessionName = path.basename(resolved);

  return new NextResponse(zipBuffer, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="converted_${sessionName}.zip"`,
    },
  });
}
