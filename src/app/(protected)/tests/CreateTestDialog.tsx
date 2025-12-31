"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

import { FormDialogWrapper } from "@/components/common/Forms/FormDialogWrapper";
import { FormInput } from "@/components/common/Forms/FormInput";
import { FormSelect } from "@/components/common/Forms/FormSelect";
import { FormDatePicker } from "@/components/common/Forms/FormDatePicker";

import { useNotify } from "@/components/common/NotificationProvider";
import { testSchema, TestFormData } from "@/features/test/types";
import { createTest } from "@/api/testApi";
import { getAllBatches } from "@/api/batchApi";
import { Batch } from "@/features/batches/types";
import { FormMultiSelect } from "@/components/common/Forms/FormMultiSelect";

export default function CreateTestDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const router = useRouter();
  const notify = useNotify();
  const [batches, setBatches] = useState<{ value: string; label: string }[]>([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TestFormData>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      name: "",
      examType: "JEE",
      testType: "Full Length",
      batch: "",
      date: "",
      durationMinutes: 180,
      subjectsIncluded: [],
      totalMarks: 300,
    },
  });

  const onSubmit = async (data: TestFormData) => {
    try {
      const test = await createTest(data); // batch is string ID
      notify("Test created successfully 🎉", "success");
      onOpenChange(false);
      reset();

      router.push(`/tests/${test._id}`);
    } catch {
      notify("Failed to create test", "error");
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const batchList = await getAllBatches();
        setBatches(
          batchList.data?.map((b: Batch) => ({
            value: b._id || "",
            label: b.name || "Unnamed Batch",
          }))
        );
      } catch {
        notify("Failed to load batches", "error");
      }
    })();
  }, [notify]);

  return (
    <FormDialogWrapper
      open={open}
      onOpenChange={onOpenChange}
      title="Create New Test"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          name="name"
          label="Test Name"
          control={control}
          error={errors.name?.message}
        />

        <FormSelect
          name="examType"
          label="Exam Type"
          control={control}
          options={[
            { value: "JEE", label: "JEE" },
            { value: "NEET", label: "NEET" },
            { value: "Foundation", label: "Foundation" },
          ]}
        />

        <FormSelect
          name="batch"
          label="Batch"
          control={control}
          options={batches}
          error={errors.batch?.message}
        />

        <FormSelect
          name="testType"
          label="Test Type"
          control={control}
          options={[
            { value: "Full Length", label: "Full Length" },
            { value: "Subject Test", label: "Subject Test" },
            { value: "Part Test", label: "Part Test" },
            { value: "Topic Test", label: "Topic Test" },
          ]}
        />

        {/* ✅ YOUR Date Picker */}
        <FormDatePicker
          name="date"
          label="Test Date"
          control={control}
          error={errors.date?.message}
        />

        <FormInput
          name="durationMinutes"
          label="Duration (minutes)"
          type="number"
          control={control}
        />

        <FormMultiSelect
          name="subjectsIncluded"
          label="Subjects Included"
          control={control}
          
          options={[
            { value: "Physics", label: "Physics" },
            { value: "Chemistry", label: "Chemistry" },
            { value: "Maths", label: "Maths" },
            { value: "Biology", label: "Biology" },
            { value: "Mental Ability", label: "Mental Ability" },
          ]}
          error={errors.subjectsIncluded?.message}
        />

        <FormInput
          name="totalMarks"
          label="Total Marks"
          type="number"
          control={control}
        />
      </div>
    </FormDialogWrapper>
  );
}
