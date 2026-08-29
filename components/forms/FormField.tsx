import type { ReactNode } from "react";
import clsx from "clsx";
import { labelClasses } from "./formStyles";

export function FormField({
  label,
  htmlFor,
  error,
  required,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={clsx("flex flex-col gap-1.5 text-left", className)}>
      <label htmlFor={htmlFor} className={labelClasses}>
        {label}
        {required && (
          <span className="text-highlight" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
