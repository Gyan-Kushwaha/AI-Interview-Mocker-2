interface Question {
  question: string;
  answer: string;
  review: string;
}

export interface Interview {
  jobRole: string;
  overallReview: string;
  overallRating: number; 
  experienceLevel: "Fresher" | "Junior" | "Mid-Level" | "Senior";
  targetCompany: string;
  dsaQuestions?: Question[];
  technicalQuestions?: Question[];
  coreSubjectQuestions?: Question[];
}
