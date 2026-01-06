import { SubjectType, SYLLABUS_BY_SUBJECT } from "@/features/data/syllabusRegistry";


export function getChapters(subject: SubjectType) {
  return SYLLABUS_BY_SUBJECT[subject]?.map(c => c.chapter) ?? [];
}

export function getTopics(subject: SubjectType, chapter?: string) {
  if (!chapter) return [];

  const ch = SYLLABUS_BY_SUBJECT[subject]?.find(
    c => c.chapter === chapter
  );

  return ch?.topics.map(t => t.name) ?? [];
}

export function getSubtopics(
  subject: SubjectType,
  chapter?: string,
  topic?: string
) {
  if (!chapter || !topic) return [];

  const ch = SYLLABUS_BY_SUBJECT[subject]?.find(
    c => c.chapter === chapter
  );

  const t = ch?.topics.find(t => t.name === topic);

  return t?.subtopics ?? [];
}
