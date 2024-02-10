import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

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

  const buttonContainerStyle = {
    textAlign: "center",
    marginTop: "20px",
  };

  return (
    <div style={{ backgroundColor: "#87CEEB", padding: "30px", borderRadius: "15px", boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.1)", width: "60%", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", fontFamily: "Arial, sans-serif", color: "#333" }}>Step 1</h2>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: "70%", marginBottom: "20px" }}>
          <h3 style={{ marginBottom: "10px", fontFamily: "Arial, sans-serif", color: "#333" }}>What's your name?</h3>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", marginBottom: "10px", fontFamily: "Arial, sans-serif", fontSize: "16px" }}
          />
          <button
            onClick={() =>
              handleSpeechToText(setNameListening, setNameModalOpen, setName)
            }
            style={{ padding: "10px 20px", borderRadius: "8px", border: "none", backgroundColor: "#4CAF50", color: "white", fontFamily: "Arial, sans-serif", fontSize: "16px", cursor: "pointer", transition: "background-color 0.3s" }}
          >
            Speak
          </button>
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
        <div style={{width: "70%", marginBottom: "20px" }}>
          <h3 style={{ marginBottom: "10px", fontFamily: "Arial, sans-serif", color: "#333" }}>Where do you live?</h3>
          <input
            type="text"
            placeholder="Enter your location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", marginBottom: "10px", fontFamily: "Arial, sans-serif", fontSize: "16px" }}
          />
          <button
            onClick={() =>
              handleSpeechToText(setLocationListening, setLocationModalOpen, setLocation)
            }
            style={{ padding: "10px 20px", borderRadius: "8px", border: "none", backgroundColor: "#4CAF50", color: "white", fontFamily: "Arial, sans-serif", fontSize: "16px", cursor: "pointer", transition: "background-color 0.3s" }}
          >
            Speak
          </button>
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
        <div style={{width: "70%", marginBottom: "20px" }}>
          <h3 style={{ marginBottom: "10px", fontFamily: "Arial, sans-serif", color: "#333" }}>Where do you study?</h3>
          <input
            type="text"
            placeholder="Enter your study location"
            value={studyLocation}
            onChange={(e) => setStudyLocation(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", marginBottom: "10px", fontFamily: "Arial, sans-serif", fontSize: "16px" }}
          />
          <button
            onClick={() =>
              handleSpeechToText(setStudyLocationListening, setStudyLocationModalOpen, setStudyLocation)
            }
            style={{ padding: "10px 20px", borderRadius: "8px", border: "none", backgroundColor: "#4CAF50", color: "white", fontFamily: "Arial, sans-serif", fontSize: "16px", cursor: "pointer", transition: "background-color 0.3s" }}
          >
            Speak
          </button>
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
        <div style={{ width: "70%", marginBottom: "20px" }}>
          <h3 style={{ marginBottom: "10px", fontFamily: "Arial, sans-serif", color: "#333" }}>What do you do?</h3>
          <input
            type="text"
            placeholder="Tell us about your occupation..."
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", marginBottom: "10px", fontFamily: "Arial, sans-serif", fontSize: "16px" }}
          />
          <button
            onClick={() =>
              handleSpeechToText(setOccupationListening, setOccupationModalOpen, setOccupation)
            }
            style={{ padding: "10px 20px", borderRadius: "8px", border: "none", backgroundColor: "#4CAF50", color: "white", fontFamily: "Arial, sans-serif", fontSize: "16px", cursor: "pointer", transition: "background-color 0.3s" }}
          >
            Speak
          </button>
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

      <div style={buttonContainerStyle}>
        <button onClick={handleNext} style={{ padding: "15px 30px", borderRadius: "8px", border: "none", backgroundColor: "#4CAF50", color: "white", fontFamily: "Arial, sans-serif", fontSize: "18px", cursor: "pointer", transition: "background-color 0.3s" }}>Next</button>
      </div>
    </div>
  );
};

export default Step1;