import React, { useRef, useState, useEffect } from "react";
import "./Record.css";
import AWS from "aws-sdk";
import { auth } from "../../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { database } from "../../config/firebase";

const Record = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [chunksChanged, setChunksChanged] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showTimer, setShowTimer] = useState(true); // Option to show/hide timer

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

  useEffect(() => {
    let interval;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  useEffect(() => {
    if (recordedChunks.length === 0) {
      // Update chunksChanged state when recordedChunks array is emptied
      setChunksChanged(false);
    }
  }, [recordedChunks]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      videoRef.current.srcObject = stream;

      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
        }
      };

      mediaRecorderRef.current = mediaRecorder;

      videoRef.current.muted = true;

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopRecording = () => {
    const mediaRecorder = mediaRecorderRef.current;
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      setIsRecording(false);
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setTimer(0); // Reset timer
    }
  };

  const togglePause = () => {
    const mediaRecorder = mediaRecorderRef.current;
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.pause();
      setIsPaused(true);
    } else if (mediaRecorder && mediaRecorder.state === "paused") {
      mediaRecorder.resume();
      setIsPaused(false);
    }
  };

  const downloadVideo = () => {
    const blob = new Blob(recordedChunks, { type: "video/mp4" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    console.log(JSON.stringify(userInfoJSON));
    a.download = `Resume_${userInfoJSON.firstName}_${userInfoJSON.lastName}.mp4`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleReRecord = () => {
    setRecordedChunks([]);
    setChunksChanged(true);
  };

  const uploadFile = async () => {
    const videoBlob = new Blob(recordedChunks, { type: "video/mp4" });

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
    const key = `video-resume/${auth?.currentUser?.uid}/Video-Resume_${userInfoJSON.firstName}_${userInfoJSON.lastName}.mp4`;
    const params = {
      Bucket: S3_BUCKET,
      Key: key,
      Body: videoBlob,
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

    await upload.then((err, data) => {
      console.log(err);
      alert("File uploaded successfully.");
    });

    let currentDate = new Date();
    let iso8601Date = currentDate.toISOString();

    try {
      const userDoc = doc(database, "video-resume", auth?.currentUser?.uid);
      await setDoc(userDoc, {
        uploader: userInfoJSON.firstName + " " + userInfoJSON.lastName,
        uploadDate: iso8601Date,
        link: `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${key}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      {recordedChunks.length === 0 ? (
        <>
          <h2 className="heading">Record Video</h2>
          <div className="button-container">
            <button
              className={`record-button ${isRecording ? "recording" : ""}`}
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? "Stop Recording" : "Start Recording"}
            </button>
            {isRecording && (
              <button className="pause-button" onClick={togglePause}>
                {isPaused ? "Resume" : "Pause"}
              </button>
            )}
          </div>
          {showTimer && isRecording && (
            <div className="timer-container">
              <span className="timer">{formatTime(timer)}</span>
            </div>
          )}
          <div className="video-container">
            <video
              ref={videoRef}
              className="video"
              autoPlay
              playsInline
              controls={!isRecording}
            ></video>
          </div>
          <div className="option-container">
            <label>
              <input
                type="checkbox"
                checked={showTimer}
                onChange={() => setShowTimer(!showTimer)}
              />
              Show Timer
            </label>
          </div>
        </>
      ) : (
        <div className="recorded-video-container">
          <h3 className="heading">Recorded Video</h3>
          <video className="recorded-video" controls playsInline>
            {recordedChunks.map((chunk, index) => (
              <source
                key={index}
                src={URL.createObjectURL(chunk)}
                type="video/mp4"
              />
            ))}
          </video>
          <div className="button-container">
            <button className="download-button" onClick={downloadVideo}>
              Download Video
            </button>
            <button className="upload-button" onClick={uploadFile}>
              Upload Video
            </button>
            <button className="rerecord-button" onClick={handleReRecord}>
              Re-Record Video
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Record;
