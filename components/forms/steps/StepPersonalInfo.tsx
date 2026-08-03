import { useFormContext } from "react-hook-form";
import type { LeadFormSchema } from "@/validation/leadSchema";
import { COUNTRY_CODE_OPTIONS } from "@/types/lead";
import { TextField } from "../TextField";
import { FormField } from "../FormField";
import { fieldClasses, fieldErrorClasses } from "../formStyles";
import clsx from "clsx";

export function StepPersonalInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext<LeadFormSchema>();

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <TextField label="First Name" required registration={register("firstName")} error={errors.firstName?.message} autoComplete="given-name" placeholder="Arjun" />
      <TextField label="Last Name" required registration={register("lastName")} error={errors.lastName?.message} autoComplete="family-name" placeholder="Menon" />
      <TextField
        label="Business Email"
        type="email"
        required
        registration={register("email")}
        error={errors.email?.message}
        autoComplete="email"
        placeholder="you@company.com"
      />

      <FormField label="Phone Number" htmlFor="phone" required error={errors.phone?.message}>
        <div className="flex gap-2">
          <select
            aria-label="Country code"
            className={clsx(fieldClasses, "w-[110px] flex-shrink-0 appearance-none cursor-pointer")}
            {...register("countryCode")}
          >
            {COUNTRY_CODE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.value}
              </option>
            ))}
          </select>
          <input
            id="phone"
            type="tel"
            placeholder="98765 43210"
            autoComplete="tel-national"
            aria-invalid={!!errors.phone}
            className={clsx(fieldClasses, errors.phone && fieldErrorClasses)}
            {...register("phone")}
          />
        </div>
      </FormField>

      <TextField label="Company Name" required registration={register("company")} error={errors.company?.message} autoComplete="organization" placeholder="Your company" />
      <TextField label="Job Title" required registration={register("designation")} error={errors.designation?.message} autoComplete="organization-title" placeholder="Marketing Head" />
      <TextField
        label="Website URL"
        type="url"
        registration={register("website")}
        error={errors.website?.message}
        autoComplete="url"
        placeholder="https://yourcompany.com"
      />
      <TextField
        label="LinkedIn"
        type="url"
        registration={register("linkedin")}
        error={errors.linkedin?.message}
        placeholder="https://linkedin.com/in/you"
      />
    </div>
  );
}
