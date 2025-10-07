// components/common/forms/FormDialogWrapper.tsx
"use client";
import { FormDialog } from "@/components/common/dialogs/FormDialog";
import { ReactNode } from "react";

interface FormDialogWrapperProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  onSubmit: () => void;
  submitLabel?: string;
  children: ReactNode;
}

export const FormDialogWrapper = ({
  open,
  onOpenChange,
  title,
  onSubmit,
  submitLabel = "Save",
  children,
}: FormDialogWrapperProps) => (
  <FormDialog
    open={open}
    onOpenChange={onOpenChange}
    title={title}
    onSubmit={onSubmit}
    submitLabel={submitLabel}
  >
    <div className="grid grid-cols-3 gap-4">{children}</div>
  </FormDialog>
);
