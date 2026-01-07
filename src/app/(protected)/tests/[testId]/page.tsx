

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Resolver, useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { FormSelect } from "@/components/common/Forms/FormSelect";
import { useNotify } from "@/components/common/NotificationProvider";

import { publishTest, unpublishTest } from "@/api/testApi";
import { getTestById, saveQuestionConfig } from "@/api/questionApi";
import { Test } from "@/features/test/types";
import { QuestionFormData, questionSchema } from "@/features/question/types";
import { IsoDate } from "@/components/common/IsoDate";
import UploadResultsDialog from "../UploadResultsDialog";
import QuestionRow from "./QuestionRow";
import { FormInput } from "@/components/common/Forms/FormInput";


/* ----------------------------------------------------
   Helpers
---------------------------------------------------- */

function getQuestionCount(examType: Test["examType"]) {
  if (examType === "JEE") return 75;
  if (examType === "NEET") return 180;
  return 0;
}

function isFixedQuestionExam(examType: Test["examType"]) {
  return examType === "JEE" || examType === "NEET";
}

function isQuestionConfigured(q: QuestionFormData | undefined) {
  if (!q) return false;
  return Boolean(q.subject && q.chapter && q.topic && q.correctOption);
}

const createEmptyQuestion = (
  classLevel: 8 | 9 | 10 | 11 | 12
): QuestionFormData => ({
  subject: "Physics",
  classLevel,
  chapter: "",
  topic: "",
  difficulty: "Easy",
  cognitiveType: "Conceptual",
  options: { A: "A", B: "B", C: "C", D: "D" },
  correctOption: "A",
  marks: 4,
  negativeMarks: -1,
});

/* ----------------------------------------------------
   Types
---------------------------------------------------- */

type TestConfigForm = {
  classLevel: 8 | 9 | 10 | 11 | 12;
  questions: QuestionFormData[];
  subjectWiseMaxMarks: Record<string, number>;
};


/* ----------------------------------------------------
   Page
---------------------------------------------------- */

