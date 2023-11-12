import React from "react";
import "./App.css";
import Navbar from "./navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import LogIn from "./pages/Log In/LogIn";
import Search from "./pages/Search/Search";
import SignUp from "./pages/SignUp/SignUp";
import AboutUs from "./pages/AboutUs/AboutUs";
import Tutorials from "./pages/Tutorials/Tutorials";
import FAQ from "./pages/FAQ/FAQ";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <div className="App-Page">
      <Navbar />
      <div className="Rest-App-Page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/search_results/:search_tag" element={<Search />} />
          <Route path="/search_results/" element={<Search />} />
          <Route path="/about_us" element={<AboutUs />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
