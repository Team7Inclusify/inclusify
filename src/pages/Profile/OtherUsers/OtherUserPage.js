import React from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import defaultPFP from "../../../images/default_pfp.png";
import "./OtherUserPage.css";

export default function OtherUserPage(props) {
  const navigate = useNavigate();
  return (
    <div className="profile-container">
      <div className="main-content">
        <div className="main-info-profile-section">
          <img
            src={props.pfpSRC === "" ? defaultPFP : props.pfpSRC}
            alt="User Profile Picture"
            className="profile-picture"
          />
          <div className="main-info-column">
            <div className="name">{props.firstName + " " + props.lastName}</div>
            <div className="otherInfo">{props.email}</div>
            <button
              className="send-message-button"
              onClick={() => navigate(`/message/${props.userID}`)}
            >
              Send Message
            </button>
          </div>
        </div>
        <div className="profile-section">
          <h3>Contact Me At</h3>
          {props.email}
        </div>

        <div className="profile-section">
          <h3 className="section-title">
            Video Resume
            <div className="uploadTimeDiv">{props.videoTimeSinceUpload}</div>
          </h3>
          {props.videoResumeSRC.link ? (
            <video
              controls
              className="video-frame"
              src={`${props.videoResumeSRC}?timestamp=${Date.now()}`}
              type="video/mp4"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <>No Video Resume Yet</>
          )}
        </div>
        <div className="profile-section">
          <h3 className="section-title">
            PDF Resume
            <div className="uploadTimeDiv">{props.resumeUploadDate}</div>
          </h3>

          {props.videoResumeSRC.link ? (
            <>
              <iframe
                src={`${props.resumeSRC}?timestamp=${Date.now()}`}
                width="100%"
                height="600px"
              />
            </>
          ) : (
            <>No PDF Resume Yet</>
          )}
        </div>
      </div>
    </div>
  );
}
