import React, { useRef, useState, useEffect } from "react";
import "./RecordAV.css";
import AWS from "aws-sdk";
import { auth, database } from "../../config/firebase";
import { doc, getDoc, setDoc, collection } from "firebase/firestore";
import ProgressCircle from "../../components/ProgressCircle/ProgressCircle";

const RecordAV = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [timer, setTimer] = useState(0);
  const [showTimer, setShowTimer] = useState(true);
  const [user, setUser] = useState(null);
  const [userInfoJSON, setUserInfoJSON] = useState({});
  const [addVideoTitle, setAddVideoTitle] = useState("");
  const [addDescription, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);

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

  const uploadVideos = async (event) => {
    setIsUploading(true);
    const videoBlob = new Blob(recordedChunks, { type: "video/mp4" });
    const newAVRef = doc(collection(database, "additional-video"));

    const avID = newAVRef.id;

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
    const key = `additional-video/${auth?.currentUser?.uid}/${avID}/Additional-Video_${userInfoJSON.firstName}_${userInfoJSON.lastName}.mp4`;
    const params = {
      Bucket: S3_BUCKET,
      Key: key,
      Body: videoBlob,
      ContentType: "video/mp4",
    };

    var upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        setUploadPercent(parseInt((evt.loaded * 100) / evt.total));
      })
      .promise();

    await upload
      .then(async (data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });

    let currentDate = new Date();
    let iso8601Date = currentDate.toISOString();

    console.log(avID);
    try {
      const avDoc = doc(database, "additional-video", avID);
      await setDoc(avDoc, {
        uploader: userInfoJSON.firstName + " " + userInfoJSON.lastName,
        uploaderID: auth?.currentUser?.uid,
        title: addVideoTitle,
        description: addDescription,
        uploadDate: iso8601Date,
        link: `https://${process.env.REACT_APP_AWS_S3_BUCKET_NAME}.s3.${process.env.REACT_APP_AWS_S3_REGION}.amazonaws.com/${key}`,
      });
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setIsUploading(false);
      setUploadPercent(0);
    } catch (error) {
      console.error(error);
    }
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
  };

  const downloadVideo = () => {
    const blob = new Blob(recordedChunks, { type: "video/mp4" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = "recorded-video.mp4";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      {isUploading && <ProgressCircle percent={uploadPercent} />}
      <h2 className="heading">Add Additional Videos</h2>
      {recordedChunks.length === 0 ? (
        <>
          <div className="options-container">
            <button
              className={`record-button ${isRecording ? "recording" : ""}`}
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? "Stop Recording" : "Record"}
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
        <>
          <div className="recorded-video-container">
            <video className="recorded-video" controls playsInline>
              {recordedChunks.map((chunk, index) => (
                <source
                  key={index}
                  src={URL.createObjectURL(chunk)}
                  type="video/mp4"
                />
              ))}
            </video>
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
            <div className="button-container">
              <button className="download-button" onClick={downloadVideo}>
                Download Video
              </button>
              <button onClick={uploadVideos} className="upload-button">
                Upload Video
              </button>
              <button className="rerecord-button" onClick={handleReRecord}>
                Re-record
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RecordAV;
