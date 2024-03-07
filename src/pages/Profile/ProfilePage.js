import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";
import dp from "../../images/dp.jpg";
import uploadIcon from "../../images/upload_dp.svg";
import editIcon from "../../images/edit_icon.svg"; // Import the edit icon
import DocViewer from "react-doc-viewer";

//  https://www.npmjs.com/package/react-doc-viewer

export default function ProfilePage(props) {
  // Mock user data
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    profilePicture: dp,
    education: "Bachelor's in Computer Science",
    skills: "JavaScript, React, HTML, CSS",
    certifications: "Certified Web Developer",
    hobbies: "Reading, Cooking, Hiking",
    videoResume:
      "https://inclusify-bucket.s3.us-east-2.amazonaws.com/video-resume/CAazlxCkq9XR4Vx5asBXFfZDeem2/Resume_Bryan_Martinez.mp4", // Example link
    additionalVideos: [
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    ],
  });

  // State for profile picture
  const [profilePicture, setProfilePicture] = useState(dp);
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [isEditing, setIsEditing] = useState({
    education: false,
    skills: false,
    certifications: false,
    hobbies: false,
  });

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

  // Function to handle editing of user data
  const handleEdit = (field) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  // Function to handle saving edited content
  const handleSave = (field) => {
    setIsEditing({ ...isEditing, [field]: false });
  };

  // Function to handle uploading additional video
  const handleVideoUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          // Handle the uploaded video here
          // For example, you can set it in user state or display it directly
          setUser({ ...user, videoResume: reader.result });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  // Function to handle sending a message
  const handleMessage = () => {
    // Navigate to the message inbox or chat page
    navigate("/messageinbox");
  };

  return (
    <div className="profile-container">
      <div
        className="overlay"
        style={{ display: isPromptOpen ? "block" : "none" }}
        onClick={() => setIsPromptOpen(false)}
      />
      {/* Prompt for options */}
      {isPromptOpen && (
        <div className="centered-prompt">
          <span className="close-button" onClick={() => setIsPromptOpen(false)}>
            &#10006;
          </span>
          <div className="profile-picture-container">
            <img
              src={profilePicture}
              alt="Profile"
              className="profile-picture"
            />
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
          <img src={profilePicture} alt="Profile" className="profile-picture" />
          <img
            src={uploadIcon}
            alt="Upload"
            className="upload-icon"
            onClick={() => setIsPromptOpen(true)}
          />
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
          <h2 className="name">{props.firstName + " " + props.lastName}</h2>
        </div>
        {/* Add Send Message Button */}
        <div className="profile-section">
          <button className="send-message-button" onClick={handleMessage}>
            Send Message
          </button>
        </div>
        <div className="profile-section">
          <h3 className="section-title">Education</h3>
          {isEditing.education ? (
            <div className="editable-content">
              <input
                type="text"
                value={user.education}
                onChange={(e) =>
                  setUser({ ...user, education: e.target.value })
                }
              />
              <button onClick={() => handleSave("education")}>Save</button>
            </div>
          ) : (
            <div className="editable-content">
              <p>{user.education}</p>
              <img
                src={editIcon}
                alt="Edit"
                className="edit-icon"
                onClick={() => handleEdit("education")}
              />
            </div>
          )}
        </div>

        <div className="profile-section">
          <h3 className="section-title">
            Video Resume
            <div className="uploadTimeDiv">{props.videoTimeSinceUpload}</div>
          </h3>
          {props.videoResumeSRC.link ? (
            <>
              <video
                controls
                className="video-frame"
                src={props.videoResumeSRC}
                type="video/mp4"
              >
                Your browser does not support the video tag.
              </video>
              <button
                className="upload-video-button"
                onClick={() => navigate("/videoresume")}
              >
                Update Video
              </button>
            </>
          ) : (
            <>
              No Video Resume Yet
              <button
                className="upload-video-button"
                onClick={() => navigate("/videoresume")}
              >
                Click to Create Video Resume Here
              </button>
            </>
          )}
        </div>
        <div className="profile-section">
          <h3 className="section-title">
            PDF Resume
            <div className="uploadTimeDiv">{props.resumeUploadDate}</div>
          </h3>

          {props.videoResumeSRC.link ? (
            <>
              <iframe src={props.resumeSRC} width="100%" height="600px" />
              <button
                className="upload-video-button"
                onClick={() => navigate("/uploadresume")}
              >
                Update PDF Resume
              </button>
            </>
          ) : (
            <>
              No PDF Resume Yet
              <button
                className="upload-video-button"
                onClick={() => navigate("/uploadresume")}
              >
                Click to Upload PDF Resume
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
