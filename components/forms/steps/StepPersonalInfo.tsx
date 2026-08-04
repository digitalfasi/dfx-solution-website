import { useFormContext } from "react-hook-form";
import type { LeadFormSchema } from "@/validation/leadSchema";
import { DEFAULT_COUNTRY_CODE } from "@/types/lead";
import { TextField } from "../TextField";
import { FormField } from "../FormField";
import { fieldErrorClasses } from "../formStyles";
import clsx from "clsx";

export function StepPersonalInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext<LeadFormSchema>();

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <TextField label="First Name" required registration={register("firstName")} error={errors.firstName?.message} autoComplete="given-name" placeholder="Arjun" />
      <TextField label="Last Name" registration={register("lastName")} error={errors.lastName?.message} autoComplete="family-name" placeholder="Menon" />
      <TextField
        label="Business Email"
        type="email"
        required
        registration={register("email")}
        error={errors.email?.message}
        autoComplete="email"
        placeholder="you@company.com"
      />

      <FormField label="Mobile Number" htmlFor="phone" required error={errors.phone?.message}>
        <div
          className={clsx(
            "flex items-center bg-card border border-border rounded-xl overflow-hidden focus-within:border-secondary transition-colors",
            errors.phone && fieldErrorClasses
          )}
        >
          <span className="flex-shrink-0 pl-4 pr-3 py-3.5 text-sm font-medium text-tx2 border-r border-border select-none" aria-hidden="true">
            {DEFAULT_COUNTRY_CODE}
          </span>
          <input
            id="phone"
            type="tel"
            inputMode="numeric"
            placeholder="98765 43210"
            autoComplete="tel-national"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className="w-full min-w-0 bg-transparent outline-none py-3.5 px-3 text-sm text-tx placeholder:text-muted"
            {...register("phone")}
          />
        </div>
      </FormField>

      <TextField label="Company Name" required registration={register("company")} error={errors.company?.message} autoComplete="organization" placeholder="Your company" />
      <TextField
        label="Website URL"
        type="url"
        registration={register("website")}
        error={errors.website?.message}
        autoComplete="url"
        placeholder="https://yourcompany.com"
      />
    </div>
  );
}
