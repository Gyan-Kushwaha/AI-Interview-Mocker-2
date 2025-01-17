import React, { useState } from "react";
import { Question, Interview } from "../types/global";
import Rating from "../components/Rating";

const QuestionList: React.FC<{ title: string; questions: Question[] }> = ({
  title,
  questions,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="space-y-2">
        {questions.map((q, index) => (
          <div key={index} className="border rounded-md">
            <button
              className="w-full text-left p-3 font-medium focus:outline-none"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {q.question}
            </button>
            {openIndex === index && (
              <div className="p-3 bg-gray-50">
                <p className="mb-2">
                  <strong>Answer:</strong> {q.answer}
                </p>
                <p>
                  <strong>Review:</strong> {q.review}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export function InterviewDetails({ interview }: { interview: Interview }) {
  return (
    <div className="h-full flex justify-center items-center pt-44 pb-20">
      <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">
            {interview.jobRole} Interview Details
          </h2>
          <div className="flex items-center justify-between mb-4">
            <span className="px-2 py-1 bg-gray-200 rounded-lg text-gray-800 text-sm font-semibold">
              {interview.experienceLevel}
            </span>
            <div className="flex items-center">
              <Rating experienceLevel="mid-level" rating={4} />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Target Company</h3>
              <p>{interview.targetCompany}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Overall Review</h3>
              <p>{interview.overallReview}</p>
            </div>
            {interview.dsaQuestions && (
              <QuestionList
                title="DSA Questions"
                questions={interview.dsaQuestions}
              />
            )}
            {interview.technicalQuestions && (
              <QuestionList
                title="Technical Questions"
                questions={interview.technicalQuestions}
              />
            )}
            {interview.coreSubjectQuestions && (
              <QuestionList
                title="Core Subject Questions"
                questions={interview.coreSubjectQuestions}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
