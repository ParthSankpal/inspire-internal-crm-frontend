"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/DataTable";
import { ConfirmDialog } from "@/components/common/dialogs/ConfirmDialog";
import { FormDialog } from "@/components/common/dialogs/FormDialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select as ShadcnSelect,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  getAllEnquiries,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  addReminder,
  updateReminder,
  deleteReminder,
  getReminders, // ✅ added
} from "@/api/enquiries";

import Select from "react-select";

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

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// ✅ Notifications
import { useNotify } from "@/components/common/NotificationProvider";

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog state
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [reminderOpen, setReminderOpen] = useState(false);

  // Selected data
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [counselors, setCounselors] = useState<User[]>([]);

  // Reminder state
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [editingReminderId, setEditingReminderId] = useState<string | null>(null);

  const notify = useNotify();

  useEffect(() => {
    loadEnquiries();
    loadCounselors();
  }, []);

  const loadEnquiries = async () => {
    setLoading(true);
    try {
      const data = await getAllEnquiries();
      setEnquiries(data);
    } catch {
      notify("Failed to load enquiries", "error");
    } finally {
      setLoading(false);
    }
  };

  const loadCounselors = async () => {
    try {
      const allUsers = await getAllUsers();
      setCounselors(allUsers.filter((u) => u.role === "counselor"));
    } catch {
      notify("Failed to load counselors", "error");
    }
  };

  // 🟢 Load reminders for an enquiry
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

  // ✅ Enquiry Form (RHF + Zod)
  const {
    register,
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

  // ✅ Reminder Form
  const {
    register: registerReminder,
    handleSubmit: handleSubmitReminder,
    reset: resetReminder,
    formState: { errors: reminderErrors },
  } = useForm<ReminderFormData>({
    resolver: zodResolver(reminderSchema),
    defaultValues: { date: "", message: "" },
  });

  // ✅ CRUD for Enquiries
  const handleCreate = async (data: EnquiryFormData) => {
    try {
      await createEnquiry(data);
      notify("Enquiry created successfully", "success");
      setAddOpen(false);
      await loadEnquiries();
      reset();
    } catch {
      notify("Failed to create enquiry", "error");
    }
  };

  const handleUpdate = async (data: EnquiryFormData) => {
    if (!selectedEnquiry?._id) return;
    try {
      await updateEnquiry(selectedEnquiry._id, data);
      notify("Enquiry updated successfully", "success");
      setEditOpen(false);
      await loadEnquiries();
      reset();
    } catch {
      notify("Failed to update enquiry", "error");
    }
  };

  const handleDelete = async () => {
    if (!selectedEnquiry?._id) return;
    try {
      await deleteEnquiry(selectedEnquiry._id);
      notify("Enquiry deleted successfully", "success");
      await loadEnquiries();
      setDeleteOpen(false);
    } catch {
      notify("Failed to delete enquiry", "error");
    }
  };

  // ✅ CRUD for Reminders
  const handleSaveReminder = async (data: ReminderFormData) => {
    if (!selectedEnquiry?._id) return;
    try {
      if (editingReminderId) {
        await updateReminder(selectedEnquiry._id, editingReminderId, data);
        notify("Reminder updated successfully", "success");
        setEditingReminderId(null);
      } else {
        await addReminder(selectedEnquiry._id, data);
        notify("Reminder added successfully", "success");
      }
      resetReminder();
      setReminders(await getReminders(selectedEnquiry._id)); // ✅ reload reminders only
    } catch {
      notify("Failed to save reminder", "error");
    }
  };

  const handleDeleteReminder = async (reminderId: string) => {
    if (!selectedEnquiry?._id) return;
    try {
      await deleteReminder(selectedEnquiry._id, reminderId);
      notify("Reminder deleted", "success");
      setReminders(await getReminders(selectedEnquiry._id));
    } catch {
      notify("Failed to delete reminder", "error");
    }
  };

  // ----- Field Wrapper -----
  const Field = ({
    label,
    children,
    error,
  }: {
    label: string;
    children: React.ReactNode;
    error?: string;
  }) => (
    <div className="flex flex-col space-y-1">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );

  // ----- Enquiry Form -----
  const EnquiryForm =
    (onSubmit:
      (data: EnquiryFormData) => void) => (
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-4">
        {/* Student Info */}
        <Field label="Student Name" error={errors.studentName?.message}>
          <Input {...register("studentName")} />
        </Field>
        <Field label="Phone" error={errors.phoneNo?.message}>
          <Input {...register("phoneNo")} />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <Input {...register("email")} />
        </Field>
        <Field label="School" error={errors.schoolName?.message}>
          <Input {...register("schoolName")} />
        </Field>
        <Field label="Standard">
          <Input {...register("standard")} />
        </Field>
        {/* Parents */}
        <Field label="Father Name">
          <Input {...register("parentNames.fatherName")} />
        </Field>
        <Field label="Father Occupation">
          <Input {...register("parentNames.fatherOccupation")} />
        </Field>
        <Field label="Mother Name">
          <Input {...register("parentNames.motherName")} />
        </Field>
        <Field label="Mother Occupation">
          <Input {...register("parentNames.motherOccupation")} />
        </Field>
        {/* Target Exams */}
        <Field label="Target Exams" error={errors.targetExams?.message}>
          <Controller name="targetExams"
            control={control} render={({ field }) => (
              <Select
                isMulti
                options={[
                  { value: "NEET", label: "NEET" },
                  { value: "IIT-JEE", label: "IIT-JEE" },
                  { value: "Foundation", label: "Foundation" },
                  { value: "Other", label: "Other" },
                ]}
                value={field.value.map((exam) => ({ value: exam, label: exam, }))}
                onChange={(selected) => field.onChange(selected.map((s) => s.value))}
                placeholder="Select exams..." />)} />
        </Field>
        {/* Status */}
        <Field label="Status" error={errors.status?.message}>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <ShadcnSelect
                value={field.value}
                onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="counseling_done">Counseling Done</SelectItem>
                  <SelectItem value="admitted">Admitted</SelectItem>
                  <SelectItem value="dropped">Dropped</SelectItem>
                </SelectContent>
              </ShadcnSelect>)} />
        </Field>
        {/* Counselor */}
        <Field label="Counselor">
          <Controller
            name="counselor.id"
            control={control}
            render={({ field }) => (
              <ShadcnSelect value={field.value || ""}
                onValueChange={(val) => {
                  const selected = counselors.find((c) => c._id === val);
                  field.onChange(selected?._id || "");
                  reset((prev) => ({ ...prev, counselor: { id: selected?._id, name: selected?.name, }, }));
                }} >
                <SelectTrigger>
                  <SelectValue placeholder="Select counselor" />
                </SelectTrigger>
                <SelectContent>
                  {counselors.map((c) => (<SelectItem key={c._id} value={c._id}> {c.name} </SelectItem>))}
                </SelectContent>
              </ShadcnSelect>)} />
        </Field>
        {/* Reference + Address + Notes */}
        <Field label="Reference">
          <Input {...register("reference")} />
        </Field>
        <Field label="Reference Contact">
          <Input {...register("referenceContact")} />
        </Field> <Field label="Address">
          <Input {...register("address")} />
        </Field> <Field label="Note">
          <Input {...register("note")} />
        </Field>
      </form>
    );


  return (
    <div className="p-6">
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

      <DataTable
        columns={columns}
        data={enquiries}
        rowActions={rowActions}
        showIndex
        emptyMessage={loading ? "Loading..." : "No enquiries found"}
      />


      {/* Add Enquiry */}
      <FormDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        title="Add Enquiry"
        onSubmit={handleSubmit(handleCreate)}
      >
        {EnquiryForm(handleCreate)}
      </FormDialog>

      {/* Edit Enquiry */}
      <FormDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Edit Enquiry"
        onSubmit={handleSubmit(handleUpdate)}
        submitLabel="Update"
      >
        {EnquiryForm(handleUpdate)}
      </FormDialog>

      {/* Reminder Modal */}
      <FormDialog
        open={reminderOpen}
        onOpenChange={setReminderOpen}
        title={`Reminders for ${selectedEnquiry?.studentName}`}
        onSubmit={handleSubmitReminder(handleSaveReminder)}
        submitLabel={editingReminderId ? "Update Reminder" : "Add Reminder"}
      >
        <div className="space-y-4">
          {/* Existing Reminders */}
          <div className="space-y-2">
            {reminders.length ? (
              reminders.map((r) => (
                <div
                  key={r._id}
                  className="flex items-center justify-between border p-2 rounded"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {new Date(r.date).toDateString()}
                    </p>
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
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteReminder(r._id!)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No reminders yet</p>
            )}
          </div>

          {/* Add/Edit Reminder Form */}
          <div className="space-y-3 border-t pt-3">
            <h3 className="text-sm font-semibold">
              {editingReminderId ? "Edit Reminder" : "Add New Reminder"}
            </h3>
            <Field label="Reminder Date" error={reminderErrors.date?.message}>
              <Input type="date" {...registerReminder("date")} />
            </Field>
            <Field label="Message" error={reminderErrors.message?.message}>
              <Input placeholder="Message" {...registerReminder("message")} />
            </Field>
          </div>
        </div>
      </FormDialog>

      {/* Delete Enquiry Confirmation */}
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
