"use client";
import { Controller, Control, FieldValues, Path, useFormState } from "react-hook-form";
import Select from "react-select";
import { FormField } from "./FormField";
import { getNestedError } from "@/utils/getFieldError";

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

// export const FormMultiSelect = <T extends FieldValues>({
//   name,
//   label,
//   control,
//   options,
//   error,
// }: FormMultiSelectProps<T>) => (
//   <Controller
//     name={name}
//     control={control}
//     render={({ field }) => (
//       <FormField label={label} error={error}>
//         <Select
//           isMulti
//           options={options}
//           value={field.value?.map((v: string) => ({ value: v, label: v })) || []}
//           onChange={(selected) => field.onChange(selected.map((s) => s.value))}
//           placeholder="Select options..."
//         />
//       </FormField>
//     )}
//   />
// );



export const FormMultiSelect = <T extends FieldValues>({
  name,
  label,
  control,
  options,
}: FormMultiSelectProps<T>) => {
  const { errors } = useFormState({ control });
  const fieldError = getNestedError(errors, name);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormField label={label} error={fieldError}>
          <Select
            isMulti
            options={options}
            value={
              field.value?.map((v: string) => ({
                value: v,
                label: v,
              })) || []
            }
            onChange={(selected) =>
              field.onChange(selected.map((s) => s.value))
            }
            className={fieldError ? "react-select-error" : ""}
          />
        </FormField>
      )}
    />
  );
};
