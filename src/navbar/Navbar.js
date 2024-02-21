import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
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
import Dropdown from "../components/Drop.js";
import nav_drop from "../images/navbar_dropdown.png";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    checkAuth();
    console.log("changeInLogIn");
  }, [loggedIn]);

  return (
    <div className="navbar-whole">
      {/* Inclusify Logo */}
      <div className="navbar-homeImageContainer" onClick={() => navigate("/")}>
        <img
          className="navbar-homeImage"
          src={inclusify_image}
          alt="Inclusify Logo"
        />
        <div className="navbar-homeText">Inclusify</div>
      </div>
      {windowWidth >= 700 && (
        <>
          <div className="navbar-link" onClick={() => navigate("/videoresume")}>
            Video Resume
          </div>
          <div className="navbar-link" onClick={() => navigate("/discussion")}>
            Discussion
          </div>
          {windowWidth >= 820 && (
            <>
              <div
                className="navbar-link"
                onClick={() => navigate("/about_us")}
              >
                About Us
              </div>
              <div
                className="navbar-link"
                onClick={() => navigate("/resources")}
              >
                Resources
              </div>
            </>
          )}
        </>
      )}
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
      {windowWidth >= 700 && (
        <>
          {/* More Info in Dropdown*/}
          <Dropdown
            isCircular
            coverIsImg
            coverImg={more_info_icon}
            content={
              <>
                <p onClick={() => navigate("/tutorials")}>Tutorials</p>
                <p onClick={() => navigate("/faq")}>FAQ</p>
                {windowWidth < 820 && (
                  <>
                    <p onClick={() => navigate("/resources")}>Resources</p>
                    <p onClick={() => navigate("/about_us")}>About Us</p>
                  </>
                )}
              </>
            }
          />
          {/* Profile Dropdown*/}
          <Dropdown
            isCircular
            coverIsImg
            coverImg={profile_icon}
            content={
              loggedIn ? (
                <>
                  <p onClick={() => navigate("/profile")}>Profile</p>
                  <p onClick={logOut}>Log Out</p>
                </>
              ) : (
                <>
                  <p onClick={() => navigate("/login")}>Log In</p>
                  <p onClick={() => navigate("/signup")}>Sign Up</p>
                </>
              )
            }
          />
        </>
      )}
      {windowWidth < 700 && (
        <Dropdown
          coverIsImg
          coverImg={nav_drop}
          content={
            <>
              <p onClick={() => navigate("/videoresume")}>Video Resume</p>
              <p onClick={() => navigate("/discussion")}>Discussion</p>
              <p onClick={() => navigate("/resources")}>Resources</p>
              <p onClick={() => navigate("/tutorials")}>Tutorials</p>
              <p onClick={() => navigate("/faq")}>FAQ</p>
              <p onClick={() => navigate("/about_us")}>About Us</p>
              {loggedIn ? (
                <>
                  <p onClick={() => navigate("/profile")}>Profile</p>
                  <p onClick={logOut}>Log Out</p>
                </>
              ) : (
                <>
                  <p onClick={() => navigate("/login")}>Log In</p>
                  <p onClick={() => navigate("/signup")}>Sign Up</p>
                </>
              )}
            </>
          }
        />
      )}

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
