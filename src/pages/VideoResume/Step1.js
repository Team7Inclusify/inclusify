import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "./Steps.css"; 
import MicIcon from "../../images/mic.svg";

const Step1 = ({ onNext }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [studyLocation, setStudyLocation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [nameListening, setNameListening] = useState(false);
  const [locationListening, setLocationListening] = useState(false);
  const [studyLocationListening, setStudyLocationListening] = useState(false);
  const [occupationListening, setOccupationListening] = useState(false);
  const [nameModalOpen, setNameModalOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [studyLocationModalOpen, setStudyLocationModalOpen] = useState(false);
  const [occupationModalOpen, setOccupationModalOpen] = useState(false);

  const handleNext = () => {
    onNext({ name, location, studyLocation, occupation });
  };

  const handleSpeechToText = (setListening, setModalOpen, setInputValue) => {
    if (!setListening) return;

    setListening(true);
    setModalOpen(true);

    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new window.SpeechRecognition();

    recognition.start();

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
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

  const closeModal = (setListening, setModalOpen) => {
    setListening(false);
    setModalOpen(false);
  };

  const modalStyles = {
    modal: {
      width: "60%",
      maxWidth: "800px",
      height: "60%",
    },
  };

  return (
    <div className="container">
      <h2 className="title">Step 1</h2>
      <div className="input-container">
        <div>
          <h3>What's your name?</h3>
          <div className="input-with-button">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />
            <button
              onClick={() =>
                handleSpeechToText(setNameListening, setNameModalOpen, setName)
              }
              className="round-button" 
            >
              <img src={MicIcon} alt="Mic Icon" /> 
            </button>
          </div>
          {nameListening && (
            <Modal
              open={nameModalOpen}
              onClose={() => closeModal(setNameListening, setNameModalOpen)}
              styles={modalStyles}
            >
              <h2>{nameListening ? "Mic is On" : "Mic is Off"}</h2>
              <div>{name}</div>
            </Modal>
          )}
        </div>
        <div>
          <h3>Where do you live?</h3>
          <div className="input-with-button">
            <input
              type="text"
              placeholder="Enter your location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input-field"
            />
            <button
              onClick={() =>
                handleSpeechToText(setNameListening, setNameModalOpen, setName)
              }
              className="round-button" 
            >
              <img src={MicIcon} alt="Mic Icon" /> 
            </button>
          </div>
          {locationListening && (
            <Modal
              open={locationModalOpen}
              onClose={() => closeModal(setLocationListening, setLocationModalOpen)}
              styles={modalStyles}
            >
              <h2>{locationListening ? "Mic is On" : "Mic is Off"}</h2>
              <div>{location}</div>
            </Modal>
          )}
        </div>
        <div>
          <h3>Where do you study?</h3>
          <div className="input-with-button">
            <input
              type="text"
              placeholder="Enter your study location"
              value={studyLocation}
              onChange={(e) => setStudyLocation(e.target.value)}
              className="input-field"
            />
            <button
              onClick={() =>
                handleSpeechToText(setNameListening, setNameModalOpen, setName)
              }
              className="round-button" 
            >
              <img src={MicIcon} alt="Mic Icon" /> 
            </button>
          </div>
          {studyLocationListening && (
            <Modal
              open={studyLocationModalOpen}
              onClose={() => closeModal(setStudyLocationListening, setStudyLocationModalOpen)}
              styles={modalStyles}
            >
              <h2>{studyLocationListening ? "Mic is On" : "Mic is Off"}</h2>
              <div>{studyLocation}</div>
            </Modal>
          )}
        </div>
        <div>
          <h3>What do you do?</h3>
          <div className="input-with-button">
            <input
              type="text"
              placeholder="Tell us about your occupation..."
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              className="input-field"
            />
            <button
              onClick={() =>
                handleSpeechToText(setNameListening, setNameModalOpen, setName)
              }
              className="round-button" 
            >
              <img src={MicIcon} alt="Mic Icon" /> 
            </button>
          </div>
          {occupationListening && (
            <Modal
              open={occupationModalOpen}
              onClose={() => closeModal(setOccupationListening, setOccupationModalOpen)}
              styles={modalStyles}
            >
              <h2>{occupationListening ? "Mic is On" : "Mic is Off"}</h2>
              <div>{occupation}</div>
            </Modal>
          )}
        </div>
      </div>
      <div className="button-container">
        <button onClick={handleNext} className="button">Next</button>
      </div>
    </div>
  );
};

export default Step1;
