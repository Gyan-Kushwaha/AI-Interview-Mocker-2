/// <reference types="vite/client" />

export interface Question {
  type: String;
  technology: String;
  question: String;
  answer: String;
  review: String;
}

export interface MockInterview {
  _id: Types.ObjectId;
  user: User;
  jobRole: string;
  overallReview: string;
  overallRating: number;
  experienceLevel: "Fresher" | "Junior" | "Mid-Level" | "Senior";
  targetCompany: string;
  skills?: string[];
  dsaQuestions?: Question[];
  technicalQuestions?: Question[];
  coreSubjectQuestions?: Question[];
  createdAt?: Date;
  updatedAt?: Date;
}

export default interface User {
  _id: Types.ObjectId;
  name?: string;
  email?: string;
  password?: string;
  firebaseUID?: string;
  interviewList: MockInterview[] | [];
  createdAt?: Date;
  updatedAt?: Date;
}
