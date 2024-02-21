import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import NavbarDropdown from "react-navbar-dropdown";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

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

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  const navigate = useNavigate();

  const [openMicModal, setMicModalOpen] = useState(false);
  const onOpenMicModal = () => setMicModalOpen(true);
  const onCloseMicModal = () => setMicModalOpen(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const logOut = async () => {
    try {
      await signOut(auth);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  function newSearch(event) {
    let searched = document
      .getElementById("navBarSearchInput")
      .value.toLowerCase()
      .replace(/ /g, "_");
    if (event.key === "Enter") {
      navigate(`/search_results/${searched}`);
    }
  }

  const clearSearchInput = () => {
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

  const checkAuth = () =>
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(user);
      } else {
        setLoggedIn(null);
      }
    });

  useEffect(() => {
    return () => checkAuth();
  }, []);

  return (
    <div className="navbar-whole">
      {/* Inclusify Logo */}
      <div className="navbar-homeLink" onClick={() => navigate("/")}>
        <div className="navbar-homeImageContainer">
        <img
            className="navbar-homeImage"
            src={inclusify_image}
            alt="Inclusify Logo"
          />
          <div className="navbar-homeText">Inclusify</div>
        </div>
          
        </div>
      {/* Left Side of Navbar */}
      <div className="navbar-links-container">
        {/* Navigation Menu */}
        <div className="navbar-links">
        <div className="navbar-link" onClick={() => navigate("/videoresume")}>
            Video Resume
          </div>
          <div className="navbar-link" onClick={() => navigate("/discussion")}>
            Discussion
          </div>
          <div className="navbar-link" onClick={() => navigate("/resources")}>
            Resources
          </div>
          <div className="navbar-link" onClick={() => navigate("/about_us")}>
            About Us
          </div>
        </div>
      </div>


      {/* Right Side of Navbar */}
      
      <div className="navbar-otherLinks">
        {/* Search Bar */}
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
        {/* More Info Dropdown */}
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

        {/* Profile/Log In/Sign Up Dropdown */}
        <NavbarDropdown>
          {loggedIn ? (
            <NavbarDropdown.Toggle className="navbar_toggle">
              <img
                src={profile_icon}
                alt="Profile Icon"
                className="navbar-profileImage"
              />
            </NavbarDropdown.Toggle>
          ) : (
            <NavbarDropdown.Toggle className="navbar_toggle">
              <img
                src={profile_icon}
                alt="Profile Icon"
                className="navbar-profileImage"
              />
            </NavbarDropdown.Toggle>
          )}

          {loggedIn ? (
            <NavbarDropdown.CSSTransitionMenu
              className="navbar-dropdown-menu"
              classNames="navbar-dropdown-menu"
              timeout={10}
            >
              <NavbarDropdown.Item
                className="navbar-dropdown-menu-item"
                onClick={() => navigate("/profilepage")}
              >
                Profile
              </NavbarDropdown.Item>
              <NavbarDropdown.Item
                className="navbar-dropdown-menu-item"
                onClick={logOut}
              >
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

      {/* Mic Modal */}
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
};

export default Navbar;