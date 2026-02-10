"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/DataTable";
import { ConfirmDialog } from "@/components/common/dialogs/ConfirmDialog";

import {
  getAllEnquiries,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  markEnquiryAdmitted,
  addFollowUp,
  markEnquiryLost,
} from "@/api/enquiries";

import {
  Enquiry,
  EnquiryFormData,
  enquirySchema,
} from "@/features/enquiries/types";

import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCrud } from "@/hooks/useCrud";

import { FormInput } from "@/components/common/Forms/FormInput";
import { FormSelect } from "@/components/common/Forms/FormSelect";
import { FormMultiSelect } from "@/components/common/Forms/FormMultiSelect";
import { FormDialogWrapper } from "@/components/common/Forms/FormDialogWrapper";
import AdmitModal from "./AdmitModal";
import FollowUpModal from "./FollowUpModal";
import LostModal from "./LostModal";
import EnquiryAnalytics from "./EnquiryAnalytics";
import { useNotify } from "@/components/common/NotificationProvider";
import { getAllUsers } from "@/api/authApi";
import { User } from "@/features/auth/types";
import { Column } from "@/features/pagination";

export default function EnquiriesPage() {
  const router = useRouter();
  const notify = useNotify();

  /* ======================
     PAGINATION
  ====================== */
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 1,
  });
  const [search, setSearch] = useState("");
  const [counselors, setCounselors] = useState<User[]>([]);


  const fetchEnquiries = useCallback(async () => {
    const res = await getAllEnquiries(
      pagination.page,
      pagination.limit,
      search
    );

    setPagination((prev) => ({
      ...prev,
      totalItems: res.pagination.totalItems,
      totalPages: res.pagination.totalPages,
    }));

    return res.data;
  }, [pagination.page, pagination.limit, search]);

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



  /* ======================
     MODALS
  ====================== */
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<Enquiry | null>(null);

  const [followUpOpen, setFollowUpOpen] = useState<boolean>(false);
  const [admitOpen, setAdmitOpen] = useState<boolean>(false);
  const [lostOpen, setLostOpen] = useState<boolean>(false);

  /* ======================
     FORM (USES YOUR SCHEMA)
  ====================== */
  const {
    control,
    handleSubmit,
    reset,
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema) as unknown as Resolver<EnquiryFormData>,
    mode: "onChange",
    defaultValues: {
      studentName: "",
      phoneNo: "",
      email: "",
      standard: "",
      school: {
        name: "",
        area: "urban",
        type: "private",
        category: "top",
        medium: "CBSE"
      },
      parentNames: {
        fatherName: "",
        fatherOccupation: "",
        motherName: "",
        motherOccupation: "",
      },
      targetExams: [],
      source: { type: "walk_in" },
      enquiryQuality: "medium",
      status: "new",
      counselor: { id: "", name: "" },
      reference: "",
      referenceContact: "",
    },
  });

  /* ======================
     HANDLERS
  ====================== */
  const handleCreate = async (data: EnquiryFormData) => {
    await create(data);
    setAddOpen(false);
    reset();
  };

  const handleUpdate = async (data: EnquiryFormData) => {
    if (!selected?._id) return;

    await update(selected._id, data);
    setEditOpen(false);
    reset();
  };


  const handleDelete = async () => {
    if (!selected?._id) return;
    await remove(selected._id);
    setDeleteOpen(false);
  };

  /* ======================
     TABLE
  ====================== */
  const columns: Column<Enquiry>[] = [
    { id: "studentName", label: "Student" },
    { id: "phoneNo", label: "Phone" },
    {
      id: "school",
      label: "School",
      accessor: (e) => e.school?.name ?? "-",
    },
    { id: "standard", label: "Class" },
    { id: "status", label: "Status" },
  ];

  const rowActions = (row: Enquiry) => (
    <div className="flex gap-2 flex-wrap">
      {/* VIEW */}
      <Button
        size="sm"
        variant="outline"
        onClick={() => router.push(`/enquiries/${row._id}`)}
      >
        View
      </Button>

      {/* EDIT */}
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          setSelected(row);

          reset({
            studentName: row.studentName ?? "",
            phoneNo: row.phoneNo ?? "",
            email: row.email ?? "",
            standard: row.standard ?? "",

            school: {
              name: row.school?.name ?? "",
              area: row.school?.area ?? "urban",
              type: row.school?.type ?? "private",
              category: row.school?.category ?? "top",
              medium: row.school?.medium ?? "CBSE",
            },

            parentNames: {
              fatherName: row.parentNames?.fatherName ?? "",
              fatherOccupation: row.parentNames?.fatherOccupation ?? "",
              motherName: row.parentNames?.motherName ?? "",
              motherOccupation: row.parentNames?.motherOccupation ?? "",
            },

            targetExams: row.targetExams ?? [],

            source: {
              type: row.source?.type ?? "walk_in",
            },

            enquiryQuality: row.enquiryQuality ?? "medium",
            status: row.status ?? "new",

            counselor: {
              id: row.counselor?.id ?? "",
              name: row.counselor?.name ?? "",
            },

            reference: row.reference ?? "",
            referenceContact: row.referenceContact ?? "",
          });

          setEditOpen(true);
        }}
      >
        Edit
      </Button>

      {/* DELETE */}
      <Button
        size="sm"
        variant="destructive"
        onClick={() => {
          setSelected(row);
          setDeleteOpen(true);
        }}
      >
        Delete
      </Button>
    </div>
  );


  // 🧭 Load counselors for dropdown
  const loadCounselors = useCallback(async () => {
    try {
      const usersRes = await getAllUsers(1, 100);
      setCounselors(usersRes.data);
    } catch (err) {
      console.error("❌ Failed to load counselors", err);
      notify("Failed to load counselors", "error");
    }
  }, [notify]);


  useEffect(() => {
    load();
    loadCounselors();
  }, [load, loadCounselors]);
  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-semibold">Enquiries</h1>
        <div className=" flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => router.push(`/enquiries/analytics`)}
          >
            View analytics
          </Button>
          <Button onClick={() => setAddOpen(true)}>Add Enquiry</Button>
        </div>
      </div>

      <DataTable<Enquiry>
        columns={columns}
        data={enquiries}

        serverSide
        searchable
        page={pagination.page}
        limit={pagination.limit}
        totalItems={pagination.totalItems}
        onSearchChange={setSearch}
        onPaginationChange={(info) =>
          setPagination((p) => ({ ...p, ...info }))
        }
        rowActions={rowActions}
        showIndex
      />

      {/* ADD */}
      <FormDialogWrapper
        open={addOpen}
        onOpenChange={setAddOpen}
        title="Add Enquiry"
        onSubmit={handleSubmit(handleCreate)}
      >
        <div className="grid md:grid-cols-3 gap-4">
          <FormInput name="studentName" label="Student Name" control={control}  />
          <FormInput name="phoneNo" label="Phone" control={control} />
          <FormInput name="email" label="Email" control={control} />
          <FormInput name="school.name" label="School" control={control} />
          <FormSelect
            name="school.area"
            label="School Area"
            control={control}
            options={[
              { value: "urban", label: "Urban" },
              { value: "semi_urban", label: "Semi Urban" },
              { value: "rural", label: "Rural" },
            ]}
          />

          <FormSelect
            name="school.type"
            label="School Type"
            control={control}
            options={[
              { value: "private", label: "Private" },
              { value: "govt", label: "Gov" },
              { value: "semi_govt", label: "Semi Gov" },
            ]}
          />

          <FormSelect
            name="school.category"
            label="School Category"
            control={control}
            options={[
              { value: "top", label: "Top" },
              { value: "mid", label: "Mid" },
              { value: "local", label: "Local" },
            ]}
          />

          <FormSelect
            name="school.medium"
            label="School Category"
            control={control}
            options={[
              { value: "CBSE", label: "CBSE" },
              { value: "SEMI-ENGLISH", label: "SEMI-ENGLISH" },
              { value: "ENGLISH", label: "ENGLISH" },
              { value: "MARATHI", label: "MARATHI" },
              { value: "ICSE", label: "ICSE" },
              { value: "IB/IGCSE", label: "IB/IGCSE" },
            ]}
          />
          <FormInput name="standard" label="Standard" control={control} />
          <FormInput name="parentNames.fatherName" label="Father Name" control={control} />
          <FormInput name="parentNames.fatherOccupation" label="Father Occupation" control={control} />
          <FormInput name="parentNames.motherName" label="Mother Name" control={control} />
          <FormInput name="parentNames.motherOccupation" label="Mother Occupation" control={control} />

          <FormMultiSelect
            name="targetExams"
            label="Target Exams"
            control={control}
            options={[
              { value: "NEET", label: "NEET" },
              { value: "IIT-JEE", label: "IIT-JEE" },
              { value: "Foundation", label: "Foundation" },
            ]}
          />

          <FormSelect
            name="source.type"
            label="Source"
            control={control}
            options={[
              { value: "walk_in", label: "Walk In" },
              { value: "school_visit", label: "School Visit" },
              { value: "ktse", label: "KTSE" },
              { value: "seminar", label: "Seminar" },
              { value: "student_referral", label: "Student Referral" },
              { value: "social_media", label: "Social Media Post" },
              { value: "whatsapp", label: "Whatsapp" },
              { value: "teacher_reference", label: "Teacher Reference" },
              { value: "digital_banner", label: "Digital Bbanner" },
              { value: "paper_leaflet", label: "Paper Lleaflet" },
              { value: "radio_advertisement", label: "Radio Advertisement" },
              { value: "calling", label: "Calling" },
              { value: "news_paper", label: "News Paper" },
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
          <FormInput name="referenceContact" label="Reference Contact no" control={control} />
        </div>
      </FormDialogWrapper>

      {/* EDIT */}
      <FormDialogWrapper
        open={editOpen}
        onOpenChange={setEditOpen}
        title="Edit Enquiry"
        submitLabel="Update"
        onSubmit={handleSubmit(handleUpdate)}
      >
          <div className="grid md:grid-cols-3 gap-4">
          <FormInput name="studentName" label="Student Name" control={control} />
          <FormInput name="phoneNo" label="Phone" control={control} />
          <FormInput name="email" label="Email" control={control} />
          <FormInput name="school.name" label="School" control={control} />
          <FormSelect
            name="school.area"
            label="School Area"
            control={control}
            options={[
              { value: "urban", label: "Urban" },
              { value: "semi_urban", label: "Semi Urban" },
              { value: "rural", label: "Rural" },
            ]}
          />

          <FormSelect
            name="school.type"
            label="School Type"
            control={control}
            options={[
              { value: "private", label: "Private" },
              { value: "govt", label: "Gov" },
              { value: "semi_govt", label: "Semi Gov" },
            ]}
          />

          <FormSelect
            name="school.category"
            label="School Category"
            control={control}
            options={[
              { value: "top", label: "Top" },
              { value: "mid", label: "Mid" },
              { value: "local", label: "Local" },
            ]}
          />

          <FormSelect
            name="school.medium"
            label="School Category"
            control={control}
            options={[
              { value: "CBSE", label: "CBSE" },
              { value: "SEMI-ENGLISH", label: "SEMI-ENGLISH" },
              { value: "ENGLISH", label: "ENGLISH" },
              { value: "MARATHI", label: "MARATHI" },
              { value: "ICSE", label: "ICSE" },
              { value: "IB/IGCSE", label: "IB/IGCSE" },
            ]}
          />
          <FormInput name="standard" label="Standard" control={control} />
          <FormInput name="parentNames.fatherName" label="Father Name" control={control} />
          <FormInput name="parentNames.fatherOccupation" label="Father Occupation" control={control} />
          <FormInput name="parentNames.motherName" label="Mother Name" control={control} />
          <FormInput name="parentNames.motherOccupation" label="Mother Occupation" control={control} />

          <FormMultiSelect
            name="targetExams"
            label="Target Exams"
            control={control}
            options={[
              { value: "NEET", label: "NEET" },
              { value: "IIT-JEE", label: "IIT-JEE" },
              { value: "Foundation", label: "Foundation" },
            ]}
          />

          <FormSelect
            name="source.type"
            label="Source"
            control={control}
            options={[
              { value: "walk_in", label: "Walk In" },
              { value: "school_visit", label: "School Visit" },
              { value: "ktse", label: "KTSE" },
              { value: "seminar", label: "Seminar" },
              { value: "student_referral", label: "Student Referral" },
              { value: "social_media", label: "Social Media Post" },
              { value: "whatsapp", label: "Whatsapp" },
              { value: "teacher_reference", label: "Teacher Reference" },
              { value: "digital_banner", label: "Digital Bbanner" },
              { value: "paper_leaflet", label: "Paper Lleaflet" },
              { value: "radio_advertisement", label: "Radio Advertisement" },
              { value: "calling", label: "Calling" },
              { value: "news_paper", label: "News Paper" },
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
          <FormInput name="referenceContact" label="Reference Contact no" control={control} />
        </div>
      </FormDialogWrapper>



      <FollowUpModal
        open={followUpOpen}
        onClose={() => setFollowUpOpen(false)}
        enquiry={selected}
        onSubmit={async (data) => {
          if (!selected?._id) return;

          await addFollowUp(selected._id, {
            ...data,
            date: new Date(),
          });

          await load(); // refresh table & follow-ups
        }}
      />


      <AdmitModal
        open={admitOpen}
        onClose={() => setAdmitOpen(false)}
        onSubmit={async (data) => {
          if (!selected?._id) return;

          await markEnquiryAdmitted(selected._id, {
            ...data,
            admissionDate: new Date(),
          });

          setAdmitOpen(false);
          load();
        }}
      />

      <LostModal
        open={lostOpen}
        onClose={() => setLostOpen(false)}
        onSubmit={async (data) => {
          if (!selected?._id) return;

          await markEnquiryLost(selected._id, {
            lostReason: data,
          });

          setLostOpen(false);
          load();
        }}
      />


      {/* DELETE */}
      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Delete Enquiry"
        description={`Delete ${selected?.studentName}?`}
        onConfirm={handleDelete}
      />
    </div>
  );
}
