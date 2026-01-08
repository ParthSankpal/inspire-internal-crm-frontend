import StatCard from "../common/StatCard";
import { StudentTestResult } from "@/features/analytics/types";

interface Props {
  data: StudentTestResult;
}

export default function StudentOverviewCards({ data }: Props) {
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

      <StatCard
        label="Total Marks"
        value={data.totalMarks}
        info="Marks obtained in this test"
      />

      <StatCard
        label="Accuracy"
        value={`${Math.round(data.accuracy * 100)}%`}
        info="Correct answers divided by total attempted questions"
        variant={
          data.accuracy >= 0.8
            ? "success"
            : data.accuracy >= 0.5
              ? "warning"
              : "danger"
        }
      />

      <StatCard
        label="Normalized Score"
        value={`${data.normalizedScore}%`}
        info="Score adjusted to a 100-point scale for fair comparison"
        variant={
          data.normalizedScore >= 75
            ? "success"
            : data.normalizedScore >= 50
              ? "warning"
              : "danger"
        }
      />

      <StatCard
        label="Correct"
        value={data.correctCount}
        info="Total correctly answered questions"
      />

      <StatCard
        label="Incorrect"
        value={data.incorrectCount}
        info="Questions answered incorrectly"
      />

      <StatCard
        label="Not Attempted"
        value={data.notAttemptedCount}
        info="Questions skipped by the student"
      />
    </div>
  );
}
