"use client";

import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Loader2, Paperclip, X } from "lucide-react";
import type { LeadFormSchema } from "@/validation/leadSchema";
import { labelClasses } from "./formStyles";

const MAX_SIZE_MB = 10;

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUploadField() {
  const { watch, setValue } = useFormContext<LeadFormSchema>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const attachmentName = watch("attachmentName");
  const attachmentSize = watch("attachmentSize");

  async function handleFile(file: File) {
    setError(null);

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File must be under ${MAX_SIZE_MB}MB.`);
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/uploads", { method: "POST", body: formData });
      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.error || "Upload failed. You can still submit without a file.");
        return;
      }

      setValue("attachmentUrl", result.url, { shouldValidate: true });
      setValue("attachmentName", result.name, { shouldValidate: true });
      setValue("attachmentSize", result.size, { shouldValidate: true });
      setValue("attachmentType", result.type, { shouldValidate: true });
    } catch {
      setError("Upload failed. You can still submit without a file.");
    } finally {
      setUploading(false);
    }
  }

  function clearFile() {
    setValue("attachmentUrl", "");
    setValue("attachmentName", "");
    setValue("attachmentSize", undefined);
    setValue("attachmentType", "");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="flex flex-col gap-1.5 text-left sm:col-span-2">
      <span className={labelClasses}>File Upload (Optional)</span>

      {attachmentName ? (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3.5 text-sm">
          <span className="flex items-center gap-2 min-w-0 text-tx">
            <Paperclip size={16} className="flex-shrink-0 text-muted" aria-hidden="true" />
            <span className="truncate">{attachmentName}</span>
            {typeof attachmentSize === "number" && (
              <span className="flex-shrink-0 text-muted">({formatSize(attachmentSize)})</span>
            )}
          </span>
          <button
            type="button"
            onClick={clearFile}
            aria-label="Remove attached file"
            className="flex-shrink-0 text-muted hover:text-tx transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <label className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-card px-4 py-3.5 text-sm text-muted cursor-pointer transition-colors hover:border-secondary hover:text-tx2">
          {uploading ? (
            <>
              <Loader2 size={16} className="animate-spin" aria-hidden="true" />
              Uploading…
            </>
          ) : (
            <>
              <Paperclip size={16} aria-hidden="true" />
              Attach a brief, deck, or reference file (PDF, Word, image — up to {MAX_SIZE_MB}MB)
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            className="sr-only"
            disabled={uploading}
            accept=".pdf,.doc,.docx,image/png,image/jpeg,image/webp"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleFile(file);
            }}
          />
        </label>
      )}

      {error && (
        <p role="alert" className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
