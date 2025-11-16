"use client";

import { FormDialogWrapper } from "@/components/common/Forms/FormDialogWrapper";
import { ConfirmDialog } from "@/components/common/dialogs/ConfirmDialog";
import PaymentForm from "./PaymentForm";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  paymentSchema,
  PaymentFormData,
  Payment,
} from "@/features/payments/types";

import { getAllStudents, getStudentById } from "@/api/students";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  deleteOpen: boolean;
  setDeleteOpen: (v: boolean) => void;
  selected?: Payment | null;
  banksOptions: { value: string; label: string }[];
  batchesOption: { value: string; label: string }[];
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
  batchesOption,
  onAdd,
  onEdit,
  onDelete,
}: Props) {
  const { control, handleSubmit, reset, watch, setValue, formState } =
    useForm<PaymentFormData>({
      resolver: zodResolver(paymentSchema),
      defaultValues: {
        amount: 0,
        type: "credit",
        batch: "",
        student: "",
        installmentNo: "",
        mode: "cash",
        date: new Date().toISOString().split("T")[0],
        bankAccount: "",
        payerName: "",
        notes: "",
      },
    });

  const [students, setStudents] = useState<{ value: string; label: string }[]>(
    []
  );
  const [installments, setInstallments] = useState<
    { value: string; label: string }[]
  >([]);

  // Prefill on edit
  useEffect(() => {
    if (selected) {
      reset({
        ...selected,
        bankAccount:
          typeof selected.bankAccount === "string"
            ? selected.bankAccount
            : selected.bankAccount?._id || "",
      } as any);
    } else {
      reset();
      setStudents([]);
      setInstallments([]);
    }
  }, [selected, reset]);

  const selectedBatch = watch("batch");
  const selectedStudent = watch("student");

  // Load students when batch changes
  useEffect(() => {
    if (!selectedBatch) {
      setStudents([]);
      setValue("student", "");
      return;
    }

    const load = async () => {
      const res = await getAllStudents({ batchId: selectedBatch });
      const mapped = res.data.map((s: any) => ({
        value: s._id,
        label: `${s.firstName} ${s.lastName} (${s.studentId})`,
      }));
      setStudents(mapped);
    };

    load();
  }, [selectedBatch]);

  // Load installments when student changes
  useEffect(() => {
    if (!selectedStudent) {
      setInstallments([]);
      setValue("installmentNo", "");
      return;
    }

    const loadInstallments = async () => {
      const student = await getStudentById(selectedStudent);
      

      const mapped = student.fees.installments.map((i: any) => ({
        value: String(i.installmentNo),
        label: `Installment ${i.installmentNo} - ₹${i.amount} (${i.status})`,
      }));

      setInstallments(mapped);
    };


    loadInstallments();
  }, [selectedStudent]);

  return (
    <>
      <FormDialogWrapper
        open={open}
        onOpenChange={setOpen}
        title={selected ? "Edit Payment" : "Add Payment"}
        onSubmit={handleSubmit(selected ? onEdit : onAdd)}
      >
        <PaymentForm
          control={control}
          errors={formState.errors}
          banks={banksOptions}
          batches={batchesOption}
          students={students}
          installments={installments}
        />
      </FormDialogWrapper>

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Payment"
        description={`Delete payment from ${selected?.payerName || "Unknown"
          }?`}
        onConfirm={onDelete}
      />
    </>
  );
}
