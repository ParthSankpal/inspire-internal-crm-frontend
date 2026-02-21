"use client";

import { FormDialogWrapper } from "@/components/common/Forms/FormDialogWrapper";
import { ConfirmDialog } from "@/components/common/dialogs/ConfirmDialog";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { School } from "@/features/schools/types";
import SchoolForm from "./SchoolForm";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  deleteOpen: boolean;
  setDeleteOpen: (v: boolean) => void;
  selected: School | null;
  onAdd: (d: Partial<School>) => Promise<void>;
  onEdit: (d: Partial<School>) => Promise<void>;
  onDelete: () => Promise<void>;
};

export default function SchoolModals({
  open,
  setOpen,
  deleteOpen,
  setDeleteOpen,
  selected,
  onAdd,
  onEdit,
  onDelete,
}: Props) {
  const { control, handleSubmit, reset } = useForm<Partial<School>>();

  useEffect(() => {
    if (selected) reset(selected);
    else reset({});
  }, [selected, reset]);

  const submit = async (data: Partial<School>) => {
    if (selected) await onEdit(data);
    else await onAdd(data);

    setOpen(false);
    reset();
  };

  return (
    <>
      <FormDialogWrapper
        open={open}
        onOpenChange={setOpen}
        title={selected ? "Edit School" : "Add School"}
        onSubmit={handleSubmit(submit)}
      >
        <SchoolForm control={control} />
      </FormDialogWrapper>

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete School"
        description="Are you sure you want to delete this school?"
        onConfirm={onDelete}
      />
    </>
  );
}