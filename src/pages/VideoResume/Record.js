import React, { useRef, useState, useEffect } from "react";
import "./VideoResume.css"; // Import CSS file for styling

const Record = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [timer, setTimer] = useState(0);
  const [showTimer, setShowTimer] = useState(true); // Option to show/hide timer

  useEffect(() => {
    let interval;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

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
      tracks.forEach(track => track.stop());
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
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = "recorded-video.webm";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleReRecord = () => {
    setRecordedChunks([]);
  };

  return (
    <div className="container">
      <h2 className="heading">Record Video</h2>
      <div className="button-container">
        <button className={`record-button ${isRecording ? "recording" : ""}`} onClick={isRecording ? stopRecording : startRecording}>
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
        {isRecording && (
          <button className="pause-button" onClick={togglePause}>
            {isPaused ? "Resume" : "Pause"}
          </button>
        )}
      </div>
      <div className="video-container">
        <video ref={videoRef} className="video" autoPlay playsInline controls={!isRecording}></video>
      </div>
      {showTimer && isRecording && (
        <div className="timer-container">
          <span className="timer">{formatTime(timer)}</span>
        </div>
      )}
      <div className="option-container">
        <label>
          <input type="checkbox" checked={showTimer} onChange={() => setShowTimer(!showTimer)} />
          Show Timer
        </label>
      </div>
      {recordedChunks.length > 0 && (
        <div className="recorded-video-container">
          <h3 className="heading">Recorded Video:</h3>
          <video className="recorded-video" controls>
            {recordedChunks.map((chunk, index) => (
              <source key={index} src={URL.createObjectURL(chunk)} type="video/webm" />
            ))}
          </video>
          <button className="download-button" onClick={downloadVideo}>Download Video</button>
          <button className="rerecord-button" onClick={handleReRecord}>Re-record</button>
        </div>
      )}
    </div>
  );
};

export default Record;