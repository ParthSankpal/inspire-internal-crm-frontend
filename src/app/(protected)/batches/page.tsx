"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/DataTable";
import { ConfirmDialog } from "@/components/common/dialogs/ConfirmDialog";
import { FormDialogWrapper } from "@/components/common/Forms/FormDialogWrapper";
import { FormInput } from "@/components/common/Forms/FormInput";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNotify } from "@/components/common/NotificationProvider";
import { Batch, BatchFormData, batchSchema } from "@/features/batches/types";
import { createBatch, deleteBatch, getAllBatches, updateBatch } from "@/api/batchApi";

export default function BatchesPage() {
  const notify = useNotify();

  const [batches, setBatches] = useState<Batch[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BatchFormData>({
    resolver: zodResolver(batchSchema) as unknown as Resolver<BatchFormData>,
    defaultValues: {
      name: "",
      startYear: new Date().getFullYear(),
      durationYears: 2,
      remarks: "",
    },
  });

  // ✅ Fetch paginated batches
  const fetchBatches = async () => {
    try {
      setLoading(true);
      const res = await getAllBatches(pagination.page, pagination.limit);
      setBatches(res.data);
      setPagination((prev) => ({
        ...prev,
        totalItems: res.pagination.totalItems,
        totalPages: res.pagination.totalPages,
      }));
    } catch (err) {
      console.error(err);
      notify("Failed to fetch batches", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, [pagination.page, pagination.limit]);

  // ---- CRUD Actions ----
  const handleCreate: SubmitHandler<BatchFormData> = async (data) => {
    await createBatch(data);
    notify("Batch created successfully", "success");
    setAddOpen(false);
    reset();
    fetchBatches();
  };

  const handleUpdate: SubmitHandler<BatchFormData> = async (data) => {
    if (!selectedBatch?._id) return;
    await updateBatch(selectedBatch._id, data);
    notify("Batch updated successfully", "success");
    setEditOpen(false);
    reset();
    fetchBatches();
  };

  const handleDelete = async () => {
    if (!selectedBatch?._id) return;
    await deleteBatch(selectedBatch._id);
    notify("Batch deleted successfully", "success");
    setDeleteOpen(false);
    fetchBatches();
  };

  const columns = [
    { id: "name", label: "Batch Name" },
    { id: "startYear", label: "Start Year" },
    { id: "endYear", label: "End Year" },
    { id: "durationYears", label: "Duration (Years)" },
    { id: "totalStudents", label: "Total Students" },
    { id: "remarks", label: "Remarks" },
  ];

  const rowActions = (row: Batch) => (
    <div className="flex gap-2 justify-center">
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          setSelectedBatch(row);
          reset({
            name: row.name,
            startYear: row.startYear,
            durationYears: row.durationYears,
            remarks: row.remarks ?? "",
          });
          setEditOpen(true);
        }}
      >
        Edit
      </Button>
      <Button
        size="sm"
        variant="destructive"
        onClick={() => {
          setSelectedBatch(row);
          setDeleteOpen(true);
        }}
      >
        Delete
      </Button>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Batches</h1>
        <Button
          onClick={() => {
            reset({
              name: "",
              startYear: new Date().getFullYear(),
              durationYears: 2,
              remarks: "",
            });
            setAddOpen(true);
          }}
        >
          Add Batch
        </Button>
      </div>

      {/* ✅ Paginated DataTable */}
      <DataTable<Batch>
        columns={columns}
        data={batches}
        totalItems={pagination.totalItems}
        page={pagination.page}
        limit={pagination.limit}
        serverSide
        onPaginationChange={(info) =>
          setPagination((prev) => ({
            ...prev,
            page: info.page,
            limit: info.limit,
          }))
        }
        rowActions={rowActions}
        showIndex
        emptyMessage={loading ? "Loading..." : "No batches found"}
      />

      {/* ✅ Modals and Confirm Dialog */}
      <FormDialogWrapper
        open={addOpen}
        onOpenChange={setAddOpen}
        title="Add Batch"
        onSubmit={handleSubmit(handleCreate)}
      >
        <FormInput name="name" placeholder="2026 Batch" label="Batch Name" control={control} error={errors.name?.message} />
        <FormInput name="startYear" label="Start Year" control={control} type="number" error={errors.startYear?.message} />
        <FormInput name="durationYears" label="Duration (Years)" control={control} type="number" error={errors.durationYears?.message} />
        <FormInput name="remarks" label="Remarks" control={control} error={errors.remarks?.message} />
      </FormDialogWrapper>

      <FormDialogWrapper
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Edit Batch"
        onSubmit={handleSubmit(handleUpdate)}
        submitLabel="Update"
      >
        <FormInput name="name" label="Batch Name" control={control} error={errors.name?.message} />
        <FormInput name="startYear" label="Start Year" control={control} type="number" error={errors.startYear?.message} />
        <FormInput name="durationYears" label="Duration (Years)" control={control} type="number" error={errors.durationYears?.message} />
        <FormInput name="remarks" label="Remarks" control={control} error={errors.remarks?.message} />
      </FormDialogWrapper>

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Batch"
        description={`Are you sure you want to delete ${selectedBatch?.name}?`}
        onConfirm={handleDelete}
      />
    </div>
  );
}
