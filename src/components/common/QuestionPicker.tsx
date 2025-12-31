
import { Button } from "@/components/ui/button";
import { Question } from "@/features/question/types";
import { useState } from "react";

export default function QuestionPicker({
  questions,
  onAdd,
  disabled,
}: {
  questions: Question[];
  onAdd: (qs: Question[]) => void;
  disabled?: boolean;
}) {
  const [selected, setSelected] = useState<Question[]>([]);

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <h3 className="font-semibold">Question Bank</h3>

      <div className="space-y-2 max-h-[400px] overflow-auto">
        {questions.map((q) => (
          <label key={q._id} className="flex gap-2 items-center">
            <input
              type="checkbox"
              disabled={disabled}
              onChange={(e) =>
                setSelected((prev) =>
                  e.target.checked
                    ? [...prev, q]
                    : prev.filter((x) => x._id !== q._id)
                )
              }
            />
            <span className="text-sm">
              {q.subject} – {q.chapter} – {q.topic}
            </span>
          </label>
        ))}
      </div>

      <Button
        disabled={disabled || selected.length === 0}
        onClick={() => {
          onAdd(selected);
          setSelected([]);
        }}
      >
        Add Selected
      </Button>
    </div>
  );
}
