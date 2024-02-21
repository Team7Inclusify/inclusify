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
      <div className="button-container">
        <Link to="/record" style={{ textDecoration: "none" }}>
          <button className="buttonStyle">
            <span>Lets Go!</span>
            <img src={arrow} alt="right-arrow" style={{ marginLeft: "5px", height: "70px" }} /> {/* Include arrow icon */}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Template;
