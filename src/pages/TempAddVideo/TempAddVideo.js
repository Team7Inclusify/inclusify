import React from "react";
import "./TempAddVideo.css";
import Files from "react-files";
import upload_icon from "../../images/upload.png";
import { useState } from "react";

//  This will be used to test AmazonS3 stuff,
//  and ultimatley connecting it to Firebase

export default function TempAddVideo() {
  const [file, setFile] = useState([]);
  const handleChange = (newFile) => {
    console.log(newFile);
    setFile(newFile);
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
        accepts={["image/png", ".pdf", "video/mp4"]}
        multiple={false}
        maxFiles={1}
        maxFileSize={100000000000}
        minFileSize={0}
        clickable
      >
        <img src={upload_icon} alt="Upload" className="upload-icon" />
        Drop files here or click to upload
      </Files>
    </>
  );
}
