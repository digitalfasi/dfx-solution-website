import { useFormContext } from "react-hook-form";
import type { LeadFormSchema } from "@/validation/leadSchema";
import { PRIMARY_GOAL_OPTIONS, TIMELINE_OPTIONS, HEAR_ABOUT_US_OPTIONS, PROJECT_BUDGET_OPTIONS } from "@/types/lead";
import { SelectField } from "../SelectField";
import { TextAreaField } from "../TextAreaField";

export function StepProjectDetails() {
  const {
    register,
    formState: { errors },
  } = useFormContext<LeadFormSchema>();

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <SelectField
        label="Primary Goal"
        placeholder="What's your primary goal?"
        required
        registration={register("primaryGoal")}
        error={errors.primaryGoal?.message}
        options={PRIMARY_GOAL_OPTIONS}
      />
      <SelectField
        label="Project Timeline"
        placeholder="When do you want to start?"
        required
        registration={register("timeline")}
        error={errors.timeline?.message}
        options={TIMELINE_OPTIONS}
      />
      <SelectField
        label="How did you hear about us?"
        placeholder="Select an option"
        required
        registration={register("hearAboutUs")}
        error={errors.hearAboutUs?.message}
        options={HEAR_ABOUT_US_OPTIONS}
      />
      <SelectField
        label="Estimated Project Budget"
        placeholder="Select a budget range"
        required
        registration={register("projectBudget")}
        error={errors.projectBudget?.message}
        options={PROJECT_BUDGET_OPTIONS}
      />
      <TextAreaField
        label="Tell us about your project (Optional)"
        registration={register("message")}
        error={errors.message?.message}
        placeholder="Briefly describe your business, your current challenges, or what you'd like us to build."
        rows={3}
        className="sm:col-span-2"
      />
    </div>
  );
}
