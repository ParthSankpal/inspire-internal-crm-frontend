// components/common/forms/FormField.tsx
"use client";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  label: string | undefined;
  error?: string;
  children: React.ReactNode;
}

export const FormField = ({ label, error, children }: FormFieldProps) => (
  <div className="flex flex-col space-y-1.5">
    <Label className="text-sm font-medium">{label}</Label>
    {children}
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);
