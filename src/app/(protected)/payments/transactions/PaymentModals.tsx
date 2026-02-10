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
  /* =========================
     FORM SETUP
  ========================= */
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState,
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    mode: "onChange",
    defaultValues: {
      amount: 0,
      type: "credit",

      batch: "",
      student: "",
      linkedInstallmentNo: "",

      expenseCategory: undefined,
      expenseSubType: "",
      payeeType: undefined,
      payeeName: "",

      mode: "cash",
      date: new Date().toISOString().split("T")[0],
      bankAccount: "",
      notes: "",
    },
  });

  const type = watch("type");
  const selectedBatch = watch("batch");
  const selectedStudent = watch("student");

  const [students, setStudents] = useState<
    { value: string; label: string }[]
  >([]);

  const [installments, setInstallments] = useState<
    { value: string; label: string }[]
  >([]);

  /* =========================
     PREFILL ON EDIT
  ========================= */
  useEffect(() => {
    if (!selected) {
      reset();
      setStudents([]);
      setInstallments([]);
      return;
    }

    reset({
      amount: selected.amount,
      type: selected.type,

      batch: selected.batch ?? "",
      student: selected.student ?? "",
      linkedInstallmentNo: selected.linkedInstallmentNo
        ? String(selected.linkedInstallmentNo)
        : "",

      expenseCategory: selected.expenseCategory,
      expenseSubType: selected.expenseSubType ?? "",
      payeeType: selected.payeeType,
      payeeName: selected.payeeName ?? "",

      mode: selected.mode,
      date: selected.date?.split("T")[0] ?? "",
      bankAccount:
        typeof selected.bankAccount === "string"
          ? selected.bankAccount
          : selected.bankAccount?._id ?? "",
      notes: selected.notes ?? "",
    });
  }, [selected, reset]);

  /* =========================
     RESET FIELDS ON TYPE CHANGE
  ========================= */
  useEffect(() => {
    if (type === "credit") {
      setValue("expenseCategory", undefined);
      setValue("expenseSubType", "");
      setValue("payeeType", undefined);
      setValue("payeeName", "");
    }

    if (type === "debit") {
      setValue("batch", "");
      setValue("student", "");
      setValue("linkedInstallmentNo", "");
      setStudents([]);
      setInstallments([]);
    }
  }, [type, setValue]);

  /* =========================
     LOAD STUDENTS (CREDIT)
  ========================= */
  useEffect(() => {
    if (!selectedBatch || type !== "credit") {
      setStudents([]);
      setValue("student", "");
      return;
    }

    const loadStudents = async () => {
      const res = await getAllStudents({ batchId: selectedBatch });

      const mapped = res.data
        .filter((s: Student) => !!s._id)
        .map((s: Student) => ({
          value: s._id!,
          label: `${s.firstName} ${s.lastName} (${s.studentId})`,
        }));

      setStudents(mapped);
    };

    loadStudents();
  }, [selectedBatch, type, setValue]);

  /* =========================
     LOAD INSTALLMENTS (CREDIT)
  ========================= */
  useEffect(() => {
    if (!selectedStudent || type !== "credit") {
      setInstallments([]);
      setValue("linkedInstallmentNo", "");
      return;
    }

    const loadInstallments = async () => {
      const student = await getStudentById(selectedStudent);

      const mapped = student.fees.installments.map(
        (i: Installment) => ({
          value: String(i.installmentNo),
          label: `Installment ${i.installmentNo} - ₹${i.amount} (${i.status})`,
        })
      );

      setInstallments(mapped);
    };

    loadInstallments();
  }, [selectedStudent, type, setValue]);

  /* =========================
     SUBMIT HANDLER
  ========================= */
  const submitHandler = async (data: PaymentFormData) => {
    if (selected) {
      await onEdit(data);
    } else {
      await onAdd(data);
    }

    setOpen(false);
    reset();
  };

  /* =========================
     RENDER
  ========================= */
  return (
    <>
      <FormDialogWrapper
        open={open}
        onOpenChange={setOpen}
        title={selected ? "Edit Transaction" : "Add Transaction"}
        onSubmit={handleSubmit(submitHandler)}
      >
        <PaymentForm
          control={control}
          errors={formState.errors}
          banks={banksOptions}
          batches={batchesOption}
          students={students}
          installments={installments}
          type={type}
        />
      </FormDialogWrapper>

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Transaction"
        description={`Delete this transaction?`}
        onConfirm={onDelete}
      />
    </>
  );
}
