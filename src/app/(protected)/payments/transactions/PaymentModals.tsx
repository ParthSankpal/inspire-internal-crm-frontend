// src/app/payments/transactions/PaymentModals.tsx
"use client";

import { FormDialogWrapper } from "@/components/common/Forms/FormDialogWrapper";
import { ConfirmDialog } from "@/components/common/dialogs/ConfirmDialog";
import PaymentForm from "./PaymentForm";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSchema, PaymentFormData, Payment } from "@/features/payments/types";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  deleteOpen: boolean;
  setDeleteOpen: (v: boolean) => void;
  selected?: Payment | null;
  banksOptions: { value: string; label: string }[];
  onAdd: (d: PaymentFormData) => Promise<void>;
  onEdit: (d: PaymentFormData) => Promise<void>;
  onDelete: () => Promise<void>;
};

export default function PaymentModals({
  open,
  setOpen,
  deleteOpen,
  setDeleteOpen,
  selected,
  banksOptions,
  onAdd,
  onEdit,
  onDelete,
}: Props) {
  const { control, handleSubmit, reset, formState } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amount: 0,
      type: "credit",
      mode: "cash",
      date: new Date().toISOString().split("T")[0],
      bankAccount: "",
      payerName: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (selected) {
      reset({
        ...selected,
        bankAccount: typeof selected.bankAccount === "string" ? selected.bankAccount : selected.bankAccount?._id || "",
      } as any);
    } else {
      reset();
    }
  }, [selected, reset]);

  return (
    <>
      <FormDialogWrapper
        open={open}
        onOpenChange={setOpen}
        title={selected ? "Edit Payment" : "Add Payment"}
        onSubmit={handleSubmit(selected ? onEdit : onAdd)}
      >
        <PaymentForm control={control} errors={formState.errors} banks={banksOptions} />
      </FormDialogWrapper>

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Payment"
        description={`Delete payment from ${selected?.payerName || "Unknown"}?`}
        onConfirm={onDelete}
      />
    </>
  );
}
