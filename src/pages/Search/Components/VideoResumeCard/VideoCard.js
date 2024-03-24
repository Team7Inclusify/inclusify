import React, { useState } from "react";
import "./VideoCard.css";
import video_icon from "../../../../images/video_icon.png";

export default function VideoCard(props) {
  return (
    <div className="videoCardContainer">
      <div className="videoCardContainerInner">
        <div className="videoCardFront">
          <img src={video_icon} alt="Video Icon" className="videoCardImg" />
          {props.name}
          {props.type === "video-resume" ? " Resume" : ` ${props.title}`}
        </div>
        <div className="videoCardBack">
          <h1>{props.name}</h1>
        </div>
      </div>
    </div>
  );
}
