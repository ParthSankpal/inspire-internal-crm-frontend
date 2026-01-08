"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";



import StatCard from "@/components/common/StatCard";
import { DataTable } from "@/components/common/DataTable";
// import MarksTrendChart from "@/components/analytics/MarksTrendChart";
import { Button } from "@/components/ui/button";
import { getStudentAnalytics, getStudentStrengthWeakness, getStudentSubjectAccuracy } from "@/api/analyticsApi";

/* ======================================================
   PAGE
====================================================== */

export default function StudentAnalyticsPage() {
  const { id } = useParams<{ id: string }>();

  const [analytics, setAnalytics] = useState<any>(null);
  const [strength, setStrength] = useState<any>(null);
  const [accuracy, setAccuracy] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* -------------------------------------------------- */
  /* FETCH DATA                                         */
  /* -------------------------------------------------- */

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      try {
        const [a, s, acc] = await Promise.all([
          (id),
          getStudentStrengthWeakness(id),
          getStudentSubjectAccuracy(id),
        ]);

        setAnalytics(a);
        setStrength(s);
        setAccuracy(acc.data);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) return <div>Loading analytics...</div>;
  if (!analytics) return <div>No data found</div>;

  /* -------------------------------------------------- */
  /* RENDER                                             */
  /* -------------------------------------------------- */

  return (
    <div className="space-y-8">
      {/* ================= SUMMARY ================= */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Total Tests"
          value={analytics.summary.totalTestsConducted}
        />

        <StatCard
          label="Tests Given"
          value={analytics.summary.testsAppeared}
        />

        <StatCard
          label="Tests Absent"
          value={analytics.summary.testsAbsent}
        />

        <StatCard
          label="Average Marks"
          value={analytics.summary.avgMarks}
        />
      </div>


      {/* ================= STRENGTH / WEAKNESS ================= */}

      {strength && (
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            label="Strongest Subject"
            value={strength.strongest?._id ?? "-"}
          />
          <StatCard
            label="Weakest Subject"
            value={strength.weakest?._id ?? "-"}
          />
        </div>
      )}

      {/* ================= MARKS TREND ================= */}

      {/* <MarksTrendChart data={analytics.tests} /> */}

      {/* ================= SUBJECT ACCURACY ================= */}

      <div>
        <h2 className="mb-3 text-lg font-semibold">
          Subject-wise Average
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {accuracy.map((s) => (
            <StatCard
              key={s.subject}
              label={s.subject}
              value={s.avgMarks}
            />
          ))}
        </div>
      </div>

      {/* ================= TEST-WISE TABLE ================= */}

      <div>
        <h2 className="mb-3 text-lg font-semibold">
          Test-wise Performance
        </h2>

        <DataTable
          data={analytics.tests}
          showIndex
          columns={[
            {
              id: "test",
              label: "Test",
              accessor: (r: any) => r.test.name,
            },
            {
              id: "date",
              label: "Date",
              accessor: (r: any) =>
                new Date(r.test.date).toLocaleDateString(),
            },
            {
              id: "marks",
              label: "Marks",
              accessor: (r: any) =>
                `${r.totalMarks} / ${r.test.maxMarks}`,
            },
            {
              id: "rank",
              label: "Rank",
              accessor: (r: any) => r.rank ?? "-",
            },
            {
              id: "correct",
              label: "✔",
              accessor: (r: any) => r.correctCount,
            },
            {
              id: "incorrect",
              label: "✖",
              accessor: (r: any) => r.incorrectCount,
            },
            {
              id: "na",
              label: "Ø",
              accessor: (r: any) => r.notAttemptedCount,
            },
          ]}
        />
      </div>

      {/* ================= ACTIONS ================= */}

      <div className="flex justify-end">
        <Button variant="outline">
          Download PDF
        </Button>
      </div>
    </div>
  );
}
