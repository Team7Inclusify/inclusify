import React, { useEffect, useRef, useState } from "react";
import "./Record.css";

export default function Record() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 1920, height: 1800 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <>
      <div className="camera">
        <video ref={videoRef} />
        <button>RECORD</button>
      </div>
      <div className={"result" + (hasPhoto ? "hasPhoto" : "")}>
        <canvas ref={photoRef} />
        <button>CLOSE</button>
      </div>
    </>
  );
}
