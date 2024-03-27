import React, { useEffect, useState, useCallback } from "react";
import { auth } from "../../config/firebase";
import {
  collection,
  doc,
  getDoc,
  where,
  query,
  onSnapshot,
} from "firebase/firestore";
import { database } from "../../config/firebase";
import "./Profile.css";
import ProfilePage from "./ProfilePage";
import EmployerView from "./EmployerView/EmployerView";
import defaultPFP from "../../images/default_pfp.png";
import { calculateTimeDifference } from "../../functions/calculateTimeDifference";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [userInfoJSON, setUserInfoJSON] = useState({});
  const [videoResumeJSON, setVideoResumeJSON] = useState(null);
  const [pdfResumeJSON, setPDFResumeJSON] = useState(null);
  const [addVidResults, setAddVidResults] = useState([]);

  const getUserInfo = async (userID) => {
    try {
      const userRef = doc(database, "user", userID);
      const userInfo = await getDoc(userRef);
      const userInfoData = userInfo.data();
      setUserInfoJSON(userInfoData);

      const videoResumeRef = doc(database, "video-resume", userID);
      const videoResumeInfo = await getDoc(videoResumeRef);
      const videoResumeInfoData = videoResumeInfo.data();

      if (videoResumeInfoData) {
        const timeSinceUpload = calculateTimeDifference(
          videoResumeInfoData.uploadDate
        );
        videoResumeInfoData.timeSinceUpload = timeSinceUpload;
        setVideoResumeJSON(videoResumeInfoData);
      } else {
        setVideoResumeJSON(null);
      }
      const pdfResumeRef = doc(database, "resume", userID);
      const pdfResumeInfo = await getDoc(pdfResumeRef);
      const pdfResumeInfoData = pdfResumeInfo.data();

      if (pdfResumeInfoData) {
        const timeSinceUpload = calculateTimeDifference(
          pdfResumeInfoData.uploadDate
        );
        pdfResumeInfoData.timeSinceUpload = timeSinceUpload;
        setPDFResumeJSON(pdfResumeInfoData);
      } else {
        setPDFResumeJSON(null);
      }
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
  const setUserInfo = () =>
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log("Auth User test count log");
        setUser(authUser);
        getUserInfo(authUser.uid);
      } else {
        setUser(null);
      }
    });

  useEffect(() => {
    // Seems to run 3 times on intial run
    setUserInfo();
  }, [user]);

  const [viewType, setViewType] = useState("user");
  const handleUserViewClick = useCallback(() => {
    setViewType("user");
  }, []);

  const handleEmployerViewClick = useCallback(() => {
    setViewType("employer");
  }, []);

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
        <ProfilePage
          firstName={userInfoJSON.firstName}
          lastName={userInfoJSON.lastName}
          pfpSRC={
            userInfoJSON.pfpLink === "N/A" ? defaultPFP : userInfoJSON.pfpLink
          }
          email={userInfoJSON.email}
          videoResumeSRC={videoResumeJSON ? videoResumeJSON.link : false}
          videoResumeUploadDate={
            videoResumeJSON ? videoResumeJSON.uploadDate : null
          }
          videoTimeSinceUpload={
            videoResumeJSON ? videoResumeJSON.timeSinceUpload.toString() : null
          }
          resumeSRC={pdfResumeJSON ? pdfResumeJSON.link : false}
          additionalVideos={addVidResults}
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
        />
      )}
    </>
  );
}
