import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import { useLocation } from "react-router-dom";

const Summary = () => {
  const location = useLocation();
  const { data } = location.state;

  // CSS Styles
  const summaryContainerStyle = {
    backgroundColor: "#cbe6ef",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0px 0px 20px rgba(0,0,0,0.1)",
    maxWidth: "800px",
    margin: "auto",
    textAlign: "center",
  };

  const headingStyle = {
    color: "#333",
    fontSize: "28px",
    marginBottom: "30px",
  };

  const paragraphStyle = {
    fontSize: "20px",
    lineHeight: "1.6",
    marginBottom: "20px",
  };

  const linkStyle = {
    textDecoration: "none",
    marginRight: "10px", // Add space between buttons
  };

  const buttonStyle = {
    padding: "15px 15px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    fontFamily: "Arial, sans-serif",
    fontSize: "20px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    marginRight: "10px", // Add space between buttons
  };

  const restartButtonStyle = {
    padding: "15px 30px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#2196F3", // Change color to blue
    color: "white",
    fontFamily: "Arial, sans-serif",
    fontSize: "20px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  return (
    <div style={summaryContainerStyle}>
      <h2 style={headingStyle}>Your Personal Story is Ready!</h2>
      <p style={paragraphStyle}>
        Hi, my name is <strong>{data.name}</strong>. I live in{" "}
        <strong>{data.location}</strong> and work as a{" "}
        <strong>{data.occupation}</strong>. Let me tell you a bit about myself.
      </p>
      <p style={paragraphStyle}>
        In my free time, I enjoy <strong>{data.interests}</strong>. I've
        developed a set of skills that include <strong>{data.skills}</strong>.
        Over the years, I've gained valuable experience in{" "}
        <strong>{data.experience}</strong>.
      </p>
      <p style={paragraphStyle}>
        Currently, I'm pursuing <strong>{data.education}</strong> to further
        enhance my knowledge. Here's a bit more about me:{" "}
        <strong>{data.about}</strong>
      </p>
      {/* Button to navigate to Record.js */}
      <Link to="/record" style={linkStyle}>
        <button style={buttonStyle}>I am ready!</button>
      </Link>
      <Link to="/videoresume" style={linkStyle}>
        <button style={restartButtonStyle}>Restart!</button>
      </Link>
    </div>
  );
};

export default Summary;
