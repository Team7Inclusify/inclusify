import React, { useState, useEffect } from "react";
import "./VideoSlider.css";
import Accordion from "../../../components/Accordion/Accordion";

export default function VideoSlider({ addVidList }) {
  const [videoNum, setVideoNum] = useState(0);
  const [desIsOpen, setDesOpen] = useState(false);
  const [containerWidth, setContainerWidth] = useState(200);
  const [containerHeight, setContainerHeight] = useState(20);
  const aspectRatio = 16 / 9;
  const maxHeight = 400;

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

  useEffect(() => {
    const updateDimensions = () => {
      const container = document.querySelector(".VideoContainer");
      if (container) {
        const width = container.offsetWidth;

        // Calculate height based on aspect ratio
        let height = width / aspectRatio;

        // If height exceeds maxHeight, reset height to maxHeight and adjust width accordingly
        if (height > maxHeight) {
          height = maxHeight;
          const adjustedWidth = height * aspectRatio;
          setContainerWidth(adjustedWidth);
        } else {
          // If height is under or equal to maxHeight, keep height and width as they are
          setContainerWidth(width);
        }

        setContainerHeight(height);
      }
    };

    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [aspectRatio, maxHeight]);

  return (
    <div className="VideoSliderContainer">
      <button onClick={MovingBack}>Back</button>
      <div className="VideoContainer">
        <iframe
          width={containerWidth}
          height={containerHeight}
          controls
          className="video-holder"
          src={`${
            addVidList[videoNum].link
          }?timestamp=${Date.now()}&type=${encodeURIComponent(
            addVidList[videoNum].type
          )}`}
          allow="fullscreen;accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          frameBorder="0"
        >
          Your browser does not support the video tag.
        </iframe>
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
