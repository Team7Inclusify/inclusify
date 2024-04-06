import React from "react";
import "./TutorialSideBar.css";
import { useNavigate, useParams } from "react-router-dom";
import tutorialInfo from "../Tutorials.json";

export default function TutorialSideBar(props) {
  let { tutorialID } = useParams();
  const navigate = useNavigate();
  return (
    <div className="tutorialSideBarContainer">
      {tutorialInfo.map((info, index) => (
        <div
          key={index}
          className={`tutorialSideBarOption ${
            props.nightMode && "tutorialSideBarOptionNight"
          }`}
          onClick={() => navigate(`/tutorials/${info.link}`)}
        >
          {info.title}
        </div>
      ))}
    </div>
  );
}
