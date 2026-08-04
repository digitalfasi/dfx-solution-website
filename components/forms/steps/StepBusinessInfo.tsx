import { useFormContext } from "react-hook-form";
import type { LeadFormSchema } from "@/validation/leadSchema";
import { INDUSTRY_OPTIONS, PRIMARY_SERVICE_OPTIONS, COMPANY_SIZE_OPTIONS, MARKETING_BUDGET_OPTIONS } from "@/types/lead";
import { SelectField } from "../SelectField";

export function StepBusinessInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext<LeadFormSchema>();

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <SelectField label="Industry" placeholder="Select your industry" required registration={register("industry")} error={errors.industry?.message} options={INDUSTRY_OPTIONS} />
      <SelectField
        label="Primary Service Needed"
        placeholder="Select the primary service you need"
        required
        registration={register("primaryService")}
        error={errors.primaryService?.message}
        options={PRIMARY_SERVICE_OPTIONS}
      />
      <SelectField
        label="Company Size"
        placeholder="Select company size"
        required
        registration={register("companySize")}
        error={errors.companySize?.message}
        options={COMPANY_SIZE_OPTIONS}
      />
      <SelectField
        label="Monthly Marketing Budget"
        placeholder="Select a budget range"
        required
        registration={register("marketingBudget")}
        error={errors.marketingBudget?.message}
        options={MARKETING_BUDGET_OPTIONS}
      />
    </div>
  );
}
