"use client";
import { Input } from "@/components/ui/input";
import { FormField } from "./FormField";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  type?: string;
  placeholder?: string;
  error?: string;
}

export const FormInput = <T extends FieldValues>({
  name,
  label,
  control,
  type = "text",
  placeholder,
  error,
}: FormInputProps<T>) => (
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
