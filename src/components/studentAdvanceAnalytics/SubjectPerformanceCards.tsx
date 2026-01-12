"use client";

import { Card } from "@/components/ui/card";
import { useStudentSubjects } from "@/features/analytics/useStudentAnalytics";


export function SubjectPerformanceCards({
  studentId,
}: {
  studentId: string;
}) {
  const { data, isLoading } = useStudentSubjects(studentId);

  if (isLoading) return <p>Loading subject analytics...</p>;
  if (!data?.length) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {data.map((s) => (
        <Card key={s.subject} className="p-4">
          <h4 className="font-semibold">{s.subject}</h4>

          <p className="text-sm text-muted-foreground mt-1">
            Accuracy
          </p>

          <p className="text-xl font-bold">
            {(s.accuracy * 100).toFixed(0)}%
          </p>

          <p className="text-xs text-muted-foreground mt-1">
            Attempted: {s.attempted}
          </p>
        </Card>
      ))}
    </div>
  );
}
