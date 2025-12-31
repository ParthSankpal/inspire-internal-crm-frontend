export interface StudentAnalytics {
  _id: {
    subject: string;
    cognitiveType: string;
  };
  totalMarks: number;
  correct: number;
  attempted: number;
}

export interface SubjectWiseAnalytics {
  _id: string; // subject
  marks: number;
  correct: number;
  totalQuestions: number;
}

export interface TopicAnalytics {
  _id: {
    subject: string;
    chapter: string;
    topic: string;
  };
  score: number;
  correct: number;
  total: number;
}

export interface BatchAnalytics {
  _id: {
    subject: string;
    cognitiveType: string;
  };
  avgMarks: number;
  correctRate: number;
}

export interface QuestionAnalytics {
  _id: string;
  attempts: number;
  correct: number;
  avgMarks: number;
}
