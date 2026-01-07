import { SubjectType } from "@/features/data/syllabusRegistry";
import { SYLLABUS_INDEX } from "./syllabusIndex";

export function getChapters(subject: SubjectType) {
  return SYLLABUS_INDEX.chaptersBySubject[subject] ?? [];
}

export function getTopics(subject: SubjectType, chapter?: string) {
  if (!chapter) return [];
  return SYLLABUS_INDEX.topicsBySubjectChapter[
    `${subject}__${chapter}`
  ] ?? [];
}
