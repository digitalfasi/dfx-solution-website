import type { UseFormRegisterReturn } from "react-hook-form";
import clsx from "clsx";
import { FormField } from "./FormField";
import { fieldClasses, fieldErrorClasses } from "./formStyles";

export function TextAreaField({
  label,
  placeholder,
  required,
  error,
  registration,
  rows = 4,
  className,
}: {
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  registration: UseFormRegisterReturn;
  rows?: number;
  className?: string;
}) {
  return (
    <FormField label={label} htmlFor={registration.name} error={error} required={required} className={className}>
      <textarea
        id={registration.name}
        placeholder={placeholder}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={error ? `${registration.name}-error` : undefined}
        className={clsx(fieldClasses, "resize-none", error && fieldErrorClasses)}
        {...registration}
      />
    </FormField>
  );
}
