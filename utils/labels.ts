interface LabeledOption {
  value: string;
  label: string;
}

export function labelFor(options: readonly LabeledOption[], value: string | undefined | null): string {
  if (!value) return "—";
  return options.find((o) => o.value === value)?.label ?? value;
}

export function labelsFor(options: readonly LabeledOption[], values: readonly string[] | undefined | null): string {
  if (!values || values.length === 0) return "—";
  return values.map((v) => labelFor(options, v)).join(", ");
}
