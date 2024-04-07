import React, { useState, useEffect } from "react";
import "./tutorialCards.css";

export default function TutorialCards(props) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const aspectRatio = 16 / 9;
  const maxHeight = 400;

  useEffect(() => {
    const updateDimensions = () => {
      const container = document.querySelector(".tutorialCardContainer");
      if (container) {
        const width = container.offsetWidth - 20;

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
    <div
      className={`tutorialCardContainer ${
        props.nightMode && "tutorialCardContainerNight"
      }`}
    >
      <div className="tutorialCardTitle">{props.title}</div>
      <iframe
        width={containerWidth}
        height={containerHeight}
        className={`tutorialCardiFrame ${
          props.nightMode && "tutorialCardiFrameNight"
        }`}
        src={`https://www.youtube.com/embed/${props.videoSRC}`}
        allow="fullscreen;accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        frameBorder="0"
      />
    </div>
  );
}
