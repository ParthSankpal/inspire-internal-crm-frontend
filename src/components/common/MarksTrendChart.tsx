"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

interface Props {
  data: any[];
}

export function MarksTrendChart({ data }: Props) {
  const chartData = data.map((r) => ({
    date: format(new Date(r.createdAt), "dd MMM"),
    marks: r.totalMarks,
  }));

  return (
    <div className="rounded-lg border p-4">
      <h3 className="mb-2 font-semibold">Marks Trend</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="marks"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
