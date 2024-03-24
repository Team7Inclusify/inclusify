import React from "react";
import "./VideoCard.css";
import video_icon from "../../../../images/video_icon.png";

export default function VideoCard(props) {
  return (
    <div className="videoCardContainer">
      <div className="videoCardContainerInner">
        <div className="videoCardFront">
          <img src={video_icon} alt="Video Icon" className="videoCardImg" />
          <div className="VideoCardTitle">
            {props.type === "video-resume"
              ? `${props.name} Resume`
              : ` ${props.title}`}
          </div>
        </div>
        <div className="videoCardBack">
          <div className="creatorName">{props.name}</div>
          <div className="divDescription">
            {props.type === "video-resume" ? "Resume" : ` ${props.description}`}
          </div>
        </div>
      </div>
    </div>
  );
}
