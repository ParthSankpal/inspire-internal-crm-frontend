"use client";

import { useState, useEffect, useCallback } from "react";
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
import { FormSelect } from "@/components/common/Forms/FormSelect";

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


  const classOptions = [
    { value: "08", label: "Class 8" },
    { value: "09", label: "Class 9" },
    { value: "10", label: "Class 10" },
    { value: "11", label: "Class 11" },
    { value: "12", label: "Class 12" },
  ];



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
      class: "08",
      remarks: "",
    }
  });

  // ✅ Fetch paginated batches
  const fetchBatches = useCallback(async () => {
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
  }, [pagination.page, pagination.limit, notify]);


  useEffect(() => {
    fetchBatches();
  }, [fetchBatches]);

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
    {
      id: "name",
      label: "Batch Name",
      accessor: (row: Batch) => row.name,
    },
    {
      id: "class",
      label: "Class",
      accessor: (row: Batch) => row.class,
    },
    {
      id: "startYear",
      label: "Start Year",
      accessor: (row: Batch) => row.startYear,
    },
    {
      id: "endYear",
      label: "End Year",
      accessor: (row: Batch) => row.startYear + row.durationYears,
    },
    {
      id: "durationYears",
      label: "Duration (Years)",
      accessor: (row: Batch) => row.durationYears,
    },
    {
      id: "totalStudents",
      label: "Total Students",
      accessor: (row: Batch) => row.totalStudents ?? 0,
    },
    {
      id: "remarks",
      label: "Remarks",
      accessor: (row: Batch) => row.remarks ?? "",
    },
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
            class: row.class,
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

        <div className=" space-y-4">

          <FormInput name="name" placeholder="2026 Batch" label="Batch Name" control={control} error={errors.name?.message} />
          <FormInput name="startYear" label="Start Year" control={control} type="number" error={errors.startYear?.message} />
          <FormSelect
            name="class"
            label="Class"
            control={control}
            options={classOptions}
            placeholder="Select Class"
            error={errors.class?.message}
          />

          <FormInput name="durationYears" label="Duration (Years)" control={control} type="number" error={errors.durationYears?.message} />
          <FormInput name="remarks" label="Remarks" control={control} error={errors.remarks?.message} />
        </div>
      </FormDialogWrapper>

      <FormDialogWrapper
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Edit Batch"
        onSubmit={handleSubmit(handleUpdate)}
        submitLabel="Update"
      >
        <div className=" space-y-4">

          <FormInput name="name" label="Batch Name" control={control} error={errors.name?.message} />
          <FormInput name="startYear" label="Start Year" control={control} type="number" error={errors.startYear?.message} />
          <FormSelect
            name="class"
            label="Class"
            control={control}
            options={classOptions}
            placeholder="Select Class"
            error={errors.class?.message}
          />

          <FormInput name="durationYears" label="Duration (Years)" control={control} type="number" error={errors.durationYears?.message} />
          <FormInput name="remarks" label="Remarks" control={control} error={errors.remarks?.message} />
        </div>
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
