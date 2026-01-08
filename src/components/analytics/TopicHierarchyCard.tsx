import { Card, CardContent } from "@/components/ui/card";

export default function TopicHierarchyCard({
  data,
}: {
  data: Record<string, any>;
}) {
  return (
    <Card className=" py-0">
      <CardContent className="p-4">
        <h3 className="font-semibold mb-4">
          Topic-wise Performance
        </h3>

        <div className="space-y-6 text-sm">
          {Object.entries(data).map(
            ([subject, chapters]: any) => (
              <div key={subject}>
                <p className="text-lg font-bold mb-2">
                  {subject}
                </p>

                {Object.entries(chapters).map(
                  ([chapter, topics]: any) => (
                    <div key={chapter} className="py-3">
                      <p className="font-medium mb-2">
                        {chapter}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {Object.entries(topics).map(
                          ([topic, t]: any) => (
                            <div
                              key={topic}
                              className="rounded-lg border p-3 bg-white shadow-sm"
                            >

                              <p className="font-medium">{topic}</p>

                              <p className="text-xs text-muted-foreground">
                                {t.totalQuestions} questions •{" "}
                                {t.attemptedQuestions} attempted •{" "}
                                {t.correctQuestions} correct
                              </p>

                              <div className="mt-2 flex items-center gap-4 text-sm">
                                <span>
                                  Accuracy:{" "}
                                  <span className="font-semibold">
                                    {Math.round(t.accuracy * 100)}%
                                  </span>
                                </span>

                                <span className="text-muted-foreground">
                                  Coverage: {Math.round(t.coverage * 100)}%
                                </span>
                              </div>

                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}
