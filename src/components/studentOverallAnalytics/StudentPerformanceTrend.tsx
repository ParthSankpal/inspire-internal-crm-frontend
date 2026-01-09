import { StudentTestTimeline } from "@/features/analytics/studentOverall.types";

interface Props {
  timeline: StudentTestTimeline;
}

export default function StudentPerformanceTrend({ timeline }: Props) {
  return (
    <div className="rounded-xl border p-4">
      <h3 className="mb-4 font-semibold">Performance Trend</h3>

      {/* Replace with chart later */}
      <div className="flex gap-4 overflow-x-auto">
        {timeline.map((t) => (
          <div key={t.testId} className="min-w-[120px]">
            <p className="text-xs text-gray-500">
              {new Date(t.date).toLocaleDateString()}
            </p>
            <p className="text-lg font-semibold">
              {t.normalizedScore}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
