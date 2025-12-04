// src/app/payments/banks/BankModals.tsx
"use client";

import { FormDialogWrapper } from "@/components/common/Forms/FormDialogWrapper";
import { ConfirmDialog } from "@/components/common/dialogs/ConfirmDialog";
import BankForm from "./BankForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bankSchema, BankFormData, BankAccount } from "@/features/payments/types";
import { useEffect } from "react";

type Props = {
  openAdd: boolean;
  setOpenAdd: (v: boolean) => void;
  openEdit: boolean;
  setOpenEdit: (v: boolean) => void;
  openDelete: boolean;
  setOpenDelete: (v: boolean) => void;
  onAdd: (data: BankFormData) => Promise<void>;
  onEdit: (data: BankFormData) => Promise<void>;
  onDelete: () => Promise<void>;
  selected?: BankAccount | null;
};

export default function BankModals({
  openAdd,
  setOpenAdd,
  openEdit,
  setOpenEdit,
  openDelete,
  setOpenDelete,
  onAdd,
  onEdit,
  onDelete,
  selected,
}: Props) {
  const { control, handleSubmit, reset, formState } = useForm<BankFormData>({
    resolver: zodResolver(bankSchema),
    defaultValues: {
      name: "",
      type: "bank",
      bankName: "",
      accountNumber: "",
      ifsc: "",
      branch: "",
    },
  });

  useEffect(() => {
    if (selected) {
      reset(selected as BankAccount);
    } else {
      reset();
    }
  }, [selected, reset]);

  return (
    <>
      <FormDialogWrapper
        open={openAdd}
        onOpenChange={setOpenAdd}
        title="Add Bank"
        onSubmit={handleSubmit(onAdd)}
      >
        <BankForm control={control} errors={formState.errors} />
      </FormDialogWrapper>

      <FormDialogWrapper
        open={openEdit}
        onOpenChange={setOpenEdit}
        title="Edit Bank"
        onSubmit={handleSubmit(onEdit)}
        submitLabel="Update"
      >
        <BankForm control={control} errors={formState.errors} />
      </FormDialogWrapper>

      <ConfirmDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        title="Delete Bank"
        description={`Delete bank ${selected?.name}?`}
        onConfirm={onDelete}
      />
    </>
  );
}
