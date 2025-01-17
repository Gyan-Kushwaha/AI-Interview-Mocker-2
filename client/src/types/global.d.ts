export interface Interview {
  id: string;
  title: string;
  date: string;
  score?: number;
  duration: number;
  category: "technical" | "behavioral" | "system design";
}

interface Question {
  question: string;
  answer: string;
  review: string;
}

export interface Intervieww {
  jobRole: string;
  overallReview: string;
  overallRating: number; 
  experienceLevel: "Fresher" | "Junior" | "Mid-Level" | "Senior";
  targetCompany: string;
  dsaQuestions: Question[];
  technicalQuestions: Question[];
  coreSubjectQuestions: Question[];
}
