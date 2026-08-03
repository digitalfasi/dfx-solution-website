import { put } from "@vercel/blob";
import { UPLOAD_CONFIG } from "@/lib/config/upload";

export class FileValidationError extends Error {}

export interface UploadedFile {
  url: string;
  name: string;
  size: number;
  type: string;
}

/**
 * Uploads an optional lead attachment (brief, deck, etc.) to Vercel Blob.
 * Requires BLOB_READ_WRITE_TOKEN — see .env.example. The attachment is
 * optional everywhere upstream, so a missing token surfaces as a clear,
 * catchable error rather than crashing lead submission.
 */
export async function uploadLeadAttachment(file: File): Promise<UploadedFile> {
  if (file.size > UPLOAD_CONFIG.maxSizeBytes) {
    throw new FileValidationError(`File must be under ${UPLOAD_CONFIG.maxSizeBytes / (1024 * 1024)}MB`);
  }
  if (!UPLOAD_CONFIG.allowedMimeTypes.includes(file.type as (typeof UPLOAD_CONFIG.allowedMimeTypes)[number])) {
    throw new FileValidationError("Unsupported file type. Please upload a PDF, Word document, or image.");
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new FileValidationError("File uploads are not configured yet. You can continue without attaching a file.");
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_").slice(-100);
  const blob = await put(`lead-attachments/${Date.now()}-${safeName}`, file, {
    access: "public",
    token,
  });

  return { url: blob.url, name: file.name, size: file.size, type: file.type };
}
