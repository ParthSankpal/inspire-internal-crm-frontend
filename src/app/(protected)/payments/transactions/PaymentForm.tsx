"use client";

import { FormInput } from "@/components/common/Forms/FormInput";
import { FormSelect } from "@/components/common/Forms/FormSelect";
import { FormCombobox } from "@/components/common/Forms/FormCombobox";
import { FormDatePicker } from "@/components/common/Forms/FormDatePicker";

import { Control, FieldErrors, useWatch } from "react-hook-form";
import { PaymentFormData } from "@/features/payments/types";

type Option = { value: string; label: string };

type Props = {
  control: Control<PaymentFormData>;
  errors?: FieldErrors<PaymentFormData>;

  banks: Option[];
  batches: Option[];
  students: Option[];
  installments: Option[];
  type: "credit" | "debit";
};

export default function PaymentForm({
  control,
  banks,
  batches,
  students,
  installments,
  type
}: Props) {
  const selectedType = useWatch({ control, name: "type" });
  const selectedBatch = useWatch({ control, name: "batch" });
  const selectedStudent = useWatch({ control, name: "student" });

  return (
    <div className="grid sm:grid-cols-2 gap-4">

      {/* =========================
         AMOUNT & TYPE
      ========================= */}
      <FormInput
        name="amount"
        label="Amount"
        control={control}
        type="number"
      />

      <FormSelect
        name="type"
        label="Transaction Type"
        control={control}
        options={[
          { value: "credit", label: "Income (Fees Received)" },
          { value: "debit", label: "Expense (Money Paid)" },
        ]}
      />

      {/* =========================
         CREDIT → STUDENT FEES
      ========================= */}
      {selectedType === "credit" && (
        <>
          <FormSelect
            name="batch"
            label="Batch"
            control={control}
            options={batches}
          />

          {selectedBatch && (
            <FormCombobox
              name="student"
              label="Student"
              control={control}
              options={students}
              placeholder="Search student..."
            />
          )}

          {selectedStudent && (
            <FormSelect
              name="linkedInstallmentNo"
              label="Installment"
              control={control}
              options={installments}
            />
          )}
        </>
      )}

      {/* =========================
         DEBIT → EXPENSE
      ========================= */}
      {selectedType === "debit" && (
        <>
          <FormSelect
            name="expenseCategory"
            label="Expense Category"
            control={control}
            options={[
              { value: "salary", label: "Salary" },
              { value: "rent", label: "Rent" },
              { value: "electricity", label: "Electricity" },
              { value: "internet", label: "Internet" },
              { value: "maintenance", label: "Maintenance" },
              { value: "marketing", label: "Marketing" },
              { value: "stationery", label: "Stationery" },
              { value: "transport", label: "Transport" },
              { value: "other", label: "Other" },
            ]}
          />

          <FormSelect
            name="payeeType"
            label="Paid To"
            control={control}
            options={[
              { value: "staff", label: "Staff" },
              { value: "vendor", label: "Vendor" },
              { value: "other", label: "Other" },
            ]}
          />

          <FormInput
            name="payeeName"
            label="Paid To (Person / Vendor Name)"
            control={control}
            placeholder="e.g. Rahul Patil, Office Owner"
          />

          <FormInput
            name="expenseSubType"
            label="Expense Sub Type (Optional)"
            control={control}
            placeholder="e.g. Teaching Staff, Office Rent"
          />
        </>
      )}

      {/* =========================
         COMMON FIELDS
      ========================= */}
      <FormSelect
        name="mode"
        label="Payment Mode"
        control={control}
        options={[
          { value: "cash", label: "Cash" },
          { value: "online", label: "Online" },
          { value: "upi", label: "UPI" },
          { value: "card", label: "Card" },
          { value: "cheque", label: "Cheque" },
          { value: "bank", label: "Bank Transfer" },
        ]}
      />

      <FormSelect
        name="bankAccount"
        label="Bank / Cash Account"
        control={control}
        options={banks}
      />

      <FormDatePicker
        name="date"
        label="Transaction Date"
        control={control}
      />

      {/* Only meaningful for CREDIT but optional
      {selectedType === "credit" && (
        <FormInput
          name="payerName"
          label="Received From (Optional)"
          control={control}
        />
      )} */}

      <FormInput
        name="notes"
        label="Notes"
        control={control}
        placeholder="Any additional details"
      />
    </div>
  );
}
