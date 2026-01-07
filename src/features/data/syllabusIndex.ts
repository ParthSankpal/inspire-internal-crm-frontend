import { SYLLABUS_BY_SUBJECT, SubjectType } from "./syllabusRegistry";

type SyllabusIndex = {
  chaptersBySubject: Record<SubjectType, string[]>;
  topicsBySubjectChapter: Record<string, string[]>;
};

export const SYLLABUS_INDEX: SyllabusIndex = (() => {
  const chaptersBySubject = {} as Record<SubjectType, string[]>;
  const topicsBySubjectChapter: Record<string, string[]> = {};

  (Object.keys(SYLLABUS_BY_SUBJECT) as SubjectType[]).forEach(subject => {
    const chapters = SYLLABUS_BY_SUBJECT[subject];
    chaptersBySubject[subject] = chapters.map(c => c.chapter);

    chapters.forEach(ch => {
      topicsBySubjectChapter[`${subject}__${ch.chapter}`] =
        ch.topics.map(t => t.name);
    });
  });

  return { chaptersBySubject, topicsBySubjectChapter };
})();
