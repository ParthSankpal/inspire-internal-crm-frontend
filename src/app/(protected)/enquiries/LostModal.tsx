import { useForm } from "react-hook-form";
import { LostFormData } from "@/features/enquiries/types";
import { FormDialog } from "@/components/common/dialogs/FormDialog";
import { FormSelect } from "@/components/common/Forms/FormSelect";
import { FormInput } from "@/components/common/Forms/FormInput";

export default function LostModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: LostFormData) => void;
}) {
  const { control, handleSubmit, reset } =
    useForm<LostFormData>();

  return (
    <FormDialog
      open={open}
      onOpenChange={onClose}
      title="Mark Enquiry as Lost"
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <FormSelect
        name="reason"
        label="Reason"
        control={control}
        options={[
          { value: "fees", label: "Fees" },
          { value: "distance", label: "Distance" },
          { value: "school_pressure", label: "School Pressure" },
          { value: "joined_competitor", label: "Joined Competitor" },
          { value: "not_serious", label: "Not Serious" },
          { value: "parents_not_convinced", label: "Parents Not Convinced" },
          { value: "plan_changed", label: "Plan Changed" },
        ]}
      />

      <FormInput name="note" label="Remarks" control={control} />
    </FormDialog>
  );
}
