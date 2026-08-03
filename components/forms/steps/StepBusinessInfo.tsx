import { useFormContext } from "react-hook-form";
import type { LeadFormSchema } from "@/validation/leadSchema";
import {
  INDUSTRY_OPTIONS,
  COMPANY_SIZE_OPTIONS,
  MONTHLY_REVENUE_OPTIONS,
  MARKETING_CHANNEL_OPTIONS,
  TARGET_MARKET_OPTIONS,
  MARKETING_BUDGET_OPTIONS,
  SERVICE_OPTIONS,
} from "@/types/lead";
import { TextField } from "../TextField";
import { SelectField } from "../SelectField";
import { CheckboxGroupField } from "../CheckboxGroupField";

export function StepBusinessInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext<LeadFormSchema>();

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <SelectField label="Industry" placeholder="Select your industry" required registration={register("industry")} error={errors.industry?.message} options={INDUSTRY_OPTIONS} />
      <SelectField
        label="Company Size"
        placeholder="Select company size"
        required
        registration={register("companySize")}
        error={errors.companySize?.message}
        options={COMPANY_SIZE_OPTIONS}
      />
      <SelectField
        label="Current Monthly Revenue"
        placeholder="Select revenue range"
        registration={register("monthlyRevenue")}
        error={errors.monthlyRevenue?.message}
        options={MONTHLY_REVENUE_OPTIONS}
      />
      <SelectField
        label="Target Market"
        placeholder="Select target market"
        registration={register("targetMarket")}
        error={errors.targetMarket?.message}
        options={TARGET_MARKET_OPTIONS}
      />
      <TextField
        label="Business Location"
        registration={register("businessLocation")}
        error={errors.businessLocation?.message}
        autoComplete="address-level2"
        placeholder="City, State"
      />
      <SelectField
        label="Monthly Marketing Budget"
        placeholder="Select a budget range"
        required
        registration={register("marketingBudget")}
        error={errors.marketingBudget?.message}
        options={MARKETING_BUDGET_OPTIONS}
      />

      <CheckboxGroupField
        label="Current Marketing Channels"
        name="currentChannels"
        register={register}
        error={errors.currentChannels?.message}
        options={MARKETING_CHANNEL_OPTIONS}
      />
      <CheckboxGroupField
        label="Service Interested"
        name="services"
        required
        register={register}
        error={errors.services?.message}
        options={SERVICE_OPTIONS}
      />
    </div>
  );
}
