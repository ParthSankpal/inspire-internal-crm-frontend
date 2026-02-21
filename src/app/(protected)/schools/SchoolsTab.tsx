"use client";

import useSchools from "./useSchools";
import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { School } from "@/features/schools/types";
import SchoolModals from "./SchoolModals";

export default function SchoolsTab() {
    const { schools, loading, addSchool, editSchool, removeSchool } =
        useSchools();

    const [selected, setSelected] = useState<School | null>(null);
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const columns = [
        { id: "name", label: "School Name", accessor: (s: School) => s.name },
        { id: "area", label: "Area", accessor: (s: School) => s.area },
        { id: "type", label: "Type", accessor: (s: School) => s.type },
        { id: "category", label: "Category", accessor: (s: School) => s.category },
        // { id: "medium", label: "Medium", accessor: (s: School) => s.medium },
        {
            id: "students",
            label: "Students",
            accessor: (s: School) => s.studentCount ?? 0,
        },
        {
            id: "enquiries",
            label: "Enquiries",
            accessor: (s: School) => s.enquiryCount ?? 0,
        },
        {
            id: "conversion",
            label: "Conversion %",
            accessor: (s: School) => s.conversionRate ?? 0,
        },
    ];

    const rowActions = (row: School) => (
        <div className="flex gap-2 justify-center">
            <Button
                size="sm"
                variant="outline"
                onClick={() => {
                    setSelected(row);
                    setOpen(true);
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
                Delete
            </Button>
        </div>
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Schools</h2>
                <Button onClick={() => setOpen(true)}>+ Add School</Button>
            </div>

            <DataTable
                columns={columns}
                data={schools}
                totalItems={schools.length}
                page={1}
                limit={schools.length}
                serverSide={false}
                rowActions={rowActions}
                emptyMessage={loading ? "Loading..." : "No schools found"}
                showIndex
            />

            <SchoolModals
                open={open}
                setOpen={setOpen}
                deleteOpen={deleteOpen}
                setDeleteOpen={setDeleteOpen}
                selected={selected}
                onAdd={addSchool}
                onEdit={async (d) => {
                    if (!selected) return;
                    await editSchool(selected._id, d);
                }}

                onDelete={async () => {
                    if (!selected) return;
                    await removeSchool(selected._id);
                }}
            />
        </div>
    );
}