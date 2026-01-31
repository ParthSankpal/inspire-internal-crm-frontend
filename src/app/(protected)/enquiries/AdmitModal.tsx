import { useForm } from "react-hook-form";
import { AdmissionFormData } from "@/features/enquiries/types";
import { FormDialog } from "@/components/common/dialogs/FormDialog";
import { FormInput } from "@/components/common/Forms/FormInput";
import { FormSelect } from "@/components/common/Forms/FormSelect";

export default function AdmitModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AdmissionFormData) => void;
}) {
  const { control, handleSubmit, reset } =
    useForm<AdmissionFormData>();

  return (
    <FormDialog
      open={open}
      onOpenChange={onClose}
      title="Confirm Admission"
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <FormInput name="program" label="Program" control={control} />
      <FormInput
        name="feesFinalized"
        label="Fees"
        type="number"
        control={control}
      />

      <FormSelect
        name="paymentMode"
        label="Payment Mode"
        control={control}
        options={[
          { value: "full", label: "Full" },
          { value: "installment", label: "Installment" },
        ]}
      />

      <FormInput
        name="discountPercent"
        label="Discount (%)"
        type="number"
        control={control}
      />
    </FormDialog>
  );
}
