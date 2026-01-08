"use client";

import { useParams } from "next/navigation";
import TestResultsTable from "../TestResultsTable";

export default function TestAnalyticsPage() {
  const { testId } = useParams<{ testId: string }>();

  return (
    <div className="p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Test Results</h1>
        <p className="text-sm text-muted-foreground">
          Student-wise performance overview
        </p>
      </div>

      <TestResultsTable testId={testId} />
    </div>
  );
}
