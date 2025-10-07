// components/common/forms/FormMultiSelect.tsx
"use client";
import { Controller, Control } from "react-hook-form";
import Select from "react-select";
import { FormField } from "./FormField";

interface FormMultiSelectProps {
  name: string;
  label: string;
  control: Control<any>;
  options: { value: string; label: string }[];
  error?: string;
}

export const FormMultiSelect = ({
  name,
  label,
  control,
  options,
  error,
}: FormMultiSelectProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormField label={label} error={error}>
        <Select
          isMulti
          options={options}
          value={field.value?.map((v: string) => ({ value: v, label: v }))}
          onChange={(selected) => field.onChange(selected.map((s) => s.value))}
          placeholder="Select options..."
        />
      </FormField>
    )}
  />
);
