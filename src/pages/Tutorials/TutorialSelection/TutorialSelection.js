import React from "react";
import "./TutorialSelection.css";
import { useNavigate, useParams } from "react-router-dom";
import TutorialSideBar from "../TutorialSideBar/TutorialSideBar";

export default function TutorialSelection(props) {
  let { tutorialID } = useParams();
  const navigate = useNavigate();
  return (
    <div className="tutorialSelectionContainer">
      <TutorialSideBar nightMode={props.nightMode} />
    </div>
  );
}
