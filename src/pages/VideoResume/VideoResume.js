import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Summary from "./summary";
import './VideoResume.css';

const VideoResume = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleNext = (stepData) => {
    setData((prevData) => ({ ...prevData, ...stepData }));
    setStep((prevStep) => prevStep + 1);
  };

  const handleGeneratePitch = () => {
    console.log("Generating pitch...");
    const pitch = "This is a generated pitch.";
    setData((prevData) => ({ ...prevData, pitch }));
    navigate("/step1"); // Navigate to the Step1 route when Generate Pitch is clicked
  };

  const handleSkipToRecording = () => {
    console.log("Skipping to recording...");
    navigate("/template");
  };

  return (
    <div className="video-resume-container">
      {step === 0 && (
        <div className="option-cards-container">
          <div className="option-card generate-pitch" onClick={handleGeneratePitch}>
            <h3>Help me generate a pitch</h3>
            <p>Click here if you need assistance crafting your pitch</p>
          </div>
          <div className="or-divider"></div>
          <div className="option-card skip-recording" onClick={handleSkipToRecording}>
            <h3>I am ready! Skip to the recording</h3>
            <p>Click here if you're ready to move directly to the recording step</p>
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
