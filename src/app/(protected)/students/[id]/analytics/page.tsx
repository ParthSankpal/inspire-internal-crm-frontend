"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import { getStudentOverallAnalytics } from "@/api/studentOverallAnalytics";
import { StudentOverallAnalytics } from "@/features/analytics/studentOverall.types";

import StudentOverallSummary from "@/components/studentOverallAnalytics/StudentOverallSummary";
import StudentPerformanceTrend from "@/components/studentOverallAnalytics/StudentPerformanceTrend";
import StudentSubjectOverview from "@/components/studentOverallAnalytics/StudentSubjectOverview";
import StudentTestHistoryTable from "@/components/studentOverallAnalytics/StudentTestHistoryTable";
import { SubjectPerformanceCards } from "@/components/studentAdvanceAnalytics/SubjectPerformanceCards";
import { StrengthWeaknessPanel } from "@/components/studentAdvanceAnalytics/StrengthWeaknessPanel";
import { TopicPerformanceTable } from "@/components/studentAdvanceAnalytics/TopicPerformanceTable";
import { TopicDifficultyTable } from "@/components/studentAdvanceAnalytics/TopicDifficultyTable";
import { TopicCoverageTable } from "@/components/studentAdvanceAnalytics/TopicCoverageTable";


export default function StudentOverallAnalyticsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] =
    useState<StudentOverallAnalytics | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const data = await getStudentOverallAnalytics(id);
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
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
          <p className="text-sm text-muted-foreground">
            Loading analytics...
          </p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return <div className="p-6">No analytics available</div>;
  }

  return (
    <div className="space-y-8 p-6">

      {/* =============================
         BACK
      ============================== */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>

      {/* =============================
         OVERALL SUMMARY
      ============================== */}
      <StudentOverallSummary summary={analytics.summary} />

      {/* =============================
         PERFORMANCE TREND
      ============================== */}
      <StudentPerformanceTrend timeline={analytics.timeline} />

      {/* =============================
         SUBJECT OVERVIEW (OLD)
      ============================== */}
      <StudentSubjectOverview
        subjects={analytics.subjects}
        strengthWeakness={analytics.strengthWeakness}
      />

      {/* =====================================================
         🔥 NEW ANALYTICS START HERE
      ===================================================== */}

      {/* =============================
         SUBJECT ACCURACY CARDS
      ============================== */}
      <SubjectPerformanceCards studentId={id} />

      {/* =============================
         TOPIC STRENGTH / WEAKNESS
      ============================== */}
      <StrengthWeaknessPanel studentId={id} />

      {/* =============================
         TOPIC-WISE PERFORMANCE
      ============================== */}
      <TopicPerformanceTable studentId={id} />

      {/* =============================
         TOPIC × DIFFICULTY
      ============================== */}
      <TopicDifficultyTable studentId={id} />
      <TopicCoverageTable studentId={id} />

      {/* =============================
         TEST HISTORY
      ============================== */}
      <StudentTestHistoryTable studentId={id} />
    </div>
  );
}
