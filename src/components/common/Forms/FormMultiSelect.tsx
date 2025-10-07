"use client";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import Select from "react-select";
import { FormField } from "./FormField";

interface Option {
  value: string;
  label: string;
}

interface FormMultiSelectProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  options: Option[];
  error?: string;
}

export const FormMultiSelect = <T extends FieldValues>({
  name,
  label,
  control,
  options,
  error,
}: FormMultiSelectProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormField label={label} error={error}>
        <Select
          isMulti
          options={options}
          value={field.value?.map((v: string) => ({ value: v, label: v })) || []}
          onChange={(selected) => field.onChange(selected.map((s) => s.value))}
          placeholder="Select options..."
        />
      </FormField>
    )}
  />
);
