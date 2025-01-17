import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Form from "./components/Form";
import Dashboard from "./pages/Dashboard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-[#212121]">
      <Navbar />
      <div className="">
      <Routes>
        <Route path="/test" element={<Form />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
