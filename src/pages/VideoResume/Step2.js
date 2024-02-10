import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const Step2 = ({ onNext }) => {
  const [about, setAbout] = useState("");
  const [interests, setInterests] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");

  const [aboutListening, setAboutListening] = useState(false);
  const [interestsListening, setInterestsListening] = useState(false);
  const [skillsListening, setSkillsListening] = useState(false);
  const [experienceListening, setExperienceListening] = useState(false);
  const [educationListening, setEducationListening] = useState(false);

  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [interestsModalOpen, setInterestsModalOpen] = useState(false);
  const [skillsModalOpen, setSkillsModalOpen] = useState(false);
  const [experienceModalOpen, setExperienceModalOpen] = useState(false);
  const [educationModalOpen, setEducationModalOpen] = useState(false);

  const [aboutTranscript, setAboutTranscript] = useState("");
  const [interestsTranscript, setInterestsTranscript] = useState("");
  const [skillsTranscript, setSkillsTranscript] = useState("");
  const [experienceTranscript, setExperienceTranscript] = useState("");
  const [educationTranscript, setEducationTranscript] = useState("");

  const handleNext = () => {
    onNext({ about, interests, skills, experience, education });
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
    <div style={{ backgroundColor: "#87CEEB", padding: "30px", borderRadius: "15px", boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.1)", width: "60%", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", fontFamily: "Arial, sans-serif", color: "#333" }}>Step 2</h2>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: "70%", marginBottom: "20px" }}>
          <h3 style={{ marginBottom: "10px", fontFamily: "Arial, sans-serif", color: "#333" }}>Tell me about yourself</h3>
          <input
            type="text"
            placeholder="Tell us about yourself..."
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", marginBottom: "10px", fontFamily: "Arial, sans-serif", fontSize: "16px" }}
          />
          <button
            onClick={() =>
              handleSpeechToText(
                setAboutListening,
                setAboutTranscript,
                setAboutModalOpen,
                setAbout
              )
            }
            style={{ padding: "10px 20px", borderRadius: "8px", border: "none", backgroundColor: "#4CAF50", color: "white", fontFamily: "Arial, sans-serif", fontSize: "16px", cursor: "pointer", transition: "background-color 0.3s" }}
          >
            Speak
          </button>
          {aboutListening && (
            <Modal
              open={aboutModalOpen}
              onClose={() => closeModal(setAboutListening, setAboutTranscript, setAboutModalOpen)}
              styles={modalStyles}
            >
              <h2>{aboutListening ? "Mic is On" : "Mic is Off"}</h2>
              <div>{aboutTranscript}</div>
            </Modal>
          )}
        </div>

        <div style={{ width: "70%", marginBottom: "20px" }}>
          <h3 style={{ marginBottom: "10px", fontFamily: "Arial, sans-serif", color: "#333" }}>What do you like to do?</h3>
          <input
            type="text"
            placeholder="What do you like to do?"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", marginBottom: "10px", fontFamily: "Arial, sans-serif", fontSize: "16px" }}
          />
          <button
            onClick={() =>
              handleSpeechToText(
                setInterestsListening,
                setInterestsTranscript,
                setInterestsModalOpen,
                setInterests
              )
            }
            style={{ padding: "10px 20px", borderRadius: "8px", border: "none", backgroundColor: "#4CAF50", color: "white", fontFamily: "Arial, sans-serif", fontSize: "16px", cursor: "pointer", transition: "background-color 0.3s" }}
          >
            Speak
          </button>
          {interestsListening && (
            <Modal
              open={interestsModalOpen}
              onClose={() => closeModal(setInterestsListening, setInterestsTranscript, setInterestsModalOpen)}
              styles={modalStyles}
            >
              <h2>{interestsListening ? "Mic is On" : "Mic is Off"}</h2>
              <div>{interestsTranscript}</div>
            </Modal>
          )}
        </div>

        <div style={{ width: "70%", marginBottom: "20px" }}>
          <h3 style={{ marginBottom: "10px", fontFamily: "Arial, sans-serif", color: "#333" }}>What are you good at?</h3>
          <input
            type="text"
            placeholder="What are your skills?"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", marginBottom: "10px", fontFamily: "Arial, sans-serif", fontSize: "16px" }}
          />
          <button
            onClick={() =>
              handleSpeechToText(
                setSkillsListening,
                setSkillsTranscript,
                setSkillsModalOpen,
                setSkills
              )
            }
            style={{ padding: "10px 20px", borderRadius: "8px", border: "none", backgroundColor: "#4CAF50", color: "white", fontFamily: "Arial, sans-serif", fontSize: "16px", cursor: "pointer", transition: "background-color 0.3s" }}
          >
            Speak
          </button>
          {skillsListening && (
            <Modal
              open={skillsModalOpen}
              onClose={() => closeModal(setSkillsListening, setSkillsTranscript, setSkillsModalOpen)}
              styles={modalStyles}
            >
              <h2>{skillsListening ? "Mic is On" : "Mic is Off"}</h2>
              <div>{skillsTranscript}</div>
            </Modal>
          )}
        </div>

        <div style={{ width: "70%", marginBottom: "20px" }}>
          <h3 style={{ marginBottom: "10px", fontFamily: "Arial, sans-serif", color: "#333" }}>Tell me about your work experience</h3>
          <input
            type="text"
            placeholder="Tell me about your work experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", marginBottom: "10px", fontFamily: "Arial, sans-serif", fontSize: "16px" }}
          />
          <button
            onClick={() =>
              handleSpeechToText(
                setExperienceListening,
                setExperienceTranscript,
                setExperienceModalOpen,
                setExperience
              )
            }
            style={{ padding: "10px 20px", borderRadius: "8px", border: "none", backgroundColor: "#4CAF50", color: "white", fontFamily: "Arial, sans-serif", fontSize: "16px", cursor: "pointer", transition: "background-color 0.3s" }}
          >
            Speak
          </button>
          {experienceListening && (
            <Modal
              open={experienceModalOpen}
              onClose={() => closeModal(setExperienceListening, setExperienceTranscript, setExperienceModalOpen)}
              styles={modalStyles}
            >
              <h2>{experienceListening ? "Mic is On" : "Mic is Off"}</h2>
              <div>{experienceTranscript}</div>
            </Modal>
          )}
        </div>

        <div style={{ width: "70%", marginBottom: "20px" }}>
          <h3 style={{ marginBottom: "10px", fontFamily: "Arial, sans-serif", color: "#333" }}>Tell me about your education</h3>
          <input
            type="text"
            placeholder="Tell me about your education"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc", marginBottom: "10px", fontFamily: "Arial, sans-serif", fontSize: "16px" }}
          />
          <button
            onClick={() =>
              handleSpeechToText(
                setEducationListening,
                setEducationTranscript,
                setEducationModalOpen,
                setEducation
              )
            }
            style={{ padding: "10px 20px", borderRadius: "8px", border: "none", backgroundColor: "#4CAF50", color: "white", fontFamily: "Arial, sans-serif", fontSize: "16px", cursor: "pointer", transition: "background-color 0.3s" }}
          >
            Speak
          </button>
          {educationListening && (
            <Modal
              open={educationModalOpen}
              onClose={() => closeModal(setEducationListening, setEducationTranscript, setEducationModalOpen)}
              styles={modalStyles}
            >
              <h2>{educationListening ? "Mic is On" : "Mic is Off"}</h2>
              <div>{educationTranscript}</div>
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

export default Step2;
