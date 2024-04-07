import React, { useState, useEffect } from "react";
import "./TutorialSelection.css";
import { useParams } from "react-router-dom";
import TutorialSideBar from "../TutorialSideBar/TutorialSideBar";
import vrJSON from "./TutorialJSONs/VideoResume.json";
import avJSON from "./TutorialJSONs/AddVideo.json";
import noteJSON from "./TutorialJSONs/Notes.json";
import discussionJSON from "./TutorialJSONs/Discussion.json";
import profileJSON from "./TutorialJSONs/Profile.json";
import suli from "./TutorialJSONs/SignUpLogIn.json";
import otherJSON from "./TutorialJSONs/Other.json";
import pdfJSON from "./TutorialJSONs/PdfResume.json";
import TutorialCards from "./tutorialCards/tutorialCards";

export default function TutorialSelection(props) {
  let { tutorialID } = useParams();
  const [json, setJSON] = useState([]);
  const getJSON = (param) => {
    switch (param) {
      case "video_resume":
        setJSON(vrJSON);
        break;
      case "additional_video":
        setJSON(avJSON);
        break;
      case "notes":
        setJSON(noteJSON);
        break;
      case "discussion":
        setJSON(discussionJSON);
        break;
      case "profile":
        setJSON(profileJSON);
        break;
      case "sign_up_log_in":
        setJSON(suli);
        break;
      case "other":
        setJSON(otherJSON);
        break;
      case "pdf_resume":
        setJSON(pdfJSON);
        break;
      default:
        setJSON([]);
        break;
    }
  };
  useEffect(() => {
    getJSON(tutorialID);
  }, [tutorialID]);
  return (
    <div className="tutorialSelectionContainer">
      <TutorialSideBar nightMode={props.nightMode} />
      <div className="jsonContainer">
        {json.map((info, index) => (
          <TutorialCards
            key={index}
            title={info.title}
            videoSRC={info.tutorialSRC}
            nightMode={props.nightMode}
          />
        ))}
        {json.length === 0 && <>Nothing to show</>}
      </div>
    </div>
  );
}
