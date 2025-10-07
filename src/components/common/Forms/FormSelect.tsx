"use client";

import {
  Select as ShadcnSelect,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Controller, Control } from "react-hook-form";
import { FormField } from "./FormField";

interface FormSelectProps {
  name: string;
  label: string;
  control: Control<any>;
  options: { value: string; label: string }[];
  placeholder?: string;
  error?: string;
  /** Optional custom handler for selection changes */
  onValueChange?: (value: string) => void;
}

export const FormSelect = ({
  name,
  label,
  control,
  options,
  placeholder,
  error,
  onValueChange,
}: FormSelectProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormField label={label} error={error}>
        <ShadcnSelect
          value={field.value || ""}
          onValueChange={(val) => {
            field.onChange(val);
            if (onValueChange) onValueChange(val);
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
