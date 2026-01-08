"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import StudentOverviewCards from "@/components/analytics/StudentOverviewCards";
import SubjectWiseMarksCard from "@/components/analytics/SubjectWiseMarksCard";
import DifficultyMismatchCard from "@/components/analytics/DifficultyMismatchCard";
import BloomsHeatmapCard from "@/components/analytics/BloomsHeatmapCard";
import TopicHierarchyCard from "@/components/analytics/TopicHierarchyCard";

import {
  getStudentLearningMapAnalytics,
  getStudentSubjectWiseMarks,
  getStudentTestResult,
  getTestLearningMap,
} from "@/api/analyticsApi";
import { useNotify } from "@/components/common/NotificationProvider";
import { LearningMapResponse, StudentTestResult, SubjectWiseMarks } from "@/features/analytics/types";


export default function StudentTestAnalyticsPage() {
  const { testId, studentId } = useParams<{
    testId: string;
    studentId: string;
  }>();

  const notify = useNotify();

  /* ===============================
     DATA STATES
  =============================== */

  const [result, setResult] = useState<StudentTestResult | null>(null);
  const [subjects, setSubjects] = useState<SubjectWiseMarks | null>(null);
  const [learningMap, setLearningMap] = useState<LearningMapResponse | null>(null);


  /* ===============================
     LOADING STATES
  =============================== */

  const [loadingResult, setLoadingResult] = useState(true);
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [loadingLearningMap, setLoadingLearningMap] = useState(true);

  /* ===============================
     FETCH DATA
  =============================== */

  useEffect(() => {
    if (!testId || !studentId) return;

    // ---------- STUDENT OVERVIEW ----------
    setLoadingResult(true);
    getStudentTestResult(testId, studentId)
      .then((res) => {
        setResult(res);
        notify("Student overview loaded", "success", 2000);
      })
      .catch(() =>
        notify("Failed to load student overview", "error")
      )
      .finally(() => setLoadingResult(false));

    // ---------- SUBJECT MARKS ----------
    setLoadingSubjects(true);
    getStudentSubjectWiseMarks(testId, studentId)
      .then((res) => {
        setSubjects(res);
        notify("Subject-wise marks loaded", "success", 2000);
      })
      .catch(() =>
        notify("Failed to load subject-wise marks", "error")
      )
      .finally(() => setLoadingSubjects(false));

    // ---------- LEARNING MAP ----------
    setLoadingLearningMap(true);
    getStudentLearningMapAnalytics(testId, studentId)
      .then((res) => {
        setLearningMap(res);
        notify("Topic analytics loaded", "success", 2000);
      })
      .catch(() =>
        notify(
          "Failed to load topic & difficulty analytics",
          "error"
        )
      )
      .finally(() => setLoadingLearningMap(false));
  }, [testId, studentId, notify]);

  /* ===============================
     GLOBAL LOADER
  =============================== */

  const showGlobalLoader =
    loadingResult && loadingSubjects && loadingLearningMap;

  if (showGlobalLoader) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
          <p className="text-sm text-muted-foreground">
            Loading test analytics...
          </p>
        </div>
      </div>
    );
  }

  /* ===============================
     UI
  =============================== */

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-semibold">
        Student Test Analytics
      </h1>

      {!loadingResult && result && (
        <StudentOverviewCards data={result} />
      )}

      {!loadingSubjects && subjects && (
        <SubjectWiseMarksCard data={subjects} />
      )}

      {!loadingLearningMap && learningMap && (
        <DifficultyMismatchCard
          data={learningMap.difficultyMismatch}
        />
      )}

      {!loadingLearningMap && learningMap && (
        <BloomsHeatmapCard
          data={learningMap.bloomsHeatmap}
        />
      )}

      {!loadingLearningMap && learningMap && (
        <TopicHierarchyCard
          data={learningMap.hierarchy}
        />
      )}
    </div>
  );
}
