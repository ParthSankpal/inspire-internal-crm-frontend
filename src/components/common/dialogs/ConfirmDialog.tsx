// components/common/dialogs/ConfirmDialog.tsx
"use client";

import { CustomDialog } from "../CustomDialog";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <CustomDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      cancelLabel={cancelLabel}
      actions={[
        {
          label: confirmLabel,
          onClick: () => {
            onConfirm();
            onOpenChange(false);
          },
          variant: "destructive",
        },
      ]}
    />
  );
}
