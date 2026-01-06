import { PHYSICS_SYLLABUS } from "./physicsSyllabus";
import { CHEMISTRY_SYLLABUS } from "./chemistrySyllabus";
import { MATHS_SYLLABUS } from "./mathsSyllabus";
import { BIOLOGY_SYLLABUS } from "./biologySyllabus";

export const SYLLABUS_BY_SUBJECT = {
  Physics: PHYSICS_SYLLABUS,
  Chemistry: CHEMISTRY_SYLLABUS,
  Maths: MATHS_SYLLABUS,
  Biology: BIOLOGY_SYLLABUS,
} as const;

export type SubjectType = keyof typeof SYLLABUS_BY_SUBJECT;
