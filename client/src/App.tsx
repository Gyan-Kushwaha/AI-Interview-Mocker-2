import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Form from "./components/Form";
import Dashboard from "./pages/Dashboard";
import { InterviewDetails } from "./pages/InterviewDetails";
import { Interview } from "./types/global";

const sampleInterview: Interview = {
  jobRole: "Frontend Developer",
  overallReview:
    "The interview was challenging but fair. The interviewer was friendly and provided helpful feedback.",
  overallRating: 4,
  experienceLevel: "Mid-Level",
  targetCompany: "TechCorp Inc.",
  dsaQuestions: [
    {
      question: "Implement a function to reverse a linked list",
      answer: "// Code to reverse a linked list",
      review: "Good approach, but could be optimized for space complexity",
    },
  ],
  technicalQuestions: [
    {
      question:
        "Explain the difference between 'let', 'const', and 'var' in JavaScript",
      answer:
        "let is block-scoped and can be reassigned, const is block-scoped and cannot be reassigned, var is function-scoped and can be reassigned",
      review: "Excellent explanation with clear examples",
    },
  ],
  coreSubjectQuestions: [
    {
      question: "What are the key principles of RESTful API design?",
      answer:
        "Statelessness, Client-Server architecture, Cacheability, Layered System, Uniform Interface",
      review:
        "Good understanding of REST principles, but could have elaborated more on each point",
    },
    {
      question: "What are the key principles of RESTful API design?",
      answer:
        "Statelessness, Client-Server architecture, Cacheability, Layered System, Uniform Interface",
      review:
        "Good understanding of REST principles, but could have elaborated more on each point",
    },
    {
      question: "What are the key principles of RESTful API design?",
      answer:
        "Statelessness, Client-Server architecture, Cacheability, Layered System, Uniform Interface",
      review:
        "Good understanding of REST principles, but could have elaborated more on each point",
    },
  ],
} as const;

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-[#212121]">
      <Navbar />
      <div className="">
        <Routes>
          <Route path="/test" element={<Form />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/interviewdetails"
            element={<InterviewDetails interview={sampleInterview} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
