import React, { useRef, useState } from "react";

const Summary = ({ data }) => {
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      
      videoRef.current.srcObject = stream;

     
      const mediaRecorder = new MediaRecorder(stream);

      
      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorder.onstop = handleStop;

      mediaRecorderRef.current = mediaRecorder;

      
      mediaRecorder.start();
      setIsRecording(true);
      console.log("Recording started...");
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopRecording = () => {
    const mediaRecorder = mediaRecorderRef.current;
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      
      mediaRecorder.stop();
      setIsRecording(false);
      console.log("Recording stopped...");
    }
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      const recordedChunks = [];
      recordedChunks.push(event.data);

      const blob = new Blob(recordedChunks, { type: "video/webm" });

      
      const videoUrl = URL.createObjectURL(blob);
      videoRef.current.src = videoUrl;

      
      const downloadLink = document.createElement("a");
      downloadLink.href = videoUrl;
      downloadLink.download = "recorded-video.webm";

      
      document.body.appendChild(downloadLink);

     
      downloadLink.click();

      
      document.body.removeChild(downloadLink);
    }
  };

  const handleStop = () => {
    
    const stream = videoRef.current.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }

    
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log("Selected File:", selectedFile);
      
    }
  };

  const centerContainerStyle = {
    textAlign: "center",
    marginTop: "50px",
  };

  const readyToRecordStyle = {
    color: "darkblue",
    fontWeight: "bold",
  };

  const startButtonStyle = {
    backgroundColor: "green",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    marginRight: "10px",
    cursor: "pointer", 
  };

  const stopButtonStyle = {
    backgroundColor: "red",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer", 
  };

  const uploadButtonStyle = {
    backgroundColor: "green",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    marginTop: "10px",
    cursor: "pointer", 
  };

  return (
    <div>
      <h2>Personal Story</h2>
      <p>
        Hi, my name is {data.name}. I live in {data.location} and work as a{" "}
        {data.occupation}. Let me tell you a bit about myself.
      </p>
      <p>
        In my free time, I enjoy {data.interests}. I've developed a set of
        skills that include {data.skills}. Over the years, I've gained valuable
        experience in {data.experience}.
      </p>
      <p>
        Currently, I'm pursuing {data.education} to further enhance my
        knowledge. Here's a bit more about me: {data.about}
      </p>

      <div style={centerContainerStyle}>
        <p style={readyToRecordStyle}>Ready to record yourself?</p>
        <button
          style={startButtonStyle}
          onClick={isRecording ? stopRecording : startRecording}
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <video
          ref={videoRef}
          style={{ width: "100%", height: "auto", marginTop: "20px" }}
          autoPlay
          playsInline
        ></video>
        <button
          style={uploadButtonStyle}
          onClick={() => fileInputRef.current.click()}
        >
          Upload Video
        </button>
      </div>
    </div>
  );
};

export default Summary;
