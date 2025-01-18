import React, { useState } from "react";
import { sampleInterviewList } from "../sampleData/sampledata";


import InterviewCard from "../components/InterviewCard";

import Hero from "../components/Hero";



const Dashboard: React.FC = () => {





  const filteredInterviews = []

  return (
    <div>

      <div className="container pt-32 mx-auto px-4 md:px-10 py-8">
        <Hero />

        <h2 className="text-2xl mt-10 font-semibold mb-4 text-gray-200">
          Past Interviews
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleInterviewList.map((i,index) => (
            <InterviewCard key={index} interview={i} />
          ))}
        </div>

        {filteredInterviews.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No interviews found. Try adjusting your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
