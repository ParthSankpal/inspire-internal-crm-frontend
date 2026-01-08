"use client";

import { useEffect, useMemo, useRef } from "react";
import { Control, UseFormWatch, UseFormSetValue, useWatch } from "react-hook-form";

import { FormInput } from "@/components/common/Forms/FormInput";
import { FormSelect } from "@/components/common/Forms/FormSelect";
import { FormCombobox } from "@/components/common/Forms/FormCombobox";

import { getChapters, getTopics } from "@/utils/syllabusHelpers";

interface Props {
  index: number;
  control: Control<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
  editable: boolean;
  isFixed: boolean;
  remove: (index: number) => void;
}

export default function QuestionRow({
  index,
  control,
  setValue,
  editable,
  isFixed,
  remove,
}: Props) {

  const subject = useWatch({
    control,
    name: `questions.${index}.subject`,
  });

  const chapter = useWatch({
    control,
    name: `questions.${index}.chapter`,
  });

  const topic = useWatch({
    control,
    name: `questions.${index}.topic`,
  });

  // ✅ Memoized options
  const chapterOptions = useMemo(
    () =>
      getChapters(subject).map(c => ({ value: c, label: c })),
    [subject]
  );

  const topicOptions = useMemo(
    () =>
      getTopics(subject, chapter).map(t => ({ value: t, label: t })),
    [subject, chapter]
  );

  const prevSubjectRef = useRef(subject);
const prevChapterRef = useRef(chapter);

// Subject → reset chapter & topic ONLY if subject changed
useEffect(() => {
  if (prevSubjectRef.current && prevSubjectRef.current !== subject) {
    setValue(`questions.${index}.chapter`, "");
    setValue(`questions.${index}.topic`, "");
  }
  prevSubjectRef.current = subject;
}, [subject, index, setValue]);

// Chapter → reset topic ONLY if topic is invalid
useEffect(() => {
  if (prevChapterRef.current && prevChapterRef.current !== chapter) {
    const validTopics = getTopics(subject, chapter);
    if (!validTopics.includes(topic)) {
      setValue(`questions.${index}.topic`, "");
    }
  }
  prevChapterRef.current = chapter;
}, [chapter, subject, topic, index, setValue]);

 

  const isChapterMissing = !chapter;
  const isTopicMissing = chapter && !topic;

  

  return (
    <tr className={isChapterMissing || isTopicMissing ? "bg-red-50" : "" + " text-center"}>
      <td className=" p-2 border">{index + 1}</td>

      <td className=" p-2 border">
        <FormSelect
          name={`questions.${index}.subject`}
          control={control}
          disabled={!editable}
          options={[
            { value: "Physics", label: "Physics" },
            { value: "Chemistry", label: "Chemistry" },
            { value: "Maths", label: "Maths" },
            { value: "Biology", label: "Biology" },
          ]}
        />
      </td>

      <td className=" p-2 border">
        <FormCombobox
          name={`questions.${index}.chapter`}
          control={control}
          options={chapterOptions}
          disabled={!subject}
        />
      </td>

      <td className=" p-2 border">

        <FormCombobox
          name={`questions.${index}.topic`}
          control={control}
          options={topicOptions}
          disabled={!chapter}
        />

      </td>


      <td className=" p-2 border">
        <FormSelect
          name={`questions.${index}.difficulty`}
          control={control}
          disabled={!editable}
          options={[
            { value: "Easy", label: "Easy" },
            { value: "Medium", label: "Medium" },
            { value: "Hard", label: "Hard" },
          ]}
        />
      </td>

      <td className=" p-2 border">
        <FormSelect
          name={`questions.${index}.cognitiveType`}
          control={control}
          disabled={!editable}
          options={[
            { value: "Conceptual", label: "Conceptual" },
            { value: "Application", label: "Application" },
            { value: "Mixed", label: "Mixed" },
          ]}
        />
      </td>

      <td className=" p-2 border">
        <FormSelect
          name={`questions.${index}.correctOption`}
          control={control}
          disabled={!editable}
          options={[
            { value: "A", label: "A" },
            { value: "B", label: "B" },
            { value: "C", label: "C" },
            { value: "D", label: "D" },
          ]}
        />
      </td>

      <td className=" p-2 border">
        <FormInput
          name={`questions.${index}.marks`}
          type="number"
          control={control}
          disabled={!editable}
        />
      </td>

      <td className=" p-2 border">
        <FormInput
          name={`questions.${index}.negativeMarks`}
          type="number"
          control={control}
          disabled={!editable}
        />
      </td>

      {!isFixed && editable && (
        <td className=" p-2 border">
          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-500 hover:text-red-700 font-bold"
          >
            ✕
          </button>
        </td>
      )}
    </tr>
  );
}
