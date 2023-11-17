import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const Step1 = ({ onNext }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [studyLocation, setStudyLocation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [nameTranscript, setNameTranscript] = useState("");
  const [locationTranscript, setLocationTranscript] = useState("");
  const [studyLocationTranscript, setStudyLocationTranscript] = useState("");
  const [occupationTranscript, setOccupationTranscript] = useState("");
  const [nameListening, setNameListening] = useState(false);
  const [locationListening, setLocationListening] = useState(false);
  const [studyLocationListening, setStudyLocationListening] = useState("");
  const [occupationListening, setOccupationListening] = useState("");
  const [nameModalOpen, setNameModalOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [studyLocationModalOpen, setStudyLocationModalOpen] = useState(false);
  const [occupationModalOpen, setOccupationModalOpen] = useState("");

  const handleNext = () => {
    onNext({ name, location, studyLocation, occupation });
    setNameTranscript("");
    setLocationTranscript("");
    setStudyLocationTranscript("");
    setOccupationTranscript("");
  };

  const handleSpeechToText = (setListening, setTranscript, setModalOpen, setInputValue) => {
    if (!setListening) return;

    setListening(true);
    setModalOpen(true);

    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new window.SpeechRecognition();

    recognition.start();

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      setInputValue(result);
    };

    recognition.onend = () => {
      setListening(false);
      setModalOpen(false);
    };

    recognition.onerror = (event) => {
      console.error(event.error);
      setListening(false);
      setModalOpen(false);
    };
  };

  const closeModal = (setListening, setTranscript, setModalOpen) => {
    setListening(false);
    setTranscript("");
    setModalOpen(false);
  };

  const modalStyles = {
    modal: {
      width: "60%",
      maxWidth: "800px",
      height: "60%",
    },
  };

  const buttonContainerStyle = {
    textAlign: "center",
    marginTop: "20px",
  };

  return (
    <div>
      <h2>Step 1</h2>
      <h3>What's your name?</h3>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={() =>
          handleSpeechToText(
            setNameListening,
            setNameTranscript,
            setNameModalOpen,
            setName
          )
        }
      >
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17h-2v-6h2v6zm4 0h-2V7h2v12z" />
        </svg>
      </button>
      {nameListening && (
        <Modal
          open={nameModalOpen}
          onClose={() => closeModal(setNameListening, setNameTranscript, setNameModalOpen)}
          styles={modalStyles}
        >
          <h2>{nameListening ? "Mic is On" : "Mic is Off"}</h2>
          <div>{nameTranscript}</div>
        </Modal>
      )}

      <h3>Where do you live?</h3>
      <input
        type="text"
        placeholder="Enter your location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button
        onClick={() =>
          handleSpeechToText(
            setLocationListening,
            setLocationTranscript,
            setLocationModalOpen,
            setLocation
          )
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17h-2v-6h2v6zm4 0h-2V7h2v12z" />
        </svg>
      </button>
      {locationListening && (
        <Modal
          open={locationModalOpen}
          onClose={() => closeModal(setLocationListening, setLocationTranscript, setLocationModalOpen)}
          styles={modalStyles}
        >
          <h2>{locationListening ? "Mic is On" : "Mic is Off"}</h2>
          <div>{locationTranscript}</div>
        </Modal>
      )}
      <h3>Where do you study?</h3>
      <input
        type="text"
        placeholder="Enter your study location"
        value={studyLocation}
        onChange={(e) => setStudyLocation(e.target.value)}
      />
      <button
        onClick={() =>
          handleSpeechToText(
            setStudyLocationListening,
            setStudyLocationTranscript,
            setStudyLocationModalOpen,
            setStudyLocation
          )
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17h-2v-6h2v6zm4 0h-2V7h2v12z" />
        </svg>
      </button>
      {studyLocationListening && (
        <Modal
          open={studyLocationModalOpen}
          onClose={() => closeModal(setStudyLocationListening, setStudyLocationTranscript, setStudyLocationModalOpen)}
          styles={modalStyles}
        >
          <h2>{studyLocationListening ? "Mic is On" : "Mic is Off"}</h2>
          <div>{studyLocationTranscript}</div>
        </Modal>
      )}

      <h3>What do you do?</h3>
      <input
        type="text"
        placeholder="Tell us about your occupation..."
        value={occupation}
        onChange={(e) => setOccupation(e.target.value)}
      />
      <button
        onClick={() =>
          handleSpeechToText(
            setOccupationListening,
            setOccupationTranscript,
            setOccupationModalOpen,
            setOccupation
          )
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17h-2v-6h2v6zm4 0h-2V7h2v12z" />
        </svg>
      </button>
      {occupationListening && (
        <Modal
          open={occupationModalOpen}
          onClose={() => closeModal(setOccupationListening, setOccupationTranscript, setOccupationModalOpen)}
          styles={modalStyles}
        >
          <h2>{occupationListening ? "Mic is On" : "Mic is Off"}</h2>
          <div>{occupationTranscript}</div>
        </Modal>
      )}

      <div style={buttonContainerStyle}>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Step1;
