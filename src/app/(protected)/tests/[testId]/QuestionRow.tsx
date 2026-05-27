"use client";

import { Control, UseFormSetValue, UseFormWatch, useWatch } from "react-hook-form";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { FormSelect } from "@/components/common/Forms/FormSelect";

import {
  QuestionFormData,
} from "@/features/question/types";

/* ----------------------------------------------------
   Local Syllabus Data
---------------------------------------------------- */

import { PHYSICS_SYLLABUS } from "@/features/data/physicsSyllabus";

import { CHEMISTRY_SYLLABUS } from "@/features/data/chemistrySyllabus";

import { MATHS_SYLLABUS } from "@/features/data/mathsSyllabus";

import { BIOLOGY_SYLLABUS } from "@/features/data/biologySyllabus";

/* ----------------------------------------------------
   Syllabus Map
---------------------------------------------------- */

const SYLLABUS_MAP = {
  Physics: PHYSICS_SYLLABUS,

  Chemistry: CHEMISTRY_SYLLABUS,

  Maths: MATHS_SYLLABUS,

  Biology: BIOLOGY_SYLLABUS,
};

/* ----------------------------------------------------
   Types
---------------------------------------------------- */

type Props = {
  index: number;

  control: Control<any>;

  setValue: UseFormSetValue<any>;

  watch?: UseFormWatch<any>;

  editable: boolean;

  isFixed: boolean;

  remove: (index: number) => void;
};

/* ----------------------------------------------------
   Component
---------------------------------------------------- */

export default function QuestionRow({
  index,
  control,
  setValue,
  editable,
  isFixed,
  remove,
}: Props) {
  /* ----------------------------------------------------
     Current Values
  ---------------------------------------------------- */


  const question = useWatch({
  control,
  name: `questions.${index}`,
});

const subject = question?.subject;

const chapter = question?.chapter;

const topic = question?.topic;

  /* ----------------------------------------------------
     Syllabus Data
  ---------------------------------------------------- */

  const syllabusData =
    SYLLABUS_MAP[
      subject as keyof typeof SYLLABUS_MAP
    ] || [];

  /* ----------------------------------------------------
     Chapter Options
  ---------------------------------------------------- */

  const chapterOptions = syllabusData.map(
    (c: any) => ({
      label: c.chapter,
      value: c.chapter,
    })
  );

  /* ----------------------------------------------------
     Selected Chapter
  ---------------------------------------------------- */

  const selectedChapter =
    syllabusData.find(
      (c: any) => c.chapter === chapter
    );

  /* ----------------------------------------------------
     Topic Options
  ---------------------------------------------------- */

  const topicOptions =
    selectedChapter?.topics.map((t: any) => ({
      label: t.name,
      value: t.name,
    })) || [];

  /* ----------------------------------------------------
     Subject Options
  ---------------------------------------------------- */

  const subjectOptions = [
    {
      label: "Physics",
      value: "Physics",
    },

    {
      label: "Chemistry",
      value: "Chemistry",
    },

    {
      label: "Maths",
      value: "Maths",
    },

    {
      label: "Biology",
      value: "Biology",
    },
  ];

  /* ----------------------------------------------------
     Difficulty Options
  ---------------------------------------------------- */

  const difficultyOptions = [
    {
      label: "Easy",
      value: "Easy",
    },

    {
      label: "Medium",
      value: "Medium",
    },

    {
      label: "Hard",
      value: "Hard",
    },
  ];

  /* ----------------------------------------------------
     Cognitive Options
  ---------------------------------------------------- */

  const cognitiveOptions = [
    {
      label: "Conceptual",
      value: "Conceptual",
    },

    {
      label: "Application",
      value: "Application",
    },

    {
      label: "Mixed",
      value: "Mixed",
    },
  ];

  /* ----------------------------------------------------
     Correct Option Choices
  ---------------------------------------------------- */

  const correctOptions = [
    {
      label: "A",
      value: "A",
    },

    {
      label: "B",
      value: "B",
    },

    {
      label: "C",
      value: "C",
    },

    {
      label: "D",
      value: "D",
    },
  ];

  /* ----------------------------------------------------
     UI
  ---------------------------------------------------- */

  return (
    <tr>
      {/* Q No */}

      <td className="p-2 border text-center font-medium">
        {index + 1}
      </td>

      {/* Subject */}

      <td className="p-2 border max-w-[100px]">
        <FormSelect
          name={`questions.${index}.subject`}
          control={control}
          disabled={!editable}
          options={subjectOptions}
          onValueChange={(value) => {
            setValue(
              `questions.${index}.subject`,
              value
            );

            /* Reset dependent fields */

            setValue(
              `questions.${index}.chapter`,
              ""
            );

            setValue(
              `questions.${index}.topic`,
              ""
            );
          }}
        />
      </td>

      {/* Chapter */}

      <td className="p-2 border max-w-[200px]">
        <FormSelect
          name={`questions.${index}.chapter`}
          control={control}
          disabled={!editable || !subject}
          options={chapterOptions}
          onValueChange={(value) => {
            setValue(
              `questions.${index}.chapter`,
              value
            );

            /* Reset topic */

            setValue(
              `questions.${index}.topic`,
              ""
            );
          }}
        />
      </td>

      {/* Topic */}

      <td className="p-2 border max-w-[200px]">
        <FormSelect
          name={`questions.${index}.topic`}
          control={control}
          disabled={!editable || !chapter}
          options={topicOptions}
        />
      </td>

      {/* Difficulty */}

      <td className="p-2 border max-w-[120px]">
        <FormSelect
          name={`questions.${index}.difficulty`}
          control={control}
          disabled={!editable}
          options={difficultyOptions}
        />
      </td>

      {/* Cognitive */}

      <td className="p-2 border max-w-[120px]">
        <FormSelect
          name={`questions.${index}.cognitiveType`}
          control={control}
          disabled={!editable}
          options={cognitiveOptions}
        />
      </td>

      {/* Correct Option */}

      <td className="p-2 border max-w-[40px]">
        <FormSelect
          name={`questions.${index}.correctOption`}
          control={control}
          disabled={!editable}
          options={correctOptions}
        />
      </td>

      {/* Marks */}

      <td className="p-2 border text-center">
        <input
          type="number"
         value={question?.marks ?? 4}
          disabled={!editable}
          onChange={(e) =>
            setValue(
              `questions.${index}.marks`,
              Number(e.target.value)
            )
          }
          className="w-20 rounded border px-2 py-1 text-center"
        />
      </td>

      {/* Negative Marks */}

      <td className="p-2 border text-center">
        <input
          type="number"
          value={question?.negativeMarks ?? -1}
          disabled={!editable}
          onChange={(e) =>
            setValue(
              `questions.${index}.negativeMarks`,
              Number(e.target.value)
            )
          }
          className="w-20 rounded border px-2 py-1 text-center"
        />
      </td>

      {/* Remove */}

      {!isFixed && (
        <td className="p-2 border text-center">
          <Button
            variant="ghost"
            size="icon"
            disabled={!editable}
            onClick={() => remove(index)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </td>
      )}
    </tr>
  );
}