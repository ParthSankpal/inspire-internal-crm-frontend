
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/common/Forms/FormInput";
import { useForm } from "react-hook-form";
import { Test } from "@/features/test/types";

export default function TestHeader({
  test,
  editable,
  onSave,
}: {
  test: Test;
  editable: boolean;
  onSave: (data: Partial<Test>) => void;
}) {
  const { control, handleSubmit } = useForm({
    defaultValues: test,
  });

  return (
    <form
      onSubmit={handleSubmit(onSave)}
      className="grid grid-cols-4 gap-4 border p-4 rounded-lg"
    >
      <FormInput name="name" label="Test Name" control={control}  />
      <FormInput name="date" label="Date" control={control} type="date"  />
      <FormInput
        name="durationMinutes"
        label="Duration (min)"
        control={control}
        type="number"
        // disabled={!editable}
      />
      {editable && (
        <Button type="submit" className="col-span-4 justify-self-end">
          Save Test
        </Button>
      )}
    </form>
  );
}
