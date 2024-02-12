import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "./Steps.css"; 
import MicIcon from "../../images/mic.svg";

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

  return (
    <div className="container">
      <h2 className="title">Step 2</h2>
      <div className="input-container">
        <div>
          <h3>Tell me about yourself</h3>
          <div className="input-with-button">
            <input
              type="text"
              placeholder="Tell us about yourself..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="input-field"
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
              className="round-button"
            >
              <img src={MicIcon} alt="Mic Icon" /> 
            </button>
          </div>
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

        <div>
          <h3>What do you like to do?</h3>
          <div className="input-with-button">
            <input
              type="text"
              placeholder="What do you like to do?"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              className="input-field"
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
              className="round-button"
            >
              <img src={MicIcon} alt="Mic Icon" /> 
            </button>
          </div>
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

        <div>
          <h3>What are you good at?</h3>
          <div className="input-with-button">
          <input
            type="text"
            placeholder="What are your skills?"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="input-field"
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
            className="round-button"
          >
            <img src={MicIcon} alt="Mic Icon" /> 
          </button>
          </div>
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

        <div>
          <h3>Tell me about your work experience</h3>
          <div className="input-with-button">
          <input
            type="text"
            placeholder="Tell me about your work experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="input-field"
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
            className="round-button"
          >
            <img src={MicIcon} alt="Mic Icon" /> 
          </button>
          </div>
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

        <div>
          <h3>Tell me about your education</h3>
          <div className="input-with-button">
          <input
            type="text"
            placeholder="Tell me about your education"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            className="input-field"
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
            className="round-button"
          >
            <img src={MicIcon} alt="Mic Icon" /> 
          </button>
          </div>
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

      <div className="button-container">
        <button onClick={handleNext} className="button">Next</button>
      </div>
    </div>
  );
};

export default Step2;
