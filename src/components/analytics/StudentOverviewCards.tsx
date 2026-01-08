import StatCard from "../common/StatCard";


interface Props {
  data: {
    totalMarks: number;
    normalizedScore: number;
    accuracy: number;
    correctCount: number;
    incorrectCount: number;
    notAttemptedCount: number;
  };
}

export default function StudentOverviewCards({ data }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <StatCard
        label="Total Marks"
        value={data.totalMarks}
        info="Marks obtained in this test"
      />
      <StatCard
        label="Accuracy"
        value={`${Math.round(data.accuracy * 100)}%`}
        info="Correct answers divided by total attempted questions"
      />
      <StatCard
        label="Normalized Score"
        value={`${data.normalizedScore}%`}
        info="Score adjusted to a 100-point scale for fair comparison"
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

