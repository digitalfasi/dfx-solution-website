import type { UseFormRegister } from "react-hook-form";
import { FormField } from "./FormField";
import type { LeadFormSchema } from "@/validation/leadSchema";

export function CheckboxGroupField({
  label,
  name,
  required,
  error,
  register,
  options,
}: {
  label: string;
  name: "services" | "currentChannels";
  required?: boolean;
  error?: string;
  register: UseFormRegister<LeadFormSchema>;
  options: readonly { value: string; label: string }[];
}) {
  return (
    <FormField label={label} htmlFor={name} error={error} required={required} className="sm:col-span-2">
      <div id={name} role="group" aria-label={label} className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm text-tx cursor-pointer transition-colors has-[:checked]:border-secondary has-[:checked]:bg-glow/40 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-primary"
          >
            <input type="checkbox" value={option.value} className="w-4 h-4 accent-primary" {...register(name)} />
            {option.label}
          </label>
        ))}
      </div>
    </FormField>
  );
}
