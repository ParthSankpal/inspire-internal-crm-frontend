"use client";

import { Card } from "@/components/ui/card";
import { useStudentStrengthWeakness } from "@/features/analytics/useStudentAnalytics";

export function StrengthWeaknessPanel({
  studentId,
}: {
  studentId: string;
}) {
  const { data, isLoading } = useStudentStrengthWeakness(studentId);

  if (isLoading) return <p>Loading strengths & weaknesses...</p>;
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Strengths */}
      <Card className="p-4">
        <h3 className="font-semibold mb-2 text-green-700">
          Strengths
        </h3>

        {data.strengths.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No strong topics yet
          </p>
        ) : (
          <ul className="space-y-1 text-sm">
            {data.strengths.map((t, i) => (
              <li key={i}>
                {t.subject} → {t.topic} (
                {(t.accuracy * 100).toFixed(0)}%)
              </li>
            ))}
          </ul>
        )}
      </Card>

      {/* Weaknesses */}
      <Card className="p-4">
        <h3 className="font-semibold mb-2 text-red-700">
          Weak Areas
        </h3>

        {data.weaknesses.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No weak topics 🎉
          </p>
        ) : (
          <ul className="space-y-1 text-sm">
            {data.weaknesses.map((t, i) => (
              <li key={i}>
                {t.subject} → {t.topic} (
                {(t.accuracy * 100).toFixed(0)}%)
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
