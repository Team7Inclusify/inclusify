// ProfilePage.jsx

import React, { useState } from "react";
import "./ProfilePage.css";
import dp from "../../images/dp.jpg";
import uploadIcon from "../../images/upload_dp.svg";

export default function ProfilePage() {
  // Mock user data
  const user = {
    firstName: "John",
    lastName: "Doe",
    profilePicture: dp,
    education: "Bachelor's in Computer Science",
    skills: "JavaScript, React, HTML, CSS",
    certifications: "Certified Web Developer",
    hobbies: "Reading, Cooking, Hiking",
    videoResume: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Example link
    additionalVideos: [
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    ],
  };
  // State for profile picture
  const [profilePicture, setProfilePicture] = useState(dp);
  const [isPromptOpen, setIsPromptOpen] = useState(false);

  // Function to handle profile picture upload
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle prompt options
  const handleOptionClick = (option) => {
    console.log("Clicked on option:", option);
    if (option === "upload") {
      document.getElementById("upload-input").click();
    } else if (option === "crop") {
      // Implement cropping functionality
    } else if (option === "delete") {
      setProfilePicture(null); // Assuming null means no picture
    }
    setIsPromptOpen(false);
  };

  console.log("isPromptOpen:", isPromptOpen);

  return (
    <div className="profile-container">
      <div className="overlay" style={{ display: isPromptOpen ? "block" : "none" }} onClick={() => setIsPromptOpen(false)} />
      {/* Prompt for options */}
      {isPromptOpen && (
        <div className="centered-prompt">
          <span className="close-button" onClick={() => setIsPromptOpen(false)}>
            &#10006;
          </span>
          <div className="profile-picture-container">
            <img src={profilePicture} alt="Profile" className="profile-picture" />
          </div>
          <div className="option" onClick={() => handleOptionClick("upload")}>
            Upload a new profile picture
          </div>
          <div className="option" onClick={() => handleOptionClick("crop")}>
            Crop the picture
          </div>
          <div className="option" onClick={() => handleOptionClick("delete")}>
            Delete picture
          </div>
        </div>
      )}
      <div className="profile-section">
        {/* Profile picture with upload option */}
        <div className="upload-label">
          <img
            src={profilePicture}
            alt="Profile"
            className="profile-picture"
          />
          <img src={uploadIcon} alt="Upload" className="upload-icon" onClick={() => setIsPromptOpen(true)} />
        </div>
        <input
          id="upload-input"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleUpload}
        />
        {/* Rest of your component */}
      </div>
      <div className="main-content">
        <div className="profile-section">
          <h2 className="name">John Doe</h2>
        </div>
        <div className="profile-section">
          <h3 className="section-title">Education</h3>
          <p>{user.education}</p>
        </div>
        <div className="profile-section">
          <h3 className="section-title">Skills</h3>
          <p>{user.skills}</p>
        </div>
        <div className="profile-section">
          <h3 className="section-title">Certifications</h3>
          <p>{user.certifications}</p>
        </div>
        <div className="profile-section">
          <h3 className="section-title">Hobbies</h3>
          <p>{user.hobbies}</p>
        </div>
        <div className="profile-section">
          <h3 className="section-title">Video Resume</h3>
          <iframe
            src={user.videoResume}
            title="Video Resume"
            width="560"
            height="315"
            frameBorder="0"
            allowFullScreen
            className="video-frame"
          ></iframe>
        </div>
        <div className="profile-section">
          <h3 className="section-title">Additional Videos</h3>
          <div className="additional-videos-container">
            {user.additionalVideos.map((video, index) => (
              <iframe
                key={index}
                src={video}
                title={`Additional Video ${index + 1}`}
                width="320"
                height="180"
                frameBorder="0"
                allowFullScreen
                className="video-frame"
              ></iframe>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}