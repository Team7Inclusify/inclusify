import React, { useRef, useEffect } from "react";
import "./EmployerView.css";

export default function EmployerView(props) {
  const pdfContainerRef = useRef(null);
  useEffect(() => {
    if (pdfContainerRef.current) {
      const containerHeight = pdfContainerRef.current.clientHeight;

      pdfContainerRef.current.style.minHeight =
        Math.max(containerHeight, 400) + "px";
    }
  }, []);
  console.log(props.resumeSRC);
  return (
    <div className="employerViewContainer">
      <h2>{props.firstName + " " + props.lastName}</h2>
      <div className="resumes">
        <video
          className="employer-video"
          controls
          src={`${props.videoResumeSRC}?timestamp=${Date.now()}`}
          type="video/mp4"
        />
        <iframe
          className="employer-pdf"
          ref={pdfContainerRef}
          src={`${props.resumeSRC}?timestamp=${Date.now()}`}
        />
      </div>
      <br />
      <br />
    </div>
  );
}
