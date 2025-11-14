"use client";

import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  type?: string;
  placeholder?: string;
  readOnly?: boolean;
  error?: string;
}

export function FormInput<T extends FieldValues>({
  name,
  label,
  control,
  type = "text",
  placeholder,
  readOnly,
  error,
}: FormInputProps<T>) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            id={name}
            type={type}
            placeholder={placeholder}
            disabled={readOnly}
            {...field}
            // ✅ Automatically convert to number if type="number"
            onChange={(e) => {
              const value =
                type === "number" ? e.target.valueAsNumber : e.target.value;
              field.onChange(value);
            }}
          />
        )}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
