"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/DataTable";
import { FormDialogWrapper } from "@/components/common/Forms/FormDialogWrapper";
import { ConfirmDialog } from "@/components/common/dialogs/ConfirmDialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  restoreStudent,
} from "@/api/students";
import { getAllBatches } from "@/api/batchApi";
import {
  Student,
  StudentFormData,
  studentSchema,
} from "@/features/students/types";
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

export const StudentsTable = ({
  isArchived = false,
}: {
  isArchived?: boolean;
}) => {
  const [items, setItems] = useState<Student[]>([]);
  const [batches, setBatches] = useState<{ value: string; label: string }[]>([]);
  const [selected, setSelected] = useState<Student | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const notify = useNotify();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
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
    },
  });

  // ✅ Fetch Batches
  useEffect(() => {
    (async () => {
      try {
        const batchList = await getAllBatches();
        setBatches(
          batchList.map((b: Batch) => ({
            value: b._id || "",
            label: b.name || "Unnamed Batch",
          }))
        );
      } catch (err) {
        notify("Failed to load batches", "error");
      }
    })();
  }, []);

  // ✅ Fetch Students
  const loadStudents = async () => {
    setLoading(true);
    try {
      const res = await getAllStudents({ isArchived });
      setItems(res.data);
    } catch (err) {
      notify("Failed to load students", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, [isArchived]);

  // ✅ Create Student
  const handleCreate = async (data: StudentFormData) => {
    try {
      await createStudent(data);
      notify("Student created successfully 🎉", "success");
      setOpenForm(false);
      reset();
      loadStudents();
    } catch (err) {
      notify("Failed to create student", "error");
    }
  };

  // ✅ Update Student
  const handleUpdate = async (data: StudentFormData) => {
    if (!selected?._id) return;
    try {
      await updateStudent(selected._id, data);
      notify("Student updated successfully ✅", "success");
      setEditOpen(false);
      reset();
      loadStudents();
    } catch (err) {
      notify("Failed to update student", "error");
    }
  };

  // ✅ Delete Student
  const handleDelete = async () => {
    if (!selected?._id) return;
    try {
      await deleteStudent(selected._id);
      notify("Student archived 🗃️", "info");
      setDeleteOpen(false);
      loadStudents();
    } catch (err) {
      notify("Failed to archive student", "error");
    }
  };

  // ✅ Restore Student
  const handleRestore = async (id: string) => {
    try {
      await restoreStudent(id);
      notify("Student restored successfully ♻️", "success");
      loadStudents();
    } catch (err) {
      notify("Failed to restore student", "error");
    }
  };

  // ✅ Columns
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
      accessor: (r: Student) =>
        r.batch?.name ? `${r.batch.name}` : "—",
    },
    { id: "status", label: "Status" },
  ];

  const rowActions = (row: Student) => (
    <div className="flex gap-2 justify-center">
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

  // ✅ Reusable Form UI
  const renderStudentForm = () => (
    <Accordion type="single" collapsible className="w-full space-y-2">
      <AccordionItem value="personal">
        <AccordionTrigger>👤 Personal Information</AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-4">
          <FormInput
            name="firstName"
            label="First Name"
            control={control}
            error={errors.firstName?.message}
          />
          <FormInput name="middleName" label="Middle Name" control={control} />
          <FormInput
            name="lastName"
            label="Last Name"
            control={control}
            error={errors.lastName?.message}
          />
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
          <FormInput
            name="dob"
            label="Date of Birth"
            type="date"
            control={control}
          />
          <FormInput
            name="aadhaarNo"
            label="Aadhaar Number"
            control={control}
          />
        </AccordionContent>
      </AccordionItem>

      {/* 📞 Contact */}
      <AccordionItem value="contact">
        <AccordionTrigger>📞 Contact</AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-4">
          <FormInput
            name="contact.phone"
            label="Phone"
            control={control}
            error={errors.contact?.phone?.message}
          />
          <FormInput name="contact.email" label="Email" control={control} />
        </AccordionContent>
      </AccordionItem>

      {/* 👨‍👩‍👧 Parent Info */}
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

      {/* 🏠 Address */}
      <AccordionItem value="address">
        <AccordionTrigger>🏠 Address</AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-4">
          <FormInput name="address.line1" label="Address Line 1" control={control} />
          <FormInput name="address.line2" label="Address Line 2" control={control} />
          <FormInput name="address.city" label="City" control={control} />
          <FormInput name="address.state" label="State" control={control} />
          <FormInput name="address.pincode" label="Pincode" control={control} />
        </AccordionContent>
      </AccordionItem>

      {/* 🎓 Academic Info */}
      <AccordionItem value="academic">
        <AccordionTrigger>🎓 Academic Information</AccordionTrigger>
        <AccordionContent className="grid grid-cols-3 gap-4">
          <FormInput name="academicInfo.schoolName" label="School Name" control={control} />
          <FormInput name="academicInfo.grade10Marks" label="10th Marks" control={control} />
          <FormInput name="academicInfo.grade10PassingYear" label="10th Passing Year" control={control} />
        </AccordionContent>
      </AccordionItem>

      {/* 🧾 Admission Details */}
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
          <FormInput name="admissionDate" label="Admission Date" type="date" control={control} />
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
    </Accordion>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-end">
        {!isArchived && (
          <Button onClick={() => setOpenForm(true)}>+ New Admission</Button>
        )}
      </div>

      <DataTable
        columns={columns}
        data={items}
        rowActions={rowActions}
        showIndex
        emptyMessage="No students found"
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
