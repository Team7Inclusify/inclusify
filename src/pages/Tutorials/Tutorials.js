import React from "react";
import "./Tutorials.css";
import { useNavigate } from "react-router-dom";
import tutorialInfo from "./Tutorials.json";

export default function Tutorials(props) {
  const navigate = useNavigate();

  return (
    <div className="tutorialGrid">
      {tutorialInfo.map((info, index) => (
        <button
          key={index}
          className={`tutorialOption ${
            props.nightMode && "tutorialOptionNight"
          }`}
          onClick={() => navigate(`/tutorials/${info.link}`)}
        >
          {info.title}
        </button>
      ))}
    </div>
  );
}
