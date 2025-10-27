"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/common/Forms/FormInput";
import { FormSelect } from "@/components/common/Forms/FormSelect";
import { StudentFormData } from "@/features/students/types";
import { Control, FieldErrors } from "react-hook-form";

interface WizardProps {
  control: Control<StudentFormData>;
  errors: FieldErrors<StudentFormData>;
  batches: { value: string; label: string }[];
}

export default function StudentFormWizard({
  control,
  errors,
  batches,
}: WizardProps) {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 6));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">
          Step {step} of 6 —{" "}
          {[
            "Personal Info",
            "Contact",
            "Parent Info",
            "Address",
            "Academic Info",
            "Admission Details",
          ][step - 1]}
        </h3>
      </div>

      {/* Step Sections */}
      {step === 1 && (
        <div className="grid grid-cols-3 gap-4">
          <FormInput name="firstName" label="First Name" control={control} error={errors.firstName?.message} />
          <FormInput name="middleName" label="Middle Name" control={control} />
          <FormInput name="lastName" label="Last Name" control={control} error={errors.lastName?.message} />
          <FormSelect
            name="gender"
            label="Gender"
            control={control}
            options={[
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
              { value: "Other", label: "Other" },
            ]}
          />
          <FormInput name="dob" label="Date of Birth" type="date" control={control} />
          <FormInput name="aadhaarNo" label="Aadhaar Number" control={control} />
        </div>
      )}

      {step === 2 && (
        <div className="grid grid-cols-3 gap-4">
          <FormInput name="contact.phone" label="Phone" control={control} error={errors.contact?.phone?.message} />
          <FormInput name="contact.email" label="Email" control={control} />
        </div>
      )}

      {step === 3 && (
        <div className="grid grid-cols-3 gap-4">
          <FormInput name="parent.fatherName" label="Father Name" control={control} />
          <FormInput name="parent.motherName" label="Mother Name" control={control} />
          <FormInput name="parent.fatherPhone" label="Father Phone" control={control} />
          <FormInput name="parent.motherPhone" label="Mother Phone" control={control} />
          <FormInput name="parent.occupation" label="Occupation" control={control} />
        </div>
      )}

      {step === 4 && (
        <div className="grid grid-cols-3 gap-4">
          <FormInput name="address.line1" label="Address Line 1" control={control} />
          <FormInput name="address.line2" label="Address Line 2" control={control} />
          <FormInput name="address.city" label="City" control={control} />
          <FormInput name="address.state" label="State" control={control} />
          <FormInput name="address.pincode" label="Pincode" control={control} />
        </div>
      )}

      {step === 5 && (
        <div className="grid grid-cols-3 gap-4">
          <FormInput name="academicInfo.schoolName" label="School Name" control={control} />
          <FormInput name="academicInfo.grade10Marks" label="10th Marks" control={control} />
          <FormInput name="academicInfo.grade10PassingYear" label="10th Passing Year" control={control} />
        </div>
      )}

      {step === 6 && (
        <div className="grid grid-cols-3 gap-4">
          <FormInput name="course" label="Course" control={control} />
          <FormSelect name="batch" label="Batch" control={control} options={batches} />
          <FormSelect
            name="targetExam"
            label="Target Exam"
            control={control}
            options={[
              { value: "IIT JEE", label: "IIT JEE" },
              { value: "NEET", label: "NEET" },
              { value: "MHT-CET", label: "MHT-CET" },
              { value: "Foundation", label: "Foundation" },
              { value: "Other", label: "Other" },
            ]}
          />
          <FormInput name="admissionDate" label="Admission Date" type="date" control={control} />
          <FormSelect
            name="status"
            label="Status"
            control={control}
            options={[
              { value: "Active", label: "Active" },
              { value: "Completed", label: "Completed" },
              { value: "Left", label: "Left" },
              { value: "Hold", label: "Hold" },
            ]}
          />
          <FormInput name="remarks" label="Remarks" control={control} />
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button variant="outline" disabled={step === 1} onClick={prevStep}>
          ← Back
        </Button>

        {step < 6 ? (
          <Button onClick={nextStep}>Next →</Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
