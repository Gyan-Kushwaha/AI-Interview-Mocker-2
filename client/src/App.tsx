
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Form from "./components/Form";
import Dashboard from "./pages/Dashboard";
import { InterviewDetails } from "./pages/InterviewDetails";
import { Interview } from "./types/global";
import InterviewInterface from "./pages/InterviewInterface";
import LandingPage from "./pages/LandingPage";
import { LoginForm } from "./pages/LoginPage";
import NotificationCard from "./components/Notifications/NotificationCard";

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

  return (
    <div className="bg-[#212121] ">
      <NotificationCard/>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/test" element={<Form />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/interviewinterface/:id"
            element={<InterviewInterface />}
          />
          <Route
            path="/interviewdetails/:id"
            element={<InterviewDetails interview={sampleInterview} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
