// Join.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Join.css";
import Footer from "../../footer/Footer";

const Join = () => {
  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate("/signup");
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="join-container">
      <div className="join-content">
        <div className="signup-box">
          <h2>Register for a new account to get started!</h2>
          <button className="signup-button" onClick={goToSignUp}>
            Sign Up
          </button>
        </div>

        <div className="login-box">
          <h2>Already have an account?</h2>
          <button className="login-button" onClick={goToLogin}>
            Log In
          </button>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Join;
