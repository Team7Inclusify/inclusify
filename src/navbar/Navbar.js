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

export default function Navbar() {
  //  The below line is what we will probably use through out
  //  the code to check if the user is logged in
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

  const checkAuth = () =>
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        setLoggedIn(user);
      } else {
        // User is signed out.
        setLoggedIn(null);
      }
      console.log("check nav check");
    });

  useEffect(() => {
    // This will unsubscribe the listener when the component unmounts.
    return () => checkAuth();
  }, []);
  return (
    <div className="navbar-whole">
      {/*

          Left Side of Navbar

      */}
      <div className="navbar-homeLink" onClick={() => navigate("/")}>
        <img
          className="navbar-homeImage"
          src={inclusify_image}
          alt="Inclusify Logo"
        />
        Inclusify
      </div>
      {/*

          Right Side of Navbar

      */}
      <div className="navbar-otherLinks">
        {/*

          Search Bar

        */}
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
          {/*

          If browser isnt supported (like Firefox), user wont have 
          the ability to use the speech to text

          */}
          {browserSupportsSpeechRecognition && (
            <img
              className="navbar-mic-icon"
              src={mic_icon}
              alt="Mic Icon"
              onClick={onOpenMicModal}
            />
          )}
        </div>
        {/*
        Below Contains the Contnet of the DROPDOWN for more info 
        Like Tutorials, FAQ, Abouts Us
        */}
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

        {/*

        Below Contains the Contnet of the DROPDOWN for Log/Sign Up Stuff
        
        */}

        <NavbarDropdown>
          <NavbarDropdown.Toggle className="navbar_toggle">
            <img
              src={profile_icon}
              alt="Profile Icon"
              className="navbar-profileImage"
            />
          </NavbarDropdown.Toggle>
          {/*

                  USER IS LOGGED IN BELOW

          */}
          {loggedIn ? (
            <NavbarDropdown.CSSTransitionMenu
              className="navbar-dropdown-menu"
              classNames="navbar-dropdown-menu"
              timeout={10}
            >
              <NavbarDropdown.Item
                className="navbar-dropdown-menu-item"
                onClick={() => navigate("/profile")}
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
              {/*

                  USER IS ---NOT--- LOGGED IN BELOW

              */}
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
      {/*

          This stuff is for the modal/pop up that opens up when u click the
          mic for speech to text option

      */}
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
