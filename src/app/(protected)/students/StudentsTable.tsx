// src/app/students/StudentsTable.tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/DataTable";
import { FormDialogWrapper } from "@/components/common/Forms/FormDialogWrapper";
import { ConfirmDialog } from "@/components/common/dialogs/ConfirmDialog";
import { useForm, useFieldArray, Resolver } from "react-hook-form";
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
import { useRouter } from "next/navigation";
import { FormDatePicker } from "@/components/common/Forms/FormDatePicker";
import { getAllSchools } from "@/api/schoolsApi";
import { School } from "@/features/schools/types";
import { FormCombobox } from "@/components/common/Forms/FormCombobox";

export const StudentsTable = ({ isArchived = false }: { isArchived?: boolean }) => {
  const router = useRouter();
  const [items, setItems] = useState<Student[]>([]);
  const [batches, setBatches] = useState<{ value: string; label: string }[]>([]);
  const [schools, setSchools] = useState<{ value: string; label: string }[]>([]);
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
    resolver: zodResolver(studentSchema) as Resolver<StudentFormData>,
    mode: "onChange",
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
        parentEmail: "",
        fatherPhone: "",
        motherPhone: "",
        occupation: "",
      },
      address: { line1: "", line2: "", city: "", state: "", pincode: "" },
      academicInfo: {
        school: "",
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
    (async () => {
      try {
        const res = await getAllSchools();

        setSchools(
          res?.map((s: School) => ({
            value: s._id,
            label: s.name,
          }))
        );
      } catch {
        notify("Failed to load schools", "error");
      }
    })();
  }, [notify]);

  // Load students
  const loadStudents = useCallback(async () => {
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
  }, [pagination.page, pagination.limit, search, selectedBatch, isArchived, notify]);




  useEffect(() => {
    loadStudents();
  }, [loadStudents]);


  // Create student
  const handleCreate = async (data: StudentFormData) => {
    try {
      await createStudent(data);
      notify("Student created successfully 🎉", "success");
      setOpenForm(false);
      reset();
      loadStudents();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to create student";
      notify(msg, "error");
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
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update student";
      notify(msg, "error");
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
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to archive student";
      notify(msg, "error");
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
      accessor: (r: Student) => r.batch?.name ?? "—",
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
                firstName: row.firstName,
                middleName: row.middleName ?? "",
                lastName: row.lastName,
                gender: row.gender,
                dob: row.dob?.split("T")[0] ?? "",

                aadhaarNo: row.aadhaarNo ?? "",

                contact: {
                  phone: row.contact?.phone ?? "",
                  email: row.contact?.email ?? "",
                },

                parent: {
                  fatherName: row.parent?.fatherName ?? "",
                  motherName: row.parent?.motherName ?? "",
                  parentEmail: row.parent?.parentEmail ?? "",
                  fatherPhone: row.parent?.fatherPhone ?? "",
                  motherPhone: row.parent?.motherPhone ?? "",
                  occupation: row.parent?.occupation ?? "",
                },

                address: {
                  line1: row.address?.line1 ?? "",
                  line2: row.address?.line2 ?? "",
                  city: row.address?.city ?? "",
                  state: row.address?.state ?? "",
                  pincode: row.address?.pincode ?? "",
                },

                academicInfo: {
                  school:
                    typeof row.academicInfo?.school === "object"
                      ? row.academicInfo.school._id
                      : row.academicInfo?.school ?? "",
                  grade10Marks: row.academicInfo?.grade10Marks ?? "",
                  grade10PassingYear: row.academicInfo?.grade10PassingYear ?? "",
                },

                course: row.course ?? "",
                batch: row.batch?._id ?? "",

                targetExam: row.targetExam,
                admissionDate: row.admissionDate?.split("T")[0] ?? "",
                status: row.status ?? "Active",
                remarks: row.remarks ?? "",

                fees: {
                  baseFees: row.fees?.baseFees ?? 0,
                  discountType: row.fees?.discountType ?? "None",
                  discountValue: row.fees?.discountValue ?? 0,
                  finalFees: row.fees?.finalFees ?? 0,
                  installments: row.fees?.installments?.map((ins) => ({
                    installmentNo: ins.installmentNo,
                    dueDate: ins.dueDate ? ins.dueDate.toString().split("T")[0] : "",
                    amount: ins.amount,
                    status: ins.status,
                  })) ?? [],
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
      )
      }
    </div >
  );

  // The form JSX
  const renderStudentForm = () => (
    <Accordion type="single" collapsible className="w-full space-y-2">

      {/* Personal */}
      <AccordionItem value="personal">
        <AccordionTrigger>👤 Personal Information</AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-4">
          <FormInput name="firstName" label="First Name" control={control} error={errors.firstName?.message} />
          <FormInput name="middleName" label="Middle Name" control={control} error={errors.middleName?.message} />
          <FormInput name="lastName" label="Last Name" control={control} error={errors.lastName?.message} />
          <FormSelect
            name="gender"
            label="Gender"
            control={control}
            error={errors.gender?.message}
            options={[
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
              { value: "Other", label: "Other" },
            ]}
          />
          <FormDatePicker name="dob" label="Date of Birth" control={control} error={errors.dob?.message} />
          <FormInput name="aadhaarNo" label="Aadhaar No" control={control} error={errors.aadhaarNo?.message} />
        </AccordionContent>
      </AccordionItem>

      {/* Contact */}
      <AccordionItem value="contact">
        <AccordionTrigger>📞 Contact</AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-4">
          <FormInput name="contact.phone" label="Phone" control={control} error={errors.contact?.phone?.message} />
          <FormInput name="contact.email" label="Email" control={control} error={errors.contact?.email?.message} />
        </AccordionContent>
      </AccordionItem>

      {/* Parent */}
      <AccordionItem value="parent">
        <AccordionTrigger>👨‍👩‍👧 Parent Information</AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-4">
          <FormInput name="parent.fatherName" label="Father Name" control={control} error={errors.parent?.fatherName?.message} />
          <FormInput name="parent.motherName" label="Mother Name" control={control} error={errors.parent?.motherName?.message} />
          <FormInput name="parent.fatherPhone" label="Father Phone" control={control} error={errors.parent?.fatherPhone?.message} />
          <FormInput name="parent.motherPhone" label="Mother Phone" control={control} error={errors.parent?.motherPhone?.message} />
          <FormInput name="parent.parentEmail" label="Parent Email" control={control} error={errors.parent?.parentEmail?.message} />
          <FormInput name="parent.occupation" label="Occupation" control={control} error={errors.parent?.occupation?.message} />
        </AccordionContent>
      </AccordionItem>

      {/* Address */}
      <AccordionItem value="address">
        <AccordionTrigger>🏠 Address</AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-4">
          <FormInput name="address.line1" label="Line 1" control={control} error={errors.address?.line1?.message} />
          <FormInput name="address.line2" label="Line 2" control={control} error={errors.address?.line2?.message} />
          <FormInput name="address.city" label="City" control={control} error={errors.address?.city?.message} />
          <FormInput name="address.state" label="State" control={control} error={errors.address?.state?.message} />
          <FormInput name="address.pincode" label="Pincode" control={control} error={errors.address?.pincode?.message} />
        </AccordionContent>
      </AccordionItem>

      {/* Academic */}
      <AccordionItem value="academic">
        <AccordionTrigger>🎓 Academic Info</AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-4">
          <FormCombobox
            name="academicInfo.school"
            label="School"
            control={control}
            options={schools}
            placeholder="Select School"
          />
          <FormInput name="academicInfo.grade10Marks" label="10th Marks" control={control} error={errors.academicInfo?.grade10Marks?.message} />
          <FormInput name="academicInfo.grade10PassingYear" label="10th Passing Year" control={control} error={errors.academicInfo?.grade10PassingYear?.message} />
        </AccordionContent>
      </AccordionItem>

      {/* Admission */}
      <AccordionItem value="admission">
        <AccordionTrigger>🧾 Admission Details</AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-4">
          <FormInput name="course" label="Course" control={control} error={errors.course?.message} />
          <FormSelect name="batch" label="Batch" control={control} options={batches} error={errors.batch?.message} />
          <FormSelect
            name="targetExam"
            label="Target Exam"
            control={control}
            error={errors.targetExam?.message}
            options={[
              { value: "IIT JEE", label: "IIT JEE" },
              { value: "NEET", label: "NEET" },
              { value: "MHT-CET", label: "MHT-CET" },
              { value: "Foundation", label: "Foundation" },
              { value: "Other", label: "Other" },
            ]}
          />
          <FormDatePicker name="admissionDate" label="Admission Date" control={control} error={errors.admissionDate?.message} />
          <FormSelect
            name="status"
            label="Status"
            control={control}
            error={errors.status?.message}
            options={[
              { value: "Active", label: "Active" },
              { value: "Completed", label: "Completed" },
              { value: "Left", label: "Left" },
              { value: "Hold", label: "Hold" },
            ]}
          />
          <FormInput name="remarks" label="Remarks" control={control} error={errors.remarks?.message} />
        </AccordionContent>
      </AccordionItem>

      {/* Fees */}
      <AccordionItem value="fees">
        <AccordionTrigger>💰 Fees Details</AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-4">
          <FormInput name="fees.baseFees" label="Base Fees" control={control} type="number" error={errors.fees?.baseFees?.message} />
          <FormSelect
            name="fees.discountType"
            label="Discount Type"
            control={control}
            error={errors.fees?.discountType?.message}
            options={[
              { value: "None", label: "None" },
              { value: "Onetime", label: "Onetime" },
              { value: "Installments", label: "Installments" },
            ]}
          />
          <FormInput name="fees.discountValue" label="Discount Value" control={control} type="number" error={errors.fees?.discountValue?.message} />
          <FormInput name="fees.finalFees" label="Final Fees" control={control} type="number" readOnly error={errors.fees?.finalFees?.message} />

          {/* Installment block */}
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
