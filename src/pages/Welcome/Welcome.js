// Welcome.js
import React from "react";
import { useNavigate } from "react-router-dom";
import './Welcome.css';
import Footer from "../../footer/Footer";

const Welcome = () => {
  const navigate = useNavigate();

  const goToJoin = () => {
    navigate("/join");
  };

  return (
    <div className="welcome-container">
      {/* Shadow Box/Card */}
      <div className="shadow-box">
        <h1 className="title">Unleash Your Potential: Craft Your Unique Story by creating your own Video Resume!</h1>
        <button className="join-button" onClick={goToJoin}>
          Join Us
        </button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Welcome;
