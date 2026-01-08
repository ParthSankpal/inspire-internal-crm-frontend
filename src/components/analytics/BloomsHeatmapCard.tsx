import { Card, CardContent } from "@/components/ui/card";

interface HeatmapRow {
  cognitiveType: string;
  levels: {
    difficulty: string;
    attempts: number;
    accuracy: number;
  }[];
}

export default function BloomsHeatmapCard({ data }: { data: HeatmapRow[] }) {
  return (
    <Card  className=" py-0">
      <CardContent className="p-4">
        <h3 className="font-semibold mb-4">
          Bloom’s Taxonomy × Difficulty
        </h3>

        <div className="space-y-5">
          {data.map((row) => (
            <div key={row.cognitiveType}>
              <p className="font-medium mb-2">
                {row.cognitiveType}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {row.levels.map((l) => {
                  const percent = Math.round(l.accuracy * 100);

                  return (
                    <div
                      key={l.difficulty}
                      className="rounded-lg border p-3 bg-muted/30"
                    >
                      <p className="text-sm font-medium">
                        {l.difficulty}
                      </p>
                      <p className="text-xl font-semibold">
                        {percent}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {l.attempts} attempts
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