export default function TestBuilderManualPage() {
  const { testId } = useParams<{ testId: string }>();
  const notify = useNotify();
  const router = useRouter();

  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);

  const editable = test?.status === "Draft";

  const { control, reset, watch, getValues, setValue } =
    useForm<TestConfigForm>({
      resolver: zodResolver(
        questionSchema.array()
      ) as unknown as Resolver<TestConfigForm>,
      defaultValues: {
        classLevel: 11,
        questions: [],
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  /* ----------------------------------------------------
     Load test
  ---------------------------------------------------- */

  useEffect(() => {
    (async () => {
      try {
        const found = await getTestById(testId);
        setTest(found);

        const fixedCount = getQuestionCount(found.examType);

        if (found?.questionConfig?.length) {
          reset({
            classLevel: found.questionConfig?.[0]?.classLevel ?? 11,
            questions: found.questionConfig ?? [],
            subjectWiseMaxMarks: found.subjectWiseMaxMarks ?? {},
          });

        } else if (fixedCount > 0) {
          reset({
            classLevel: 11,
            questions: Array.from({ length: fixedCount }, () =>
              createEmptyQuestion(11)
            ),
          });
        }
      } catch {
        notify("Failed to load test", "error");
      } finally {
        setLoading(false);
      }
    })();
  }, [testId, reset, notify]);

  /* ----------------------------------------------------
     Loader
  ---------------------------------------------------- */

  if (loading || !test) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
          <p className="text-sm text-muted-foreground">
            Loading test configuration...
          </p>
        </div>
      </div>
    );
  }

  /* ----------------------------------------------------
     Derived state
  ---------------------------------------------------- */

  const watchedQuestions = watch("questions");
  const isFixed = isFixedQuestionExam(test.examType);
  const requiredCount = getQuestionCount(test.examType);

  const configuredCount =
    watchedQuestions?.filter(isQuestionConfigured).length ?? 0;

  const allQuestionsConfigured =
    watchedQuestions.length > 0 &&
    watchedQuestions.every(isQuestionConfigured);

  const canSaveOrPublish = isFixed
    ? watchedQuestions.length === requiredCount && allQuestionsConfigured
    : allQuestionsConfigured;

  /* ----------------------------------------------------
     Save / Publish
  ---------------------------------------------------- */

  const saveConfig = async () => {
    try {
      setSaving(true);
      const data = getValues();

      await saveQuestionConfig(test._id!, {
        questions: data.questions.map((q) => ({
          ...q,
          classLevel: data.classLevel,
        })),
        subjectWiseMaxMarks: data.subjectWiseMaxMarks,
      });

      notify("Question configuration saved ✅", "success");
    } catch {
      notify("Failed to save question configuration", "error");
    } finally {
      setSaving(false);
    }
  };


  const publish = async () => {
    await saveConfig();
    const updated = await publishTest(test._id!);
    setTest(updated);
    notify("Test published 🚀", "success");
  };

  /* ----------------------------------------------------
     UI
  ---------------------------------------------------- */

  return (
    <div className="p-6 space-y-6">
      {/* ================= Test Details ================= */}
      <div className="border rounded-lg p-4 bg-muted/30">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{test.name}</h1>
            <p className="text-sm text-muted-foreground">
              {test.examType} • {test.testType}
            </p>
          </div>
          <Badge>{test.status}</Badge>
        </div>

        <div className="grid grid-cols-5 gap-4 mt-4 text-sm">
          <div>
            <p className="text-muted-foreground">Class</p>
            <FormSelect
              name="classLevel"
              control={control}
              disabled={!editable}
              options={[
                { value: "8", label: "8" },
                { value: "9", label: "9" },
                { value: "10", label: "10" },
                { value: "11", label: "11" },
                { value: "12", label: "12" },
              ]}
            />
          </div>

          <div>
            <p className="text-muted-foreground">Date</p>
            <p className="font-medium">
              <IsoDate value={test.date} />
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">Duration</p>
            <p className="font-medium">{test.durationMinutes} mins</p>
          </div>

          <div>
            <p className="text-muted-foreground">Total Questions</p>
            <p className="font-medium">{requiredCount}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Questions Configured</p>
            <p className="font-medium">
              {configuredCount}
              {isFixed && ` / ${requiredCount}`}
            </p>
          </div>
        </div>
      </div>

        {/* ================= Subject-wise Marks ================= */}
          <div className="border rounded-lg p-4 bg-muted/30">
            <h3 className="text-lg font-semibold mb-3">
              Subject-wise Maximum Marks
            </h3>

            <div className="grid grid-cols-3 gap-4">
              {test.subjectsIncluded.map((subject) => (
                <FormInput
                  key={subject}
                  name={`subjectWiseMaxMarks.${subject}`}
                  label={`${subject} Marks`}
                  type="number"
                  control={control}
                  disabled={!editable}
                />
              ))}
            </div>
          </div>

      {/* ================= Add Question ================= */}
      {!isFixed && editable && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={() =>
              append(createEmptyQuestion(getValues("classLevel")))
            }
          >
            + Add Question
          </Button>
        </div>
      )}

      {test.status === "Completed" && (
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={() => router.push(`/tests/${test._id}/analytics`)}
          >
            View Analytics
          </Button>
        </div>
      )}


      {/* ================= Config Table ================= */}
      <div className="border rounded-lg overflow-auto max-h-[70vh]">
        <table className="w-full text-sm">
          <thead className="bg-muted sticky top-0">
            <tr>
              <th className="p-2 border">Q No</th>
              <th className="p-2 border">Subject</th>
              <th className="p-2 border">Chapter</th>
              <th className="p-2 border">Topic</th>
              <th className="p-2 border">Difficulty</th>
              <th className="p-2 border">Cognitive</th>
              <th className="p-2 border">✔ Correct</th>
              <th className="p-2 border">Marks</th>
              <th className="p-2 border">−Marks</th>
              {!isFixed && <th className="p-2 border w-10"></th>}
            </tr>
          </thead>



          <tbody>
            {fields.map((_, i) => (
              <QuestionRow
                key={i}
                index={i}
                control={control}
                watch={watch}
                setValue={setValue}
                editable={editable}
                isFixed={isFixed}
                remove={remove}
              />
            ))}
          </tbody>

        </table>
      </div>

      {/* ================= Actions ================= */}
      {editable ? (
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            disabled={saving || !canSaveOrPublish}
            onClick={saveConfig}
          >
            Save Draft
          </Button>

          <Button
            disabled={saving || !canSaveOrPublish}
            onClick={publish}
          >
            Publish Test
          </Button>
        </div>
      ) : (
        <div className="flex justify-end gap-3">
          {test.status === "Published" && (
            <Button onClick={() => setOpenUpload(true)}>
              Upload Results
            </Button>
          )}

          <Button
            variant="outline"
            onClick={async () => {
              const updated = await unpublishTest(test._id!);
              setTest(updated);
              notify("Test reverted to Draft", "info");
            }}
          >
            Unpublish
          </Button>
        </div>
      )}


      <UploadResultsDialog
        open={openUpload}
        testId={test._id!}
        onOpenChange={setOpenUpload}
      />
    </div>
  );
}
