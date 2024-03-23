import React, { useState, useEffect } from "react";
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
import Summary from "./pages/VideoResume/summary";
import Footer from "./footer/Footer";
import AdditionalVideos from "./pages/AdditionalVideos/AdditionalVideos";
import AccessDenied from "./pages/AccesDeny/AccessDenied";
import MessageInbox from "./pages/MessageInbox/MessageInbox"; // Import MessageInbox component
import { auth } from "./config/firebase";
import UploadResume from "./pages/UploadResume/UploadResume";
import UploadVideoResume from "./pages/VideoResume/UploadVideoResume";
import RecordAV from "./pages/AdditionalVideos/RecordAV";
import UploadAV from "./pages/AdditionalVideos/UploadAV";

function App() {
  const [isNightMode, setIsNightMode] = useState(false); // State for night mode
  const [step1Data, setStep1Data] = useState({});
  const [step2Data, setStep2Data] = useState({});
  const navigate = useNavigate();

  const toggleNightMode = () => {
    setIsNightMode((prevMode) => !prevMode);
  };

  const handleStep1Next = (data) => {
    setStep1Data(data);
    navigate("/step2");
  };

  const handleStep2Next = (data) => {
    setStep2Data(data);
    const combinedData = { ...step1Data, ...data }; // Combine data from Step1 and Step2
    navigate("/summary", { state: { data: combinedData } }); // Pass combined data to Summary
  };

  const [loggedIn, setLoggedIn] = useState(null);

  const checkAuth = () =>
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(user);
      } else {
        setLoggedIn(null);
      }
    });

  useEffect(() => {
    checkAuth();
    console.log("changeInLogIn");
  }, [loggedIn]);

  return (
    <div className={isNightMode ? "App-Page night-mode" : "App-Page"}>
      <Navbar nightMode={isNightMode} toggleNightMode={toggleNightMode} />

      <div className="Rest-App-Page">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/join" element={<Join />} />
          <Route
            path="/discussion"
            element={<Discussion nightMode={isNightMode} />} // Pass nightMode prop
          />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/search_results/:search_tag" element={<Search />} />
          <Route path="/search_results/" element={<Search />} />
          <Route path="/about_us" element={<AboutUs />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/faq" element={<FAQ />} />
          <Route
            path="/profile"
            element={loggedIn ? <Profile /> : <AccessDenied />}
          />
          {/* Route for the VideoResume component */}
          <Route path="/videoresume" element={<VideoResume />} />
          <Route path="/additionalvideos" element={<AdditionalVideos />} />
          <Route path="/additionalvideos/record" element={<RecordAV />} />
          <Route path="/additionalvideos/upload" element={<UploadAV />} />
          <Route path="/step1" element={<Step1 onNext={handleStep1Next} />} />
          <Route path="/step2" element={<Step2 onNext={handleStep2Next} />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/template" element={<Template />} />
          {/* Route for the Record component */}
          <Route
            path="/record"
            element={loggedIn ? <Record /> : <AccessDenied />}
          />
          <Route path="/message" element={<MessageInbox />} />
          <Route path="/message/:userID" element={<MessageInbox />} />
          <Route
            path="/uploadresume"
            element={loggedIn ? <UploadResume /> : <AccessDenied />}
          />
          <Route
            path="/uploadresume"
            element={
              loggedIn ? (
                <UploadResume nightMode={isNightMode} />
              ) : (
                <AccessDenied />
              )
            }
          />
          <Route path="/profile/:userID" element={<Profile />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
