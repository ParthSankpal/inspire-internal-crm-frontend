import { StudentTestParticipationSummary } from "@/features/analytics/studentOverall.types";

interface Props {
  summary: StudentTestParticipationSummary;
}

export default function StudentOverallSummary({ summary }: Props) {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Card label="Total Tests" value={summary.totalTestsConducted} />
      <Card label="Appeared" value={summary.testsAppeared} />
      <Card label="Absent" value={summary.testsAbsent} />
      <Card
        label="Attendance %"
        value={`${summary.attendancePercentage}%`}
      />
    </div>
  );
}

const Card = ({ label, value }: any) => (
  <div className="rounded-xl border p-4">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-2xl font-semibold">{value}</p>
  </div>
);
