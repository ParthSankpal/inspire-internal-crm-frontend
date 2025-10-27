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
  showGrid?:boolean;
  showCancel?:boolean;
  children: ReactNode;
}

export const FormDialogWrapper = ({
  open,
  onOpenChange,
  title,
  onSubmit,
  showGrid,
  
  showCancel,
  submitLabel = "Save",
  children,
}: FormDialogWrapperProps) => (
  <FormDialog
    open={open}
    onOpenChange={onOpenChange}
    title={title}
    onSubmit={onSubmit}
    submitLabel={submitLabel}
    showCancel={showCancel}
  >
    <div className={`${ showGrid ?  "grid grid-cols-3 gap-4" : ""}`}>{children}</div>
  </FormDialog>
);
