import React, { useState } from "react";
import "./App.css";
import Navbar from "./navbar/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Discussion from "./pages/Discussion/Discussion";
import Join from "./pages/JoinUs/Join";
import LogIn from "./pages/Log In/LogIn";
import Search from "./pages/Search/Search";
import SignUp from "./pages/SignUp/SignUp";
import AboutUs from "./pages/AboutUs/AboutUs";
import Tutorials from "./pages/Tutorials/Tutorials";
import Resources from "./pages/Resources/Resources";
import FAQ from "./pages/FAQ/FAQ";
import Profile from "./pages/Profile/Profile";
import Welcome from "./pages/Welcome/Welcome";
import Step1 from "./pages/VideoResume/Step1";
import Step2 from "./pages/VideoResume/Step2";
import VideoResume from "./pages/VideoResume/VideoResume";
import Template from "./pages/VideoResume/Template";
import Record from "./pages/VideoResume/Record";
import Summary from "./pages/VideoResume/summary"; // Import the Summary component

function App() {
  const [step1Data, setStep1Data] = useState({});
  const [step2Data, setStep2Data] = useState({});
  const navigate = useNavigate();

  const handleStep1Next = (data) => {
    setStep1Data(data);
    navigate('/step2');
  };

  const handleStep2Next = (data) => {
    setStep2Data(data);
    const combinedData = { ...step1Data, ...data }; // Combine data from Step1 and Step2
    navigate('/summary', { state: { data: combinedData } }); // Pass combined data to Summary
  };

  return (
    <div className="App-Page">
      <Navbar />
      <div className="Rest-App-Page">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/join" element={<Join />} />
          <Route path="/discussion" element={<Discussion />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/search_results/:search_tag" element={<Search />} />
          <Route path="/search_results/" element={<Search />} />
          <Route path="/about_us" element={<AboutUs />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/profile" element={<Profile />} />
          {/* Route for the VideoResume component */}
          <Route path="/videoresume" element={<VideoResume />} />
          {/* Route for the Step1 component */}
          <Route path="/step1" element={<Step1 onNext={handleStep1Next} />} />
          {/* Route for the Step2 component */}
          <Route path="/step2" element={<Step2 onNext={handleStep2Next} />} />
          {/* Route for the Summary component */}
          <Route path="/summary" element={<Summary />} />
          {/* Route for the Template component */}
          <Route path="/template" element={<Template />} />
          {/* Route for the Record component */}
          <Route path="/record" element={<Record />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
