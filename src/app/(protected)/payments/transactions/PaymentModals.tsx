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
import { Installment, Student } from "@/features/students/types";

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

  // ---------------------------
  // Prefill on Edit
  // ---------------------------
  useEffect(() => {
    if (selected) {
      reset({
        amount: selected.amount,
        type: selected.type,
        batch:
          typeof selected.batch === "string"
            ? selected.batch
            : selected.batch ?? "",
        student:
          typeof selected.student === "string"
            ? selected.student
            : selected.student ?? "",
        installmentNo: String(selected.installmentNo ?? ""),
        mode: selected.mode,
        date: selected.date?.split("T")[0] ?? "",
        bankAccount:
          typeof selected.bankAccount === "string"
            ? selected.bankAccount
            : selected.bankAccount?._id ?? "",
        payerName: selected.payerName ?? "",
        notes: selected.notes ?? "",
      });
    } else {
      reset();
      setStudents([]);
      setInstallments([]);
    }
  }, [selected, reset]);

  const selectedBatch = watch("batch");
  const selectedStudent = watch("student");

  // ---------------------------
  // Load Students when Batch changes
  // ---------------------------
  useEffect(() => {
    if (!selectedBatch) {
      setStudents([]);
      setValue("student", "");
      return;
    }

    const load = async () => {
      const res = await getAllStudents({ batchId: selectedBatch });

      const mapped = res.data
        .filter((s: Student) => !!s._id)
        .map((s: Student) => ({
          value: s._id!,
          label: `${s.firstName} ${s.lastName} (${s.studentId})`,
        }));


      setStudents(mapped);
    };

    load();
  }, [selectedBatch, setValue]);

  // ---------------------------
  // Load Installments when Student changes
  // ---------------------------
  useEffect(() => {
    if (!selectedStudent) {
      setInstallments([]);
      setValue("installmentNo", "");
      return;
    }

    const loadInstallments = async () => {
      const student = await getStudentById(selectedStudent);

      const mapped = student.fees.installments.map((i: Installment) => ({
        value: String(i.installmentNo),
        label: `Installment ${i.installmentNo} - ₹${i.amount} (${i.status})`,
      }));

      setInstallments(mapped);
    };

    loadInstallments();
  }, [selectedStudent, setValue]);

  // ---------------------------
  // Component Return
  // ---------------------------
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
