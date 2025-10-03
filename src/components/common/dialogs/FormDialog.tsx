// components/common/dialogs/FormDialog.tsx
"use client";

import { CustomDialog } from "../CustomDialog";

interface FormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  submitLabel?: string;
  onSubmit: () => void;
}

export function FormDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  submitLabel = "Save",
  onSubmit,
}: FormDialogProps) {
  return (
    <CustomDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      actions={[
        {
          label: submitLabel,
          onClick: onSubmit,
        },
      ]}
    >
      {children}
    </CustomDialog>
  );
}
