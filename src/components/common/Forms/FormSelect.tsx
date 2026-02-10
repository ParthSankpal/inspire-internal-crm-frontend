"use client";

import {
  Select as ShadcnSelect,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Controller, Control, FieldValues, Path, useFormState } from "react-hook-form";
import { FormField } from "./FormField";
import { getNestedError } from "@/utils/getFieldError";

interface Option<T = string | number> {
  value: T;
  label: string;
}

interface FormSelectProps<T extends FieldValues, V = string | number> {
  name: Path<T>;
  control?: Control<T>;
  options: Option<V>[];
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  onValueChange?: (value: V) => void;
}

// export const FormSelect = <
//   T extends FieldValues,
//   V extends string | number = string
// >({
//   name,
//   control,
//   options,
//   label,
//   placeholder,
//   error,
//   disabled = false,
//   onValueChange,
// }: FormSelectProps<T, V>) => {
//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field }) => {
//         const isNumber = typeof field.value === "number";

//         return (
//           <FormField label={label} error={error}>
//             <ShadcnSelect
//               disabled={disabled}
//               value={
//                 field.value !== undefined && field.value !== null
//                   ? String(field.value)
//                   : ""
//               }
//               onValueChange={(val) => {
//                 const parsedValue = isNumber ? Number(val) : val;
//                 field.onChange(parsedValue);
//                 onValueChange?.(parsedValue as V);
//               }}
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder={placeholder || "Select..."} />
//               </SelectTrigger>

//               <SelectContent>
//                 {options.map((opt) => (
//                   <SelectItem key={String(opt.value)} value={String(opt.value)}>
//                     {opt.label}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </ShadcnSelect>
//           </FormField>
//         );
//       }}
//     />
//   );
// };


export const FormSelect = <
  T extends FieldValues,
  V extends string | number = string
>({
  name,
  control,
  options,
  label,
  placeholder,
  disabled = false,
  onValueChange,
}: FormSelectProps<T, V>) => {
  const { errors } = useFormState({ control });
  const fieldError = getNestedError(errors, name);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const isNumber = typeof field.value === "number";

        return (
          <FormField label={label} error={fieldError}>
            <ShadcnSelect
              disabled={disabled}
              value={field.value ? String(field.value) : ""}
              onValueChange={(val) => {
                const parsedValue = isNumber ? Number(val) : val;
                field.onChange(parsedValue);
                onValueChange?.(parsedValue as V);
              }}
            >
              <SelectTrigger
                className={` w-full ${fieldError && "border-red-500"}`}
              >
                <SelectValue placeholder={placeholder || "Select..."} />
              </SelectTrigger>

              <SelectContent>
                {options.map((opt) => (
                  <SelectItem key={String(opt.value)} value={String(opt.value)}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </ShadcnSelect>
          </FormField>
        );
      }}
    />
  );
};
