// src/app/students/StudentsTable.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/DataTable";
import { FormDialogWrapper } from "@/components/common/Forms/FormDialogWrapper";
import { ConfirmDialog } from "@/components/common/dialogs/ConfirmDialog";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  restoreStudent,
} from "@/api/students";
import { getAllBatches } from "@/api/batchApi";
import { Student, StudentFormData, studentSchema } from "@/features/students/types";
import { FormInput } from "@/components/common/Forms/FormInput";
import { FormSelect } from "@/components/common/Forms/FormSelect";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Batch } from "@/features/batches/types";
import { useNotify } from "@/components/common/NotificationProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { FormDatePicker } from "@/components/common/Forms/FormDatePicker";

export const StudentsTable = ({ isArchived = false }: { isArchived?: boolean }) => {
  const router = useRouter();
  const [items, setItems] = useState<Student[]>([]);
  const [batches, setBatches] = useState<{ value: string; label: string }[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<string>("");
  const [selected, setSelected] = useState<Student | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 1,
  });
  const [search, setSearch] = useState("");

  const notify = useNotify();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema) as any,
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "Male",
      dob: "",
      aadhaarNo: "",
      contact: { phone: "", email: "" },
      parent: {
        fatherName: "",
        motherName: "",
        fatherPhone: "",
        motherPhone: "",
        occupation: "",
      },
      address: { line1: "", line2: "", city: "", state: "", pincode: "" },
      academicInfo: {
        schoolName: "",
        grade10Marks: "",
        grade10PassingYear: "",
      },
      course: "",
      batch: "",
      targetExam: "IIT JEE",
      admissionDate: "",
      status: "Active",
      remarks: "",
      fees: {
        baseFees: 0,
        discountType: "None",
        discountValue: 0,
        finalFees: 0,
        installments: [],
      },
    },
  });

  // Installments dynamic array
  const { fields: installments, append, remove } = useFieldArray({
    control,
    name: "fees.installments",
  });

  // Auto compute finalFees = baseFees - discountValue (>= 0)
  const baseFees = watch("fees.baseFees");
  const discountValue = watch("fees.discountValue");
  useEffect(() => {
    const bf = Number(baseFees || 0);
    const dv = Number(discountValue || 0);
    const final = Math.max(bf - dv, 0);
    setValue("fees.finalFees", final);
  }, [baseFees, discountValue, setValue]);

  // Fetch batches
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

  // Load students
  const loadStudents = async () => {
    setLoading(true);
    try {
      const res = await getAllStudents({
        page: pagination.page,
        limit: pagination.limit,
        search,
        batchId: selectedBatch,
        isArchived,
      });
      setItems(res.data);
      setPagination((prev) => ({
        ...prev,
        totalItems: res.pagination.totalItems,
        totalPages: res.pagination.totalPages,
      }));
    } catch {
      notify("Failed to load students", "error");
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    loadStudents();
  }, [pagination.page, pagination.limit, search, selectedBatch, isArchived]);

  // Create student
  const handleCreate = async (data: StudentFormData) => {
    try {
      await createStudent(data);
      notify("Student created successfully 🎉", "success");
      setOpenForm(false);
      reset();
      loadStudents();
    } catch (err: any) {
      notify(err?.message || "Failed to create student", "error");
    }
  };

  // Update student
  const handleUpdate = async (data: StudentFormData) => {
    if (!selected?._id) return;
    try {
      await updateStudent(selected._id, data);
      notify("Student updated successfully ✅", "success");
      setEditOpen(false);
      reset();
      loadStudents();
    } catch (err: any) {
      notify(err?.message || "Failed to update student", "error");
    }
  };

  // Delete (archive)
  const handleDelete = async () => {
    if (!selected?._id) return;
    try {
      await deleteStudent(selected._id);
      notify("Student archived 🗃️", "info");
      setDeleteOpen(false);
      loadStudents();
    } catch {
      notify("Failed to archive student", "error");
    }
  };

  // Restore
  const handleRestore = async (id: string) => {
    try {
      await restoreStudent(id);
      notify("Student restored successfully ♻️", "success");
      loadStudents();
    } catch {
      notify("Failed to restore student", "error");
    }
  };

  // Columns
  const columns = [
    { id: "studentId", label: "ID" },
    {
      id: "firstName",
      label: "Name",
      accessor: (r: Student) => `${r.firstName} ${r.lastName}`,
    },
    { id: "course", label: "Course" },
    { id: "targetExam", label: "Exam" },
    {
      id: "batch",
      label: "Batch",
      accessor: (r: Student) => r.batch?.name || "—",
    },
    { id: "status", label: "Status" },
  ];

  const rowActions = (row: Student) => (
    <div className="flex gap-2 justify-center">

      <Button
        size="sm"
        variant="outline"
        onClick={() => router.push(`/students/${row._id}`)}
      >
        View
      </Button>
      {!isArchived ? (
        <>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setSelected(row);
              reset({
                ...row,
                batch: row.batch?._id || "",
                fees: row.fees || {
                  baseFees: 0,
                  discountType: "None",
                  discountValue: 0,
                  finalFees: 0,
                  installments: [],
                },
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
              setSelected(row);
              setDeleteOpen(true);
            }}
          >
            Archive
          </Button>
        </>
      ) : (
        <Button size="sm" onClick={() => handleRestore(row._id!)}>
          Restore
        </Button>
      )}
    </div>
  );

  // The form JSX
  const renderStudentForm = () => (
    <Accordion type="single" collapsible className="w-full space-y-2">
      {/* Personal */}
      <AccordionItem value="personal">
        <AccordionTrigger>👤 Personal Information</AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-4">
          <FormInput name="firstName" label="First Name" control={control} />
          <FormInput name="middleName" label="Middle Name" control={control} />
          <FormInput name="lastName" label="Last Name" control={control} />
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
          <FormDatePicker name="dob" label="Date of Birth" control={control} />
          <FormInput name="aadhaarNo" label="Aadhaar No" control={control} />
        </AccordionContent>
      </AccordionItem>

      {/* Contact */}
      <AccordionItem value="contact">
        <AccordionTrigger>📞 Contact</AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-4">
          <FormInput name="contact.phone" label="Phone" control={control} />
          <FormInput name="contact.email" label="Email" control={control} />
        </AccordionContent>
      </AccordionItem>

      {/* Parent */}
      <AccordionItem value="parent">
        <AccordionTrigger>👨‍👩‍👧 Parent Information</AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-4">
          <FormInput name="parent.fatherName" label="Father Name" control={control} />
          <FormInput name="parent.motherName" label="Mother Name" control={control} />
          <FormInput name="parent.fatherPhone" label="Father Phone" control={control} />
          <FormInput name="parent.motherPhone" label="Mother Phone" control={control} />
          <FormInput name="parent.occupation" label="Occupation" control={control} />
        </AccordionContent>
      </AccordionItem>

      {/* Address */}
      <AccordionItem value="address">
        <AccordionTrigger>🏠 Address</AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-4">
          <FormInput name="address.line1" label="Line 1" control={control} />
          <FormInput name="address.line2" label="Line 2" control={control} />
          <FormInput name="address.city" label="City" control={control} />
          <FormInput name="address.state" label="State" control={control} />
          <FormInput name="address.pincode" label="Pincode" control={control} />
        </AccordionContent>
      </AccordionItem>

      {/* Academic */}
      <AccordionItem value="academic">
        <AccordionTrigger>🎓 Academic Info</AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-4">
          <FormInput name="academicInfo.schoolName" label="School" control={control} />
          <FormInput name="academicInfo.grade10Marks" label="10th Marks" control={control} />
          <FormInput name="academicInfo.grade10PassingYear" label="10th Passing Year" control={control} />
        </AccordionContent>
      </AccordionItem>

      {/* Admission */}
      <AccordionItem value="admission">
        <AccordionTrigger>🧾 Admission Details</AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-4">
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
          <FormDatePicker name="admissionDate" label="Admission Date" control={control} />
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
        </AccordionContent>
      </AccordionItem>

      {/* Fees */}
      <AccordionItem value="fees">
        <AccordionTrigger>💰 Fees Details</AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-4">
          <FormInput name="fees.baseFees" label="Base Fees" control={control} type="number" />
          <FormSelect
            name="fees.discountType"
            label="Discount Type"
            control={control}
            options={[
              { value: "None", label: "None" },
              { value: "Onetime", label: "Onetime" },
              { value: "Installments", label: "Installments" },
            ]}
          />
          <FormInput name="fees.discountValue" label="Discount Value" control={control} type="number" />
          <FormInput name="fees.finalFees" label="Final Fees" control={control} type="number" readOnly />

          {/* Installments block */}
          {watch("fees.discountType") === "Installments" && (
            <div className="col-span-3 mt-4">
              <h3 className="font-semibold mb-2">Installment Details</h3>

              {installments.length > 0 ? (
                <div className="space-y-3">
                  {installments.map((field, index) => (
                    <div
                      key={field.id}
                      className="grid grid-cols-5 gap-3 items-end border p-3 rounded-lg bg-muted/10"
                    >
                      <FormInput
                        name={`fees.installments.${index}.installmentNo`}
                        label="No."
                        control={control}
                        type="number"
                      />
                      <FormDatePicker
                        name={`fees.installments.${index}.dueDate`}
                        label="Due Date"
                        control={control}
                      />
                      <FormInput
                        name={`fees.installments.${index}.amount`}
                        label="Amount"
                        control={control}
                        type="number"
                      />
                      <FormSelect
                        name={`fees.installments.${index}.status`}
                        label="Status"
                        control={control}
                        options={[
                          { value: "Pending", label: "Pending" },
                          { value: "Paid", label: "Paid" },
                          { value: "Overdue", label: "Overdue" },
                        ]}
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        type="button"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 mb-2">No installments added yet.</p>
              )}

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() =>
                  append({
                    installmentNo: installments.length + 1,
                    dueDate: "",
                    amount: 0,
                    status: "Pending",
                  })
                }
              >
                + Add Installment
              </Button>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="w-64">
          <FormSelect
            name="batch"
            label="Batch"
            control={control}
            placeholder="Select Batch"
            options={batches}
            onValueChange={(value) => setSelectedBatch(value)}
          />

        </div>
        {!isArchived && (
          <Button onClick={() => setOpenForm(true)}>+ New Admission</Button>
        )}
      </div>



      <DataTable<Student>
        columns={columns}
        data={items}
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
        emptyMessage={loading ? "Loading..." : "No students found"}
        showIndex
      />

      <FormDialogWrapper
        open={openForm}
        onOpenChange={setOpenForm}
        title="Add New Student"
        showGrid={false}
        onSubmit={handleSubmit(handleCreate)}
      >
        {renderStudentForm()}
      </FormDialogWrapper>

      <FormDialogWrapper
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Edit Student"
        showGrid={false}
        onSubmit={handleSubmit(handleUpdate)}
        submitLabel="Update"
      >
        {renderStudentForm()}
      </FormDialogWrapper>

      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Archive Student"
        description={`Are you sure you want to archive ${selected?.firstName}?`}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default StudentsTable;
