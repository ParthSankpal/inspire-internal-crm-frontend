"use client";

import { useEffect, useState } from "react";

import { DataTable } from "@/components/common/DataTable";
import { StudentTestHistoryRow } from "@/features/analytics/studentOverall.types";
import { getStudentTestHistory } from "@/api/studentOverallAnalytics";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { IsoDate } from "../common/IsoDate";


export default function StudentTestHistoryTable({
  studentId,
}: {
  studentId: string;
}) {
  const [data, setData] = useState<StudentTestHistoryRow[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
    const router = useRouter();

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  async function loadData(search = "") {
    const res = await getStudentTestHistory({
      studentId,
      page,
      limit,
      search,
    });

    setData(res.data);
    setTotalItems(res.pagination.totalItems);
  }

  return (
    <DataTable<StudentTestHistoryRow>
      data={data}
      totalItems={totalItems}
      page={page}
      limit={limit}
      serverSide
      searchable
      showIndex
      onSearchChange={(value) => {
        setPage(1);
        loadData(value);
      }}
      onPaginationChange={(p) => {
        setPage(p.page);
        setLimit(p.limit);
      }}
      columns={[
        {
          id: "testName",
          label: "Test",
          searchKey: "testName",
        },
        {
          id: "date",
          label: "Date",
          accessor: (row) =>
            <IsoDate value={row.date} />,
        },
        {
          id: "normalizedScore",
          label: "Score %",
          className: "text-right",
        },
        {
          id: "accuracy",
          label: "Accuracy",
          accessor: (row) =>
            `${Math.round(row.accuracy * 100)}%`,
        },
      ]}
      rowActions={(row) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            router.push(
              `/tests/${row.testId}/analytics/${studentId}`
            )
          }
        >
          View Analytics
        </Button>

      )}
    />
  );
}
