import type { UseFormRegisterReturn } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import { FormField } from "./FormField";
import { fieldClasses, fieldErrorClasses } from "./formStyles";

export function SelectField({
  label,
  placeholder,
  required,
  error,
  registration,
  options,
  className,
}: {
  label: string;
  placeholder: string;
  required?: boolean;
  error?: string;
  registration: UseFormRegisterReturn;
  options: readonly { value: string; label: string }[];
  className?: string;
}) {
  return (
    <FormField label={label} htmlFor={registration.name} error={error} required={required} className={className}>
      <div className="relative">
        <select
          id={registration.name}
          defaultValue=""
          aria-invalid={!!error}
          aria-describedby={error ? `${registration.name}-error` : undefined}
          className={clsx(fieldClasses, "appearance-none pr-10 cursor-pointer", error && fieldErrorClasses)}
          {...registration}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
          aria-hidden="true"
        />
      </div>
    </FormField>
  );
}
