"use client";

import { FormInput } from "@/components/common/Forms/FormInput";
import { FormSelect } from "@/components/common/Forms/FormSelect";
import { Control } from "react-hook-form";
import { School } from "@/features/schools/types";

type Props = {
  control: Control<Partial<School>>;
};

export default function SchoolForm({ control }: Props) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">

      <FormInput
        name="name"
        label="School Name"
        control={control}
      />

      <FormSelect
        name="area"
        label="Area"
        control={control}
        options={[
          { value: "urban", label: "Urban" },
          { value: "semi_urban", label: "Semi Urban" },
          { value: "rural", label: "Rural" },
        ]}
      />

      <FormSelect
        name="type"
        label="Type"
        control={control}
        options={[
          { value: "private", label: "Private" },
          { value: "govt", label: "Government" },
          { value: "semi_govt", label: "Semi Govt" },
        ]}
      />

      <FormSelect
        name="category"
        label="Category"
        control={control}
        options={[
          { value: "top", label: "Top" },
          { value: "mid", label: "Mid" },
          { value: "local", label: "Local" },
        ]}
      />

      {/* <FormSelect
        name="medium"
        label="Medium"
        control={control}
        options={[
          { value: "CBSE", label: "CBSE" },
          { value: "ENGLISH", label: "English" },
          { value: "MARATHI", label: "Marathi" },
          { value: "ICSE", label: "ICSE" },
          { value: "SEMI-ENGLISH", label: "Semi English" },
          { value: "IB/IGCSE", label: "IB / IGCSE" },
        ]}
      /> */}

      <FormInput
        name="contactPerson"
        label="Contact Person"
        control={control}
      />

      <FormInput
        name="contactNumber"
        label="Contact Number"
        control={control}
      />

      <FormInput
        name="address"
        label="Address"
        control={control}
      />
    </div>
  );
}