import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { OUTPUTS_DIR } from "@/lib/imgproxy";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const folder = searchParams.get("folder");
  const filename = searchParams.get("file");

  if (!folder || !filename) {
    return NextResponse.json({ error: "folder and file params required" }, { status: 400 });
  }

  // Security: folder must be under OUTPUTS_DIR
  const resolved = path.resolve(folder);
  if (!resolved.startsWith(path.resolve(OUTPUTS_DIR))) {
    return NextResponse.json({ error: "Invalid folder path" }, { status: 400 });
  }

  const filePath = path.join(resolved, filename);
  let data: Buffer;
  try {
    data = await fs.readFile(filePath);
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  return new NextResponse(data.buffer as ArrayBuffer, {
    headers: {
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Type": "application/octet-stream",
    },
  });
}
