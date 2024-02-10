import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import StepCard from "./StepCard";
import arrow from "./../../images/right-arrow.svg";

const Template = () => {
  const steps = [
    {
      stepNumber: 1,
      title: "Introduction",
      points: [
        "Say who you are and what job you want.",
        "Share a bit about yourself and what makes you special.",
        "Show that you're excited about the job."
      ]
    },
    {
      stepNumber: 2,
      title: "Work History",
      points: [
        "Talk about where you've worked before and what you did.",
        "Tell about things you did well and any awards you got.",
        "Use numbers to show how good you were."
      ]
    },
    {
      stepNumber: 3,
      title: "Skills",
      points: [
        "What you're good at (e.g using computers or talking to people)",
        "Any certificates or degrees you have.",
        "Working ability with team and learning ability."
      ]
    }
  ];

  return (
    <div className="template-page">
      {steps.map((step) => (
        <StepCard
          key={step.stepNumber}
          stepNumber={step.stepNumber}
          title={step.title}
          points={step.points}
        />
      ))}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link to="/record" style={{ textDecoration: "none" }}>
          <button style={buttonStyle}>
            Lets Go!
            <img src={arrow} alt="right-arrow" style={{ marginLeft: "5px", height:"70px" }} /> {/* Include arrow icon */}
          </button>
        </Link>
      </div>
    </div>
  );
};

// Define buttonStyle for the button
const buttonStyle = {
  padding: "15px 30px",
  fontSize: "1.2rem",
  backgroundColor: "skyblue",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  transition: "transform 0.3s ease-in-out",
  outline: "none",
};

export default Template;
