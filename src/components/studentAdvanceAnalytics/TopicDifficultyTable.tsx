"use client";

import { useStudentTopicDifficulty } from "@/features/analytics/useStudentAnalytics";


export function TopicDifficultyTable({
  studentId,
}: {
  studentId: string;
}) {
  const { data, isLoading } = useStudentTopicDifficulty(studentId);

  if (isLoading) return <p>Loading difficulty analytics...</p>;
  if (!data?.length) return null;

  return (
    <div className="border rounded-lg overflow-auto">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="p-2 border">Subject</th>
            <th className="p-2 border">Topic</th>
            <th className="p-2 border">Difficulty</th>
            <th className="p-2 border">Attempted</th>
            <th className="p-2 border">Accuracy</th>
          </tr>
        </thead>

        <tbody>
          {data.map((t, i) => (
            <tr key={i}>
              <td className="p-2 border">{t.subject}</td>
              <td className="p-2 border">{t.topic}</td>
              <td className="p-2 border">{t.difficulty}</td>
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
