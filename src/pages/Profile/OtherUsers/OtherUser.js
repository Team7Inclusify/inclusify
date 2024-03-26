import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, database } from "../../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import EmployerView from "../EmployerView/EmployerView";

export default function OtherUser() {
  const navigate = useNavigate();
  const { userID } = useParams();
  const [userInfoJSON, setUserInfoJSON] = useState({});
  const [videoResumeJSON, setVideoResumeJSON] = useState(null);
  const [pdfResumeJSON, setPDFResumeJSON] = useState(null);

  function calculateTimeDifference(dateString) {
    const providedDate = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = currentDate - providedDate;
    const secondsDifference = timeDifference / 1000;
    const minutesDifference = secondsDifference / 60;
    const hoursDifference = minutesDifference / 60;
    const daysDifference = hoursDifference / 24;

    if (daysDifference >= 1) {
      return (
        Math.floor(daysDifference) +
        " day" +
        (Math.floor(daysDifference) > 1 ? "s" : "") +
        " ago"
      );
    } else if (hoursDifference >= 1) {
      return (
        Math.floor(hoursDifference) +
        " hour" +
        (Math.floor(hoursDifference) > 1 ? "s" : "") +
        " ago"
      );
    } else if (minutesDifference >= 1) {
      return (
        Math.floor(minutesDifference) +
        " minute" +
        (Math.floor(minutesDifference) > 1 ? "s" : "") +
        " ago"
      );
    } else {
      return (
        Math.floor(secondsDifference) +
        " second" +
        (Math.floor(secondsDifference) > 1 ? "s" : "") +
        " ago"
      );
    }
  }

  const [viewType, setViewType] = useState("user");
  const handleUserViewClick = useCallback(() => {
    setViewType("user");
  }, []);

  const handleEmployerViewClick = useCallback(() => {
    setViewType("employer");
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userRef = doc(database, "user", userID);
        const userInfo = await getDoc(userRef);
        const userInfoData = userInfo.data();
        setUserInfoJSON(userInfoData);

        const userVideoResumeRef = doc(database, "video-resume", userID);
        const userVideoResumeInfo = await getDoc(userVideoResumeRef);
        const userVideoResumeData = userVideoResumeInfo.data();
        setVideoResumeJSON(userVideoResumeData);

        const userPDFResumeRef = doc(database, "resume", userID);
        const userPDFResumeInfo = await getDoc(userPDFResumeRef);
        const userPDFResumeData = userPDFResumeInfo.data();
        setPDFResumeJSON(userPDFResumeData);
      } catch (error) {
        console.error(error);
      }
    };

    getUserInfo();
    console.log("USER INFO DATA RETRIEVAL COUNT");
  }, [userID]);

  return (
    <>
      <div className="viewTypeBar">
        <div
          className={`viewTypeChoice ${viewType === "user" && "selectedView"}`}
          onClick={handleUserViewClick}
        >
          User View
        </div>
        <div
          className={`viewTypeChoice ${
            viewType === "employer" && "selectedView"
          }`}
          onClick={handleEmployerViewClick}
        >
          Employer View
        </div>
      </div>
      {viewType === "user" ? (
        <div />
      ) : (
        <EmployerView
          firstName={userInfoJSON.firstName}
          lastName={userInfoJSON.lastName}
          videoResumeSRC={videoResumeJSON ? videoResumeJSON.link : false}
          videoResumeUploadDate={
            videoResumeJSON ? videoResumeJSON.uploadDate : null
          }
          videoTimeSinceUpload={
            videoResumeJSON ? videoResumeJSON.timeSinceUpload : null
          }
          resumeSRC={pdfResumeJSON ? pdfResumeJSON.link : false}
          resumeUploadDate={
            pdfResumeJSON ? pdfResumeJSON.timeSinceUpload : null
          }
        />
      )}
    </>
  );
}
