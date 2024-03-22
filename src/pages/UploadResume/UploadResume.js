import React, { useState, useEffect } from "react";
import AWS from "aws-sdk";
import { auth } from "../../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "../../config/firebase";
import "./UploadResume.css"

export default function UploadResume({ nightMode }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const [user, setUser] = useState(null);
  const [userInfoJSON, setUserInfoJSON] = useState({});
  const getUserInfo = async (userID) => {
    try {
      const userRef = doc(database, "user", userID);
      const userInfo = await getDoc(userRef);
      const userInfoData = userInfo.data();
      userInfoData.id = userID;
      setUserInfoJSON(userInfoData);
    } catch (error) {
      console.error(error);
    }
  };
  const setUserInfo = () =>
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log("Auth User test count log");
        setUser(authUser);
        getUserInfo(authUser.uid);
      } else {
        setUser(null);
      }
    });

  useEffect(() => {
    setUserInfo();
  }, [user]);

  const uploadResume = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  useEffect(() => {
    if (selectedFile) {
      console.log("Selected file:", selectedFile);
      // Perform additional actions with the selected file
    }
  }, [selectedFile]);

  const uploadFileAWS = async () => {
    const S3_BUCKET = process.env.REACT_APP_AWS_S3_BUCKET_NAME;
    const REGION = process.env.REACT_APP_AWS_S3_REGION;

    AWS.config.update({
      accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET_KEY,
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });
    const key = `resume/${auth?.currentUser?.uid}/Resume_${userInfoJSON.firstName}_${userInfoJSON.lastName}.pdf`;
    const params = {
      Bucket: S3_BUCKET,
      Key: key,
      Body: selectedFile,
      ContentType: ".pdf",
    };

    var upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        console.log(
          "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
        );
      })
      .promise();

    await upload.then((err, data) => {
      console.log(err);
      alert("File uploaded successfully.");
    });

    let currentDate = new Date();
    let iso8601Date = currentDate.toISOString();

    try {
      const userDoc = doc(database, "resume", auth?.currentUser?.uid);
      await setDoc(userDoc, {
        uploader: userInfoJSON.firstName + " " + userInfoJSON.lastName,
        uploadDate: iso8601Date,
        link: `https://${process.env.REACT_APP_AWS_S3_BUCKET_NAME}.s3.${process.env.REACT_APP_AWS_S3_REGION}.amazonaws.com/${key}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`upload-option ${nightMode ? 'night-mode' : ''}`}>
      <h2>Upload Your PDF Resume</h2>
      <input type="file" accept=".pdf" onChange={uploadResume} />
      {selectedFile && (
        <button onClick={uploadFileAWS}>
          Upload File: {selectedFile.name}
        </button>
      )}
    </div>
  );
}
