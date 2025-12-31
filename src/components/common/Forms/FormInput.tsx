"use client";

import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormField } from "./FormField";

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  type?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

export const FormInput = <T extends FieldValues>({
  name,
  control,
  label,
  type = "text",
  placeholder,
  error,
  disabled = false,
  readOnly = false,
}: FormInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const isNumber = typeof field.value === "number";

        return (
          <FormField label={label} error={error}>
            <Input
              id={name}
              type={type}
              placeholder={placeholder}
              disabled={disabled || readOnly}
              value={
                field.value !== undefined && field.value !== null
                  ? String(field.value)
                  : ""
              }
              onChange={(e) => {
                const raw = e.target.value;

                const parsedValue =
                  isNumber || type === "number"
                    ? raw === ""
                      ? undefined
                      : Number(raw)
                    : raw;

                field.onChange(parsedValue);
              }}
            />
          </FormField>
        );
      }}
    />
  );
};
