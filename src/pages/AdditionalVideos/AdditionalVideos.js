import React from "react";
import "./AdditionalVideos.css";
import { useNavigate } from "react-router-dom";

const AdditionalVideos = () => {
  const navigate = useNavigate();
  return (
    <div className="video-resume-container">
      <div className="option-cards-container">
        <div
          className="option-card generate-pitch"
          onClick={() => navigate("/additionalvideos/record")}
        >
          <h3>Ready to Record your Video</h3>
          <p>Click here if you're ready to move to the recording step</p>
        </div>
        <div className="or-divider"></div>
        <div
          className="option-card skip-recording"
          onClick={() => navigate("/additionalvideos/upload")}
        >
          <h3>Already Have Your Video Ready?</h3>
          <p>Click here to upload your video</p>
        </div>
      </div>
    </div>
  );
};

export default AdditionalVideos;
