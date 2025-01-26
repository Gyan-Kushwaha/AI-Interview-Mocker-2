import React, { useEffect, useState } from "react";
import { sampleInterviewList } from "../sampleData/sampledata";
import InterviewCard from "../components/InterviewCard";
import Loader from "../components/Loader/Loader";
import Hero from "../components/Hero";
import { getAllInterviews } from "@/api/mockinterview.api";

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response  = await getAllInterviews();
        console.log("Interviews", response);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {" "}
        <Loader />{" "}
      </div>
    );
  }
  return (
    <div>
      <div className="container pt-32 mx-auto px-4 md:px-10 py-8">
        <Hero />
        <h2 className="text-2xl mt-10 font-semibold mb-4 text-gray-200">
          Past Interviews
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleInterviewList.map((i, index) => (
            <InterviewCard key={index} interview={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
