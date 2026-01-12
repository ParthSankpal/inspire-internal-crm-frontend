"use client";

import { useStudentTopics } from "@/features/analytics/useStudentAnalytics";


export function TopicPerformanceTable({
  studentId,
}: {
  studentId: string;
}) {
  const { data, isLoading } = useStudentTopics(studentId);

  if (isLoading) return <p>Loading topic performance...</p>;
  if (!data?.length) return null;

  return (
    <div className="border rounded-lg overflow-auto">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="p-2 border">Subject</th>
            <th className="p-2 border">Chapter</th>
            <th className="p-2 border">Topic</th>
            <th className="p-2 border">Attempted</th>
            <th className="p-2 border">Accuracy</th>
          </tr>
        </thead>

        <tbody>
          {data.map((t, i) => (
            <tr key={i}>
              <td className="p-2 border">{t.subject}</td>
              <td className="p-2 border">{t.chapter}</td>
              <td className="p-2 border">{t.topic}</td>
              <td className="p-2 border text-center">
                {t.attempted}
              </td>
              <td className="p-2 border text-center">
                {(t.accuracy * 100).toFixed(0)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}