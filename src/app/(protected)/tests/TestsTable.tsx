"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/common/DataTable";
import { useNotify } from "@/components/common/NotificationProvider";
import { deleteTest, getAllTests,  unpublishTest } from "@/api/testApi";
import { Test } from "@/features/test/types";

import { IsoDate } from "@/components/common/IsoDate";

interface TestsTableProps {
  status: "Draft" | "Published" | "Completed";
}

export default function TestsTable({ status }: TestsTableProps) {
  const router = useRouter();
  const notify = useNotify();

  const [items, setItems] = useState<Test[]>([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 1,
  });

  const [search, setSearch] = useState("");
  console.log(search);

  const loadTests = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllTests({
        page: pagination.page,
        limit: pagination.limit,
        status,
      });

      setItems(res.data);
      setPagination((prev) => ({
        ...prev,
        totalItems: res.pagination?.totalItems,
        totalPages: res.pagination?.totalPages,
      }));
    } catch {
      notify("Failed to load tests", "error");
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, status, notify]);

  useEffect(() => {
    loadTests();
  }, [loadTests]);

  // ---------------- Columns ----------------
  const columns = [
    { id: "name", label: "Test Name" },
    { id: "examType", label: "Exam" },
    { id: "testType", label: "Type" },

    {
      id: "date",
      label: "Date",
      accessor: (r: Test) =>
        r.date ? <IsoDate value={r.date} /> : "—",
      sortKey: "date",
    },
    {
      id: "status",
      label: "Status",
      className: "text-center",
    },
  ];

  // ---------------- Row Actions ----------------
  const rowActions = (row: Test) => (
    <div className="flex gap-2 justify-center">

      <Button
        size="sm"
        variant="outline"
        onClick={() => router.push(`/tests/${row._id}`)}
      >
        view
      </Button>

      {/* Draft */}



      <Button
        size="sm"
        variant="destructive"
        onClick={async () => {
          try {
            await deleteTest(row._id!);
            notify("Test deleted", "info");
            loadTests();
          } catch {
            notify("Failed to delete test", "error");
          }
        }}
      >
        Delete
      </Button>



      {/* Published */}
      {row.status === "Published" && (
        <>


          <Button
            size="sm"
            variant="destructive"
            onClick={async () => {
              try {
                await unpublishTest(row._id!);
                notify("Test reverted to draft", "info");
                loadTests();
              } catch {
                notify("Failed to unpublish test", "error");
              }
            }}
          >
            Unpublish
          </Button>
        </>
      )}

      {/* Completed */}
      {row.status === "Completed" && (
        <>
          <Button
            size="sm"
            variant="outline"
            onClick={() => router.push(`/tests/${row._id}/results`)}
          >
            Results
          </Button>

          {/* <Button
            size="sm"
            variant="outline"
            onClick={() => router.push(`/tests/${row._id}/analytics`)}
          >
            Analytics
          </Button> */}
        </>
      )}
    </div>
  );

  return (
    <DataTable<Test>
      columns={columns}
      data={items}
      totalItems={pagination.totalItems}
      page={pagination.page}
      limit={pagination.limit}
      serverSide
      searchable={false}
      showIndex
      rowActions={rowActions}
      emptyMessage={loading ? "Loading..." : "No tests found"}
      onPaginationChange={(info) =>
        setPagination((prev) => ({
          ...prev,
          page: info.page,
          limit: info.limit,
        }))
      }
      onSearchChange={(val) => setSearch(val)}
    />
  );
}
