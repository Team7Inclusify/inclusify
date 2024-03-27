import React, { useState } from "react";
import "./VideoSlider.css";

export default function VideoSlider({ addVidList }) {
  const [videoNum, setVideoNum] = useState(0);

  const MovingBack = () => {
    if (videoNum - 1 === -1) {
      setVideoNum(addVidList.length - 1);
    } else {
      setVideoNum(videoNum - 1);
    }
  };

  const MovingNext = () => {
    if (videoNum + 1 === addVidList.length) {
      setVideoNum(0);
    } else {
      setVideoNum(videoNum + 1);
    }
  };

  return (
    <div className="VideoSliderContainer">
      <button onClick={MovingBack}>Back</button>
      <div className="VideoContainer">
        <video
          controls
          className="video-frame"
          src={`${addVidList[videoNum].link}?timestamp=${Date.now()}`}
          type="video/mp4"
          playsinline
        >
          Your browser does not support the video tag.
        </video>
        <div className="addVidTitle">{addVidList[videoNum].title}</div>
        <br />
        <div className="addVidDescription">
          <b>Description</b>
        </div>
        <div className="addVidDescription">
          {addVidList[videoNum].description}
        </div>
      </div>
      <button onClick={MovingNext}>Next</button>
    </div>
  );
}
