// src/app/payments/summary/SummaryFilters.tsx
"use client";

import { FormDatePicker } from "@/components/common/Forms/FormDatePicker";
import { FormSelect } from "@/components/common/Forms/FormSelect";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { SummaryFilters as Filters } from "@/features/payments/types";

type Props = {
  onChange: (values: Filters) => void;
  banks: { value: string; label: string }[];
};

export default function SummaryFilters({ onChange, banks }: Props) {
  const { control, watch } = useForm<Filters>({
    defaultValues: {
      startDate: "",
      endDate: "",
      groupBy: "bank",
      mode: "",
      bankAccount: "",
    },
  });

  useEffect(() => {
    const sub = watch((v) => onChange(v as Filters));
    return () => sub.unsubscribe();
  }, [watch, onChange]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      <FormDatePicker name="startDate" label="Start Date" control={control} />
      <FormDatePicker name="endDate" label="End Date" control={control} />
      <FormSelect
        name="groupBy"
        label="Group By"
        control={control}
        options={[
          { value: "bank", label: "Bank" },
          { value: "day", label: "Day" },
        ]}
      />
      <FormSelect
        name="mode"
        label="Mode"
        control={control}
        options={[
          { value: "", label: "All Modes" },
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
        options={[{ value: "", label: "All Banks" }, ...banks]}
      />
    </div>
  );
}
