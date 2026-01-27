"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { getTestResponses, TestResponse } from "@/api/testResponses";
import { BulkEmailFailure, emailBulkStudentAnalyticsPDF, emailStudentAnalyticsPDF } from "@/api/analyticsApi";
import { useNotify } from "@/components/common/NotificationProvider";
import { CustomDialog } from "@/components/common/CustomDialog";
import { downloadTestResultsPdf } from "@/api/testApi";

interface Props {
  testId: string;
}

export default function TestResultsTable({ testId }: Props) {
  const router = useRouter();
  const notify = useNotify();


  const [items, setItems] = useState<TestResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalItems: 0,
    totalPages: 1,
  });
  const [search, setSearch] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [bulkEmailLoading, setBulkEmailLoading] = useState(false);
  const [failureDialogOpen, setFailureDialogOpen] = useState(false);
  const [emailFailures, setEmailFailures] = useState<BulkEmailFailure[]>([]);


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

  const handleEmailStudent = async (studentId: string) => {
    try {
      setEmailLoading(true);
      await emailStudentAnalyticsPDF(testId, studentId);
      notify("Report emailed to parent", "success", 2000);
    } catch (err) {
      notify("Failed to send report", "error");
    } finally {
      setEmailLoading(false);
    }
  };


  const handleEmailAll = async () => {
    try {
      setBulkEmailLoading(true);

      const studentIds = items.map((r) => r.student._id);

      if (!studentIds.length) {
        notify("No students found", "warning");
        return;
      }

      const res = await emailBulkStudentAnalyticsPDF(testId, studentIds);

      if (res.failed === 0) {
        notify(
          `All reports emailed successfully (${res.sent})`,
          "success",
          2500
        );
      } else {
        notify(
          `Emails sent: ${res.sent}, Failed: ${res.failed}`,
          "warning",
          4000
        );

        // 🔥 OPEN FAILURE DIALOG
        setEmailFailures(res.failures || []);
        setFailureDialogOpen(true);
      }


    } catch (err) {
      notify("Bulk email failed", "error");
    } finally {
      setBulkEmailLoading(false);
    }
  };

  return (

    <>
      <div className="flex gap-4 justify-end mb-3">

        <Button
          onClick={() => downloadTestResultsPdf(testId)}
        >
          Download PDF
        </Button>
        <Button
          variant="outline"
          disabled={bulkEmailLoading || loading}
          onClick={handleEmailAll}
        >
          {bulkEmailLoading ? "Sending Emails..." : "Email All Reports"}
        </Button>
      </div>

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
          <div className="flex gap-2">
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

            <Button
              size="sm"
              variant="outline"
              disabled={emailLoading || bulkEmailLoading || loading}
              onClick={() => handleEmailStudent(row.student._id)}
            >
              Email Report
            </Button>
          </div>
        )}
      />

      <CustomDialog
        open={failureDialogOpen}
        onOpenChange={setFailureDialogOpen}
        title="Email Failed for Some Students"
        description="The following students' reports could not be emailed."
        showCancel
        cancelLabel="Close"
      >
        <ul className="list-disc pl-5 space-y-2">
          {emailFailures.map((f) => (
            <li key={f.studentId} className="text-sm">
              <span className="font-medium">{f.studentName}</span>
              <span className="text-muted-foreground">
                {" "}
                — {f.reason}
              </span>
            </li>
          ))}
        </ul>
      </CustomDialog>


    </>
  );
}
