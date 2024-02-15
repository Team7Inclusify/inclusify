import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import Step1 from "./Step1";
import Step2 from "./Step2";
import Summary from "./Summary";
import "./VideoResume.css"; // Import your CSS file for styling

const VideoResume = () => {
  const [step, setStep] = useState(0); // Initialize step to 0 for user interaction options
  const [data, setData] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleNext = (stepData) => {
    setData((prevData) => ({ ...prevData, ...stepData }));
    setStep((prevStep) => prevStep + 1);
  };

  const handleGeneratePitch = () => {
    // Your logic to generate a pitch
    console.log("Generating pitch...");
    // For demonstration, assuming the pitch is generated synchronously
    const pitch = "This is a generated pitch.";
    setData((prevData) => ({ ...prevData, pitch }));
    setStep(3); // Move to the summary step after generating the pitch
  };

  const handleSkipToRecording = () => {
    console.log("Skipping to recording...");
    navigate("/template"); // Redirect to the Template page using navigate
  };

  return (
    <div className="video-resume-container">
      {step === 0 && (
        <div className="option-cards-container">
          <div className="option-card" onClick={() => setStep(1)}>
            <h3>Help me generate a pitch.</h3>
            <p>Click here if you need assistance crafting your pitch.</p>
          </div>
          <div className="option-card" onClick={handleSkipToRecording}>
            <h3>I am ready! Skip to the recording.</h3>
            <p>
              Click here if you're ready to move directly to the recording step.
            </p>
          </div>
        </div>
      )}
      {step === 1 && <Step1 onNext={handleNext} />}
      {step === 2 && <Step2 onNext={handleNext} />}
      {step === 3 && <Summary data={data} />}
    </div>
  );
};

export default VideoResume;
