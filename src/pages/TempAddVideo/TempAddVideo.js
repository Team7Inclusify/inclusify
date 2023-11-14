import React from "react";
import "./TempAddVideo.css";
import Files from "react-files";
import upload_icon from "../../images/upload.png";
import { useState } from "react";
import ReactPlayer from "react-player";
import { amazonS3Config } from "../../KEYS";

//  This will be used to test AmazonS3 stuff,
//  and ultimatley connecting it to Firebase

export default function TempAddVideo() {
  const [file, setFile] = useState();
  const [videoURL, setVideoURL] = useState(null);

  const handleChange = (newFiles) => {
    const newFile = newFiles[0]; // Assuming you only handle one file at a time

    console.log(JSON.stringify(newFile));
    setFile(newFile);

    const reader = new FileReader();
    reader.onload = (event) => {
      setVideoURL(event.target.result);
    };

    if (newFile instanceof Blob) {
      reader.readAsDataURL(newFile);
    }
  };

  const handleError = (error, newFile) => {
    console.error("error code " + error.code + ": " + error.message);
  };

  return (
    <>
      <div>
        This will be used to add AmazonS3 and then connecting that to firebase
        and linking it to firebase
      </div>
      <Files
        className="files-dropzone"
        onChange={handleChange}
        onError={handleError}
        accepts={["video/mp4", "video/x-m4v", "video/*"]}
        multiple={false}
        maxFiles={1}
        maxFileSize={100000000000}
        minFileSize={0}
        clickable
      >
        <img src={upload_icon} alt="Upload" className="upload-icon" />
        Drop files here or click to upload
      </Files>
      {videoURL && (
        <ReactPlayer url={videoURL} width="400px" height="auto" controls />
      )}
    </>
  );
}
