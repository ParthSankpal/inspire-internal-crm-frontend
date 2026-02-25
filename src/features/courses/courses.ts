// types/course.ts

export interface RegularSession {
  time: string;
  activity: string;
}

export interface WeeklyTest {
  title: string;
  engineering?: {
    marks: string;
    description: string;
  };
  medical?: {
    marks: string;
    description: string;
  };
  description?: string;
}

export interface RegularSchedule {
  type: "regular" | "sunday";
  title: string;
  sessions: RegularSession[];
  weeklyTest?: WeeklyTest;
}

export interface UpcomingSchedule {
  type: "upcoming";
  title: string;
  message: string;
}

export type Schedule = RegularSchedule | UpcomingSchedule;

export interface ExamDetail {
  title: string;
  syllabus: string;
  month: string;
  examPattern: Record<string, string>;
  topColleges: string[];
  attempts: string;
  qualifyingCriteria: Record<string, string>;
}

export interface CourseData {
  title: string;
  description: string;
  impPoints?: string[];
  exams: ExamDetail[];
  schedule: Schedule;
}

export type ProgramSlug =
  | "pcm"
  | "pcb"
  | "foundation"
  | "foundation-cbse";

export type ProgramsRecord = Record<ProgramSlug, CourseData>;