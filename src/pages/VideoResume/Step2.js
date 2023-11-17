import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const Step2 = ({ onNext }) => {
  const [about, setAbout] = useState("");
  const [interests, setInterests] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");

  const [aboutTranscript, setAboutTranscript] = useState("");
  const [interestsTranscript, setInterestsTranscript] = useState("");
  const [skillsTranscript, setSkillsTranscript] = useState("");
  const [experienceTranscript, setExperienceTranscript] = useState("");
  const [educationTranscript, setEducationTranscript] = useState("");

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

  const handleNext = () => {
    onNext({ about, interests, skills, experience, education });
    setAboutTranscript("");
    setInterestsTranscript("");
    setSkillsTranscript("");
    setExperienceTranscript("");
    setEducationTranscript("");
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
      <h2>Step 2</h2>
      <h3>Tell me about yourself</h3>

      <input
        type="text"
        placeholder="Tell us about yourself..."
        value={about}
        onChange={(e) => setAbout(e.target.value)}
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

      <h3>What do you like to do?</h3>
      <input
        type="text"
        placeholder="What do you like to do?"
        value={interests}
        onChange={(e) => setInterests(e.target.value)}
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

      <h3>What are you good at?</h3>
      <input
        type="text"
        placeholder="What are your skills?"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
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

    <h3>Tell me about your work experience</h3>
      <input
        type="text"
        placeholder="Tell me about your work experience"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
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
      
      <div style={buttonContainerStyle}>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Step2;
