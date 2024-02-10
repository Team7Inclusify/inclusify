import React, { useState } from "react";

const StepCard = ({ stepNumber, title, points }) => {
  const [stream, setStream] = useState(null);
  const [recording, setRecording] = useState(false);

  const handleRecordVideo = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      setRecording(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopRecording = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setRecording(false);
    }
  };

  return (
    <div className="step-card">
      <div className="step-title">
        <h2>Step {stepNumber}</h2>
      </div>
      <div className="step-description">
        <h3>{title}</h3>
        <ul className="bullet-list">
          {points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StepCard;
