import React from "react";
import "./App.css";
import Navbar from "./navbar/Navbar";
import { Route, Routes } from "react-router-dom";
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
import ProfilePage from "./pages/Profile/ProfilePage";
import Welcome from "./pages/Welcome/Welcome";
import Step1 from "./pages/VideoResume/Step1";
import Step2 from "./pages/VideoResume/Step2";
import Summary from "./pages/VideoResume/Summary";
import VideoResume from "./pages/VideoResume/VideoResume";
import Template from "./pages/VideoResume/Template";
import Record from "./pages/VideoResume/Record";

function App() {
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
          <Route path="/videoresume" element={<VideoResume />} />
          <Route path="/step1" element={<Step1 />} />
          <Route path="/step2" element={<Step2 />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/template" element={<Template />} />
          <Route path="/record" element={<Record />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profilepage" element={<ProfilePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;