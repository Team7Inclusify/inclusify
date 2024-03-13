import React, { useState, useEffect } from "react";
import AWS from "aws-sdk";
import { auth } from "../../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "../../config/firebase";
import "./UploadAV.css";

export default function UploadAV() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  const [user, setUser] = useState(null);
  const [userInfoJSON, setUserInfoJSON] = useState({});
  const [addVideoTitle, setAddVideoTitle] = useState("");
  const [addDescription, setDescription] = useState("");
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
    setVideoUrl(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (selectedFile) {
      console.log("Selected file:", selectedFile);
      // Perform additional actions with the selected file
    }
  }, [selectedFile]);

  const uploadFileAWS = async () => {
    let avID = "";
    try {
      const userDocRef = doc(database, "additional-video"); // Assuming auth.currentUser.uid is the document ID
      await setDoc(userDocRef, {
        uploader: userInfoJSON.firstName + " " + userInfoJSON.lastName,
        uploaderID: auth?.currentUser?.uid,
        title: addVideoTitle,
        description: addDescription,
        uploadDate: iso8601Date,
        link: `https://${process.env.REACT_APP_AWS_S3_BUCKET_NAME}.s3.${process.env.REACT_APP_AWS_S3_REGION}.amazonaws.com/${key}`,
      });
      avID = userDocRef.id;
    } catch (error) {
      console.error(error);
    }

    console.log("avID:", avID);

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
    const key = `"additional-video"/${auth?.currentUser?.uid}/${avID}/Additional-Video_${userInfoJSON.firstName}_${userInfoJSON.lastName}.mp4`;
    const params = {
      Bucket: S3_BUCKET,
      Key: key,
      Body: selectedFile,
      ContentType: "video/mp4",
    };

    var upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        console.log(
          "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
        );
      })
      .promise();

    await upload
      .then(async (data) => {
        console.log(data);
        alert("File uploaded successfully.");
      })
      .catch((err) => {
        console.error(err);
      });

    let currentDate = new Date();
    let iso8601Date = currentDate.toISOString();

    console.log(avID);
    try {
      const userDocRef = doc(database, "additional-video", avID);
      await setDoc(userDocRef, {
        uploader: userInfoJSON.firstName + " " + userInfoJSON.lastName,
        uploaderID: auth?.currentUser?.uid,
        title: addVideoTitle,
        description: addDescription,
        uploadDate: iso8601Date,
        link: `https://${process.env.REACT_APP_AWS_S3_BUCKET_NAME}.s3.${process.env.REACT_APP_AWS_S3_REGION}.amazonaws.com/${key}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="upload-option">
      <h2>Upload Your Additional Video</h2>
      <h3>Insert Title of Additional Video</h3>
      <input
        type="text"
        onChange={(event) => setAddVideoTitle(event.target.value)}
      />
      <h3>Add Description {"(optional)"}</h3>
      <textarea
        type="text"
        onChange={(event) => setDescription(event.target.value)}
      />
      <h3>Upload Video</h3>
      <input type="file" accept="video/*" onChange={uploadResume} />
      {selectedFile && (
        <>
          <video src={videoUrl} className="recorded-video" controls />
          <button onClick={uploadFileAWS}>
            Upload File: {selectedFile.name}
          </button>
          <br />
          <br />
        </>
      )}
    </div>
  );
}
