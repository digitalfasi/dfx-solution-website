import { NextRequest, NextResponse } from "next/server";
import { isTrustedOrigin } from "@/utils/csrf";
import { rateLimit } from "@/utils/rateLimit";
import { getClientIp } from "@/utils/requestMeta";
import { uploadLeadAttachment, FileValidationError } from "@/services/fileUploadService";

export const runtime = "nodejs";

const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

export async function POST(request: NextRequest) {
  if (!isTrustedOrigin(request)) {
    return NextResponse.json({ success: false, error: "Forbidden." }, { status: 403 });
  }

  const ip = getClientIp(request.headers);
  const { allowed } = rateLimit(`upload:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS);
  if (!allowed) {
    return NextResponse.json(
      { success: false, error: "Too many uploads. Please try again shortly." },
      { status: 429 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid upload." }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ success: false, error: "No file provided." }, { status: 400 });
  }

  try {
    const uploaded = await uploadLeadAttachment(file);
    return NextResponse.json({ success: true, ...uploaded }, { status: 201 });
  } catch (error) {
    if (error instanceof FileValidationError) {
      return NextResponse.json({ success: false, error: error.message }, { status: 422 });
    }
    console.error("Attachment upload failed:", error);
    return NextResponse.json({ success: false, error: "Upload failed. Please try again." }, { status: 500 });
  }
}
