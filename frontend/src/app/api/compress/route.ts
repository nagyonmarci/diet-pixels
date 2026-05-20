import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import {
  callImgproxy,
  compressToTargetSize,
  buildOutputName,
  UPLOADS_DIR,
  OUTPUTS_DIR,
} from "@/lib/imgproxy";

const SUPPORTED_FORMATS = new Set(["jpeg", "png", "avif", "ico", "webp", "gif", "tiff"]);

export async function POST(request: NextRequest) {
  await fs.mkdir(UPLOADS_DIR, { recursive: true });

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const files = formData.getAll("files[]") as File[];
  const format = (formData.get("format") as string | null)?.toLowerCase() ?? "jpeg";
  const quality = Math.min(100, Math.max(1, parseInt(formData.get("quality") as string ?? "85", 10) || 85));
  const width = parseInt(formData.get("width") as string ?? "", 10) || undefined;
  const targetSizeKb = parseInt(formData.get("target_size_kb") as string ?? "", 10) || undefined;

  if (!files.length) {
    return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
  }
  if (!SUPPORTED_FORMATS.has(format)) {
    return NextResponse.json({ error: `Unsupported format: ${format}` }, { status: 400 });
  }

  const sessionId = randomUUID();
  const sessionOutputDir = path.join(OUTPUTS_DIR, sessionId);
  await fs.mkdir(sessionOutputDir, { recursive: true });

  const convertedFiles: string[] = [];
  const errors: string[] = [];

  for (const file of files) {
    const uploadName = `${randomUUID()}-${file.name}`;
    const uploadPath = path.join(UPLOADS_DIR, uploadName);

    try {
      const arrayBuffer = await file.arrayBuffer();
      await fs.writeFile(uploadPath, Buffer.from(arrayBuffer));

      let resultBuf: Buffer;
      if (targetSizeKb && (format === "jpeg" || format === "avif")) {
        resultBuf = await compressToTargetSize(uploadName, format, targetSizeKb * 1024, width);
      } else {
        resultBuf = await callImgproxy(uploadName, format, quality, width);
      }

      const outName = buildOutputName(file.name, format);
      await fs.writeFile(path.join(sessionOutputDir, outName), resultBuf);
      convertedFiles.push(outName);
    } catch (err) {
      errors.push(`${file.name}: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      await fs.unlink(uploadPath).catch(() => {});
    }
  }

  if (!convertedFiles.length) {
    return NextResponse.json(
      { error: "Image processing failed", message: errors.join("; ") },
      { status: 500 }
    );
  }

  return NextResponse.json({
    status: "ok",
    converted_files: convertedFiles,
    dest_folder: sessionOutputDir,
    process_summary: { processed_files: convertedFiles, errors },
  });
}
