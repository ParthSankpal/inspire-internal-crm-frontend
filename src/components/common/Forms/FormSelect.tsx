"use client";

import {
  Select as ShadcnSelect,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { FormField } from "./FormField";

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  options: Option[];
  placeholder?: string;
  error?: string;
  onValueChange?: (value: string) => void;
}

export const FormSelect = <T extends FieldValues>({
  name,
  label,
  control,
  options,
  placeholder,
  error,
  onValueChange,
}: FormSelectProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormField label={label} error={error}>
        <ShadcnSelect
          value={field.value || ""}
          onValueChange={(val) => {
            field.onChange(val);
            onValueChange?.(val);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder={placeholder || "Select..."} />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </ShadcnSelect>
      </FormField>
    )}
  />
);
