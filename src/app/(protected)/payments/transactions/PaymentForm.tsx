"use client";

import { FormInput } from "@/components/common/Forms/FormInput";
import { FormSelect } from "@/components/common/Forms/FormSelect";
import { FormCombobox } from "@/components/common/Forms/FormCombobox";
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
};

export default function PaymentForm({
  control,
  banks,
  batches,
  students,
  installments,
}: Props) {
  const selectedType = useWatch({ control, name: "type" });
  const selectedBatch = useWatch({ control, name: "batch" });
  const selectedStudent = useWatch({ control, name: "student" });

  return (
    <div className="space-y-2 grid sm:grid-cols-2 gap-4">

      <FormInput name="amount" label="Amount" control={control} type="number" />

      <FormSelect
        name="type"
        label="Type"
        control={control}
        options={[
          { value: "credit", label: "Credit" },
          { value: "debit", label: "Debit" },
        ]}
      />

      {/* CREDIT ONLY */}
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
              name="installmentNo"
              label="Installment"
              control={control}
              options={installments}
            />
          )}
        </>
      )}

      <FormSelect
        name="mode"
        label="Mode"
        control={control}
        options={[
          { value: "cash", label: "Cash" },
          { value: "online", label: "Online" },
          { value: "upi", label: "UPI" },
          { value: "card", label: "Card" },
          { value: "cheque", label: "Cheque" },
        ]}
      />

      <FormSelect
        name="bankAccount"
        label="Bank Account"
        control={control}
        options={banks}
      />

      <FormInput name="date" label="Date" control={control} type="date" />

      {/* Payer for debit OR optional for credit */}
      <FormInput name="payerName" label="Payer" control={control} />

      <FormInput name="notes" label="Notes" control={control} />
    </div>
  );
}
