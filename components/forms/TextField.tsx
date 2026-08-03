import type { UseFormRegisterReturn } from "react-hook-form";
import clsx from "clsx";
import { FormField } from "./FormField";
import { fieldClasses, fieldErrorClasses } from "./formStyles";

export function TextField({
  label,
  type = "text",
  placeholder,
  required,
  error,
  registration,
  autoComplete,
}: {
  label: string;
  type?: "text" | "email" | "tel" | "url";
  placeholder?: string;
  required?: boolean;
  error?: string;
  registration: UseFormRegisterReturn;
  autoComplete?: string;
}) {
  return (
    <FormField label={label} htmlFor={registration.name} error={error} required={required}>
      <input
        id={registration.name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${registration.name}-error` : undefined}
        className={clsx(fieldClasses, error && fieldErrorClasses)}
        {...registration}
      />
    </FormField>
  );
}
