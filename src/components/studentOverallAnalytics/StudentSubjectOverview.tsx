import { StudentStrengthWeakness, StudentSubjectPerformanceList } from "@/features/analytics/studentOverall.types";

interface Props {
  subjects: StudentSubjectPerformanceList;
  strengthWeakness: StudentStrengthWeakness;
}

export default function StudentSubjectOverview({
  subjects,
  strengthWeakness,
}: Props) {
  return (
    <div className="rounded-xl border p-4">
      <h3 className="mb-4 font-semibold">Subject Performance</h3>

      <div className="grid grid-cols-4 gap-4">
        {subjects.map((s) => (
          <div key={s.subject}>
            <p className="text-sm text-gray-500">{s.subject}</p>
            <p className="text-lg font-semibold">{s.avgMarks}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm">
        <p>
          <strong>Strongest:</strong>{" "}
          {strengthWeakness.strongest?.subject || "—"}
        </p>
        <p>
          <strong>Weakest:</strong>{" "}
          {strengthWeakness.weakest?.subject || "—"}
        </p>
      </div>
    </div>
  );
}
