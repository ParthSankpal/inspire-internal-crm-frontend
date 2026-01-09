"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";



/* =============================
   COMPONENTS
============================= */



import { getStudentOverallAnalytics } from "@/api/studentOverallAnalytics";
import { StudentOverallAnalytics } from "@/features/analytics/studentOverall.types";
import StudentOverallSummary from "@/components/studentOverallAnalytics/StudentOverallSummary";
import StudentPerformanceTrend from "@/components/studentOverallAnalytics/StudentPerformanceTrend";
import StudentSubjectOverview from "@/components/studentOverallAnalytics/StudentSubjectOverview";
import StudentTestHistoryTable from "@/components/studentOverallAnalytics/StudentTestHistoryTable";

export default function StudentOverallAnalyticsPage() {
  const { id } = useParams<{ id: string }>();
  console.log(id);

  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] =
    useState<StudentOverallAnalytics | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const data = await getStudentOverallAnalytics(id);
        console.log(data);

        setAnalytics(data);
      } catch (err) {
        console.error("Failed to load student analytics", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [id]);

  if (loading) {
    return <div className="p-6">hi</div>;
  }

  if (!analytics) {
    return <div className="p-6">No analytics available</div>;
  }

  return (
    <div className="space-y-6 p-6">
      {/* =============================
         SUMMARY CARDS
      ============================== */}
      <StudentOverallSummary summary={analytics.summary} />

      {/* =============================
         SCORE TREND
      ============================== */}
      <StudentPerformanceTrend timeline={analytics.timeline} />

      {/* =============================
         SUBJECT PERFORMANCE
      ============================== */}
      <StudentSubjectOverview
        subjects={analytics.subjects}
        strengthWeakness={analytics.strengthWeakness}
      />

      {/* =============================
         TEST HISTORY
      ============================== */}
      <StudentTestHistoryTable
        studentId={id}
      />
    </div>
  );
}
