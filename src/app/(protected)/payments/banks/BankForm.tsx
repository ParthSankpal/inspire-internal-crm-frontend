// src/app/payments/banks/BankForm.tsx
"use client";

import { FormInput } from "@/components/common/Forms/FormInput";
import { FormSelect } from "@/components/common/Forms/FormSelect";
import {  BankFormData } from "@/features/payments/types";
import { Control, FieldErrors } from "react-hook-form";

type Props = {
  control: Control<BankFormData>;
  errors?: FieldErrors<BankFormData>;
};

export default function BankForm({ control, errors }: Props) {
  return (
    <div className="space-y-2">
      <FormInput name="name" label="Name" control={control} error={errors?.name?.message} />
      <FormSelect
        name="type"
        label="Type"
        control={control}
        options={[
          { value: "bank", label: "Bank" },
          { value: "cash", label: "Cash" },
          { value: "wallet", label: "Wallet" },
        ]}
      />
      <FormInput name="bankName" label="Bank Name" control={control} />
      <FormInput name="accountNumber" label="Account Number" control={control} />
      <FormInput name="ifsc" label="IFSC" control={control} />
      <FormInput name="branch" label="Branch" control={control} />
    </div>
  );
}
