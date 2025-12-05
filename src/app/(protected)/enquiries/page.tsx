"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/DataTable";
import { ConfirmDialog } from "@/components/common/dialogs/ConfirmDialog";
import { FormDialog } from "@/components/common/dialogs/FormDialog";
import { Input } from "@/components/ui/input";

import {
  getAllEnquiries,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  addReminder,
  updateReminder,
  deleteReminder,
  getReminders,
} from "@/api/enquiries";

import {
  Enquiry,
  EnquiryFormData,
  enquirySchema,
  Reminder,
  ReminderFormData,
  reminderSchema,
} from "@/features/enquiries/types";
import { User } from "@/features/auth/types";
import { getAllUsers } from "@/api/authApi";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCrud } from "@/hooks/useCrud";
import { useNotify } from "@/components/common/NotificationProvider";
import { FormSelect } from "@/components/common/Forms/FormSelect";
import { FormMultiSelect } from "@/components/common/Forms/FormMultiSelect";
import { FormInput } from "@/components/common/Forms/FormInput";
import { FormDialogWrapper } from "@/components/common/Forms/FormDialogWrapper";
import { FormField } from "@/components/common/Forms/FormField";

export default function EnquiriesPage() {
  const notify = useNotify();

  // 🧭 Pagination & search states
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 1,
  });
  const [search, setSearch] = useState("");


  const fetchEnquiries = useCallback(async () => {
    const res = await getAllEnquiries(pagination.page, pagination.limit, search);
    setPagination(prev => {
      const next = { ...prev, totalItems: res.pagination.totalItems, totalPages: res.pagination.totalPages };
      if (prev.totalItems === next.totalItems && prev.totalPages === next.totalPages) return prev;
      return next;
    });

    return res.data;
  }, [pagination.page, pagination.limit, search]);


  // 🧭 CRUD Hook setup
  const {
    items: enquiries,
    loading,
    load,
    create,
    update,
    remove,
  } = useCrud<
    Enquiry,
    EnquiryFormData,
    EnquiryFormData,
    Enquiry,
    Enquiry
  >({
    fetchFn: fetchEnquiries,
    createFn: createEnquiry,
    updateFn: updateEnquiry,
    deleteFn: deleteEnquiry,
  });


  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [reminderOpen, setReminderOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [editingReminderId, setEditingReminderId] = useState<string | null>(null);
  const [counselors, setCounselors] = useState<User[]>([]);

  // 🧭 Load counselors for dropdown
  const loadCounselors = useCallback(async () => {
    try {
      const usersRes = await getAllUsers(1, 100);
      setCounselors(usersRes.data.filter((u) => u.role === "counselor"));
    } catch {
      notify("Failed to load counselors", "error");
    }
  }, [notify]);

useEffect(() => {
  load();
  loadCounselors();
}, [load, loadCounselors]);


  // 🧭 React Hook Form setup
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      studentName: "",
      phoneNo: "",
      email: "",
      schoolName: "",
      standard: "",
      parentNames: {
        fatherName: "",
        fatherOccupation: "",
        motherName: "",
        motherOccupation: "",
      },
      targetExams: [],
      status: "new",
      counselor: { id: "", name: "" },
      reference: "",
      referenceContact: "",
      address: "",
      note: "",
    },
  });


  // 🧭 Reminder form
  const {
    register: registerReminder,
    handleSubmit: handleSubmitReminder,
    reset: resetReminder,
    formState: { errors: reminderErrors },
  } = useForm<ReminderFormData>({
    resolver: zodResolver(reminderSchema),
    defaultValues: { date: "", message: "" },
  });

  // 🧭 Reminder modal handlers
  const openReminderModal = async (row: Enquiry) => {
    setSelectedEnquiry(row);
    try {
      const data = await getReminders(row._id!);
      setReminders(data);
    } catch {
      notify("Failed to load reminders", "error");
    }
    resetReminder();
    setEditingReminderId(null);
    setReminderOpen(true);
  };

  const handleSaveReminder = async (data: ReminderFormData) => {
    if (!selectedEnquiry?._id) return;
    try {
      if (editingReminderId) {
        await updateReminder(selectedEnquiry._id, editingReminderId, data);
        notify("Reminder updated", "success");
      } else {
        await addReminder(selectedEnquiry._id, data);
        notify("Reminder added", "success");
      }
      setReminders(await getReminders(selectedEnquiry._id));
      resetReminder();
      setEditingReminderId(null);
    } catch {
      notify("Failed to save reminder", "error");
    }
  };

  const handleDeleteReminder = async (id: string) => {
    if (!selectedEnquiry?._id) return;
    try {
      await deleteReminder(selectedEnquiry._id, id);
      setReminders(await getReminders(selectedEnquiry._id));
      notify("Reminder deleted", "success");
    } catch {
      notify("Failed to delete reminder", "error");
    }
  };

  // 🧭 Enquiry CRUD handlers
  const handleCreate = async (data: EnquiryFormData) => {
    await create(data);
    setAddOpen(false);
    reset();
  };

  const handleUpdate = async (data: EnquiryFormData) => {
    if (!selectedEnquiry?._id) return;
    await update(selectedEnquiry._id, data);
    setEditOpen(false);
    reset();
  };

  const handleDelete = async () => {
    if (!selectedEnquiry?._id) return;
    await remove(selectedEnquiry._id);
    setDeleteOpen(false);
  };

 const columns = [
  { id: "studentName", label: "Student Name" },
  { id: "phoneNo", label: "Phone" },
  { id: "schoolName", label: "School" },
  { id: "standard", label: "Standard" },
  { id: "status", label: "Status" },
];


  const rowActions = (row: Enquiry) => (
    <div className="flex gap-2 justify-center">
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          setSelectedEnquiry(row);
          reset(row);
          setEditOpen(true);
        }}
      >
        Edit
      </Button>
      <Button size="sm" variant="outline" onClick={() => openReminderModal(row)}>
        Reminder
      </Button>
      <Button
        size="sm"
        variant="destructive"
        onClick={() => {
          setSelectedEnquiry(row);
          setDeleteOpen(true);
        }}
      >
        Delete
      </Button>
    </div>
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Enquiries</h1>
        <Button
          onClick={() => {
            reset();
            setAddOpen(true);
          }}
        >
          Add Enquiry
        </Button>
      </div>

      {/* Table */}
      <DataTable<Enquiry>
        columns={columns}
        data={enquiries}
        totalItems={pagination.totalItems}
        page={pagination.page}
        limit={pagination.limit}
        serverSide
        searchable
        onPaginationChange={(info) =>
          setPagination((prev) => ({ ...prev, page: info.page, limit: info.limit }))
        }
        onSearchChange={(val) => setSearch(val)}
        rowActions={rowActions}
        emptyMessage={loading ? "Loading..." : "No enquiries found"}
        showIndex
      />

      {/* Add Enquiry */}
      <FormDialogWrapper
        open={addOpen}
        onOpenChange={setAddOpen}
        title="Add Enquiry"
        onSubmit={handleSubmit(handleCreate)}
      >
        <div className="  grid md:grid-cols-2 gap-4">

          <FormInput name="studentName" label="Student Name" control={control} error={errors.studentName?.message} />
          <FormInput name="phoneNo" label="Phone" control={control} error={errors.phoneNo?.message} />
          <FormInput name="email" label="Email" control={control} />
          <FormInput name="schoolName" label="School" control={control} />
          <FormInput name="standard" label="Standard" control={control} />
          <FormInput name="parentNames.fatherName" label="Father Name" control={control} />
          <FormInput name="parentNames.fatherOccupation" label="Father Occupation" control={control} />
          <FormInput name="parentNames.motherName" label="Mother Name" control={control} />
          <FormInput name="parentNames.motherOccupation" label="Mother Occupation" control={control} />

          <FormMultiSelect
            name="targetExams"
            label="Target Exams"
            control={control}
            error={errors.targetExams?.message}
            options={[
              { value: "NEET", label: "NEET" },
              { value: "IIT-JEE", label: "IIT-JEE" },
              { value: "Foundation", label: "Foundation" },
              { value: "Other", label: "Other" },
            ]}
          />

          <FormSelect
            name="status"
            label="Status"
            control={control}
            options={[
              { value: "new", label: "New" },
              { value: "counseling_done", label: "Counseling Done" },
              { value: "admitted", label: "Admitted" },
              { value: "dropped", label: "Dropped" },
            ]}
          />

          <FormSelect
            name="counselor.id"
            label="Counselor"
            control={control}
            placeholder="Select counselor"
            options={counselors.map((c) => ({ value: c._id, label: c.name }))}
            onValueChange={(val) => {
              const selected = counselors.find((c) => c._id === val);
              reset((prev) => ({
                ...prev,
                counselor: {
                  id: selected?._id || "",
                  name: selected?.name || "",
                },
              }));
            }}
          />

          <FormInput name="reference" label="Reference" control={control} />
          <FormInput name="address" label="Address" control={control} />
          <FormInput name="note" label="Note" control={control} />
        </div>
      </FormDialogWrapper>

      {/* Edit Enquiry */}
      <FormDialogWrapper
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Edit Enquiry"
        onSubmit={handleSubmit(handleUpdate)}
        submitLabel="Update"
      >
        <FormInput name="studentName" label="Student Name" control={control} error={errors.studentName?.message} />
        <FormInput name="phoneNo" label="Phone" control={control} error={errors.phoneNo?.message} />
        <FormInput name="email" label="Email" control={control} />
        <FormInput name="schoolName" label="School" control={control} />
        <FormInput name="standard" label="Standard" control={control} />
        <FormInput name="parentNames.fatherName" label="Father Name" control={control} />
        <FormInput name="parentNames.fatherOccupation" label="Father Occupation" control={control} />
        <FormInput name="parentNames.motherName" label="Mother Name" control={control} />
        <FormInput name="parentNames.motherOccupation" label="Mother Occupation" control={control} />

        <FormMultiSelect
          name="targetExams"
          label="Target Exams"
          control={control}
          error={errors.targetExams?.message}
          options={[
            { value: "NEET", label: "NEET" },
            { value: "IIT-JEE", label: "IIT-JEE" },
            { value: "Foundation", label: "Foundation" },
            { value: "Other", label: "Other" },
          ]}
        />

        <FormSelect
          name="status"
          label="Status"
          control={control}
          options={[
            { value: "new", label: "New" },
            { value: "counseling_done", label: "Counseling Done" },
            { value: "admitted", label: "Admitted" },
            { value: "dropped", label: "Dropped" },
          ]}
        />

        <FormSelect
          name="counselor.id"
          label="Counselor"
          control={control}
          placeholder="Select counselor"
          options={counselors.map((c) => ({ value: c._id, label: c.name }))}
          onValueChange={(val) => {
            const selected = counselors.find((c) => c._id === val);
            reset((prev) => ({
              ...prev,
              counselor: {
                id: selected?._id || "",
                name: selected?.name || "",
              },
            }));
          }}
        />

        <FormInput name="reference" label="Reference" control={control} />
        <FormInput name="address" label="Address" control={control} />
        <FormInput name="note" label="Note" control={control} />
      </FormDialogWrapper>

      {/* Reminder Modal */}
      <FormDialog
        open={reminderOpen}
        onOpenChange={setReminderOpen}
        title={`Reminders for ${selectedEnquiry?.studentName}`}
        onSubmit={handleSubmitReminder(handleSaveReminder)}
        submitLabel={editingReminderId ? "Update Reminder" : "Add Reminder"}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            {reminders.length ? (
              reminders.map((r) => (
                <div key={r._id} className="flex items-center justify-between border p-2 rounded">
                  <div>
                    <p className="text-sm font-medium">{new Date(r.date).toDateString()}</p>
                    <p className="text-xs text-gray-600">{r.message}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        resetReminder({
                          date: r.date.split("T")[0],
                          message: r.message || "",
                        });
                        setEditingReminderId(r._id!);
                      }}
                    >
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteReminder(r._id!)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No reminders yet</p>
            )}
          </div>

          <div className="space-y-3 border-t pt-3">
            <h3 className="text-sm font-semibold">
              {editingReminderId ? "Edit Reminder" : "Add New Reminder"}
            </h3>
            <FormField label="Reminder Date" error={reminderErrors.date?.message}>
              <Input type="date" {...registerReminder("date")} />
            </FormField>
            <FormField label="Message" error={reminderErrors.message?.message}>
              <Input placeholder="Message" {...registerReminder("message")} />
            </FormField>
          </div>
        </div>
      </FormDialog>

      {/* Delete Confirm */}
      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Enquiry"
        description={`Are you sure you want to delete ${selectedEnquiry?.studentName}?`}
        onConfirm={handleDelete}
      />
    </div>
  );
}
