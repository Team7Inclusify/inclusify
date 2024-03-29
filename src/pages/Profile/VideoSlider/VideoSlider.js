import React, { useState } from "react";
import "./VideoSlider.css";
import Accordion from "../../../components/Accordion/Accordion";

export default function VideoSlider({ addVidList }) {
  const [videoNum, setVideoNum] = useState(0);
  const [desIsOpen, setDesOpen] = useState(false);

  const toggleDescription = () => {
    setDesOpen(!desIsOpen);
  };

  const MovingBack = () => {
    if (videoNum - 1 === -1) {
      setVideoNum(addVidList.length - 1);
    } else {
      setVideoNum(videoNum - 1);
    }
    setDesOpen(false);
  };

  const MovingNext = () => {
    if (videoNum + 1 === addVidList.length) {
      setVideoNum(0);
    } else {
      setVideoNum(videoNum + 1);
    }
    setDesOpen(false);
  };

  return (
    <div className="VideoSliderContainer">
      <button onClick={MovingBack}>Back</button>
      <div className="VideoContainer">
        <video
          controls
          className="video-holder"
          src={`${addVidList[videoNum].link}?timestamp=${Date.now()}`}
          type="video/mp4"
          playsInline
        >
          Your browser does not support the video tag.
        </video>
        <div className="addVidTitle">{addVidList[videoNum].title}</div>
        <br />
        <Accordion
          title="Description"
          innerheading
          content={addVidList[videoNum].description}
          isOpen={desIsOpen}
          toggleAccordion={toggleDescription}
        />
      </div>
      <button onClick={MovingNext}>Next</button>
    </div>
  );
}
