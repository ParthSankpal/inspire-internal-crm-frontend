"use client";

import { useParams, useRouter } from "next/navigation";
import TestResultsTable from "../TestResultsTable";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function TestAnalyticsPage() {
    const router = useRouter();
  
  const { testId } = useParams<{ testId: string }>();


  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => router.back()}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </div>
      
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
