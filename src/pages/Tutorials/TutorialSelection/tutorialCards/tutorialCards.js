import React from "react";
import "./tutorialCards.css";

export default function TutorialCards(props) {
  return (
    <div className="tutorialCardContainer">
      <div className="tutorialCardTitle">{props.title}</div>
      <iframe
        className="tutorialCardVideoPlayer"
        src={`https://www.youtube.com/embed/${props.videoSRC}`}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </div>
  );
}
