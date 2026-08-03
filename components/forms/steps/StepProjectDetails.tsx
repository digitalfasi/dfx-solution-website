import { useFormContext } from "react-hook-form";
import type { LeadFormSchema } from "@/validation/leadSchema";
import { TIMELINE_OPTIONS } from "@/types/lead";
import { SelectField } from "../SelectField";
import { TextAreaField } from "../TextAreaField";
import { FileUploadField } from "../FileUploadField";

export function StepProjectDetails() {
  const {
    register,
    formState: { errors },
  } = useFormContext<LeadFormSchema>();

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <SelectField
        label="Timeline"
        placeholder="When do you want to start?"
        required
        registration={register("timeline")}
        error={errors.timeline?.message}
        options={TIMELINE_OPTIONS}
        className="sm:col-span-2"
      />
      <TextAreaField
        label="Biggest Business Challenge"
        registration={register("businessChallenge")}
        error={errors.businessChallenge?.message}
        placeholder="What's the single biggest thing holding your growth back?"
        rows={3}
        className="sm:col-span-2"
      />
      <TextAreaField
        label="Goals"
        registration={register("goal")}
        error={errors.goal?.message}
        placeholder="What does success look like in the next 6–12 months?"
        rows={3}
        className="sm:col-span-2"
      />
      <TextAreaField
        label="Message"
        registration={register("message")}
        error={errors.message?.message}
        placeholder="Anything else we should know?"
        rows={3}
        className="sm:col-span-2"
      />
      <FileUploadField />
    </div>
  );
}
