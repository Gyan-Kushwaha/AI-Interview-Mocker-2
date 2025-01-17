import React, { useState } from "react";
import { Interview } from "../types/global";

import { Plus, Search, X } from "lucide-react";
import InterviewCard from "../components/InterviewCard";
import Form from "../components/Form";

// Mock data for old interviews
const oldInterviews: Interview[] = [
  {
    id: "1",
    title: "React Frontend",
    date: "2023-05-15",
    score: 85,
    duration: 60,
    category: "technical",
  },
  {
    id: "2",
    title: "Node.js Backend",
    date: "2023-05-20",
    score: 92,
    duration: 45,
    category: "technical",
  },
  {
    id: "3",
    title: "System Design: Social Media App",
    date: "2023-05-25",
    duration: 90,
    category: "system design",
  },
  {
    id: "4",
    title: "Data Structures & Algorithms",
    date: "2023-05-30",
    score: 78,
    duration: 60,
    category: "technical",
  },
  {
    id: "5",
    title: "Behavioral Interview",
    date: "2023-06-05",
    score: 95,
    duration: 30,
    category: "behavioral",
  },
];

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setFormOpen] = useState(false);

  const handleFormOpen = () => {
    setFormOpen(!isFormOpen);
  };

  const filteredInterviews = oldInterviews.filter((interview) =>
    interview.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {isFormOpen && (
        <div className="bg-black/80">
          <Form />
          <button
            className="rounded-full z-10 fixed top-3 right-5 text-white border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg  hover:text-slate-600 hover:bg-slate-200 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={handleFormOpen}
          >
            <X/>
          </button>
        </div>
      )}
      <div className="container pt-32 mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-100">
          MockMate Dashboard
        </h1>

        <div className="flex justify-center mb-12">
          <button
            onClick={handleFormOpen}
            className="rounded-2xl bg-blue-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2 flex"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Mock Interview
          </button>
        </div>

        <div className="mb-8 w-full flex justify-center">
          <div className="relative max-w-6xl">
            <input
              type="text"
              placeholder="Search interviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-gray-200">
          Past Interviews
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <InterviewCard />
        </div>

        {filteredInterviews.length === 0 && (
          <p className="text-center text-gray-500 mt-8">
            No interviews found. Try adjusting your search.
          </p>
        )}
      </div>
    </>
  );
};

export default Dashboard;
