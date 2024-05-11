import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { database } from "../../../config/firebase";
import {
  collection,
  doc,
  getDoc,
  where,
  query,
  onSnapshot,
} from "firebase/firestore";
import EmployerView from "../EmployerView/EmployerView";
import { calculateTimeDifference } from "../../../functions/calculateTimeDifference";
import OtherUserPage from "./OtherUserPage";

export default function OtherUser(props) {
  const { userID } = useParams();
  const [userInfoJSON, setUserInfoJSON] = useState({});
  const [videoResumeJSON, setVideoResumeJSON] = useState(null);
  const [pdfResumeJSON, setPDFResumeJSON] = useState(null);
  const [addVidResults, setAddVidResults] = useState([]);

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
        const addVids = collection(database, "additional-video");
        const addVidQuery = query(addVids, where("uploaderID", "==", userID));
        onSnapshot(addVidQuery, (snapshot) => {
          let addVidQueryResults = [];
          snapshot.forEach((doc) => {
            addVidQueryResults.push({ ...doc.data(), id: doc.id });
          });
          setAddVidResults(addVidQueryResults);
        });
      } catch (error) {
        console.error(error);
      }
    };

    getUserInfo();
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
        <OtherUserPage
          firstName={userInfoJSON.firstName}
          lastName={userInfoJSON.lastName}
          pfpSRC={userInfoJSON.pfpLink}
          email={userInfoJSON.email}
          userID={userID}
          videoResumeSRC={videoResumeJSON ? videoResumeJSON.link : false}
          videoResumeUploadDate={
            videoResumeJSON ? videoResumeJSON.uploadDate : null
          }
          videoTimeSinceUpload={
            videoResumeJSON ? videoResumeJSON.timeSinceUpload : null
          }
          resumeSRC={pdfResumeJSON ? pdfResumeJSON.link : false}
          additionalVideos={addVidResults}
          nightMode={props.nightMode}
        />
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
          additionalVideos={addVidResults}
        />
      )}
    </>
  );
}
