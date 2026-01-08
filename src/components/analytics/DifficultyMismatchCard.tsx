import { Card, CardContent } from "@/components/ui/card";

interface Mismatch {
  subject: string;
  chapter: string;
  topic: string;
  difficulty: string;
  accuracy: number;
  issue: string;
}

export default function DifficultyMismatchCard({ data }: { data: Mismatch[] }) {
  if (!data || data.length === 0) return null;

  return (
    <Card className="border-l-4 border-red-500 bg-red-50/40 py-0">
      <CardContent className="p-4">
        <h3 className="font-semibold text-red-600 mb-3">
          ⚠ Difficulty Mismatch Alerts
        </h3>

        <div className="grid grid-cols-2 gap-4 text-sm">
          {data.map((d, i) => (
            <div
              key={i}
              className="rounded-md bg-white p-3 shadow-sm"
            >
              <p className="font-medium">
                {d.subject} → {d.chapter} → {d.topic}
              </p>
              <p className="text-muted-foreground mt-1">
                {d.issue} • Accuracy:{" "}
                <span className="font-medium">
                  {Math.round(d.accuracy * 100)}%
                </span>
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
