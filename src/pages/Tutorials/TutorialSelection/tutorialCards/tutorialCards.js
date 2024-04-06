import React, { useState, useEffect } from "react";
import "./tutorialCards.css";

export default function TutorialCards(props) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const aspectRatio = 9 / 16;
  useEffect(() => {
    const updateDimensions = () => {
      const container = document.querySelector(".tutorialCardContainer");
      if (container) {
        setContainerWidth(container.offsetWidth);
        setContainerHeight(container.offsetWidth * aspectRatio);
      }
    };

    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [aspectRatio]);

  return (
    <div className="tutorialCardContainer">
      <div className="tutorialCardTitle">{props.title}</div>
      <iframe
        width={containerWidth}
        height={containerHeight}
        src={`https://www.youtube.com/embed/${props.videoSRC}`}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen={true}
      />
    </div>
  );
}
