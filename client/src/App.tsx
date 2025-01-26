
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import InterviewInterface from "./pages/InterviewInterface";
import LandingPage from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import NotificationCard from "./components/Notifications/NotificationCard";
import { SignupPage } from "./pages/SignupPage";


function App() {

  return (
    <div className="bg-[#212121] ">
      <NotificationCard/>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/interviewinterface/:id"
            element={<InterviewInterface />}
          />
          {/* <Route
            path="/interviewdetails/:id"
            element={<InterviewDetails interview={sampleInterview} />}
          /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
