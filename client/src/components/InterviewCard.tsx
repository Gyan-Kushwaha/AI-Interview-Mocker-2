import React from "react";
import Rating from "./Rating";
import { Interview } from "../types/global";
interface InterviewCardProps {
  interview: Interview;
}

const InterviewCard: React.FC<InterviewCardProps> = ({ interview }) => {
  return (
    <div className="cursor-pointer group relative flex flex-col my-6 bg-white shadow-sm border border-green-200 rounded-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
        <img
          className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.25, 1, 0.5, 1)] transform group-hover:scale-110"
          src="/interview1.png"
          alt="default-interview"
        />
      </div>
      <div className="p-4">
        <h6 className="mb-2 text-slate-800 text-xl font-semibold">
          {interview.jobRole}
        </h6>
        <p className="text-slate-600 leading-normal font-light">
          {interview.overallReview}
        </p>
      </div>
      <div className="px-4 py-4">
        <Rating
          experienceLevel={interview.experienceLevel}
          rating={interview.overallRating}
        />
      </div>
      <div className="py-2 px-2">
        <button className="inline-flex items-center justify-center w-full px-2 py-1 mb-2 text-md text-white bg-green-400 rounded-sm sm:w-auto sm:mb-0">
          View Full Details
        </button>
      </div>
    </div>
  );
};

export default InterviewCard;
