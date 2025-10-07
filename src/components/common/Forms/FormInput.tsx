// components/common/forms/FormInput.tsx
"use client";
import { Input } from "@/components/ui/input";
import { FormField } from "./FormField";
import { Controller, Control } from "react-hook-form";

interface FormInputProps {
  name: string;
  label: string;
  control: Control<any>;
  type?: string;
  placeholder?: string;
  error?: string;
}

export const FormInput = ({
  name,
  label,
  control,
  type = "text",
  placeholder,
  error,
}: FormInputProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormField label={label} error={error}>
        <Input {...field} type={type} placeholder={placeholder} />
      </FormField>
    )}
  />
);
