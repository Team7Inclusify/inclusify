// Welcome.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Welcome.css';
import Footer from "../../footer/Footer";

const Welcome = () => {
  const navigate = useNavigate();



  const goToJoin = () => {
    navigate("/join");
  };

  useEffect(() => {
    // Disable scrolling when the component mounts
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        {/* Your welcome content goes here */}
      </div>

      {/* Bottom Background Section */}
      <div className="bottom-background">
        <h1 className="custom-title">
          Unleash Your Potential: Craft Your Unique Story by creating your own Video Resume!</h1>
          <div className="buttons-container">
          <button className="join-us-button" onClick={goToJoin}>
            Join Us
          </button>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Welcome;
