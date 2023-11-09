import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import NavbarDropdown from "react-navbar-dropdown";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { auth } from "../config/firebase";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

// Images
import inclusify_image from "../images/inclusify_no_name.png";
import profile_icon from "../images/profile_icon.png";
import more_info_icon from "../images/more_info.png";
import search_icon from "../images/search_icon.png";
import mic_icon from "../images/microphone-icon.png";
import red_mic_icon from "../images/red-mic-icon.png";
import close_button from "../images/close_icon.png";
import reset_icon from "../images/reset_icon.png";
import confirm_search from "../images/confirm_search.png";

export default function Navbar() {
  // This to be used later ignore the eslint warning for this for now
  const [isLoggedIn, setLoggedIn] = useState(false);
  console.log(auth?.currentUser);

  const [openMicModal, setMicModalOpen] = useState(false);

  const onOpenMicModal = () => setMicModalOpen(true);
  const onCloseMicModal = () => setMicModalOpen(false);

  const navigate = useNavigate();
  function newSearch(event) {
    let searched = document
      .getElementById("navBarSearchInput")
      .value.toLowerCase()
      .replace(/ /g, "_");
    if (event.key === "Enter") {
      navigate(`/search_results/${searched}`);
    }
  }

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const clearSearchInput = () => {
    // Clear the input field
    document.getElementById("navBarSearchInput").value = "";
  };

  const confirmSpeechToText = () => {
    navigate(`/search_results/${transcript.toLowerCase().replace(/ /g, "_")}`);
    onCloseMicModal();
    resetTranscript();
  };

  const speechToText = () => {
    if (!listening) {
      SpeechRecognition.startListening();
    } else {
      SpeechRecognition.stopListening();
      console.log(transcript);
    }
  };

  return (
    <div className="navbar-whole">
      <div className="navbar-homeLink" onClick={() => navigate("/")}>
        <img
          className="navbar-homeImage"
          src={inclusify_image}
          alt="Inclusify Logo"
        />
        Inclusify
      </div>
      <div className="navbar-otherLinks">
        <div className="navbar-searchbar">
          <img
            className="navbar-searchbar-icon"
            src={search_icon}
            alt="Search Icon"
          />
          <input
            className="navbar-searchbar-input"
            placeholder="Search Here"
            id="navBarSearchInput"
            onKeyDown={(key) => newSearch(key)}
          />
          <img
            className="navbar-clear-icon"
            src={close_button}
            alt="Clear Icon"
            onClick={clearSearchInput}
          />
          {browserSupportsSpeechRecognition && (
            <img
              className="navbar-mic-icon"
              src={mic_icon}
              alt="Mic Icon"
              onClick={onOpenMicModal}
            />
          )}
        </div>
        <NavbarDropdown>
          <NavbarDropdown.Toggle className="navbar_toggle">
            <img
              src={more_info_icon}
              alt="More Info Icon"
              className="navbar-profileImage"
            />
          </NavbarDropdown.Toggle>
          <NavbarDropdown.CSSTransitionMenu
            className="navbar-dropdown-menu"
            classNames="navbar-dropdown-menu"
            timeout={10}
          >
            <NavbarDropdown.Item
              className="navbar-dropdown-menu-item"
              onClick={() => navigate("/tutorials")}
            >
              Tutorials
            </NavbarDropdown.Item>
            <NavbarDropdown.Item
              className="navbar-dropdown-menu-item"
              onClick={() => navigate("/faq")}
            >
              FAQ
            </NavbarDropdown.Item>
            <NavbarDropdown.Item
              className="navbar-dropdown-menu-item"
              onClick={() => navigate("/about_us")}
            >
              About Us
            </NavbarDropdown.Item>
          </NavbarDropdown.CSSTransitionMenu>
        </NavbarDropdown>
        <NavbarDropdown>
          <NavbarDropdown.Toggle className="navbar_toggle">
            <img
              src={profile_icon}
              alt="Profile Icon"
              className="navbar-profileImage"
            />
          </NavbarDropdown.Toggle>
          {isLoggedIn ? (
            <NavbarDropdown.CSSTransitionMenu
              className="navbar-dropdown-menu"
              classNames="navbar-dropdown-menu"
              timeout={10}
            >
              <NavbarDropdown.Item className="navbar-dropdown-menu-item">
                Log Out
              </NavbarDropdown.Item>
            </NavbarDropdown.CSSTransitionMenu>
          ) : (
            <NavbarDropdown.CSSTransitionMenu
              className="navbar-dropdown-menu"
              classNames="navbar-dropdown-menu"
              timeout={200}
            >
              <NavbarDropdown.Item
                className="navbar-dropdown-menu-item"
                onClick={() => navigate("/login")}
              >
                Log In
              </NavbarDropdown.Item>
              <NavbarDropdown.Item
                className="navbar-dropdown-menu-item"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </NavbarDropdown.Item>
            </NavbarDropdown.CSSTransitionMenu>
          )}
        </NavbarDropdown>
      </div>
      <Modal
        open={openMicModal}
        onClose={onCloseMicModal}
        classNames={{ modal: "micModal" }}
      >
        <div className="modalStuff">
          <h2> {listening ? "Mic is On" : "Mic is Off"}</h2>
          <div className="micModalTranscript">
            {transcript} {listening.valueOf()}
          </div>
          <div className="micModalFooter">
            <img
              className="micModalIcon"
              src={reset_icon}
              alt="Reset Icon"
              onClick={resetTranscript}
            />
            <img
              className="micModalIcon"
              src={listening ? red_mic_icon : mic_icon}
              alt="Mic Icon"
              onClick={speechToText}
            />
            <img
              className="micModalIcon"
              src={confirm_search}
              alt="Confirm Search Icon"
              onClick={confirmSpeechToText}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
