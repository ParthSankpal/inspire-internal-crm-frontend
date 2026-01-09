
import { StudentTestTimeline } from "@/features/analytics/studentOverall.types";
import Link from "next/link";

interface Props {
  timeline: StudentTestTimeline;
  studentId: string;
}

export default function StudentTestHistoryTable({
  timeline,
  studentId,
}: Props) {
  return (
    <div className="rounded-xl border p-4">
      <h3 className="mb-4 font-semibold">Test History</h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Test</th>
            <th>Date</th>
            <th>Score %</th>
            <th>Accuracy</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {timeline.map((t) => (
            <tr key={t.testId} className="border-b">
              <td className="p-2">{t.testName}</td>
              <td>
                {new Date(t.date).toLocaleDateString()}
              </td>
              <td>{t.normalizedScore}%</td>
              <td>{Math.round(t.accuracy * 100)}%</td>
              <td>
                <Link
                  href={`/students/${studentId}/tests/${t.testId}/analytics`}
                  className="text-blue-600"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
