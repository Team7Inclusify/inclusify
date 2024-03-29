import React, { useRef, useEffect } from "react";
import "./EmployerView.css";
import VideoSlider from "../VideoSlider/VideoSlider";

export default function EmployerView(props) {
  const pdfContainerRef = useRef(null);
  let employerViewVidList = [...props.additionalVideos];
  if (employerViewVidList[0]) {
    if (!employerViewVidList[0].link.includes(`${props.videoResumeSRC}`)) {
      const resumeJSON = {
        link: `${props.videoResumeSRC}?timestamp=${Date.now()}`,
        title: `${props.firstName} ${props.lastName} Resume`,
        description: `Video Resume of ${props.firstName} ${props.lastName}`,
      };
      employerViewVidList.unshift(resumeJSON);
    }
  }
  useEffect(() => {
    if (pdfContainerRef.current) {
      const containerHeight = pdfContainerRef.current.clientHeight;

      pdfContainerRef.current.style.minHeight =
        Math.max(containerHeight, 400) + "px";
    }
  }, []);

  return (
    <div className="employerViewContainer">
      <h2>{props.firstName + " " + props.lastName}</h2>
      <div className="videos">
        <div className="employerViewContainer-Child">
          {props.additionalVideos.length !== 0 ? (
            <VideoSlider addVidList={employerViewVidList} />
          ) : (
            <>No Videos Yet</>
          )}
        </div>
        <div className="employerViewContainer-Child">
          {props.resumeSRC ? (
            <iframe
              className="employer-pdf"
              ref={pdfContainerRef}
              src={`${props.resumeSRC}?timestamp=${Date.now()}`}
            />
          ) : (
            <>No PDF Resume Uploaded</>
          )}
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}
