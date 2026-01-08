import { Card, CardContent } from "@/components/ui/card";

interface Props {
  data: Record<string, number>;
}

export default function SubjectWiseMarksCard({ data }: Props) {
  return (
    <Card className=" py-0">
      <CardContent className="p-4">
        <h3 className="font-semibold mb-3">
          Subject-wise Performance
        </h3>

        <div className="space-y-2">
          {Object.entries(data).map(([subject, marks]) => (
            <div
              key={subject}
              className="flex justify-between text-sm"
            >
              <span>{subject}</span>
              <span className="font-medium">{marks}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
