// src/app/payments/transactions/PaymentForm.tsx
"use client";

import { FormInput } from "@/components/common/Forms/FormInput";
import { FormSelect } from "@/components/common/Forms/FormSelect";
import { Control } from "react-hook-form";
import { PaymentFormData } from "@/features/payments/types";

type Props = {
  control: Control<PaymentFormData>;
  errors?: any;
  banks: { value: string; label: string }[];
};

export default function PaymentForm({ control, errors, banks }: Props) {
  return (
    <div className="space-y-2">
      
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
      <FormSelect name="bankAccount" label="Bank Account" control={control} options={banks} />
      <FormInput name="date" label="Date" control={control} type="date" />
      <FormInput name="payerName" label="Payer" control={control} />
      <FormInput name="notes" label="Notes" control={control} />
    </div>
  );
}
