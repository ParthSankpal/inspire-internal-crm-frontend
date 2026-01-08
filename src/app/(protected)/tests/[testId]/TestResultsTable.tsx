"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { getTestResponses, TestResponse } from "@/api/testResponses";

interface Props {
  testId: string;
}

export default function TestResultsTable({ testId }: Props) {
  const router = useRouter();

  const [items, setItems] = useState<TestResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 1,
  });
  const [search, setSearch] = useState("");

  const loadResponses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getTestResponses(testId, {
        page: pagination.page,
        limit: pagination.limit,
        search,
      });

      setItems(res.data);
      setPagination((p) => ({
        ...p,
        totalItems: res.pagination.totalItems,
        totalPages: res.pagination.totalPages,
      }));
    } finally {
      setLoading(false);
    }
  }, [testId, pagination.page, pagination.limit, search]);

  useEffect(() => {
    loadResponses();
  }, [loadResponses]);

  /* ---------------- Columns ---------------- */

  const columns = [
    {
      id: "studentId",
      label: "ID",
      accessor: (r: TestResponse) => r.student.studentId,
    },
    {
      id: "name",
      label: "Name",
      accessor: (r: TestResponse) =>
        `${r.student.firstName} ${r.student.lastName}`,
    },
    {
      id: "Physics",
      label: "Physics",
      accessor: (r: TestResponse) => r.subjectWiseMarks?.Physics ?? 0,
    },
    {
      id: "Chemistry",
      label: "Chemistry",
      accessor: (r: TestResponse) => r.subjectWiseMarks?.Chemistry ?? 0,
    },
    {
      id: "Maths",
      label: "Maths",
      accessor: (r: TestResponse) => r.subjectWiseMarks?.Maths ?? 0,
    },
    {
      id: "correct",
      label: "✔ Correct",
      accessor: (r: TestResponse) => r.correctCount,
    },
    {
      id: "incorrect",
      label: "✖ Incorrect",
      accessor: (r: TestResponse) => r.incorrectCount,
    },
    {
      id: "na",
      label: "Ø Not Attempted",
      accessor: (r: TestResponse) => r.notAttemptedCount,
    },
    {
      id: "totalMarks",
      label: "Total",
      sortKey: "totalMarks",
    },
  ];

  return (
    <DataTable<TestResponse>
      columns={columns}
      data={items}
      totalItems={pagination.totalItems}
      serverSide
      searchable
      showIndex
      emptyMessage={loading ? "Loading results..." : "No results found"}
      onPaginationChange={(info) =>
        setPagination((p) => ({ ...p, page: info.page, limit: info.limit }))
      }
      onSearchChange={(val) => {
        setSearch(val);
        setPagination((p) => ({ ...p, page: 1 }));
      }}
      rowActions={(row) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            router.push(
              `/tests/${testId}/analytics/${row.student._id}`
            )
          }
        >
          View Analytics
        </Button>
      )}
    />
  );
}
